'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect } from 'react';

function CompanyLogo({ name, domain, size = 36 }: { name: string; domain: string; size?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed || !domain) {
    return (
      <span className="text-lg font-bold text-slate-400">{name.charAt(0)}</span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://img.logo.dev/${domain}?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&size=80&format=png`}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function FloatingReviewCard({
  company,
  role,
  rating,
  quote,
  position,
  delay = 0,
  domain,
}: {
  company: string;
  role: string;
  rating: number;
  quote: string;
  position: string;
  delay?: number;
  domain: string;
}) {
  return (
    <div
      className={`absolute ${position} rounded-2xl p-5 max-w-[260px] animate-float opacity-0`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center overflow-hidden shadow-sm">
          <CompanyLogo name={company} domain={domain} size={32} />
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{company}</p>
          <p className="text-xs text-blue-200/60">{role}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-blue-100/70 text-[13px] leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}

function StatCounter({ value, label, suffix = '', icon }: { value: string; label: string; suffix?: string; icon: React.ReactNode }) {
  return (
    <div className="text-center group">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {icon}
      </div>
      <div className="number-display text-3xl md:text-4xl text-white mb-1">
        {value}<span style={{ color: '#93C5FD' }}>{suffix}</span>
      </div>
      <p className="text-sm font-medium" style={{ color: 'rgba(148,197,253,0.6)' }}>{label}</p>
    </div>
  );
}

function HowItWorksStep({ number, title, description, icon }: { number: number; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="relative text-center group">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
          border: '1px solid rgba(37,99,235,0.1)',
        }}
      >
        {icon}
      </div>
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1B365D, #2563EB)',
          boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
        }}
      >
        {number}
      </div>
      <h3 className="font-display text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] mx-auto">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const companies = [
    { name: 'Google', industry: 'Technology', rating: 4.8, reviews: 234, domain: 'google.com' },
    { name: 'Shopify', industry: 'E-commerce', rating: 4.7, reviews: 189, domain: 'shopify.com' },
    { name: 'Desjardins', industry: 'Finance', rating: 4.5, reviews: 156, domain: 'desjardins.com' },
    { name: 'Microsoft', industry: 'Technology', rating: 4.6, reviews: 201, domain: 'microsoft.com' },
    { name: 'Ubisoft', industry: 'Gaming', rating: 4.3, reviews: 98, domain: 'ubisoft.com' },
    { name: 'National Bank', industry: 'Finance', rating: 4.4, reviews: 87, domain: 'nbc.ca' },
  ];

  const reviews = [
    {
      company: 'Google',
      role: 'Software Engineering Intern',
      rating: 5,
      date: '2 days ago',
      domain: 'google.com',
      body: "Incredible experience! The mentorship program is top-notch. My host was always available and I got to work on a real product that millions of users interact with. The intern events were also amazing.",
      recommend: true,
      tags: ['Great Mentorship', 'Real Impact', 'Good Pay'],
    },
    {
      company: 'Desjardins',
      role: 'Data Analyst Intern',
      rating: 4,
      domain: 'desjardins.com',
      body: "Solid internship with great work-life balance. The team was welcoming and I learned a lot about the financial industry. Only downside was some legacy tech stack.",
      date: '1 week ago',
      recommend: true,
      tags: ['Work-Life Balance', 'Learning'],
    },
    {
      company: 'Shopify',
      role: 'Product Design Intern',
      rating: 5,
      domain: 'shopify.com',
      body: "Best internship ever. The design team is world-class and they treat interns like full-time employees. Got to ship features that are now used by thousands of merchants!",
      date: '2 weeks ago',
      recommend: true,
      tags: ['Great Culture', 'Real Impact', 'Growth'],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="grain" />

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="blob w-[600px] h-[600px] -top-40 -right-40" style={{ background: 'rgba(30,58,138,0.3)' }} />
        <div className="blob w-[400px] h-[400px] bottom-20 -left-20" style={{ animationDelay: '-5s', background: 'rgba(14,116,144,0.15)' }} />
        <div className="blob w-[300px] h-[300px] top-1/2 left-1/3" style={{ animationDelay: '-10s', background: 'rgba(37,99,235,0.12)' }} />
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div className={mounted ? 'animate-fade-up' : 'opacity-0'}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-sm font-medium" style={{ color: 'rgba(219,234,254,0.9)' }}>100% Anonymous Reviews</span>
            </div>

            <h1 className="font-display text-[3.25rem] md:text-6xl lg:text-[4.25rem] text-white mb-7 leading-[1.08]">
              {t('home.hero.title').split(' ').map((word, i) => (
                <span key={i} className={i === 2 ? '' : ''} style={i === 2 ? { color: '#93C5FD' } : undefined}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="text-lg mb-9 max-w-lg leading-relaxed" style={{ color: 'rgba(191,219,254,0.65)' }}>
              {t('home.hero.subtitle')}
            </p>

            <div className={`max-w-xl mb-8 ${mounted ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
              <SearchBar variant="hero" />
            </div>

            <div className={`flex flex-col sm:flex-row gap-3 ${mounted ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
              <Link
                href="/companies"
                className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: 'white',
                  color: '#1B365D',
                  boxShadow: '0 8px 30px -5px rgba(0,0,0,0.2)',
                }}
              >
                {t('home.hero.cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {t('home.hero.submitCta')}
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block h-[480px]">
            <FloatingReviewCard
              company="Google"
              role="SWE Intern"
              rating={5}
              quote="Best mentorship I've ever had. Learned more in 4 months than a year of school."
              position="top-0 right-0"
              delay={0.5}
              domain="google.com"
            />
            <FloatingReviewCard
              company="Desjardins"
              role="Data Analyst"
              rating={4}
              quote="Great work-life balance and really interesting projects in fintech."
              position="top-36 left-0"
              delay={0.8}
              domain="desjardins.com"
            />
            <FloatingReviewCard
              company="Shopify"
              role="Product Design"
              rating={5}
              quote="The culture is incredible. They really trust interns with real work."
              position="bottom-4 right-8"
              delay={1.1}
              domain="shopify.com"
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/12 flex items-start justify-center p-1.5">
            <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1B365D 50%, #0F172A 100%)' }}>
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCounter
              value="2,500"
              label="Reviews"
              suffix="+"
              icon={<svg className="w-6 h-6" style={{ color: '#60A5FA' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
            />
            <StatCounter
              value="850"
              label="Companies"
              suffix="+"
              icon={<svg className="w-6 h-6" style={{ color: '#60A5FA' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />
            <StatCounter
              value="92"
              label="Recommend"
              suffix="%"
              icon={<svg className="w-6 h-6" style={{ color: '#34D399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>}
            />
            <StatCounter
              value="45"
              label="Universities"
              suffix="+"
              icon={<svg className="w-6 h-6" style={{ color: '#93C5FD' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}
            />
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
              style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', color: '#2563EB' }}>
              Simple Process
            </div>
            <h2 className="font-display text-3xl md:text-[2.75rem] text-slate-900 leading-tight">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            <HowItWorksStep
              number={1}
              title="Verify Your Email"
              description="Use your university email to get a magic link. No password needed."
              icon={<svg className="w-7 h-7" style={{ color: '#2563EB' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            />
            <HowItWorksStep
              number={2}
              title="Rate & Review"
              description="Share your internship experience across 5 rating categories."
              icon={<svg className="w-7 h-7" style={{ color: '#0D9488' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
            />
            <HowItWorksStep
              number={3}
              title="Help Students"
              description="Your anonymous review helps thousands pick the right internship."
              icon={<svg className="w-7 h-7" style={{ color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
          </div>
        </div>
      </section>

      {/* ==================== TOP COMPANIES ==================== */}
      <section className="py-24 px-6" style={{ background: '#F8FAFC' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', color: '#2563EB' }}>
                Discover
              </div>
              <h2 className="font-display text-3xl md:text-[2.75rem] text-slate-900 leading-tight">
                {t('home.topCompanies')}
              </h2>
            </div>
            <Link
              href="/companies"
              className="group flex items-center gap-2 font-semibold text-sm transition-colors"
              style={{ color: '#2563EB' }}
            >
              {t('home.viewAll')}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {companies.map((company, i) => (
              <Link
                key={company.name}
                href={`/companies/${company.name.toLowerCase().replace(' ', '-')}`}
                className={`group bg-white rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
                style={{
                  animationDelay: `${0.08 * i}s`,
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0"
                    style={{ border: '1px solid #E2E8F0' }}>
                    <CompanyLogo name={company.name} domain={company.domain} size={36} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg text-slate-900 transition-colors truncate" style={{ }}
                    >
                      {company.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{company.industry}</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-300 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" style={{ color: '#CBD5E1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= Math.round(company.rating) ? 'text-amber-400' : 'text-slate-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm tabular-nums">{company.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2.5 py-1 rounded-full">{company.reviews} {t('company.reviews')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RECENT REVIEWS ==================== */}
      <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
              style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', color: '#92400E' }}>
              Fresh Takes
            </div>
            <h2 className="font-display text-3xl md:text-[2.75rem] text-slate-900 leading-tight">
              {t('home.recentReviews')}
            </h2>
          </div>

          <div className="space-y-5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 md:p-7 transition-all duration-300 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
                style={{
                  animationDelay: `${0.12 * i}s`,
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{ border: '1px solid #E2E8F0' }}>
                      <CompanyLogo name={review.company} domain={review.domain} size={32} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-slate-900">{review.company}</h3>
                      <p className="text-slate-500 text-sm">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-slate-400 text-xs font-medium">{review.date}</span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-4 text-[15px]">{review.body}</p>

                <div className="flex flex-wrap items-center gap-2">
                  {review.recommend && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide"
                      style={{ background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)', color: '#047857' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Recommended
                    </span>
                  )}
                  {review.tags.map((tag) => (
                    <span key={tag} className="tag text-[11px]">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1B365D 35%, #0F172A 70%, #0D2137 100%)',
        }} />
        <div className="blob w-[400px] h-[400px] -top-20 -right-20" style={{ background: 'rgba(30,58,138,0.12)' }} />
        <div className="blob w-[300px] h-[300px] bottom-0 -left-20" style={{ animationDelay: '-7s', background: 'rgba(14,116,144,0.08)' }} />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />

        <div className="relative max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium" style={{ color: 'rgba(219,234,254,0.7)' }}>Your voice matters</span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
            {t('submit.title')}
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(148,197,253,0.5)' }}>
            {t('submit.subtitle')}
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: 'white',
              color: '#1B365D',
              boxShadow: '0 8px 30px -5px rgba(0,0,0,0.25)',
            }}
          >
            {t('common.submitReview')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
