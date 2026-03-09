import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomUUID } from 'crypto';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { rateLimiters, getClientIP, checkRateLimit } from '@/lib/rateLimit';
import { isValidUniversityEmail } from '@/lib/validation';

const resend = new Resend(process.env.RESEND_API_KEY);
const SALT = process.env.EMAIL_HASH_SALT || 'default-salt';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

function hashEmail(email: string): string {
  return createHash('sha256').update(email.toLowerCase() + SALT).digest('hex');
}

function hashToken(token: string): string {
  return createHash('sha256').update(token + SALT).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidUniversityEmail(email)) {
      return NextResponse.json(
        { error: 'Please use a valid university email (.edu, .ca, or .fr)' },
        { status: 400 }
      );
    }

    // Rate limit check
    const ip = getClientIP(request);
    const rateLimit = await checkRateLimit(rateLimiters.magicLink, ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Hash the email
    const emailHash = hashEmail(email);

    // Check if email has already submitted 3 reviews
    const { data: existingToken } = await supabaseAdmin
      .from('email_tokens')
      .select('used_count')
      .eq('email_hash', emailHash)
      .single();

    if (existingToken && existingToken.used_count >= 3) {
      return NextResponse.json(
        { error: 'You have reached the maximum number of reviews (3)' },
        { status: 400 }
      );
    }

    // Generate token
    const token = randomUUID();
    const tokenHash = hashToken(token);

    // Calculate expiry (48 hours)
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    // Store or update token
    if (existingToken) {
      await supabaseAdmin
        .from('email_tokens')
        .update({ token_hash: tokenHash, expires_at: expiresAt })
        .eq('email_hash', emailHash);
    } else {
      await supabaseAdmin
        .from('email_tokens')
        .insert({
          email_hash: emailHash,
          token_hash: tokenHash,
          used_count: 0,
          expires_at: expiresAt,
        });
    }

    // Send magic link email
    const magicLink = `${APP_URL}/auth/verify?token=${token}`;

    await resend.emails.send({
      from: 'RateMyIntern <noreply@ratemyintern.com>',
      to: email,
      subject: 'Your RateMyIntern Magic Link',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">Welcome to RateMyIntern!</h1>
          <p>Click the button below to verify your email and submit your review:</p>
          <a href="${magicLink}"
             style="display: inline-block; background: #1e40af; color: white; padding: 12px 24px;
                    border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">
            Verify Email & Continue
          </a>
          <p style="color: #64748b; font-size: 14px;">
            This link expires in 48 hours. If you didn't request this, you can ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            RateMyIntern - Anonymous internship reviews by students, for students.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Magic link error:', error);
    return NextResponse.json(
      { error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
}
