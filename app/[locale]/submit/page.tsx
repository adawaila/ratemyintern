'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { isValidUniversityEmail } from '@/lib/validation';

const STEPS = ['company', 'details', 'ratings', 'review'] as const;

export default function SubmitPage() {
  const t = useTranslations('submit');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidUniversityEmail(email)) {
      setError(t('email.hint'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send magic link');
      }

      setIsSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4" style={{ background: '#F8FAFC' }}>
        <div className="max-w-md w-full text-center animate-scale-in">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' }}
          >
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl text-slate-900 mb-3">
            {t('email.sent')}
          </h1>
          <p className="text-slate-500 leading-relaxed">
            {t('email.sentDescription', { email })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4" style={{ background: '#F8FAFC' }}>
      <div className="max-w-md w-full py-20">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{
              background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
              border: '1px solid rgba(37,99,235,0.1)',
            }}
          >
            <svg className="w-8 h-8" style={{ color: '#2563EB' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-slate-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-slate-500 text-[15px]">
            {t('subtitle')}
          </p>
        </div>

        <div
          className="bg-white rounded-2xl p-7"
          style={{
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              {t('email.label')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email.placeholder')}
              className="input mb-2"
              required
            />
            <p className="text-sm text-slate-400 mb-5">
              {t('email.hint')}
            </p>

            {error && (
              <div className="px-4 py-3 rounded-xl mb-5 text-sm flex items-start gap-2"
                style={{ background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}>
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-[15px] text-white"
              style={{
                background: 'linear-gradient(135deg, #1B365D, #2563EB)',
                boxShadow: '0 4px 14px -3px rgba(37,99,235,0.35)',
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                t('email.button')
              )}
            </button>
          </form>
        </div>

        <div className="mt-12">
          <h3 className="text-xs font-semibold text-slate-400 mb-6 text-center uppercase tracking-wider">
            How it works
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {STEPS.map((step, i) => (
              <div key={step} className="text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-sm font-bold"
                  style={
                    i === 0
                      ? {
                          background: 'linear-gradient(135deg, #1B365D, #2563EB)',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                        }
                      : {
                          background: 'white',
                          color: '#94A3B8',
                          border: '2px solid #E2E8F0',
                        }
                  }
                >
                  {i + 1}
                </div>
                <p className={`text-xs font-medium`} style={{ color: i === 0 ? '#2563EB' : '#94A3B8' }}>
                  {t(`steps.${step}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
