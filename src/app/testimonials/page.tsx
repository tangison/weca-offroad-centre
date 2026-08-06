import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { CTASection } from '@/components/ui/cta-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ExternalLink, MessageCircle, PenLine } from 'lucide-react';
import { businessInfo } from '@/lib/data';
import { GoogleReviewsEmbed } from '@/components/ui/google-reviews-embed';
import { FacebookPageEmbed } from '@/components/ui/facebook-page-embed';
import { siteConfig } from '@/lib/config';

export default function TestimonialsPage() {
  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Customer Reviews"
        subtitle="Real, unfiltered reviews from our customers on Google and Facebook."
        backgroundImage="/images/gallery/gallery-2.webp"
        size="sm"
      />

      {/* Honest intro - no fake stats, no invented numbers. */}
      <section className="py-12 md:py-16 bg-[#0D0D0D] border-b border-[#2A2A2A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#E67E22]/40 bg-[#E67E22]/5 mb-6">
              <Star className="w-4 h-4 text-[#E67E22] fill-[#E67E22]" aria-hidden="true" />
              <span className="text-xs font-accent uppercase tracking-wider text-[#E67E22]">
                Verified on Google
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] mb-4">
              We let our customers speak for us
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              The reviews below are pulled live from our Google Business Profile.
              We cannot edit, hide, or remove them. If you have worked with us,
              we would be grateful if you added your own.
            </p>
          </div>
        </div>
      </section>

      {/* Real Google Reviews - live iframe */}
      <section className="py-12 md:py-16 bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] mb-3">
              Live Google Reviews
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              These reviews are written by real customers on our Google Maps
              listing. Click inside the embed to read them in full, or write
              your own.
            </p>
          </div>
          <GoogleReviewsEmbed />

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider h-12">
              <a
                href={siteConfig.maps.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PenLine className="w-4 h-4 mr-2" aria-hidden="true" />
                Write a Review on Google
                <ExternalLink className="w-3 h-3 ml-2" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-[#E67E22] font-accent font-semibold uppercase tracking-wider h-12">
              <a
                href={siteConfig.maps.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="w-4 h-4 mr-2" aria-hidden="true" />
                View All Reviews on Google
                <ExternalLink className="w-3 h-3 ml-2" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Facebook page embed for additional social proof */}
      <section className="py-12 md:py-16 bg-[#0D0D0D] border-b border-[#2A2A2A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] mb-3">
              Find us on Facebook
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              We post recent work, customer photos, and product updates on our
              Facebook page. Send us a message there if that is easier.
            </p>
          </div>
          <FacebookPageEmbed />
        </div>
      </section>

      {/* Why reviews matter - honest framing, no fake numbers */}
      <section className="py-12 md:py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              title="Real reviews on Google, not staged quotes on our site"
              subtitle="We let our customers speak for themselves. We cannot curate, edit, or remove Google reviews."
              align="center"
            />
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <Card className="bg-[#0D0D0D] border-[#2A2A2A]">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30 mb-4">
                    <Star className="w-5 h-5 text-[#E67E22]" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg text-[#F5F5F5] mb-2">
                    Verified
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Google reviews are tied to real Google accounts. We cannot
                    fake them or delete the bad ones.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0D0D0D] border-[#2A2A2A]">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30 mb-4">
                    <MessageCircle className="w-5 h-5 text-[#E67E22]" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg text-[#F5F5F5] mb-2">
                    Public
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Anyone can read what is said about us. If we mess up, the
                    whole world sees how we handle it.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0D0D0D] border-[#2A2A2A]">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30 mb-4">
                    <PenLine className="w-5 h-5 text-[#E67E22]" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg text-[#F5F5F5] mb-2">
                    Two-way
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We respond to every review. If something went wrong, we
                    want the chance to make it right.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild className="bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider h-12 px-8">
                <a
                  href={siteConfig.maps.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PenLine className="w-4 h-4 mr-2" aria-hidden="true" />
                  Leave us a Review
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to write the next review?"
        subtitle="Get in touch for a quote on your 4x4 build. We will treat your vehicle like it is our own."
        primaryCTA={{ text: 'Get a Quote', href: '/contact' }}
        secondaryCTA={{ text: 'Browse Services', href: '/services' }}
        variant="dark"
      />
    </div>
  );
}
