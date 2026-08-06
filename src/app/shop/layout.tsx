import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop 4x4 Accessories | Weca Offroad Namibia',
  description: 'Catalog coming soon. Weca Offroad Centre in Swakopmund carries 4x4 accessories from Wildog, Dometic, Tentco, Tough Dog, EcoFlow and more. Message us on WhatsApp for a quote on rooftop tents, suspension, canopies, recovery gear and power.',
  openGraph: {
    title: 'Shop 4x4 Accessories | Weca Offroad Namibia',
    description: 'Catalog coming soon. Message us on WhatsApp for a quote on 4x4 accessories — rooftop tents, suspension, canopies, recovery gear, power and more.',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
