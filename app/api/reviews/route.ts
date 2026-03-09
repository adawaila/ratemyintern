import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { rateLimiters, getClientIP, checkRateLimit } from '@/lib/rateLimit';
import { reviewSchema, generateSlug } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Get token hash from cookie
    const cookieStore = await cookies();
    const tokenHash = cookieStore.get('token_hash')?.value;

    if (!tokenHash) {
      return NextResponse.json(
        { error: 'Not authenticated. Please verify your email first.' },
        { status: 401 }
      );
    }

    // Rate limit check
    const ip = getClientIP(request);
    const rateLimit = await checkRateLimit(rateLimiters.reviewSubmit, ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'You can only submit one review per day. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate token
    const { data: emailToken, error: tokenError } = await supabaseAdmin
      .from('email_tokens')
      .select('*')
      .eq('token_hash', tokenHash)
      .single();

    if (tokenError || !emailToken) {
      return NextResponse.json(
        { error: 'Invalid or expired session. Please request a new magic link.' },
        { status: 401 }
      );
    }

    // Check if token is expired
    if (new Date(emailToken.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Session expired. Please request a new magic link.' },
        { status: 401 }
      );
    }

    // Check review limit
    if (emailToken.used_count >= 3) {
      return NextResponse.json(
        { error: 'You have reached the maximum number of reviews (3).' },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = reviewSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid review data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const reviewData = validationResult.data;

    // Handle company - either existing or new
    let companyId = reviewData.company_id;

    if (!companyId && reviewData.company_name) {
      // Create new company
      const slug = generateSlug(reviewData.company_name);

      const { data: newCompany, error: companyError } = await supabaseAdmin
        .from('companies')
        .insert({
          name: reviewData.company_name,
          slug,
          review_count: 0,
        })
        .select()
        .single();

      if (companyError) {
        // Company might already exist, try to find it
        const { data: existingCompany } = await supabaseAdmin
          .from('companies')
          .select('id')
          .eq('slug', slug)
          .single();

        if (existingCompany) {
          companyId = existingCompany.id;
        } else {
          return NextResponse.json(
            { error: 'Failed to create company' },
            { status: 500 }
          );
        }
      } else {
        companyId = newCompany.id;
      }
    }

    if (!companyId) {
      return NextResponse.json(
        { error: 'Company is required' },
        { status: 400 }
      );
    }

    // Create review
    const { error: reviewError } = await supabaseAdmin
      .from('reviews')
      .insert({
        company_id: companyId,
        token_hash: tokenHash,
        role_title: reviewData.role_title,
        role_type: reviewData.role_type,
        year: reviewData.year,
        season: reviewData.season,
        city: reviewData.city,
        is_remote: reviewData.is_remote,
        pay_amount: reviewData.pay_amount,
        pay_type: reviewData.pay_type,
        body: reviewData.body,
        pros: reviewData.pros,
        cons: reviewData.cons,
        rating_mentorship: reviewData.rating_mentorship,
        rating_work_quality: reviewData.rating_work_quality,
        rating_culture: reviewData.rating_culture,
        rating_compensation: reviewData.rating_compensation,
        rating_return_offer: reviewData.rating_return_offer,
        would_recommend: reviewData.would_recommend,
        received_offer: reviewData.received_offer,
        school: reviewData.school,
        language: reviewData.language,
        status: 'pending',
        helpful_count: 0,
      });

    if (reviewError) {
      console.error('Review creation error:', reviewError);
      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: 500 }
      );
    }

    // Increment used_count
    await supabaseAdmin
      .from('email_tokens')
      .update({ used_count: emailToken.used_count + 1 })
      .eq('token_hash', tokenHash);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('company_id');

    if (!companyId) {
      return NextResponse.json(
        { error: 'company_id is required' },
        { status: 400 }
      );
    }

    const { data: reviews, error } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .eq('company_id', companyId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Reviews fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
