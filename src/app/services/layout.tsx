import { Metadata } from 'next';
import {
  FAQPageStructuredData,
  ServiceListStructuredData,
  BreadcrumbStructuredData,
} from '@/components/ui/structured-data';
import { services, faqs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Services | 4x4 Fitment & Installation in Namibia',
  description:
    'Professional 4x4 fitment and installation services at Weca Offroad Centre in Swakopmund. Suspension, bumpers, rooftop tents, canopies, dual-battery systems, recovery gear and more. Book a fitment on WhatsApp.',
  openGraph: {
    title: '4x4 Fitment & Installation Services | Weca Offroad Centre',
    description:
      'Professional 4x4 fitment and installation services in Swakopmund, Namibia. Suspension, bumpers, rooftents, canopies, dual-battery, recovery gear and more.',
    type: 'website',
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <ServiceListStructuredData
        services={services.map((s) => ({
          name: s.name,
          description: s.description,
          url: '/services',
          priceFrom: s.startingPrice || undefined,
          category: '4x4 Fitment',
        }))}
      />
      <FAQPageStructuredData faqs={faqs} />
      {children}
    </>
  );
}
