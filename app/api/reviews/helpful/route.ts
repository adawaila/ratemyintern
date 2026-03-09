import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { reviewId } = await request.json();

    if (!reviewId || typeof reviewId !== 'string') {
      return NextResponse.json({ error: 'reviewId is required' }, { status: 400 });
    }

    try {
      const { rateLimiters, getClientIP, checkRateLimit } = await import('@/lib/rateLimit');
      const ip = getClientIP(request);
      const rateLimit = await checkRateLimit(rateLimiters.helpfulVote, `${ip}:${reviewId}`);
      if (!rateLimit.success) {
        return NextResponse.json({ error: 'Already voted' }, { status: 429 });
      }
    } catch {
      // Redis not configured — allow the vote
    }

    const { data: review, error: fetchError } = await supabaseAdmin
      .from('reviews')
      .select('helpful_count')
      .eq('id', reviewId)
      .eq('status', 'approved')
      .single();

    if (fetchError || !review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    await supabaseAdmin
      .from('reviews')
      .update({ helpful_count: review.helpful_count + 1 })
      .eq('id', reviewId);

    return NextResponse.json({ success: true, helpful_count: review.helpful_count + 1 });
  } catch (error) {
    console.error('Helpful vote error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
