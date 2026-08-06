import { MetadataRoute } from 'next';

/**
 * Robots policy — PRIVATE / NO-INDEX.
 *
 * Per client instruction (2026-08-06): the site must NOT be crawled or
 * indexed by any search engine while the client reviews it. The site stays
 * directly accessible to the client and Tangison Studio (no SSO/password),
 * but search engines are told in the strongest possible terms to stay away.
 *
 * This is the Next.js Metadata Route Robots file. It is served at /robots.txt
 * and overrides the static public/robots.txt (which is kept in sync as a
 * fallback for any path that bypasses the Next.js route handler).
 *
 * Both signals are sent intentionally:
 *   1. `Disallow: /` in robots.txt  — tells crawlers not to fetch any path.
 *   2. `noindex, nofollow` <meta> in layout.tsx — tells any crawler that
 *      somehow loads a page not to index it or follow its links.
 *
 * The sitemap reference is intentionally REMOVED — we are not submitting a
 * sitemap to Google Search Console or Bing Webmaster Tools while the site
 * is private. The sitemap.xml route still exists (src/app/sitemap.ts) and
 * can be re-referenced here when the site goes public.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    // No sitemap reference while site is private.
  };
}
