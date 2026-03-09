'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect, useCallback } from 'react';
import type { Company } from '@/lib/supabase';

const logoToken = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || 'pk_X-1ZO13GSgeOoUrIuJ6GMQ';

function CompanyLogo({ name, domain, size = 36 }: { name: string; domain: string | null; size?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed || !domain) {
    return (
      <span className="text-lg font-bold text-slate-400">{name.charAt(0)}</span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://img.logo.dev/${domain}?token=${logoToken}&size=80&format=png`}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

type SortOption = 'relevance' | 'rating' | 'reviews';

export default function SearchPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const performSearch = useCallback(async (q: string, sort: SortOption) => {
    if (!q.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({ q: q.trim(), sort });
      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.companies);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      performSearch(query, sortBy);
    }
  }, [query, sortBy, performSearch]);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4" style={{ background: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-slate-400 hover:text-blue-600 transition-colors text-sm">{t('common.home')}</Link>
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-slate-600 text-sm font-medium">{t('search.title')}</span>
        </div>

        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-slate-900 mb-5">
            {t('search.title')}
          </h1>
          <div className="max-w-xl">
            <SearchBar />
          </div>
        </div>

        {query ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <p className="text-slate-500 text-sm">
                {isLoading
                  ? t('search.searching')
                  : t('search.resultsCount', { count: results.length, query })}
              </p>

              <div className="flex gap-2">
                {(['relevance', 'rating', 'reviews'] as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={
                      sortBy === option
                        ? { background: '#1B365D', color: 'white' }
                        : { background: 'white', color: '#64748B', border: '1px solid #E2E8F0' }
                    }
                  >
                    {option === 'relevance' ? t('search.sortRelevance') : option === 'rating' ? t('search.sortRating') : t('search.sortReviews')}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl animate-pulse" />
                      <div className="flex-1">
                        <div className="h-5 bg-slate-100 rounded-lg w-1/3 mb-2 animate-pulse" />
                        <div className="h-4 bg-slate-50 rounded-lg w-1/4 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((company) => (
                  <Link
                    key={company.id}
                    href={`/companies/${company.slug}`}
                    className="group flex items-center gap-5 bg-white rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <CompanyLogo name={company.name} domain={company.domain} size={48} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-slate-900 truncate mb-0.5">
                        {company.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        {company.industry && <span className="text-sm text-slate-400">{company.industry}</span>}
                        {company.country && <span className="text-xs text-slate-300 font-medium bg-slate-50 px-2 py-0.5 rounded">{company.country}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className={`w-4 h-4 ${company.avg_overall && star <= Math.round(company.avg_overall) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        {company.avg_overall && (
                          <span className="font-semibold text-slate-800 text-sm tabular-nums">{company.avg_overall.toFixed(1)}</span>
                        )}
                      </div>
                        <span className="text-xs text-slate-400 font-medium">{company.review_count} {t('common.reviews')}</span>
                    </div>
                    <svg className="w-5 h-5 text-slate-300 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            ) : hasSearched ? (
              <div className="text-center py-14 bg-white rounded-2xl" style={{ border: '2px dashed #E2E8F0' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: '#EFF6FF' }}>
                  <svg className="w-8 h-8" style={{ color: '#60A5FA' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-slate-600 font-medium mb-1">
                  {t('search.noResults', { query })}
                </p>
                <p className="text-slate-400 text-sm mb-6">{t('search.tryDifferent')}</p>
                <Link
                  href="/companies"
                  className="inline-flex items-center gap-1.5 font-semibold text-sm transition-colors"
                  style={{ color: '#2563EB' }}
                >
                  {t('search.browseAll')}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#EFF6FF' }}>
              <svg className="w-10 h-10" style={{ color: '#60A5FA' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium mb-1">{t('search.emptyTitle')}</p>
            <p className="text-slate-400 text-sm">{t('search.emptyDesc')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
