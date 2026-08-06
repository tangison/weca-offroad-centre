import { Metadata } from 'next';
import { BreadcrumbStructuredData, ContactPageStructuredData } from '@/components/ui/structured-data';

export const metadata: Metadata = {
  title: 'Contact Weca Offroad | Get a Quote Namibia',
  description: 'Contact Weca Offroad Centre in Swakopmund for 4x4 accessories and fitment services. Get a quote, product inquiries, or visit our workshop.',
  openGraph: {
    title: 'Contact Weca Offroad | Get a Quote Namibia',
    description: 'Get in touch with Namibia\'s #1 4x4 store. Quotes, inquiries, and visits welcome.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />
      <ContactPageStructuredData />
      {children}
    </>
  );
}
