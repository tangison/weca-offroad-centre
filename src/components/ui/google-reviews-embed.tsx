import { siteConfig } from '@/lib/config';
import { Star, ExternalLink, MapPin } from 'lucide-react';

/**
 * GoogleReviewsEmbed - live iframe showing the business's real Google Maps
 * place card, which surfaces the place's reviews, rating summary, photo
 * strip, and review-write CTA inside the iframe itself.
 *
 * Source: Google Maps Embed (the `output=embed` form). This is the free,
 * no-API-key embed that Google has supported for over a decade. It renders
 * the place card exactly as a visitor would see on maps.google.com, with
 * the reviews tab accessible by clicking "Reviews" inside the iframe.
 *
 * IMPORTANT (2026-08-07): Google deprecated the legacy
 * `q=place_id:<ID>&output=embed` format for the public Embed API. Loading
 * that URL in an iframe now renders a zoomed-out world map with no
 * business pin or place card. Verified via agent-browser + VLM analysis.
 * The working format for the public Embed API without an API key is
 * `q=<business name + city>&z=17&output=embed`, which resolves the
 * listing server-side and renders a red pin with the business name in an
 * info card. We use that format here, sourced from
 * `siteConfig.maps.embedUrl` so the URL is in one place.
 *
 * The place_id is still kept for the share/review URLs
 * (`siteConfig.maps.googleMapsLink` and `siteConfig.maps.reviewUrl`) -
 * those endpoints accept place_id directly and continue to work.
 *
 * Why iframe (not native fetch + render):
 *   - Google Places Details API requires an API key, which the client has
 *     not yet provisioned. The iframe needs no key and shows real, live
 *     data straight from Google.
 *   - The iframe is also a trust signal: visitors recognise the Google
 *     Maps chrome and know the reviews are not curated or fabricated by
 *     the site owner.
 *
 * Accessibility:
 *   - The iframe has a descriptive `title` for screen readers.
 *   - A fallback link to the live Google Maps place page is rendered
 *     below the iframe so visitors (and search engines) can access the
 *     reviews even if the iframe is blocked.
 *   - The "Write a review" CTA uses the verified Google review URL from
 *     `siteConfig.maps.reviewUrl`.
 */
export function GoogleReviewsEmbed() {
  const embedSrc = siteConfig.maps.embedUrl;
  const mapsLink = siteConfig.maps.googleMapsLink;
  const reviewUrl = siteConfig.maps.reviewUrl;

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Iframe - the live Google Maps place card */}
        <div className="lg:col-span-2 relative bg-[#1A1A1A] border border-[#2A2A2A]">
          <iframe
            title={`Google Maps place card for ${siteConfig.name} - live reviews, rating, and location`}
            src={embedSrc}
            className="w-full h-[420px] md:h-[480px]"
            style={{ border: 0, colorScheme: 'normal' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {/* Side panel - CTAs + context */}
        <div className="flex flex-col gap-4 justify-between bg-[#1A1A1A] border border-[#2A2A2A] p-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-[#E67E22]" aria-hidden="true" />
              <h3 className="font-heading text-xl text-[#F5F5F5]">
                Find us on Google
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              The map shows our live Google Maps listing. Click
              <span className="text-[#F5F5F5] font-medium"> Reviews </span>
              inside the map to read what real customers have written about
              Weca Offroad Centre. These reviews are pulled directly from
              Google - we cannot edit or remove them.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-[#E67E22] fill-[#E67E22]" aria-hidden="true" />
              <span>Verified by Google</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill inline-flex items-center justify-center gap-2 bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
            >
              <Star className="w-4 h-4" aria-hidden="true" />
              Write a Review
            </a>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill inline-flex items-center justify-center gap-2 border border-[#2A2A2A] hover:border-[#E67E22] text-[#F5F5F5] font-accent font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Fallback link for no-iframe environments (screen-reader friendly) */}
      <p className="text-xs text-muted-foreground/70 mt-3 text-center">
        Cannot see the map?{' '}
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-[#E67E22] transition-colors"
        >
          Open our Google Maps listing in a new tab
        </a>
        .
      </p>
    </div>
  );
}
