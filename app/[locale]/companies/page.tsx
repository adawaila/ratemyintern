'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';

function CompanyLogo({ name, domain, size = 36 }: { name: string; domain: string; size?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed || !domain) {
    return (
      <span className="text-lg font-bold text-slate-400">{name.charAt(0)}</span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://img.logo.dev/${domain}?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&size=80&format=png`}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const FILTERS = ['All', 'Tech', 'Finance', 'Consulting', 'E-commerce', 'Gaming'];

const PLACEHOLDER_COMPANIES = [
  { id: 1, name: 'Google', industry: 'Technology', rating: 4.8, reviews: 234, domain: 'google.com' },
  { id: 2, name: 'Shopify', industry: 'E-commerce', rating: 4.7, reviews: 189, domain: 'shopify.com' },
  { id: 3, name: 'Desjardins', industry: 'Finance', rating: 4.5, reviews: 156, domain: 'desjardins.com' },
  { id: 4, name: 'Microsoft', industry: 'Technology', rating: 4.6, reviews: 201, domain: 'microsoft.com' },
  { id: 5, name: 'Ubisoft', industry: 'Gaming', rating: 4.3, reviews: 98, domain: 'ubisoft.com' },
  { id: 6, name: 'National Bank', industry: 'Finance', rating: 4.4, reviews: 87, domain: 'nbc.ca' },
  { id: 7, name: 'Amazon', industry: 'Technology', rating: 4.2, reviews: 175, domain: 'amazon.com' },
  { id: 8, name: 'CGI', industry: 'Consulting', rating: 4.0, reviews: 63, domain: 'cgi.com' },
  { id: 9, name: 'Bell', industry: 'Technology', rating: 3.9, reviews: 54, domain: 'bell.ca' },
];

export default function CompaniesPage() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCompanies = activeFilter === 'All'
    ? PLACEHOLDER_COMPANIES
    : PLACEHOLDER_COMPANIES.filter((c) => {
        const map: Record<string, string[]> = {
          'Tech': ['Technology'],
          'Finance': ['Finance'],
          'Consulting': ['Consulting'],
          'E-commerce': ['E-commerce'],
          'Gaming': ['Gaming'],
        };
        return map[activeFilter]?.includes(c.industry);
      });

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="relative pt-28 pb-12 px-6" style={{ background: 'linear-gradient(180deg, #F1F5F9 0%, #F8FAFC 100%)' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.12), transparent)' }} />
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-slate-400 hover:text-blue-600 transition-colors text-sm">Home</Link>
            <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-slate-700 text-sm font-medium">{t('common.companies')}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-slate-900 mb-6">
            {t('common.companies')}
          </h1>
          <div className="max-w-xl">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={
                activeFilter === filter
                  ? {
                      background: 'linear-gradient(135deg, #1B365D, #2563EB)',
                      color: 'white',
                      boxShadow: '0 4px 14px -3px rgba(37,99,235,0.35)',
                    }
                  : {
                      background: 'white',
                      color: '#475569',
                      border: '1px solid #E2E8F0',
                    }
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-400 mb-6 font-medium">
          {filteredCompanies.length} companies found
        </p>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.name.toLowerCase().replace(' ', '-')}`}
              className="group bg-white rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ border: '1px solid #E2E8F0' }}>
                  <CompanyLogo name={company.name} domain={company.domain} size={36} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-slate-900 truncate transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-slate-400">{company.industry}</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-4 h-4 ${star <= Math.round(company.rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm tabular-nums">{company.rating}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2.5 py-1 rounded-full">{company.reviews} {t('company.reviews')}</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-500 mb-1 font-medium">No companies found for this filter</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="text-sm font-medium transition-colors mt-2"
              style={{ color: '#2563EB' }}
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Inline CTA */}
        <div className="mt-12 flex items-center justify-center gap-4 py-6">
          <span className="text-slate-400 text-sm">Don&apos;t see your company?</span>
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 font-semibold text-sm transition-colors"
            style={{ color: '#2563EB' }}
          >
            Submit a review
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
