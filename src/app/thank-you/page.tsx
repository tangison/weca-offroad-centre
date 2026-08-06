import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { CheckCircle2, MessageCircle, Phone, Home } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your enquiry has been received. Weca Offroad Centre will be in touch shortly.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/thank-you',
  },
};

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        title="Thank You"
        subtitle="Your enquiry is on its way to our workshop."
        size="sm"
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E67E22]/10 border-2 border-[#E67E22] mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#E67E22]" aria-hidden="true" />
            </div>

            <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] mb-4">
              We have your message
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              If you reached us through WhatsApp, your chat is already open with the
              message pre-filled. Just hit send and we will reply during business hours.
              If you emailed us, expect a response within one business day. For urgent
              enquiries, call us directly on{' '}
              <a
                href={`tel:${siteConfig.contact.phone[0].replace(/\s/g, '')}`}
                className="text-[#E67E22] hover:underline"
              >
                {siteConfig.contact.phone[0]}
              </a>
              .
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mt-10">
              <Button
                asChild
                className="bg-[#25D366] hover:bg-[#1ebe57] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider h-12"
              >
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] hover:border-[#E67E22] font-accent font-semibold uppercase tracking-wider h-12"
              >
                <a href={`tel:${siteConfig.contact.phone[0].replace(/\s/g, '')}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] hover:border-[#E67E22] font-accent font-semibold uppercase tracking-wider h-12"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back Home
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground/80 text-xs mt-12">
              Tip: To help us quote faster, include your vehicle make, model, and year
              in your message. Photos of the area to be fitted are also welcome on
              WhatsApp.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
