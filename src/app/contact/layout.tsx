import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Weca Offroad | Get a Quote Namibia',
  description: 'Contact Weca Offroad Centre in Swakopmund for 4x4 accessories and fitment services. Get a quote, product inquiries, or visit our workshop.',
  openGraph: {
    title: 'Contact Weca Offroad | Get a Quote Namibia',
    description: 'Get in touch with Namibia\'s #1 4x4 store. Quotes, inquiries, and visits welcome.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
