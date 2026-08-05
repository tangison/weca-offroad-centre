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
 * Each logo links to the brand's verified official site in a new tab
 * with rel="noopener noreferrer".
 *
 * Logos are rendered on a light card background so both dark-fill logos
 * (e.g. Dometic #0D0D0D, BFGoodrich #014983) and light-fill logos
 * (e.g. EcoFlow white) are visible against the site's dark theme.
 *
 * No new runtime dependency introduced — uses only next/image + CSS
 * animation. Respects prefers-reduced-motion per WCAG 2.1 SC 2.3.3.
 */
export function BrandLogoCarousel({ variant = 'carousel', className = '' }: BrandLogoCarouselProps) {
  if (variant === 'grid') {
    return (
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ${className}`}
        role="list"
        aria-label="Brands we install"
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
      {/* Edge fade masks for a polished look */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0D0D0D] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0D0D0D] to-transparent"
        aria-hidden="true"
      />

      {/* The track: two copies of the logo list, animated as one */}
      <div className="brand-carousel-track flex gap-8 md:gap-12 w-max">
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
 * Single brand logo card. Light background so both dark and light
 * logos are visible. Links out to the brand's official site.
 */
function BrandLogoCard({
  brand,
  compact = false,
}: {
  brand: Brand;
  compact?: boolean;
}) {
  const isSvg = brand.logo.endsWith('.svg');
  const width = compact ? 120 : 160;
  const height = compact ? 64 : 80;
  const href = brand.website || '#';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      role="listitem"
      aria-label={`${brand.name} — visit official site`}
      className="group flex shrink-0 flex-col items-center justify-center rounded-lg bg-[#F5F5F5] px-4 py-3 transition-all hover:bg-white hover:shadow-lg hover:shadow-[#E67E22]/20 hover:-translate-y-0.5"
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
          className="h-12 md:h-14 w-auto object-contain"
          loading="lazy"
        />
      ) : (
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={width}
          height={height}
          className="h-12 md:h-14 w-auto object-contain"
          loading="lazy"
        />
      )}
      <span className="mt-1 text-[10px] uppercase tracking-wider text-[#888888] group-hover:text-[#0D0D0D] transition-colors sr-only">
        {brand.name}
      </span>
    </a>
  );
}
