import type { Metadata } from 'next';
import { BreadcrumbStructuredData } from '@/components/ui/structured-data';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Legal information for Weca Offroad Centre.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/legal',
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Legal', url: '/legal' },
        ]}
      />
      {/* Slim accent strip - the actual page <h1> lives in each child page
          so that we never render more than one h1 per route. */}
      <div className="h-px bg-[#E67E22]" aria-hidden="true" />
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    </>
  );
}
