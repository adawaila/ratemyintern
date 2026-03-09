import { supabase, type Company } from '@/lib/supabase';
import CompaniesPageClient from './CompaniesPageClient';

async function getCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .gt('review_count', 0)
    .order('avg_overall', { ascending: false, nullsFirst: false });

  if (error || !data) return [];
  return data as Company[];
}

export default async function CompaniesPage() {
  const companies = await getCompanies();
  return <CompaniesPageClient companies={companies} />;
}

export const revalidate = 600;
