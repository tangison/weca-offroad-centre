import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { CTASection } from '@/components/ui/cta-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Wrench, ArrowRight } from 'lucide-react';
import { businessInfo } from '@/lib/data';

/**
 * Shop page — CATALOG COMING SOON (empty state).
 *
 * Per client instruction (2026-08-06): the previous representative
 * product catalog (236 fabricated products in src/lib/data.ts) did not
 * match the client's real stock and was confusing the actual client
 * (Shalyn) during her review. The fabricated catalog has been removed
 * from the live /shop page immediately.
 *
 * The fabricated `products` array is FROZEN in src/lib/data.ts (not
 * deleted) so it can serve as a structural reference for when the real
 * SKU-level product list arrives from the client's upcoming POS / online
 * supplier data feed. It is no longer imported or rendered here.
 *
 * What this page does now:
 *   - Keeps the shop hero + price-match banner (real business promises).
 *   - Shows a clear "Catalog coming soon" empty state.
 *   - Routes visitors to WhatsApp (primary sales channel) and to /services
 *     (real, client-verified content) so the page is still useful.
 *
 * What this page does NOT do:
 *   - Does not render any product cards.
 *   - Does not import the fabricated `products` array.
 *   - Does not generate new placeholder products.
 *
 * When the real catalog arrives:
 *   1. Replace the `products` array in src/lib/data.ts with real data.
 *   2. Restore the product grid / search / filters / pagination from
 *      git history (commit prior to this change) — the infrastructure is
 *      already built and tested.
 *   3. Re-enable the data.test.ts "200+ products" assertion (kept as-is
 *      against the frozen array in the meantime).
 */
export default function ShopPage() {
  const whatsappHref = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`;
  const phoneHref = `tel:${businessInfo.phone[0].replace(/\s/g, '')}`;

  return (
    <div>
      {/* Hero — preserved */}
      <PageHero
        title="Shop 4x4 Accessories"
        subtitle="Quality products for your offroad adventures. Browse our selection and request a quote."
        backgroundImage="/images/shop/shop-hero.webp"
        size="sm"
      />

      {/* Price Match Banner — preserved (real business promise) */}
      <section className="py-4 bg-[#E67E22]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#0D0D0D] font-accent font-semibold uppercase tracking-wide text-sm">
            We beat any written quotation in Namibia! Contact us for competitive pricing.
          </p>
        </div>
      </section>

      {/* Catalog coming soon — empty state.
          Centered, calm, and clear. Routes the visitor to the two
          channels that ARE ready: WhatsApp for "ask us anything" and
          /services for the real, client-verified service list. */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          {/* Icon — Wrench in a subtle circle, on-brand orange accent */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1A1A1A]">
            <Wrench className="h-9 w-9 text-[#E67E22]" strokeWidth={1.5} />
          </div>

          {/* Heading — matches the site's Bebas Neue display style */}
          <h2 className="font-accent text-4xl md:text-5xl uppercase tracking-wide text-[#F5F5F5] mb-4">
            Catalog Coming Soon
          </h2>

          {/* Body — honest, specific, action-oriented. Explains the
              situation without apologising or over-explaining. */}
          <p className="text-[#888888] text-base md:text-lg leading-relaxed mb-2 font-body">
            We are loading our full product range now.
          </p>
          <p className="text-[#888888] text-base md:text-lg leading-relaxed mb-10 font-body">
            In the meantime, message us on WhatsApp with what you need —
            suspension, rooftop tents, canopies, recovery gear, power, fridges,
            the lot — and we will quote you on the spot.
          </p>

          {/* CTAs — WhatsApp primary, Phone secondary */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] hover:text-[#F5F5F5] font-accent font-semibold uppercase tracking-wider"
            >
              <a href={phoneHref}>
                Call {businessInfo.phone[0]}
              </a>
            </Button>
          </div>

          {/* Services cross-link — real, client-verified content.
              Gives the visitor somewhere useful to go next instead of a
              dead end. */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] text-left">
            <CardContent className="p-6 md:p-8">
              <p className="font-accent text-[#F5F5F5] mb-2 uppercase tracking-wider text-sm">
                While you wait
              </p>
              <p className="text-[#888888] text-sm mb-5 font-body leading-relaxed">
                Our services page lists every fitment, repair, and custom build
                we do in the workshop — all current, all client-verified.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#E67E22] hover:text-[#F39C12] transition-colors font-accent uppercase tracking-wider text-sm"
              >
                View our services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA section — preserved (real business CTA, appears on every page) */}
      <CTASection
        title="Can't find what you need?"
        subtitle="Message us on WhatsApp and we'll quote you on the spot. We carry everything 4x4 — if we don't have it in stock, we'll source it."
      />
    </div>
  );
}
