'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import StarRating from './StarRating';
import { getCompanyLogo, type Company } from '@/lib/supabase';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const t = useTranslations('company');

  return (
    <Link
      href={`/companies/${company.slug}`}
      className="card-interactive p-5 group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0 transition-all" style={{ border: '1px solid #E2E8F0' }}>
          {company.domain ? (
            <Image
              src={getCompanyLogo(company.domain)}
              alt={`${company.name} logo`}
              width={48}
              height={48}
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<span class="text-lg font-bold text-slate-300">${company.name.charAt(0)}</span>`;
              }}
            />
          ) : (
            <span className="text-lg font-bold text-slate-300">
              {company.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
            {company.name}
          </h3>
          {company.industry && (
            <p className="text-sm text-slate-400 truncate">
              {company.industry}
            </p>
          )}
        </div>
        <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {company.avg_overall !== null ? (
            <>
              <StarRating rating={company.avg_overall} size="sm" />
              <span className="text-sm font-semibold text-slate-700 tabular-nums">
                {company.avg_overall.toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-sm text-slate-400 italic">No ratings yet</span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2.5 py-1 rounded-full">
          {company.review_count} {t('reviews')}
        </span>
      </div>
    </Link>
  );
}
