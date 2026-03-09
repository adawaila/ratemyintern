import { notFound } from 'next/navigation';
import { supabase, type Company, type Review } from '@/lib/supabase';
import CompanyPageClient from './CompanyPageClient';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

// Generate static params for ISR
export async function generateStaticParams() {
  // For now, return empty array - will be populated when we have data
  return [];
}

async function getCompany(slug: string): Promise<Company | null> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data as Company;
}

async function getReviews(companyId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('company_id', companyId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as Review[];
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;

  const company = await getCompany(slug);

  if (!company) {
    notFound();
  }

  const reviews = await getReviews(company.id);

  return <CompanyPageClient company={company} reviews={reviews} />;
}

// ISR: Revalidate every hour
export const revalidate = 3600;
