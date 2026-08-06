'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { CTASection } from '@/components/ui/cta-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, ExternalLink } from 'lucide-react';
import { testimonials, businessInfo } from '@/lib/data';
import { GoogleReviewsEmbed } from '@/components/ui/google-reviews-embed';

export default function TestimonialsPage() {
  const [filterService, setFilterService] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Get unique services from testimonials
  const serviceTypes = ['all', ...new Set(testimonials.map((t) => t.service))];

  // Filter and sort testimonials
  const filteredTestimonials = testimonials
    .filter((t) => filterService === 'all' || t.service === filterService)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Calculate average rating
  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: testimonials.filter((t) => t.rating === rating).length,
    percentage: (testimonials.filter((t) => t.rating === rating).length / testimonials.length) * 100,
  }));

  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Customer Reviews"
        subtitle="What our customers say about Weca Offroad Centre"
        backgroundImage="/images/gallery/gallery-2.webp"
        size="sm"
      />

      {/* Stats Summary */}
      <section className="py-8 bg-[#2D2420] border-b border-[#4A3D35]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-5 h-5 text-[#D97742] fill-[#D97742]" />
                <span className="text-3xl font-bold text-[#F5EDE6]">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-[#8B7D6B]">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#F5EDE6]">
                {testimonials.length}+
              </p>
              <p className="text-sm text-[#8B7D6B]">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#F5EDE6]">100%</p>
              <p className="text-sm text-[#8B7D6B]">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Google Reviews — live iframe */}
      <section className="py-12 md:py-16 bg-[#1A1512] border-b border-[#4A3D35]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-[#F5EDE6] mb-3">
              Real Reviews from Google
            </h2>
            <p className="text-[#8B7D6B] text-sm max-w-2xl mx-auto">
              These are live reviews written by real customers on our Google
              Maps listing. We cannot edit or remove them. Click inside the
              map to read them in full, or write your own.
            </p>
          </div>
          <GoogleReviewsEmbed />
        </div>
      </section>

      {/* Review Summary */}
      <section className="py-12 md:py-16 bg-[#1A1512]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Rating Distribution */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-[#2D2420] border-[#4A3D35]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#F5EDE6] mb-4 uppercase tracking-wide text-sm">
                    Rating Breakdown
                  </h3>
                  <div className="space-y-2">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm text-[#8B7D6B]">{rating}</span>
                          <Star className="w-3 h-3 text-[#D97742] fill-[#D97742]" />
                        </div>
                        <div className="flex-1 h-2 bg-[#3D322B] overflow-hidden">
                          <div
                            className="h-full bg-[#D97742]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#8B7D6B] w-6">{count}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#4A3D35]">
                    <h4 className="font-medium text-[#F5EDE6] mb-3 text-sm uppercase tracking-wide">Filter By</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-[#8B7D6B] mb-1 block">
                          Service Type
                        </label>
                        <Select value={filterService} onValueChange={setFilterService}>
                          <SelectTrigger className="w-full bg-[#3D322B] border-[#4A3D35] text-[#F5EDE6]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2D2420] border-[#4A3D35]">
                            {serviceTypes.map((service) => (
                              <SelectItem key={service} value={service} className="text-[#F5EDE6] hover:bg-[#3D322B]">
                                {service === 'all' ? 'All Services' : service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm text-[#8B7D6B] mb-1 block">
                          Sort By
                        </label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-full bg-[#3D322B] border-[#4A3D35] text-[#F5EDE6]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2D2420] border-[#4A3D35]">
                            <SelectItem value="recent" className="text-[#F5EDE6] hover:bg-[#3D322B]">Most Recent</SelectItem>
                            <SelectItem value="rating" className="text-[#F5EDE6] hover:bg-[#3D322B]">Highest Rated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#4A3D35]">
                    <p className="text-sm text-[#8B7D6B] mb-3">
                      Had a great experience? Share it with others!
                    </p>
                    <Button asChild className="w-full bg-[#D97742] hover:bg-[#E89F6D] text-[#1A1512] font-bold">
                      <a
                        href={businessInfo.maps.reviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Leave a Review
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Testimonials Grid — curated placeholder reviews, to be replaced
                by real Google reviews once the client provides them. The
                Google reviews iframe above is the source of truth for live
                customer reviews. */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h3 className="font-heading text-2xl text-[#F5EDE6] mb-2">
                  Featured Customer Stories
                </h3>
                <p className="text-[#8B7D6B] text-sm">
                  A selection of customer experiences. For the full set of
                  live reviews, see the Google map above.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full bg-[#2D2420] border-[#4A3D35] hover:border-[#D97742] transition-colors">
                      <CardContent className="p-6">
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? 'text-[#D97742] fill-[#D97742]'
                                  : 'text-[#4A3D35]'
                              }`}
                            />
                          ))}
                        </div>
                        
                        {/* Quote */}
                        <p className="text-[#C9B9A8] text-sm mb-6 leading-relaxed">
                          &quot;{testimonial.text}&quot;
                        </p>
                        
                        {/* Author */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#D97742]/20 flex items-center justify-center">
                            <span className="text-[#D97742] font-bold text-sm">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-[#F5EDE6] font-semibold text-sm">
                              {testimonial.name}
                            </p>
                            <p className="text-[#8B7D6B] text-xs">
                              {testimonial.location}
                            </p>
                          </div>
                        </div>

                        {/* Service and Vehicle */}
                        <div className="mt-4 pt-4 border-t border-[#4A3D35] flex flex-wrap gap-2">
                          <span className="text-xs bg-[#3D322B] text-[#C9B9A8] px-2 py-1">
                            {testimonial.service}
                          </span>
                          <span className="text-xs bg-[#3D322B] text-[#C9B9A8] px-2 py-1">
                            {testimonial.vehicle}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredTestimonials.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#8B7D6B]">No reviews match your filter.</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-[#D97742] text-[#D97742]"
                    onClick={() => setFilterService('all')}
                  >
                    Show All Reviews
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Response Section */}
      <section className="py-12 md:py-16 bg-[#2D2420]">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="bg-[#D97742]/10 border-[#D97742]/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-[#F5EDE6] mb-4">
                We Value Every Review
              </h3>
              <p className="text-[#C9B9A8] max-w-2xl mx-auto">
                Every piece of feedback helps us improve. We read and respond to all 
                reviews, and we are committed to addressing any concerns promptly. 
                Your experience matters to us.
              </p>
              <Button asChild variant="outline" className="mt-6 border-[#D97742] text-[#D97742] hover:bg-[#D97742] hover:text-[#1A1512] font-bold">
                <Link href="/contact">
                  Share Your Experience
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Join Our Happy Customers"
        subtitle="Experience the Weca Offroad difference. Quality products, professional service, and customer satisfaction guaranteed."
        primaryCTA={{ text: 'Get Started', href: '/contact' }}
        secondaryCTA={{ text: 'Browse Shop', href: '/shop' }}
        variant="dark"
      />
    </div>
  );
}
