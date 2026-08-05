'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeroSlideshow } from '@/components/ui/hero-slideshow';
import { ArrowRight, MapPin, Award, Wrench, Truck } from 'lucide-react';
import { products, services, galleryItems, testimonials, businessInfo, heroSlides, brands } from '@/lib/data';

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);
  const featuredServices = services.slice(0, 4);
  const featuredGallery = galleryItems.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <HeroSlideshow
        slides={heroSlides}
        headline="Offroad Excellence"
        subheadline="Namibia's trusted 4x4 specialist. Quality parts, professional fitment, and expert advice for your offroad adventures."
        tagline="Est. 2015 Swakopmund"
        primaryCta={{ text: 'Shop Now', href: '/shop' }}
        secondaryCta={{ text: 'Get a Quote', href: '/contact' }}
        logoSrc="/images/logo.webp"
      />

      {/* Trust Indicators - Minimal */}
      <section className="py-8 border-b border-[#2A2A2A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: MapPin, text: 'Swakopmund', sub: 'Est. 2015' },
              { icon: Award, text: 'Authorized', sub: 'Dealer' },
              { icon: Wrench, text: 'Professional', sub: 'Fitment' },
              { icon: Truck, text: 'Nationwide', sub: 'Delivery' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <item.icon className="w-5 h-5 text-[#E67E22]" />
                <div>
                  <p className="text-[#F5F5F5] text-sm font-medium">{item.text}</p>
                  <p className="text-[#888888] text-xs">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands - Minimal */}
      <section className="py-6 border-b border-[#2A2A2A]">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-[#888888] text-[10px] uppercase tracking-widest text-center mb-4 font-accent">
            Authorized dealer
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {brands.slice(0, 8).map((brand) => (
              <span
                key={brand.name}
                className="text-[#888888] text-xs font-accent uppercase tracking-wider hover:text-[#F5F5F5] transition-colors cursor-pointer"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products - Minimal */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] tracking-tight">
                Featured Products
              </h2>
              <p className="text-[#888888] text-sm mt-2">Quality 4x4 accessories from trusted brands</p>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center text-[#E67E22] hover:text-[#F5F5F5] text-sm font-accent uppercase tracking-wider transition-colors"
            >
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Link href={`/shop?product=${product.id}`}>
                  <Card className="group bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center">
                          <span className="text-[#888888] text-xs font-accent uppercase">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <p className="text-[#E67E22] text-[10px] font-accent uppercase tracking-wider mb-1">
                        {product.brand}
                      </p>
                      <h3 className="text-[#F5F5F5] text-sm font-medium line-clamp-2 group-hover:text-[#E67E22] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[#E67E22] font-accent font-semibold text-sm mt-2">
                        {product.price}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Button asChild variant="outline" className="border-[#2A2A2A] text-[#F5F5F5] hover:border-[#E67E22] font-accent uppercase tracking-wider">
              <Link href="/shop">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services - Minimal */}
      <section className="py-16 md:py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] tracking-tight">
                Our Services
              </h2>
              <p className="text-[#888888] text-sm mt-2">Professional fitment and installation</p>
            </div>
            <Link
              href="/services"
              className="hidden md:inline-flex items-center text-[#E67E22] hover:text-[#F5F5F5] text-sm font-accent uppercase tracking-wider transition-colors"
            >
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href="/services">
                  <Card className="group bg-[#2A2A2A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors overflow-hidden h-full">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A] to-transparent" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-[#F5F5F5] font-medium mb-1 group-hover:text-[#E67E22] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-[#888888] text-xs line-clamp-2 mb-2">
                        {service.description}
                      </p>
                      <p className="text-[#E67E22] font-accent font-semibold text-xs">
                        From {service.startingPrice}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Minimal */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] tracking-tight">
                Our Work
              </h2>
              <p className="text-[#888888] text-sm mt-2">Real installations, real results</p>
            </div>
            <Link
              href="/gallery"
              className="hidden md:inline-flex items-center text-[#E67E22] hover:text-[#F5F5F5] text-sm font-accent uppercase tracking-wider transition-colors"
            >
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {featuredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Link href="/gallery">
                  <Card className="group bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-[#E67E22] text-[9px] font-accent uppercase tracking-wider mb-0.5">
                          {item.category.replace('-', ' ')}
                        </p>
                        <h3 className="text-[#F5F5F5] text-sm font-medium line-clamp-1">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Minimal */}
      <section className="py-16 md:py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] tracking-tight">
              Why Weca Offroad?
            </h2>
            <p className="text-[#888888] text-sm mt-2">Your trusted 4x4 partner in Namibia</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Price Match',
                desc: 'We beat any written quotation in Namibia.',
              },
              {
                title: 'Expert Fitment',
                desc: 'Professional installation by trained technicians.',
              },
              {
                title: 'Quality Parts',
                desc: 'Only trusted brands we would use ourselves.',
              },
              {
                title: 'After-Sales',
                desc: 'Ongoing support and expert advice.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full bg-[#2A2A2A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-[#F5F5F5] font-medium text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#888888] text-sm">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-16 md:py-20 bg-[#E67E22]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-[#0D0D0D] tracking-tight mb-4">
            Ready to Upgrade Your 4x4?
          </h2>
          <p className="text-[#0D0D0D]/70 text-sm mb-8 max-w-xl mx-auto">
            Visit our store in Swakopmund or contact us for a quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0D0D0D] hover:bg-[#1A1A1A] text-[#F5F5F5] font-accent font-semibold uppercase tracking-wider text-sm px-8 py-4 transition-colors"
            >
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-[#0D0D0D] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:bg-[#0D0D0D]/10 transition-colors"
            >
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
