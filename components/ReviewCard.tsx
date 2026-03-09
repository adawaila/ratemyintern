'use client';

import { useTranslations } from 'next-intl';
import StarRating from './StarRating';
import type { Review } from '@/lib/supabase';

interface ReviewCardProps {
  review: Review;
  companyName?: string;
  showCompany?: boolean;
}

export default function ReviewCard({ review, companyName, showCompany = false }: ReviewCardProps) {
  const t = useTranslations();

  const averageRating = (
    review.rating_mentorship +
    review.rating_work_quality +
    review.rating_culture +
    review.rating_compensation +
    review.rating_return_offer
  ) / 5;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const ratingColor = (rating: number) => {
    if (rating >= 4) return 'text-emerald-600';
    if (rating >= 3) return 'text-amber-600';
    return 'text-red-500';
  };

  return (
    <div className="card p-6 md:p-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1 min-w-0">
          {showCompany && companyName && (
            <h3 className="font-display font-semibold text-lg text-slate-900 mb-0.5">
              {companyName}
            </h3>
          )}
          <p className="text-slate-800 font-medium">{review.role_title}</p>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1.5 flex-wrap">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{review.city}</span>
            <span className="text-slate-300">|</span>
            <span>{t(`company.seasons.${review.season.toLowerCase()}`)} {review.year}</span>
            {review.is_remote && (
              <>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  {t('review.remote')}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold tabular-nums ${ratingColor(averageRating)}`}>
              {averageRating.toFixed(1)}
            </span>
            <StarRating rating={averageRating} size="sm" />
          </div>
          {review.would_recommend && (
            <span className="badge badge-verified">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Recommended
            </span>
          )}
        </div>
      </div>

      {/* Salary info */}
      {review.pay_amount && review.pay_amount > 0 && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 tag tag-accent">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ${review.pay_amount}
            {review.pay_type === 'hourly' && t('review.hourly')}
            {review.pay_type === 'monthly' && t('review.monthly')}
          </span>
        </div>
      )}

      {/* Review body */}
      <p className="text-slate-600 leading-relaxed mb-5 text-[15px]">{review.body}</p>

      {/* Pros & Cons */}
      {(review.pros || review.cons) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {review.pros && (
            <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-100/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-emerald-800 text-sm">{t('review.pros')}</h4>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">{review.pros}</p>
            </div>
          )}
          {review.cons && (
            <div className="bg-red-50/70 rounded-xl p-4 border border-red-100/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-red-800 text-sm">{t('review.cons')}</h4>
              </div>
              <p className="text-red-700 text-sm leading-relaxed">{review.cons}</p>
            </div>
          )}
        </div>
      )}

      {/* Ratings breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5 pt-5 border-t border-slate-100">
        {[
          { key: 'mentorship', value: review.rating_mentorship },
          { key: 'workQuality', value: review.rating_work_quality },
          { key: 'culture', value: review.rating_culture },
          { key: 'compensation', value: review.rating_compensation },
          { key: 'returnOffer', value: review.rating_return_offer },
        ].map(({ key, value }) => (
          <div key={key}>
            <p className="text-xs text-slate-400 mb-1.5 font-medium">{t(`company.ratings.${key}`)}</p>
            <div className="flex items-center gap-1.5">
              <div className="rating-bar flex-1">
                <div className="rating-bar-fill" style={{ width: `${(value / 5) * 100}%` }} />
              </div>
              <span className="text-xs font-semibold text-slate-600 tabular-nums w-4 text-right">{value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-sm">
        <div className="flex items-center gap-3 text-slate-400">
          {review.school && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              {review.school}
            </span>
          )}
          <span>{formatDate(review.created_at)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-blue-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="text-xs font-medium">{t('common.helpful')}</span>
            {review.helpful_count > 0 && <span className="text-xs">({review.helpful_count})</span>}
          </button>
          <button className="text-slate-400 hover:text-red-500 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-xs font-medium">
            {t('common.report')}
          </button>
        </div>
      </div>
    </div>
  );
}
