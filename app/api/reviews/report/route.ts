import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { reviewId } = await request.json();

    if (!reviewId || typeof reviewId !== 'string') {
      return NextResponse.json({ error: 'reviewId is required' }, { status: 400 });
    }

    let ip = 'unknown';
    try {
      const { rateLimiters, getClientIP, checkRateLimit } = await import('@/lib/rateLimit');
      ip = getClientIP(request);
      const rateLimit = await checkRateLimit(rateLimiters.report, `${ip}:${reviewId}`);
      if (!rateLimit.success) {
        return NextResponse.json({ error: 'Already reported' }, { status: 429 });
      }
    } catch {
      // Redis not configured — allow the report
    }

    const { data: review } = await supabaseAdmin
      .from('reviews')
      .select('id')
      .eq('id', reviewId)
      .eq('status', 'approved')
      .single();

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    console.log(`[REPORT] Review ${reviewId} reported by IP ${ip} at ${new Date().toISOString()}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Report error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
