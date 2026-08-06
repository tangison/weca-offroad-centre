'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { CTASection } from '@/components/ui/cta-section';
import { BrandLogoCarousel } from '@/components/ui/brand-logo-carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Search,
  Wrench,
  CheckCircle2,
  Clock,
  Handshake,
  Shield,
  Award,
  Zap,
  Settings,
} from 'lucide-react';
import { services, businessInfo } from '@/lib/data';

const processSteps = [
  { step: 1, title: 'Consultation', description: 'Discuss your needs and vehicle requirements.', icon: Search },
  { step: 2, title: 'Quote', description: 'Receive a detailed quote with transparent pricing.', icon: Wrench },
  { step: 3, title: 'Parts Sourcing', description: 'We source quality parts from trusted suppliers.', icon: Settings },
  { step: 4, title: 'Installation', description: 'Professional installation by trained technicians.', icon: Settings },
  { step: 5, title: 'Quality Check', description: 'Thorough inspection and testing of all work.', icon: CheckCircle2 },
  { step: 6, title: 'Handover', description: 'Pick up your upgraded vehicle and hit the road!', icon: Handshake },
];

const benefits = [
  { icon: Shield, title: 'Warranty Protection', description: 'All our work is backed by warranty.' },
  { icon: Award, title: 'Expert Knowledge', description: 'Years of experience with Namibian conditions.' },
  { icon: Zap, title: 'Quality Tools', description: 'Professional-grade tools and equipment.' },
  { icon: Clock, title: 'On-Time Delivery', description: 'We respect your time and deliver as promised.' },
];

const faqs = [
  { question: 'How long does a typical suspension installation take?', answer: 'A complete suspension system installation typically takes 4-6 hours. More complex setups may require a full day.' },
  { question: 'Do you offer warranties on your installations?', answer: 'Yes! All our installations come with a workmanship warranty. Most products also carry manufacturer warranties.' },
  { question: 'Can I bring my own parts for installation?', answer: 'We prefer to supply parts to ensure quality and warranty coverage. However, we can discuss customer-supplied parts on a case-by-case basis.' },
  { question: 'Do I need to book an appointment?', answer: 'While we accept walk-ins for basic services, we recommend booking for installations.' },
  { question: 'What payment methods do you accept?', answer: 'We accept cash, bank transfers, and major credit/debit cards.' },
  { question: 'Do you work on all vehicle types?', answer: 'We specialize in 4x4 vehicles including Toyota, Ford, Nissan, Isuzu, Land Rover, and Land Cruiser.' },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Our Services"
        subtitle="Professional fitment and installation for your 4x4"
        backgroundImage="/images/about/workshop.webp"
        size="sm"
      />

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] tracking-tight">
              What We Offer
            </h2>
            <p className="text-muted-foreground text-sm mt-2">Comprehensive 4x4 services to get you adventure-ready</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Link href="/contact">
                  <Card className="h-full bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors overflow-hidden group">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-[#F5F5F5] font-medium mb-1 group-hover:text-[#E67E22] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground text-xs line-clamp-2 mb-2">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-[#E67E22] font-accent font-semibold text-xs">
                          From {service.startingPrice}
                        </p>
                        <p className="text-muted-foreground text-xs">{service.duration}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] tracking-tight">
              Our Process
            </h2>
            <p className="text-muted-foreground text-sm mt-2">How we turn your 4x4 dreams into reality</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="h-full bg-[#2A2A2A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#E67E22] flex items-center justify-center text-[#0D0D0D] font-heading text-lg">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-[#F5F5F5] font-medium mb-1">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Professional */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] tracking-tight mb-6">
                Why Professional Installation?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <benefit.icon className="w-5 h-5 text-[#E67E22] mt-0.5" />
                    <div>
                      <h3 className="text-[#F5F5F5] font-medium text-sm">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button asChild className="mt-8 bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video overflow-hidden border border-[#2A2A2A]"
            >
              <Image
                src="/images/about/workshop.webp"
                alt="Professional Installation"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands - static logo grid. Dark section, no card behind logos.
          Logos are rendered in monochrome white via CSS filter and reveal
          their true colors on hover. */}
      <section className="py-14 md:py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.25em] text-center mb-10 font-accent">
            Brands we install
          </p>
          <BrandLogoCarousel variant="grid" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] tracking-tight">
              FAQ
            </h2>
            <p className="text-muted-foreground text-sm mt-2">Common questions about our services</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-[#2A2A2A]">
                  <AccordionTrigger className="text-left text-[#F5F5F5] hover:text-[#E67E22] text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Upgrade?"
        subtitle="Contact us for a quote or visit our workshop in Swakopmund."
        primaryCTA={{ text: 'Get a Quote', href: '/contact' }}
        secondaryCTA={{ text: 'Call Us', href: `tel:${businessInfo.phone[0].replace(/\s/g, '')}` }}
        variant="dark"
      />
    </div>
  );
}
