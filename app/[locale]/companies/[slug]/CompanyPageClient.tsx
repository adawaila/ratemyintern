'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import { getCompanyLogo, type Company, type Review } from '@/lib/supabase';

interface CompanyPageClientProps {
  company: Company;
  reviews: Review[];
}

export default function CompanyPageClient({ company, reviews }: CompanyPageClientProps) {
  const t = useTranslations();

  const recommendPercent = reviews.length > 0
    ? Math.round((reviews.filter(r => r.would_recommend).length / reviews.length) * 100)
    : 0;

  const avgRatings = reviews.length > 0 ? {
    mentorship: reviews.reduce((sum, r) => sum + r.rating_mentorship, 0) / reviews.length,
    workQuality: reviews.reduce((sum, r) => sum + r.rating_work_quality, 0) / reviews.length,
    culture: reviews.reduce((sum, r) => sum + r.rating_culture, 0) / reviews.length,
    compensation: reviews.reduce((sum, r) => sum + r.rating_compensation, 0) / reviews.length,
    returnOffer: reviews.reduce((sum, r) => sum + r.rating_return_offer, 0) / reviews.length,
  } : null;

  const ratingCategories = avgRatings ? [
    { key: 'mentorship', label: t('company.ratings.mentorship'), value: avgRatings.mentorship },
    { key: 'workQuality', label: t('company.ratings.workQuality'), value: avgRatings.workQuality },
    { key: 'culture', label: t('company.ratings.culture'), value: avgRatings.culture },
    { key: 'compensation', label: t('company.ratings.compensation'), value: avgRatings.compensation },
    { key: 'returnOffer', label: t('company.ratings.returnOffer'), value: avgRatings.returnOffer },
  ] : [];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors text-sm">Home</Link>
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/companies" className="text-slate-400 hover:text-slate-600 transition-colors text-sm">{t('common.companies')}</Link>
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-slate-600 text-sm font-medium">{company.name}</span>
        </div>

        {/* Company Header Card */}
        <div className="card p-7 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 ring-1 ring-slate-100">
              {company.domain ? (
                <Image
                  src={getCompanyLogo(company.domain)}
                  alt={`${company.name} logo`}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <span className="text-3xl font-bold text-slate-300">
                  {company.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl text-slate-900 mb-1">
                    {company.name}
                  </h1>
                  {company.industry && (
                    <p className="text-slate-500">{company.industry}</p>
                  )}
                </div>
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.submitReview')}
                </Link>
              </div>

              {/* Overall rating */}
              {company.avg_overall !== null && (
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-slate-900 tabular-nums">
                      {company.avg_overall.toFixed(1)}
                    </span>
                    <div>
                      <StarRating rating={company.avg_overall} size="md" />
                      <p className="text-slate-400 text-xs mt-0.5">
                        {company.review_count} {t('company.reviews')}
                      </p>
                    </div>
                  </div>
                  {reviews.length > 0 && (
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span className="text-sm font-semibold text-emerald-700">{recommendPercent}% {t('company.wouldRecommend')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Rating breakdown */}
          {avgRatings && (
            <div className="mt-8 pt-7 border-t border-slate-100">
              <h3 className="font-display text-lg text-slate-900 mb-5">Rating Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                {ratingCategories.map(({ key, label, value }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-500 font-medium">{label}</p>
                      <span className="text-sm font-bold text-slate-700 tabular-nums">{value.toFixed(1)}</span>
                    </div>
                    <div className="rating-bar">
                      <div className="rating-bar-fill" style={{ width: `${(value / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl text-slate-900">
              {t('home.recentReviews')} ({reviews.length})
            </h2>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-5">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="card p-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium mb-1">{t('company.noReviews')}</p>
              <p className="text-slate-400 text-sm mb-6">Share your experience to help fellow students</p>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all text-sm"
              >
                {t('common.submitReview')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
