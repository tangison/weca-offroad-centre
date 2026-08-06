import { Metadata } from 'next';
import { BreadcrumbStructuredData } from '@/components/ui/structured-data';

export const metadata: Metadata = {
  title: '4x4 Installation Gallery | Weca Offroad Work',
  description: 'See our completed 4x4 installations and vehicle builds. Rooftop tents, suspension upgrades, bumper installations, custom builds, and more in Namibia.',
  openGraph: {
    title: '4x4 Installation Gallery | Weca Offroad Work',
    description: 'Real installations, real results. See our completed 4x4 projects in Namibia.',
  },
  alternates: {
    canonical: '/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' },
        ]}
      />
      {children}
    </>
  );
}
