import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '4x4 Installation Gallery | Weca Offroad Work',
  description: 'See our completed 4x4 installations and vehicle builds. Rooftop tents, suspension upgrades, bumper installations, custom builds, and more in Namibia.',
  openGraph: {
    title: '4x4 Installation Gallery | Weca Offroad Work',
    description: 'Real installations, real results. See our completed 4x4 projects in Namibia.',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
