'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * ShopOnly - renders its children on /shop routes only.
 *
 * Client instruction (2026-09-12): construction messaging (banner and
 * footer disclaimer) must appear on the shop page ONLY. Every other page
 * is production-ready and must carry no construction copy.
 *
 * Used by the footer to scope the catalog disclaimer without converting
 * the whole footer to a client component. `usePathname` resolves during
 * static prerender per page, so the correct content is baked into each
 * page's HTML - no client-side flash.
 */
export function ShopOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (!pathname?.startsWith('/shop')) return null;
  return <>{children}</>;
}
