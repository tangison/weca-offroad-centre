# Launch Checklist - Weca Offroad Centre

This document defines the gate the site must pass before the `noindex` flag
is flipped and the site is submitted to Google Search Console.

Owner: Tangison Studio (build) + Weca Offroad Centre (client approval).
Last updated: 7 August 2026.

## 1. Content readiness

- [ ] All fabricated testimonials removed from public pages (DONE - replaced with Google reviews iframe)
- [ ] Gallery item titles use real client build names (PENDING - currently "Savannah Expedition" etc.)
- [ ] Service "starting from" prices verified by client (PENDING)
- [ ] Frozen `products` array in `src/lib/data.ts` deleted or moved to a private seed file (PENDING)
- [ ] `data.test.ts` `>=200 products` assertion removed or rewritten (PENDING)
- [ ] Real client photos in `/public/images/gallery/` confirmed or replaced (PENDING)
- [ ] Owner bio photo on `/about` confirmed real (DONE)
- [ ] All 20 brand logos in `/public/brands/` confirmed by client (DONE - 2026-08-06)

## 2. SEO go-live gate

- [ ] Flip `robots: { index: true, follow: true }` in `src/app/layout.tsx`
- [ ] Re-add sitemap reference in `src/app/robots.ts` (`sitemap: \`${siteConfig.domain}/sitemap.xml\``)
- [ ] Update `public/robots.txt` to allow crawling (`User-agent: *` + `Allow: /`)
- [ ] Set `NEXT_PUBLIC_GSC_TOKEN` env var on Vercel with Google Search Console verification token
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Submit `sitemap.xml` to Bing Webmaster Tools
- [ ] Confirm Bing verification token still valid (already set: `ABE9457C17856D987AEB00DB6BD0EF63`)
- [ ] Per-page canonical URLs verified in production HTML (DONE in dev)
- [ ] BreadcrumbList schema renders on all inner pages (DONE in dev)
- [ ] FAQPage schema renders on `/services` (DONE in dev)
- [ ] Service schema renders on `/services` (DONE in dev)
- [ ] LocalBusiness schema is `AutoPartsStore` type with `@id` (DONE)
- [ ] OG image is 1200x630 with real branding (DONE - `public/og-image.png`)
- [ ] Twitter card has `summary_large_image` (DONE)

## 3. Security go-live gate

- [ ] CSP header present in production response (DONE in `next.config.ts`)
- [ ] HSTS header present with `includeSubDomains; preload` (DONE)
- [ ] X-Frame-Options `SAMEORIGIN` present (DONE)
- [ ] X-Content-Type-Options `nosniff` present (DONE)
- [ ] Referrer-Policy `strict-origin-when-cross-origin` present (DONE)
- [ ] Permissions-Policy locks down camera, mic, geolocation, topics (DONE)
- [ ] HTTPS redirect works (Vercel default - verify in production)
- [ ] `poweredByHeader: false` (DONE)
- [ ] `reactStrictMode: true` (DONE)
- [ ] Contact form rate limit works: 5 req/IP/min (DONE - in-memory, swap for Upstash at scale)
- [ ] Contact form honeypot field present (DONE)
- [ ] Contact form Zod validation server-side (DONE)
- [ ] `bun audit` runs clean in CI (PENDING - not in workflow yet)
- [ ] No secrets in repo (PAT was used once for push, never committed)

## 4. Forms and lead handling

- [ ] Contact form POSTs to `/api/contact` (DONE)
- [ ] Consent checkbox required (DONE)
- [ ] Privacy policy link inside form (DONE)
- [ ] Vehicle field added (DONE)
- [ ] Email format validation client + server (DONE)
- [ ] Phone field type=tel + autoComplete=tel (DONE)
- [ ] Honeypot field present (DONE)
- [ ] Rate limit returns 429 with Retry-After (DONE)
- [ ] Success state redirects to `/thank-you` (DONE)
- [ ] Error banner is `role="alert"` (DONE)
- [ ] Success banner is `role="status"` (DONE)
- [ ] Submit button disabled while submitting (DONE)
- [ ] Loading spinner visible (DONE)
- [ ] `/thank-you` page exists with noindex (DONE)

## 5. Accessibility go-live gate

- [ ] No multiple H1 on any route (DONE - legal layout fixed)
- [ ] Skip-to-content link present (DONE)
- [ ] Focus-visible outline on all interactive elements (DONE)
- [ ] `aria-label` on all icon-only buttons (DONE - including lightbox close)
- [ ] Lightbox dialog has `role="dialog"` + `aria-modal="true"` (DONE)
- [ ] Lightbox closes on Escape (DONE)
- [ ] Lightbox close button has `aria-label` and `autoFocus` (DONE)
- [ ] Form labels use `htmlFor` (DONE)
- [ ] Cookie consent is `role="dialog"` + `aria-labelledby` (DONE)
- [ ] Cookie consent dismissible with Escape (DONE)
- [ ] Reduced-motion preference respected (DONE - global CSS)
- [ ] Colour contrast meets WCAG AA (DONE - muted-foreground bumped to ~7.4:1)
- [ ] WCAG 2.1 AA audit run (PENDING - manual axe-core pass needed)

## 6. Performance go-live gate

- [ ] All images use `next/image` (PENDING - `page-hero.tsx` still uses CSS background-image)
- [ ] All images served as AVIF/WebP (DONE via `next.config.ts` `formats`)
- [ ] `priority` on hero images (DONE on hero slideshow)
- [ ] `loading="lazy"` on below-fold images (DONE on brand carousel)
- [ ] Web fonts use `display: swap` (DONE)
- [ ] Lighthouse perf >= 90 on mobile (PENDING - run audit before launch)
- [ ] Lighthouse a11y >= 95 (PENDING)
- [ ] Lighthouse SEO >= 95 (PENDING)
- [ ] Lighthouse BP >= 95 (PENDING)
- [ ] No layout shifts (CLS < 0.1) (PENDING - verify)
- [ ] Bundle size budget (PENDING - add to CI)

## 7. Analytics and monitoring

- [ ] Vercel Analytics installed (DONE - `@vercel/analytics`)
- [ ] Privacy-friendly (no consent needed) (DONE - Vercel Analytics is cookieless)
- [ ] Conversion event: contact form submit (PENDING - add custom event)
- [ ] Conversion event: WhatsApp click (PENDING - add custom event)
- [ ] Conversion event: phone click (PENDING - add custom event)
- [ ] Vercel alerts configured for deploy failures (PENDING)
- [ ] Uptime monitor configured (PENDING - UptimeRobot or Vercel monitor)
- [ ] Sentry configured for error tracking (PENDING - optional)

## 8. Infrastructure go-live gate

- [ ] Production domain `https://wecaoffroad.com` connected (PENDING - README says "pending registration")
- [ ] DNS A/AAAA records point to Vercel (PENDING)
- [ ] SPF record published (PENDING if moving off Gmail)
- [ ] DKIM record published (PENDING if moving off Gmail)
- [ ] DMARC record published (PENDING if moving off Gmail)
- [ ] SSL auto-renewing on Vercel (DONE - Vercel default)
- [ ] Staging environment (PENDING - Vercel preview deploys acceptable)
- [ ] Rollback runbook documented (PENDING - Vercel supports instant rollback)
- [ ] Database backup strategy (PENDING - no DB in production yet)

## 9. Client handover

- [ ] Client trained on updating content via `CONTENT_REPLACEMENT_GUIDE.md` (PENDING)
- [ ] Client has GitHub access to the repo (PENDING)
- [ ] Client has Vercel project access (PENDING)
- [ ] Client has Google Business Profile access (PENDING - confirm with Werner)
- [ ] Client has Facebook page admin access (PENDING - confirm with Werner)
- [ ] Domain registrar credentials handed over (PENDING)
- [ ] DNS management credentials handed over (PENDING)
- [ ] Email account `wecaoffroadcentre@gmail.com` ownership confirmed (DONE)
- [ ] Initial backup of code + assets created (DONE - GitHub is source of truth)
- [ ] 30/60/90-day support agreement documented (PENDING)

## 10. Post-launch monitoring (first 72 hours)

- [ ] Check Vercel Analytics for traffic patterns
- [ ] Check Google Search Console for crawl errors
- [ ] Check Bing Webmaster Tools for crawl errors
- [ ] Test contact form submission end-to-end on production
- [ ] Test WhatsApp link opens correct chat
- [ ] Test phone link dials correct number
- [ ] Test all social profile links
- [ ] Test on iPhone (Safari + Chrome)
- [ ] Test on Android (Chrome)
- [ ] Test on tablet (iPad Safari)
- [ ] Test on desktop (Chrome, Firefox, Safari, Edge)
- [ ] Monitor Vercel deploy logs for errors
- [ ] Confirm sitemap submission accepted by Google
- [ ] Confirm sitemap submission accepted by Bing
- [ ] Schedule first quarterly content review

## Sign-off

- [ ] Tangison Studio signs off on technical readiness
- [ ] Weca Offroad Centre signs off on content readiness
- [ ] Launch date confirmed
- [ ] `noindex` flag flipped to `index`
- [ ] Sitemap submitted to search engines
- [ ] Public announcement

---

This checklist is a living document. Update it as the launch plan evolves.
Each item that says "PENDING" must be addressed before the site goes fully public.
