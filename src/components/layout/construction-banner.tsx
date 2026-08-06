import Link from 'next/link';
import { siteConfig } from '@/lib/config';

/**
 * Construction Banner - slim, non-dismissible header strip.
 *
 * Renders above the nav row inside the fixed <header> in navbar.tsx.
 * Conditional on a single config flag: `siteConfig.features.underConstruction`.
 * Flip that flag to false (in src/lib/config.ts) and rebuild to remove the
 * banner cleanly - no markup to delete across files.
 *
 * Design:
 *   - Slim strip (py-1.5), not a large intrusive banner.
 *   - Orange bg (#E67E22) with dark text (#0D0D0D) - high contrast, on-brand,
 *     and deliberately MORE visible than the footer disclaimer (which the
 *     client noted is "easy to miss").
 *   - Not dismissible - no close button. Stays visible for the whole visit
 *     while the flag is on.
 *   - "Tangison Studio" links to https://studio.tangison.com (matches footer).
 *   - Text sizes tuned to fit on one line at 375px (the smallest target
 *     breakpoint) without cramping the logo/nav below.
 *
 * Wording mirrors the footer disclaimer so the two reinforce each other
 * rather than contradicting.
 */
export function ConstructionBanner() {
  if (!siteConfig.features.underConstruction) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-[#E67E22] text-[#0D0D0D] border-b border-[#C0691B]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-[10px] sm:text-[11px] font-accent uppercase tracking-wide leading-relaxed py-1.5">
          This website is under construction, built by{' '}
          <Link
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:no-underline"
          >
            Tangison Studio
          </Link>
          . Content and pricing are not final.
        </p>
      </div>
    </div>
  );
}
