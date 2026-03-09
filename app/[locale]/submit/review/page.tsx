'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import StarRating from '@/components/StarRating';

type Step = 1 | 2 | 3 | 4;

interface FormData {
  company_id?: string;
  company_name: string;
  role_title: string;
  role_type: string;
  year: number;
  season: string;
  city: string;
  is_remote: boolean;
  pay_amount: number | null;
  pay_type: string | null;
  rating_mentorship: number;
  rating_work_quality: number;
  rating_culture: number;
  rating_compensation: number;
  rating_return_offer: number;
  would_recommend: boolean;
  received_offer: boolean | null;
  body: string;
  pros: string;
  cons: string;
  school: string;
}

export default function ReviewFormPage() {
  const t = useTranslations('submit');
  const locale = useLocale();
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState<FormData>({
    company_name: '',
    role_title: '',
    role_type: 'SWE',
    year: currentYear,
    season: 'Summer',
    city: '',
    is_remote: false,
    pay_amount: null,
    pay_type: 'hourly',
    rating_mentorship: 0,
    rating_work_quality: 0,
    rating_culture: 0,
    rating_compensation: 0,
    rating_return_offer: 0,
    would_recommend: true,
    received_offer: null,
    body: '',
    pros: '',
    cons: '',
    school: '',
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          language: locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      router.push('/submit/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.company_name.length >= 2;
      case 2:
        return formData.role_title.length >= 2 && formData.city.length >= 2;
      case 3:
        return (
          formData.rating_mentorship > 0 &&
          formData.rating_work_quality > 0 &&
          formData.rating_culture > 0 &&
          formData.rating_compensation > 0 &&
          formData.rating_return_offer > 0
        );
      case 4:
        return formData.body.length >= 50;
      default:
        return false;
    }
  };

  const steps = ['company', 'details', 'ratings', 'review'] as const;

  const stepIcons = [
    <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    <svg key="4" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 flex-shrink-0 ${
                    i + 1 <= step
                      ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                      : i + 1 === step + 1
                        ? 'bg-indigo-50 text-indigo-400 border-2 border-indigo-200'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {i + 1 < step ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepIcons[i]
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div className={`h-[3px] rounded-full transition-colors duration-500 ${
                      i + 1 < step ? 'bg-gradient-to-r from-indigo-600 to-violet-600' : 'bg-slate-100'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {steps.map((s, i) => (
              <span key={s} className={`text-xs font-medium transition-colors ${
                i + 1 <= step ? 'text-indigo-600' : 'text-slate-400'
              }`} style={{ width: `${100 / steps.length}%`, textAlign: i === 0 ? 'left' : i === steps.length - 1 ? 'right' : 'center' }}>
                {t(`steps.${s}`)}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card p-7 md:p-8">
          {/* Step 1: Company */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-xl text-slate-900 mb-6">
                {t('form.selectCompany')}
              </h2>
              <div>
                <label className="input-label">
                  {t('form.companyName')}
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value)}
                  className="input"
                  placeholder="e.g., Google, Microsoft, Desjardins..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="font-display text-xl text-slate-900 mb-6">
                {t('steps.details')}
              </h2>

              <div>
                <label className="input-label">{t('form.roleTitle')}</label>
                <input
                  type="text"
                  value={formData.role_title}
                  onChange={(e) => updateField('role_title', e.target.value)}
                  className="input"
                  placeholder="e.g., Software Engineering Intern"
                />
              </div>

              <div>
                <label className="input-label">{t('form.roleType')}</label>
                <select
                  value={formData.role_type}
                  onChange={(e) => updateField('role_type', e.target.value)}
                  className="input"
                >
                  {['swe', 'design', 'finance', 'marketing', 'data', 'other'].map((type) => (
                    <option key={type} value={type.toUpperCase()}>
                      {t(`roleTypes.${type}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">{t('form.year')}</label>
                  <select
                    value={formData.year}
                    onChange={(e) => updateField('year', parseInt(e.target.value))}
                    className="input"
                  >
                    {Array.from({ length: 10 }, (_, i) => currentYear - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label">{t('form.season')}</label>
                  <select
                    value={formData.season}
                    onChange={(e) => updateField('season', e.target.value)}
                    className="input"
                  >
                    <option value="Winter">Winter</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="input-label">{t('form.city')}</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="input"
                  placeholder="e.g., Montreal, Toronto..."
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`relative w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                  formData.is_remote ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'
                }`}>
                  {formData.is_remote && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <input
                    type="checkbox"
                    checked={formData.is_remote}
                    onChange={(e) => updateField('is_remote', e.target.checked)}
                    className="sr-only"
                  />
                </div>
                <span className="text-sm text-slate-700 font-medium">{t('form.isRemote')}</span>
              </label>

              <div>
                <label className="input-label">{t('form.salary')}</label>
                <div className="flex gap-2">
                  <span className="input py-3 px-3 w-auto bg-slate-50 text-slate-400 font-medium">$</span>
                  <input
                    type="number"
                    value={formData.pay_amount || ''}
                    onChange={(e) => updateField('pay_amount', e.target.value ? parseInt(e.target.value) : null)}
                    className="input flex-1"
                    placeholder={t('form.salaryPlaceholder')}
                  />
                  <span className="input py-3 px-3 w-auto bg-slate-50 text-slate-400 font-medium">/hr</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Ratings */}
          {step === 3 && (
            <div className="space-y-7 animate-fade-in">
              <h2 className="font-display text-xl text-slate-900 mb-2">
                {t('steps.ratings')}
              </h2>
              <p className="text-sm text-slate-400 -mt-5 mb-4">Rate each category from 1 to 5 stars</p>

              {[
                { key: 'rating_mentorship', label: 'Mentorship', desc: 'Quality of guidance and support' },
                { key: 'rating_work_quality', label: 'Work Quality', desc: 'Meaningful and impactful projects' },
                { key: 'rating_culture', label: 'Culture', desc: 'Team environment and inclusion' },
                { key: 'rating_compensation', label: 'Compensation', desc: 'Fair pay and benefits' },
                { key: 'rating_return_offer', label: 'Return Offer', desc: 'Likelihood of getting an offer' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-100">
                  <div>
                    <span className="font-medium text-slate-800 text-[15px]">{label}</span>
                    <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                  </div>
                  <StarRating
                    rating={formData[key as keyof FormData] as number}
                    size="lg"
                    interactive
                    onChange={(value) => updateField(key as keyof FormData, value)}
                  />
                </div>
              ))}

              <div className="pt-5 border-t border-slate-100 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`relative w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                    formData.would_recommend ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'
                  }`}>
                    {formData.would_recommend && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <input
                      type="checkbox"
                      checked={formData.would_recommend}
                      onChange={(e) => updateField('would_recommend', e.target.checked)}
                      className="sr-only"
                    />
                  </div>
                  <span className="font-medium text-slate-700 text-[15px]">{t('form.wouldRecommend')}</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`relative w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                    formData.received_offer === true ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'
                  }`}>
                    {formData.received_offer === true && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <input
                      type="checkbox"
                      checked={formData.received_offer === true}
                      onChange={(e) => updateField('received_offer', e.target.checked ? true : null)}
                      className="sr-only"
                    />
                  </div>
                  <span className="font-medium text-slate-700 text-[15px]">{t('form.receivedOffer')}</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="font-display text-xl text-slate-900 mb-6">
                {t('steps.review')}
              </h2>

              <div>
                <label className="input-label">{t('form.body')} *</label>
                <textarea
                  value={formData.body}
                  onChange={(e) => updateField('body', e.target.value)}
                  rows={5}
                  className="input resize-none"
                  placeholder={t('form.bodyPlaceholder')}
                />
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-xs text-slate-400">
                    {formData.body.length < 50 && formData.body.length > 0
                      ? `${50 - formData.body.length} more characters needed`
                      : 'Minimum 50 characters'
                    }
                  </p>
                  <p className={`text-xs font-medium tabular-nums ${formData.body.length >= 50 ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {formData.body.length}/2000
                  </p>
                </div>
              </div>

              <div>
                <label className="input-label">{t('form.pros')}</label>
                <textarea
                  value={formData.pros}
                  onChange={(e) => updateField('pros', e.target.value)}
                  rows={2}
                  className="input resize-none"
                  placeholder={t('form.prosPlaceholder')}
                />
              </div>

              <div>
                <label className="input-label">{t('form.cons')}</label>
                <textarea
                  value={formData.cons}
                  onChange={(e) => updateField('cons', e.target.value)}
                  rows={2}
                  className="input resize-none"
                  placeholder={t('form.consPlaceholder')}
                />
              </div>

              <div>
                <label className="input-label">{t('form.school')}</label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => updateField('school', e.target.value)}
                  className="input"
                  placeholder="e.g., McGill University"
                />
                <p className="text-xs text-slate-400 mt-1.5">{t('form.schoolHint')}</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm border border-red-100 flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="flex items-center gap-2 px-5 py-2.5 text-slate-500 font-medium hover:text-slate-700 transition-colors rounded-xl hover:bg-slate-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => (s + 1) as Step)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none text-sm"
              >
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none text-sm"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t('form.submitting')}
                  </>
                ) : (
                  <>
                    {t('form.submit')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
