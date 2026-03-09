import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "RateMyIntern - Anonymous Internship Reviews",
    template: "%s | RateMyIntern"
  },
  description: "Read honest, anonymous internship reviews from real students. Find your perfect internship with RateMyIntern.",
  keywords: ["internship", "reviews", "career", "students", "anonymous", "jobs"],
  authors: [{ name: "RateMyIntern" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ratemyintern.com",
    siteName: "RateMyIntern",
    title: "RateMyIntern - Anonymous Internship Reviews",
    description: "Read honest, anonymous internship reviews from real students.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RateMyIntern - Anonymous Internship Reviews",
    description: "Read honest, anonymous internship reviews from real students.",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'fr')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased text-slate-900" style={{ background: '#FAFAF8' }}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
