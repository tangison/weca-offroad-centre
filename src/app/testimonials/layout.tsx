import { Metadata } from 'next';
import { BreadcrumbStructuredData } from '@/components/ui/structured-data';

export const metadata: Metadata = {
  title: 'Customer Reviews | Weca Offroad Centre',
  description: 'Read what our customers say about Weca Offroad Centre. Honest reviews from 4x4 enthusiasts in Namibia. Quality products and professional service.',
  openGraph: {
    title: 'Customer Reviews | Weca Offroad Centre',
    description: 'Real reviews from satisfied customers. See why we are Namibia\'s #1 4x4 store.',
  },
  alternates: {
    canonical: '/testimonials',
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Reviews', url: '/testimonials' },
        ]}
      />
      {children}
    </>
  );
}
