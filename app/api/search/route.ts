import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting is best-effort; don't block search if Redis is unavailable
    try {
      const { rateLimiters, getClientIP, checkRateLimit } = await import('@/lib/rateLimit');
      const ip = getClientIP(request);
      const rateLimit = await checkRateLimit(rateLimiters.search, ip);
      if (!rateLimit.success) {
        return NextResponse.json(
          { error: 'Too many search requests. Please try again shortly.' },
          { status: 429 }
        );
      }
    } catch {
      // Redis not configured — allow the search to proceed
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();

    if (!query || query.length < 1 || query.length > 100) {
      return NextResponse.json(
        { error: 'Search query must be between 1 and 100 characters' },
        { status: 400 }
      );
    }

    const industry = searchParams.get('industry');
    const sortBy = searchParams.get('sort') || 'relevance';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50);

    let dbQuery = supabaseAdmin
      .from('companies')
      .select('*')
      .ilike('name', `%${query}%`)
      .limit(limit);

    if (industry) {
      dbQuery = dbQuery.ilike('industry', `%${industry}%`);
    }

    if (sortBy === 'rating') {
      dbQuery = dbQuery.order('avg_overall', { ascending: false, nullsFirst: false });
    } else if (sortBy === 'reviews') {
      dbQuery = dbQuery.order('review_count', { ascending: false });
    } else {
      dbQuery = dbQuery.order('review_count', { ascending: false });
    }

    const { data: companies, error } = await dbQuery;

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Failed to search companies' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      companies: companies || [],
      count: companies?.length || 0,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
