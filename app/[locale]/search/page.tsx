'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SearchBar from '@/components/SearchBar';

export default function SearchPage() {
  const t = useTranslations('search');
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const placeholderResults = Array.from({ length: 6 }, (_, i) => ({ id: i }));

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors text-sm">Home</Link>
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-slate-600 text-sm font-medium">{t('title')}</span>
        </div>

        {/* Search header */}
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-slate-900 mb-5">
            {t('title')}
          </h1>
          <div className="max-w-xl">
            <SearchBar />
          </div>
        </div>

        {query ? (
          <>
            <p className="text-slate-500 mb-6 text-sm">
              {t('resultsCount', { count: 0 })} for &ldquo;{query}&rdquo;
            </p>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { label: 'All Industries', options: ['Tech', 'Finance', 'Consulting'] },
                { label: 'All Roles', options: ['Software Engineering', 'Design', 'Marketing'] },
                { label: 'Any Location', options: ['Remote', 'Montreal', 'Toronto'] },
              ].map(({ label }) => (
                <select key={label} className="input py-2 px-3 text-sm w-auto min-w-[140px]">
                  <option>{label}</option>
                </select>
              ))}
            </div>

            {/* Results */}
            <div className="space-y-4">
              {placeholderResults.map((result) => (
                <div key={result.id} className="card p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl animate-shimmer" />
                    <div className="flex-1">
                      <div className="h-5 bg-slate-100 rounded-lg w-1/3 mb-2 animate-shimmer" />
                      <div className="h-4 bg-slate-50 rounded-lg w-1/4 animate-shimmer" style={{ animationDelay: '0.1s' }} />
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-4 h-4 bg-slate-100 rounded animate-shimmer" style={{ animationDelay: `${star * 0.05}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No results state */}
            <div className="mt-10 text-center py-14 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium mb-1">
                {t('noResults', { query })}
              </p>
              <p className="text-slate-400 text-sm">Try a different search term or browse all companies</p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium mb-1">Enter a company name to search</p>
            <p className="text-slate-400 text-sm">Find internship reviews for any company</p>
          </div>
        )}
      </div>
    </div>
  );
}
