import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Legal information for Weca Offroad Centre.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        title="Legal Information"
        subtitle="How we handle your information, the terms that apply to our services, and the cookies used by this website."
      />
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    </>
  );
}
