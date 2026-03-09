import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

const SALT = process.env.EMAIL_HASH_SALT || 'default-salt';

function hashToken(token: string): string {
  return createHash('sha256').update(token + SALT).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const tokenHash = hashToken(token);

    // Find token in database
    const { data: emailToken, error } = await supabaseAdmin
      .from('email_tokens')
      .select('*')
      .eq('token_hash', tokenHash)
      .single();

    if (error || !emailToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Check if expired
    if (new Date(emailToken.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      );
    }

    // Set httpOnly cookie with token hash
    const cookieStore = await cookies();
    cookieStore.set('token_hash', tokenHash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
