'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function SuccessPage() {
  const t = useTranslations('submit.success');

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center animate-scale-in">
        {/* Success icon with pulse ring */}
        <div className="relative w-20 h-20 mx-auto mb-7">
          <div className="absolute inset-0 rounded-2xl bg-emerald-100 animate-ping opacity-20" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="font-display text-3xl text-slate-900 mb-3">
          {t('title')}
        </h1>
        <p className="text-slate-500 mb-9 leading-relaxed max-w-sm mx-auto">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/companies"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-indigo-200 hover:bg-indigo-50/50 transition-all text-sm"
          >
            Browse Companies
          </Link>
        </div>
      </div>
    </div>
  );
}
