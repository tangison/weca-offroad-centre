import { MetadataRoute } from 'next';

/**
 * Robots policy: PUBLIC.
 *
 * The site was previously private with `Disallow: /` pending client review.
 * Released for public indexing on client instruction (2026-08-15). The sitemap
 * reference is restored so Google and Bing can discover all routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://wecaoffroad.com/sitemap.xml',
  };
}
