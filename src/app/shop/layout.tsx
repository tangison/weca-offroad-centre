import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop 4x4 Accessories | Weca Offroad Namibia',
  description: 'Shop quality 4x4 accessories at Weca Offroad. Rooftop tents, suspension systems, bumpers, canopies, lighting, and more. Authorized dealer for Tentco, Front Runner, Tough Dog.',
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
  return <>{children}</>;
}
