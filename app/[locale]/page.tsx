import { supabase } from '@/lib/supabase';
import type { Company, Review } from '@/lib/supabase';
import HomePageClient from './HomePageClient';

export type HomeReview = Review & {
  company_name: string;
  company_domain: string | null;
  company_slug: string;
};

interface HomeStats {
  totalReviews: number;
  totalCompanies: number;
  recommendPercent: number;
}

async function getTopCompanies(): Promise<Company[]> {
  const { data } = await supabase
    .from('companies')
    .select('*')
    .gt('review_count', 0)
    .order('avg_overall', { ascending: false, nullsFirst: false })
    .limit(6);

  return (data as Company[]) || [];
}

async function getRecentReviews(): Promise<HomeReview[]> {
  const { data } = await supabase
    .from('reviews')
    .select('*, companies!inner(name, domain, slug)')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(3);

  if (!data) return [];

  return data.map((row: Record<string, unknown>) => {
    const company = row.companies as Record<string, unknown>;
    return {
      ...(row as unknown as Review),
      company_name: company.name as string,
      company_domain: company.domain as string | null,
      company_slug: company.slug as string,
    };
  });
}

async function getStats(): Promise<HomeStats> {
  const [reviewResult, companyResult] = await Promise.all([
    supabase.from('reviews').select('id, would_recommend', { count: 'exact', head: false }).eq('status', 'approved'),
    supabase.from('companies').select('id', { count: 'exact', head: true }).gt('review_count', 0),
  ]);

  const totalReviews = reviewResult.count || 0;
  const totalCompanies = companyResult.count || 0;

  let recommendPercent = 0;
  if (reviewResult.data && reviewResult.data.length > 0) {
    const recommended = reviewResult.data.filter((r: { would_recommend: boolean }) => r.would_recommend).length;
    recommendPercent = Math.round((recommended / reviewResult.data.length) * 100);
  }

  return { totalReviews, totalCompanies, recommendPercent };
}

export default async function HomePage() {
  const [companies, reviews, stats] = await Promise.all([
    getTopCompanies(),
    getRecentReviews(),
    getStats(),
  ]);

  return (
    <HomePageClient
      companies={companies}
      reviews={reviews}
      stats={stats}
    />
  );
}

export const revalidate = 600;
