'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

/**
 * Cookie consent banner.
 *
 * Weca Offroad Centre does not run Google Analytics, Meta Pixel, or any
 * marketing tracker. The Cookie Policy at /legal/cookies explains that we
 * only have first-party cookies (theme, form state) and third-party embed
 * cookies (Google Maps, Google Reviews, Facebook) that fire when you
 * interact with those widgets.
 *
 * This banner:
 *   1. Shows once per visitor (stored in localStorage).
 *   2. Links to /legal/cookies so the visitor can read the policy.
 *   3. Has "Accept" and "Decline" buttons that just dismiss the banner.
 *      We don't actually gate the embeds on consent because the cookie
 *      policy explains they only fire on direct interaction.
 *   4. Is fully accessible: role="dialog", aria-labelledby, keyboard
 *      dismiss with Escape, focusable buttons.
 *
 * If we add a real tracker later (Vercel Analytics is privacy-friendly
 * and needs no consent), this banner should be upgraded to gate the
 * tracker's initialization on the visitor's choice.
 */
const STORAGE_KEY = 'weca-cookie-consent-v1';

export function CookieConsent() {
  // Default to hidden; we flip to visible inside an effect after
  // reading localStorage. This avoids SSR/CSR hydration mismatch.
  const [visible, setVisible] = useState(false);

  // Initial mount: check localStorage and decide whether to show.
  useEffect(() => {
    let shouldShow = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) shouldShow = false;
    } catch {
      // localStorage unavailable (private mode); show the banner so the
      // visitor at least sees the disclosure.
    }
    if (shouldShow) {
      // Defer the visibility flip to a microtask so we are not calling
      // setState synchronously inside the effect body.
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Escape key dismisses the banner.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: 'declined', at: Date.now() }));
        } catch {
          // Ignore storage errors.
        }
        setVisible(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  const handleChoice = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: Date.now() }));
    } catch {
      // Ignore storage errors.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6 animate-in slide-in-from-bottom duration-300"
    >
      <div className="mx-auto max-w-4xl bg-[#1A1A1A] border border-[#2A2A2A] shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 md:p-6">
          <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30">
            <Cookie className="w-5 h-5 text-[#E67E22]" aria-hidden="true" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 id="cookie-consent-title" className="font-heading text-base text-[#F5F5F5] mb-1">
              Cookies on this site
            </h2>
            <p id="cookie-consent-desc" className="text-muted-foreground text-sm leading-relaxed">
              We use first-party cookies for site preferences and third-party embed cookies
              (Google Maps, Google Reviews, Facebook) only when you interact with those
              widgets. We do not run advertising trackers. Read our{' '}
              <Link href="/legal/cookies" className="text-[#E67E22] hover:underline">
                Cookie Policy
              </Link>{' '}
              for details.
            </p>
          </div>

          <div className="flex flex-shrink-0 gap-2 w-full md:w-auto">
            <Button
              onClick={() => handleChoice('declined')}
              variant="outline"
              className="flex-1 md:flex-none border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-[#E67E22] font-accent font-semibold uppercase tracking-wider text-xs h-10"
            >
              Decline
            </Button>
            <Button
              onClick={() => handleChoice('accepted')}
              className="flex-1 md:flex-none bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-xs h-10"
            >
              Accept
            </Button>
            <Button
              onClick={() => handleChoice('declined')}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-[#F5F5F5] hover:bg-transparent md:hidden"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

