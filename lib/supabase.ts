import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client-side Supabase client (uses anon key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (uses service role key, bypasses RLS)
// Only use this in API routes and server components
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

// Database types (will be generated from Supabase later)
export type Company = {
  id: string;
  slug: string;
  name: string;
  domain: string | null;
  logo_url: string | null;
  industry: string | null;
  country: string | null;
  review_count: number;
  avg_overall: number | null;
  created_at: string;
};

export type Review = {
  id: string;
  company_id: string;
  token_hash: string;
  role_title: string | null;
  role_type: 'SWE' | 'Design' | 'Finance' | 'Marketing' | 'Data' | 'Other';
  year: number;
  season: 'Winter' | 'Summer' | 'Fall';
  city: string | null;
  is_remote: boolean;
  pay_amount: number | null;
  pay_type: 'hourly' | 'monthly' | 'stipend' | 'unpaid' | null;
  body: string;
  pros: string | null;
  cons: string | null;
  rating_mentorship: number;
  rating_work_quality: number;
  rating_culture: number;
  rating_compensation: number;
  rating_return_offer: number;
  would_recommend: boolean;
  received_offer: boolean | null;
  school: string | null;
  language: 'en' | 'fr';
  status: 'pending' | 'approved' | 'rejected';
  helpful_count: number;
  created_at: string;
};

export type EmailToken = {
  id: string;
  email_hash: string;
  token_hash: string;
  used_count: number;
  created_at: string;
  expires_at: string;
};

// Helper to get company logo URL
export function getCompanyLogo(domain: string | null): string {
  if (!domain) return '/placeholder-company.svg';
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || 'pk_X-1ZO13GSgeOoUrIuJ6GMQ';
  return `https://img.logo.dev/${domain}?token=${token}&size=80&format=png`;
}

// Calculate average rating from review
export function calculateAverageRating(review: Review): number {
  return (
    (review.rating_mentorship +
      review.rating_work_quality +
      review.rating_culture +
      review.rating_compensation +
      review.rating_return_offer) /
    5
  );
}
