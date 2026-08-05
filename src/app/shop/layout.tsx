import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop 4x4 Accessories | Weca Offroad Namibia',
  description: 'Shop 200+ quality 4x4 accessories at Weca Offroad. Rooftop tents, suspension systems, bumpers, canopies, lighting, winches, recovery gear, fridges and more. Authorized dealer for Tentco, Front Runner, Tough Dog, ARB, Warn, Dometic.',
  openGraph: {
    title: 'Shop 4x4 Accessories | Weca Offroad Namibia',
    description: 'Quality 4x4 accessories for your offroad adventures. Rooftop tents, suspension, bumpers, and more.',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
