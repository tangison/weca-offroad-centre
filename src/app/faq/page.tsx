import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { CTASection } from '@/components/ui/cta-section';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQPageStructuredData, BreadcrumbStructuredData } from '@/components/ui/structured-data';
import { faqs } from '@/lib/data';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Weca Offroad Centre',
  description:
    'Common questions about 4x4 fitment, suspension, rooftop tents, canopies, warranties, payment methods, and bookings at Weca Offroad Centre in Swakopmund, Namibia.',
  openGraph: {
    title: 'FAQ | Weca Offroad Centre',
    description:
      'Answers to common questions about our 4x4 fitment services in Swakopmund, Namibia.',
  },
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]}
      />
      <FAQPageStructuredData faqs={faqs} />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Quick answers to the questions we hear most often. Cannot find what you are looking for? Message us on WhatsApp."
        size="sm"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30">
                <HelpCircle className="w-5 h-5 text-[#E67E22]" aria-hidden="true" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5]">
                Common questions
              </h2>
            </div>

            <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
              <CardContent className="p-4 md:p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b border-[#2A2A2A] last:border-0"
                    >
                      <AccordionTrigger className="text-left text-[#F5F5F5] hover:text-[#E67E22] hover:no-underline py-5 font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="mt-10 p-6 bg-[#1A1A1A] border border-[#2A2A2A] text-center">
              <h3 className="font-heading text-xl text-[#F5F5F5] mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-md mx-auto">
                We are happy to walk you through your specific build. Send us a WhatsApp
                message and we will reply during business hours.
              </p>
              <Link
                href="/contact"
                className="btn-pill inline-flex items-center justify-center bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to book your fitment?"
        subtitle="Send us your vehicle details and what you need. We will quote you back in plain numbers."
        primaryCTA={{ text: 'Get a Quote', href: '/contact' }}
        secondaryCTA={{ text: 'See Services', href: '/services' }}
        variant="dark"
      />
    </>
  );
}
