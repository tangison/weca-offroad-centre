import { siteConfig } from '@/lib/config';
import { Facebook, ExternalLink } from 'lucide-react';

/**
 * FacebookPageEmbed — live iframe showing the business's real Facebook page
 * feed, photos, and cover using Facebook's official Page Plugin.
 *
 * Source: Facebook Page Plugin
 * (https://developers.facebook.com/docs/plugins/page-plugin/). This is the
 * free, no-app-review-required embed that Facebook has supported for years.
 * It renders the page's cover photo, profile photo, like button, and a
 * scrolling feed of the page's recent posts.
 *
 * The page URL is sourced from `siteConfig.social.facebook` (verified real
 * Facebook page for Weca Offroad Centre — see config.ts).
 *
 * Why iframe (not Graph API):
 *   - Facebook Graph API access to a page's posts and photos requires a
 *     Facebook App with `pages_read_user_content` permission, which
 *     requires App Review and a business verification flow. The client
 *     has not provisioned an app. The Page Plugin iframe needs no app
 *     and shows real, live content straight from Facebook.
 *   - The iframe is also a trust signal: visitors recognise the Facebook
 *     chrome and know the posts are not curated or fabricated by the
 *     site owner.
 *
 * What "real staff" means here:
 *   - The Page Plugin shows the page's posts, which include team photos,
 *     workshop photos, and customer shout-outs that the business has
 *     posted. This is the closest "real staff from Facebook" without
 *     Graph API access.
 *   - If the client later wants a structured "Our Team" section with
 *     named staff members, that requires either:
 *     (a) the client manually providing staff names + photos, OR
 *     (b) a Facebook App with the necessary permissions to fetch
 *         tagged photos of the page.
 *   - See BUILD_PLAN.md "Real staff from Facebook" open item.
 *
 * Accessibility:
 *   - The iframe has a descriptive `title` for screen readers.
 *   - A fallback link to the live Facebook page is rendered below the
 *     iframe so visitors can access the page even if the iframe is blocked.
 */
export function FacebookPageEmbed() {
  const pageUrl = siteConfig.social.facebook;
  // Facebook Page Plugin endpoint. URL-encode the page URL.
  const href = encodeURIComponent(pageUrl);
  const embedSrc = `https://www.facebook.com/plugins/page.php?href=${href}&show_posts=true&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Iframe — the live Facebook page plugin */}
        <div className="lg:col-span-2 relative bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
          <iframe
            title={`Facebook page feed for ${siteConfig.name} — live posts, photos, and updates`}
            src={embedSrc}
            className="w-full h-[600px]"
            style={{ border: 0, colorScheme: 'normal' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="encrypted-media"
            allowFullScreen
          />
        </div>

        {/* Side panel — CTAs + context */}
        <div className="flex flex-col gap-4 justify-between bg-[#1A1A1A] border border-[#2A2A2A] p-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Facebook className="w-5 h-5 text-[#E67E22]" aria-hidden="true" />
              <h3 className="font-heading text-xl text-[#F5F5F5]">
                See us on Facebook
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              The feed shows our latest Facebook posts — workshop photos,
              team updates, new product arrivals, and customer vehicle
              showcases. Follow our page to stay in the loop with what is
              happening in the workshop.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We post regularly: finished builds, fitment work in progress,
              new brand arrivals, and the occasional customer shout-out.
              It is the most up-to-date window into the workshop outside
              of visiting us in person.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill inline-flex items-center justify-center gap-2 bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
            >
              <Facebook className="w-4 h-4" aria-hidden="true" />
              Visit Facebook Page
            </a>
            <a
              href={`https://www.instagram.com/${siteConfig.social.instagram.split('/').filter(Boolean).pop() || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill inline-flex items-center justify-center gap-2 border border-[#2A2A2A] hover:border-[#E67E22] text-[#F5F5F5] font-accent font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Also on Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Fallback link for no-iframe environments (screen-reader friendly) */}
      <p className="text-xs text-muted-foreground/70 mt-3 text-center">
        Cannot see the feed?{' '}
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-[#E67E22] transition-colors"
        >
          Open our Facebook page in a new tab
        </a>
        .
      </p>
    </div>
  );
}
