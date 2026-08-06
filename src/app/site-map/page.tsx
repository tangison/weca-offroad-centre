import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/ui/page-hero';
import { siteConfig } from '@/lib/config';
import { shopCategories } from '@/lib/data';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: `Complete map of every page on the ${siteConfig.business.name} website.`,
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/site-map',
  },
};

type PageEntry = {
  href: string;
  title: string;
  description: string;
  category: 'Main' | 'Shop' | 'Legal' | 'System';
};

const pages: PageEntry[] = [
  {
    href: '/',
    title: 'Home',
    description: 'The workshop in Swakopmund, the brands we carry, real Google reviews, and the brands we sell.',
    category: 'Main',
  },
  {
    href: '/about',
    title: 'About',
    description: 'Who we are, the workshop, our history, and our live Facebook feed.',
    category: 'Main',
  },
  {
    href: '/shop',
    title: 'Shop',
    description: 'Catalog coming soon. Message us on WhatsApp for a quote on any 4x4 accessory.',
    category: 'Main',
  },
  {
    href: '/gallery',
    title: 'Gallery',
    description: 'Real workshop photographs of fitment work we have done for customers.',
    category: 'Main',
  },
  {
    href: '/services',
    title: 'Services',
    description: 'Suspension, bumpers, canopies, recovery, power, exhausts, audio. The full fitment service.',
    category: 'Main',
  },
  {
    href: '/testimonials',
    title: 'Reviews',
    description: 'Live Google Reviews for Weca Offroad Centre, pulled directly from Google Maps.',
    category: 'Main',
  },
  {
    href: '/faq',
    title: 'FAQ',
    description: 'Common questions about 4x4 fitment, warranties, payments, and bookings at Weca Offroad.',
    category: 'Main',
  },
  {
    href: '/thank-you',
    title: 'Thank You',
    description: 'Confirmation page shown after the contact form is submitted.',
    category: 'System',
  },
  {
    href: '/contact',
    title: 'Contact',
    description: 'Send a WhatsApp, email, or call the workshop. Map and directions to Swakopmund Industrial.',
    category: 'Main',
  },
  {
    href: '/legal/privacy',
    title: 'Privacy Policy',
    description: 'How we handle the information you give us when you contact us or visit the workshop.',
    category: 'Legal',
  },
  {
    href: '/legal/terms',
    title: 'Terms of Service',
    description: 'The terms that apply when you order, quote, or fit a product through us.',
    category: 'Legal',
  },
  {
    href: '/legal/cookies',
    title: 'Cookie Policy',
    description: 'Which cookies this site sets, which are set by embedded Google and Facebook content, and how to control them.',
    category: 'Legal',
  },
  {
    href: '/sitemap.xml',
    title: 'sitemap.xml',
    description: 'Machine-readable sitemap for crawlers (currently not referenced from robots.txt while the site is private).',
    category: 'System',
  },
  {
    href: '/robots.txt',
    title: 'robots.txt',
    description: 'Crawler policy. Currently disallows all crawling while the site is private.',
    category: 'System',
  },
];

const categories: PageEntry['category'][] = ['Main', 'Shop', 'Legal', 'System'];

const categoryLabels: Record<PageEntry['category'], string> = {
  Main: 'Pages',
  Shop: 'Shop Categories',
  Legal: 'Legal',
  System: 'System Files',
};

export default function SitemapPage() {
  return (
    <>
      <PageHero
        title="Every page on this site"
        subtitle="A complete, human-readable list of every route, legal page, and system file on the Weca Offroad Centre website."
      />

      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {categories.map((category) => {
            const entries =
              category === 'Shop'
                ? shopCategories
                    .filter((c) => c.id !== 'all')
                    .map((c) => ({
                      href: c.href,
                      title: c.name,
                      description: `Browse our ${c.name.toLowerCase()} range. Message us on WhatsApp for current stock and pricing.`,
                      category: 'Shop' as const,
                    }))
                : pages.filter((p) => p.category === category);

            if (entries.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] mb-6 pb-2 border-b border-[#2A2A2A]">
                  {categoryLabels[category]}
                </h2>
                <ul className="space-y-4">
                  {entries.map((entry) => {
                    const isExternal = entry.href.endsWith('.xml') || entry.href.endsWith('.txt');
                    return (
                      <li key={entry.href}>
                        <Link
                          href={entry.href}
                          className="group flex items-start justify-between gap-4 p-4 border border-[#2A2A2A] hover:border-[#E67E22] transition-colors bg-[#0D0D0D] hover:bg-[#1A1A1A]"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-accent text-sm uppercase tracking-wider text-[#F5F5F5] group-hover:text-[#E67E22] transition-colors">
                                {entry.title}
                              </span>
                              <code className="text-[10px] font-mono text-muted-foreground bg-[#1A1A1A] px-1.5 py-0.5 rounded">
                                {entry.href}
                              </code>
                              {isExternal && (
                                <ExternalLink className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {entry.description}
                            </p>
                          </div>
                          <ArrowRight
                            className="w-5 h-5 text-muted-foreground group-hover:text-[#E67E22] group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}

          <section className="pt-8 border-t border-[#2A2A2A]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Looking for something specific?
                </p>
                <p className="text-[#F5F5F5] text-sm font-medium">
                  Message us on WhatsApp and we will point you to the right page.
                </p>
              </div>
              <Link
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm px-5 py-3 transition-colors"
              >
                WhatsApp Us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
