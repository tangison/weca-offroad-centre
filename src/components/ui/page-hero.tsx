'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * PageHero - per-page hero banner with optional background image.
 *
 * Performance note (rewritten 2026-08-08 per web-quality-audit):
 * The previous implementation used a CSS `background-image` style on the
 * <section> element. That approach bypassed `next/image` entirely, which
 * meant hero images on About, Contact, Gallery, Services, FAQ, and
 * Testimonials were:
 *   - Served at full size with no AVIF/WebP re-encoding
 *   - No `srcset` / responsive sizing
 *   - No lazy-loading hint
 *   - No LCP preload priority
 * The new implementation renders the background via `next/image` with
 * `fill` + `object-cover`, which gives us all four. The dark overlay and
 * text content stack above the image with `z-index`, matching the
 * previous visual exactly.
 *
 * Accessibility:
 *   - The background image is decorative (the page <h1> already describes
 *     the page). We pass `alt=""` and `aria-hidden` so screen readers skip it.
 *   - The hero <h1> is the only <h1> on each page that renders PageHero.
 */

interface CTAButton {
  text: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryCta?: CTAButton;
  secondaryCta?: CTAButton;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  size = 'md',
  className,
}: PageHeroProps) {
  const heights = {
    sm: 'py-20 md:py-28',
    md: 'py-28 md:py-36',
    lg: 'py-36 md:py-44',
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        heights[size],
        className
      )}
    >
      {/* Background image via next/image - optimised AVIF/WebP, responsive
          srcset, LCP priority preload, CLS-safe (fill + object-cover). */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark overlay - sits above the image, below the text content. */}
          <div className="absolute inset-0 bg-[#0D0D0D]/85" />
        </>
      )}

      {/* Accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E67E22]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#F5F5F5] mb-3 tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto mb-6"
          >
            {subtitle}
          </motion.p>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="btn-pill inline-flex items-center justify-center bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm px-8 py-4 transition-colors"
              >
                {primaryCta.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="btn-pill inline-flex items-center justify-center border border-[#2A2A2A] hover:border-[#E67E22] text-[#F5F5F5] font-accent font-semibold uppercase tracking-wider text-sm px-8 py-4 transition-colors"
              >
                {secondaryCta.text}
              </Link>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#2A2A2A]" />
    </section>
  );
}

export type { PageHeroProps };
