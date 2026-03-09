'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export default function VerifyPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error('Verification failed');
        }

        setStatus('success');

        setTimeout(() => {
          router.push('/submit/review');
        }, 2000);
      } catch {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {status === 'verifying' && (
          <div className="animate-fade-in">
            <div className="relative w-16 h-16 mx-auto mb-7">
              <div className="absolute inset-0 rounded-2xl border-4 border-slate-100" />
              <div className="absolute inset-0 rounded-2xl border-4 border-indigo-600 border-t-transparent animate-spin" />
            </div>
            <h1 className="font-display text-2xl text-slate-900">
              {t('verifying')}
            </h1>
          </div>
        )}

        {status === 'success' && (
          <div className="animate-scale-in">
            <div className="relative w-16 h-16 mx-auto mb-7">
              <div className="absolute inset-0 rounded-2xl bg-emerald-100 animate-ping opacity-20" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="font-display text-2xl text-slate-900 mb-2">
              {t('success')}
            </h1>
          </div>
        )}

        {status === 'error' && (
          <div className="animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mx-auto mb-7">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-display text-2xl text-slate-900 mb-2">
              {t('error')}
            </h1>
            <p className="text-slate-500 mb-7">
              {t('errorDescription')}
            </p>
            <a
              href="/submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all text-sm"
            >
              Request New Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
