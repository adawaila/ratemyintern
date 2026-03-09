'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

interface SearchBarProps {
  variant?: 'default' | 'hero';
}

export default function SearchBar({ variant = 'default' }: SearchBarProps) {
  const t = useTranslations('common');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'white',
              boxShadow: '0 20px 50px -12px rgba(0,0,0,0.2)',
            }}
          />
          <div className="relative flex items-center">
            <div className="absolute left-5" style={{ color: '#94A3B8' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t('search')}
              className="w-full pl-14 pr-36 py-[18px] rounded-2xl bg-transparent focus:outline-none text-[15px]"
              style={{ color: '#0F172A' }}
            />
            <button
              type="submit"
              className="absolute right-2.5 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #1B365D, #2563EB)',
                boxShadow: '0 4px 14px -3px rgba(37,99,235,0.35)',
              }}
            >
              {t('searchBtn')}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm font-medium" style={{ color: 'rgba(147,197,253,0.5)' }}>{t('popular')}</span>
          {['Google', 'Shopify', 'Desjardins', 'Microsoft'].map((company) => (
            <button
              key={company}
              type="button"
              onClick={() => {
                setQuery(company);
                router.push(`/search?q=${encodeURIComponent(company)}`);
              }}
              className="text-sm px-3.5 py-1 rounded-full transition-all duration-200"
              style={{
                color: 'rgba(255,255,255,0.65)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {company}
            </button>
          ))}
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative transition-all duration-200 ${isFocused ? 'scale-[1.01]' : ''}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('search')}
          className="input"
          style={{ paddingLeft: '3rem', paddingRight: '6rem' }}
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: '#94A3B8' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all"
          style={{
            background: 'linear-gradient(135deg, #1B365D, #2563EB)',
            boxShadow: '0 2px 8px rgba(37,99,235,0.2)',
          }}
        >
          {t('searchBtn')}
        </button>
      </div>
    </form>
  );
}
