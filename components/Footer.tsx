'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: '#0F172A', color: '#94A3B8' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)' }} />

      <div className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: 'rgba(37,99,235,0.03)' }} />
      <div className="absolute -bottom-40 left-0 w-[300px] h-[300px] rounded-full blur-3xl" style={{ background: 'rgba(14,116,144,0.03)' }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1B365D, #2563EB)',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.2)',
                }}
              >
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-display font-semibold text-xl text-white">
                Rate<span style={{ color: '#60A5FA' }}>My</span>Intern
              </span>
            </div>
            <p className="max-w-sm leading-relaxed mb-6 text-[15px]" style={{ color: '#64748B' }}>
              {t('tagline')}
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', name: 'Facebook' },
                { icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', name: 'Twitter' },
                { icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', name: 'LinkedIn' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  title={social.name}
                >
                  <svg className="w-[18px] h-[18px] transition-colors" viewBox="0 0 24 24" style={{ fill: '#475569' }}>
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-semibold text-white text-sm mb-5 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/companies" className="hover:text-white transition-colors text-[15px]" style={{ color: '#64748B' }}>Companies</Link></li>
              <li><Link href="/submit" className="hover:text-white transition-colors text-[15px]" style={{ color: '#64748B' }}>Submit Review</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors text-[15px]" style={{ color: '#64748B' }}>Search</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-semibold text-white text-sm mb-5 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors text-[15px]" style={{ color: '#64748B' }}>{t('links.about')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors text-[15px]" style={{ color: '#64748B' }}>{t('links.contact')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display font-semibold text-white text-sm mb-5 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="hover:text-white transition-colors text-[15px]" style={{ color: '#64748B' }}>{t('links.privacy')}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors text-[15px]" style={{ color: '#64748B' }}>{t('links.terms')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-sm" style={{ color: '#475569' }}>
            {t('copyright', { year: currentYear })}
          </p>
          <p className="text-sm flex items-center gap-1.5" style={{ color: '#475569' }}>
            Built with care for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
