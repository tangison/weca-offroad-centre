import Image from 'next/image';
import { brands, type Brand } from '@/lib/data';

type Variant = 'carousel' | 'grid';

interface BrandLogoCarouselProps {
  variant?: Variant;
  className?: string;
}

/**
 * BrandLogoCarousel
 *
 * Self-hosted brand logos (under /public/brands/) displayed in either:
 *   - variant="carousel": infinite horizontal auto-scroll, pause on hover,
 *     reduced-motion fallback to static centered row.
 *   - variant="grid": static responsive grid (for /services page).
 *
 * Behaviour change (2026-08-06, per client instruction):
 *   Logos are DISPLAY ONLY — non-clickable. The previous target="_blank"
 *   outbound links to each brand's official site have been removed. The
 *   client explicitly said logos do not need to link out to the supplier's
 *   site. If/when a /shop category page exists for a brand, the logo can
 *   link there instead; for now it is purely decorative.
 *
 * Visual treatment (per visual-polish brief):
 *   - All logos are rendered in a uniform white/monochrome via CSS filter
 *     `brightness(0) invert(1)`. This keeps the look clean and consistent
 *     without re-fetching assets from each brand's site.
 *   - The carousel has NO background plate, card, or container behind it —
 *     it is a clean, borderless marquee. The parent <section> supplies the
 *     dark background (Atlantic Black #0D0D0D) so the white logos are visible.
 *   - On hover, the filter is removed to reveal the brand's true colors —
 *     a subtle, premium interaction that rewards attention without being
 *     flashy.
 *
 * Respects prefers-reduced-motion per WCAG 2.1 SC 2.3.3 — falls back to a
 * static, wrapped row.
 *
 * No new runtime dependency introduced — uses only next/image + CSS.
 */
export function BrandLogoCarousel({ variant = 'carousel', className = '' }: BrandLogoCarouselProps) {
  if (variant === 'grid') {
    return (
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-8 ${className}`}
        role="list"
        aria-label="Brands we sell"
      >
        {brands.map((brand) => (
          <BrandLogoCard key={brand.name} brand={brand} />
        ))}
      </div>
    );
  }

  // Carousel variant: duplicate the list so the scroll loop is seamless.
  // CSS handles the animation, hover-pause, and reduced-motion fallback.
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="region"
      aria-label="Brands we sell — auto-scrolling carousel"
    >
      {/* Edge fade masks so logos fade in/out at the edges of the marquee.
          Mask color matches the dark section background (#0D0D0D).

          Width is sized to be WIDER than the largest logo in the strip
          (logos render at h-10/h-12 with ~3:1 aspect = ~120-160px wide).
          Previous w-16/w-24 (64/96px) was narrower than the logos, so
          `overflow-hidden` hard-clipped logos mid-word (e.g. "ECOFLC")
          before the gradient could fade them out. Now w-32 (128px) on
          mobile and w-48 (192px) on desktop, with a 3-stop gradient
          (full bg -> 70% bg -> transparent) so the fade is gradual
          enough that no visible hard-clip line remains. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 md:w-48 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 md:w-48 bg-gradient-to-l from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent"
        aria-hidden="true"
      />

      {/* The track: two copies of the logo list, animated as one */}
      <div className="brand-carousel-track flex gap-10 md:gap-16 w-max items-center py-4">
        {[...brands, ...brands].map((brand, index) => (
          <BrandLogoCard
            key={`${brand.name}-${index}`}
            brand={brand}
            compact
          />
        ))}
      </div>

      {/* Inline <style> for the keyframes + reduced-motion fallback.
          Kept inline so the component is self-contained and has no
          dependency on a global stylesheet or Tailwind plugin. */}
      <style>{`
        @keyframes brand-carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-carousel-track {
          animation: brand-carousel-scroll 40s linear infinite;
        }
        .brand-carousel-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-carousel-track {
            animation: none;
            transform: none;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Single brand logo card. No background plate or card — just the logo
 * on the parent section's dark background, rendered in monochrome white
 * via CSS filter, with the filter removed on hover/focus to reveal the
 * brand's true colors.
 *
 * Non-clickable (display only) per client instruction 2026-08-06.
 * Rendered as a <div role="listitem"> with a tabindex for keyboard
 * accessibility so the hover-reveal interaction is still reachable
 * without a mouse, without making it a link.
 */
function BrandLogoCard({
  brand,
  compact = false,
}: {
  brand: Brand;
  compact?: boolean;
}) {
  const isSvg = brand.logo.endsWith('.svg');
  // Height is the controlled dimension; width is auto so aspect ratios
  // are preserved. On hover/focus the filter lifts to reveal color.
  const heightClass = compact ? 'h-10 md:h-12' : 'h-12 md:h-14';
  const width = compact ? 140 : 180;
  const height = compact ? 48 : 56;

  return (
    <div
      role="listitem"
      aria-label={`${brand.name} — ${brand.description}`}
      tabIndex={0}
      className="group flex shrink-0 items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none cursor-default"
      title={`${brand.name} — ${brand.description}`}
    >
      {isSvg ? (
        // SVGs scale crisply at any size; use plain <img> to avoid
        // next/image's raster optimizations on vector files.
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={width}
          height={height}
          className={`${heightClass} w-auto object-contain brand-logo-mono`}
          loading="lazy"
        />
      ) : (
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={width}
          height={height}
          className={`${heightClass} w-auto object-contain brand-logo-mono`}
          loading="lazy"
        />
      )}

      {/* Inline <style> for the monochrome filter + hover reveal.
          Kept inline so the component is self-contained. */}
      <style>{`
        .brand-logo-mono {
          filter: brightness(0) invert(1);
          opacity: 0.85;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
        .group:hover .brand-logo-mono,
        .group:focus-visible .brand-logo-mono {
          filter: none;
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-logo-mono {
            transition: none;
          }
          .group:hover .brand-logo-mono,
          .group:focus-visible .brand-logo-mono {
            filter: brightness(0) invert(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
