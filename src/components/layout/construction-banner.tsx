'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config';

/**
 * Construction Banner - slim, non-dismissible header strip, SHOP ONLY.
 *
 * Client instruction (2026-09-12): the "under construction" notice must
 * appear on the /shop page ONLY. The shop is the single unfinished part of
 * the site (the product catalog is pending the client's real stock data),
 * so the notice lives there and nowhere else. Every other page ships
 * production-ready with zero construction messaging.
 *
 * Renders above the nav row inside the fixed <header> in navbar.tsx.
 * Two conditions must hold:
 *   1. The master flag `siteConfig.features.underConstruction` (src/lib/config.ts)
 *      - flipping it to false removes the banner everywhere in one edit.
 *   2. The current route is a /shop route (covers /shop and /shop?category=...).
 *
 * Design:
 *   - Slim strip (py-1.5), not a large intrusive banner.
 *   - Orange bg (#E67E22) with dark text (#0D0D0D) - high contrast, on-brand.
 *   - Not dismissible - no close button. Stays visible for the whole visit.
 *   - "Tangison Studio" links to https://studio.tangison.com (matches footer).
 *   - Text sizes tuned to fit on one line at 375px (the smallest target
 *     breakpoint) without cramping the logo/nav below.
 *
 * Wording is catalog-specific so it states exactly what is unfinished on
 * the shop page (product listings and pricing), nothing more.
 */
export function ConstructionBanner() {
  const pathname = usePathname();

  if (!siteConfig.features.underConstruction) return null;
  if (!pathname?.startsWith('/shop')) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-[#E67E22] text-[#0D0D0D] border-b border-[#C0691B]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-[10px] sm:text-[11px] font-accent uppercase tracking-wide leading-relaxed py-1.5">
          Our online catalog is under construction, built by{' '}
          <Link
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:no-underline"
          >
            Tangison Studio
          </Link>
          . Product listings and pricing are not final.
        </p>
      </div>
    </div>
  );
}
