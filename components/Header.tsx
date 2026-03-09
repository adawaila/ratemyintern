'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          isTransparent
            ? { background: 'transparent' }
            : {
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }
        }
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={
                  isTransparent
                    ? {
                        background: 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }
                    : {
                        background: 'linear-gradient(135deg, #1B365D, #2563EB)',
                        boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                      }
                }
              >
                <span className="text-white font-bold text-base">R</span>
              </div>
              <span className={`font-display font-semibold text-lg tracking-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-slate-900'
              }`}>
                Rate<span style={{ color: isTransparent ? '#93C5FD' : '#2563EB' }}>My</span>Intern
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/companies"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={
                  isTransparent
                    ? { color: 'rgba(255,255,255,0.8)' }
                    : pathname === '/companies'
                      ? { color: '#2563EB', background: '#EFF6FF' }
                      : { color: '#475569' }
                }
              >
                {t('companies')}
              </Link>

              <Link
                href="/submit"
                className="ml-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={
                  isTransparent
                    ? {
                        background: 'white',
                        color: '#1B365D',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                      }
                    : {
                        background: 'linear-gradient(135deg, #1B365D, #2563EB)',
                        color: 'white',
                        boxShadow: '0 4px 14px -3px rgba(37,99,235,0.35)',
                      }
                }
              >
                {t('submitReview')}
              </Link>

              <div className="w-px h-6 mx-2" style={{ background: isTransparent ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }} />

              <button
                onClick={switchLocale}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${
                  isTransparent
                    ? 'text-white/65 hover:text-white hover:bg-white/10'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
                title={t('language')}
              >
                <span className="text-base">{locale === 'en' ? '🇫🇷' : '🇬🇧'}</span>
                <span>{locale === 'en' ? 'FR' : 'EN'}</span>
              </button>
            </nav>

            <button
              className={`md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 w-[300px] h-full bg-white animate-slide-in" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <span className="font-display font-semibold text-lg text-slate-900">
                Rate<span style={{ color: '#2563EB' }}>My</span>Intern
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-6 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <Link
                href="/companies"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {t('companies')}
              </Link>
              <div className="pt-4">
                <Link
                  href="/submit"
                  className="flex items-center justify-center gap-2 w-full text-white px-4 py-3.5 rounded-xl font-semibold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #1B365D, #2563EB)',
                    boxShadow: '0 4px 14px -3px rgba(37,99,235,0.35)',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('submitReview')}
                </Link>
              </div>
              <div className="pt-4 mt-4" style={{ borderTop: '1px solid #F1F5F9' }}>
                <button
                  onClick={() => {
                    switchLocale();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors w-full"
                >
                  <span className="text-xl">{locale === 'en' ? '🇫🇷' : '🇬🇧'}</span>
                  <span>{locale === 'en' ? 'Passer en Français' : 'Switch to English'}</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
