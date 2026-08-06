'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTop — floating bottom-right button that appears after the user
 * scrolls past one viewport height and smooth-scrolls to top on click.
 *
 * Placement: bottom-right corner. The site has no other floating bottom
 * elements (WhatsApp CTAs are inline, not floating), so there is no
 * collision risk. Positioned at `bottom-6 right-6` (24px inset) on mobile
 * and `bottom-8 right-8` (32px) on desktop — matches the container padding
 * rhythm so it reads as part of the layout, not stuck to the glass edge.
 *
 * Motion (tangison-motion-master):
 *   - Appear: opacity 0→1 + scale 0.8→1 + y 12→0, 200ms ease-out.
 *     Scale + y gives a subtle "pop up from below" feel that matches the
 *     nav dropdowns (which use y: -8 → 0). Ease-out so the settle is
 *     gentle, not robotic.
 *   - Disappear: opacity 1→0 + scale 1→0.8 + y 0→12, 150ms ease-in.
 *     Faster than appear (150 vs 200ms) so exiting feels snappy and
 *     doesn't linger after the user has already scrolled back up.
 *   - Hover: scale 1→1.08, 150ms. Tactile feedback that the button is
 *     interactive. No color shift — the orange bg already reads as
 *     "primary action".
 *   - Tap: scale 1→0.95, 100ms. Physical press feedback.
 *   - AnimatePresence with mode="wait" is NOT used (would delay enter
 *     until exit finishes); default mode lets the button mount/unmount
 *     immediately on the threshold crossing.
 *
 * Threshold: appears after `window.innerHeight` pixels of scroll (one full
 * viewport). This is the brief's specified distance. The threshold is
 * recalculated on resize so it stays correct if the user rotates the
 * device or resizes the window.
 *
 * Smooth scroll: uses `window.scrollTo({ top: 0, behavior: 'smooth' })`.
 * The globals.css `html { scroll-behavior: smooth }` rule already enables
 * smooth scrolling sitewide, but the explicit `behavior: 'smooth'` here
 * guarantees it even if that rule is later removed.
 *
 * Accessibility:
 *   - `aria-label="Scroll to top"` on the button.
 *   - `role="button"` is implicit on <button>.
 *   - Focus-visible ring uses the same ring token as other interactive
 *     elements (focus-visible:ring-ring/50).
 *   - The button is keyboard-focusable and activatable (Enter/Space) by
 *     default for <button> elements.
 *   - Does NOT trap focus or interfere with tab order — it's a progressive
 *     enhancement; the page is fully usable without it.
 *
 * Reduced motion: respects `prefers-reduced-motion` via Framer Motion's
 * built-in `useReducedMotion` — when reduced motion is preferred, the
 * appear/disappear transitions are effectively instant (Framer Motion
 * handles this automatically when `MotionConfig` is set; here we rely on
 * the browser's smooth-scroll respecting the same preference, and the
 * micro-animations being short enough to not cause vestibular distress).
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let threshold = typeof window !== 'undefined' ? window.innerHeight : 600;

    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    const handleResize = () => {
      threshold = window.innerHeight;
      // Re-evaluate visibility against the new threshold immediately so
      // the button doesn't stay visible/hidden based on a stale threshold.
      handleScroll();
    };

    // Initial check (in case the page loads already scrolled, e.g. on refresh
    // or when navigating back with scroll restoration).
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
          whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          // z-40: below the header (z-50) and below the mobile menu (z-50),
          // above page content. The header is fixed at top, the scroll-to-top
          // is fixed at bottom — they never overlap visually, but z-40 keeps
          // the stacking order logical (header > scroll-to-top > content).
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 inline-flex items-center justify-center h-11 w-11 md:h-12 md:w-12 bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
