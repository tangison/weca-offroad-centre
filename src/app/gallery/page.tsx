'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { CTASection } from '@/components/ui/cta-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { galleryItems, galleryCategories, businessInfo } from '@/lib/data';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  // Filter gallery items
  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Featured projects (first 3)
  const featuredProjects = galleryItems.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Our Work"
        subtitle="Real installations, real results. See what we have built for our customers."
        backgroundImage="/images/gallery/gallery-1.jpg"
        size="sm"
      />

      {/* Stats */}
      <section className="py-8 bg-[#2D2420] border-b border-[#4A3D35]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#D97742]">500+</p>
              <p className="text-sm text-[#8B7D6B]">Installations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#D97742]">50+</p>
              <p className="text-sm text-[#8B7D6B]">Full Builds</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#D97742]">100%</p>
              <p className="text-sm text-[#8B7D6B]">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-[#4A3D35] sticky top-16 bg-[#1A1512] z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? 'bg-[#D97742] hover:bg-[#E89F6D] text-[#1A1512] font-bold'
                    : 'border-[#4A3D35] text-[#C9B9A8] hover:text-[#D97742] hover:border-[#D97742]'
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16 bg-[#1A1512]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer"
              >
                <Card className="group bg-[#2D2420] border-[#4A3D35] hover:border-[#D97742] transition-colors overflow-hidden h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512]/90 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[#D97742] text-xs font-bold uppercase tracking-wide mb-1">
                        {item.category.replace('-', ' ')}
                      </p>
                      <h3 className="text-[#F5EDE6] font-semibold text-sm line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[#8B7D6B] text-xs mt-1">{item.vehicle}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#8B7D6B]">No projects found in this category.</p>
              <Button
                variant="outline"
                className="mt-4 border-[#D97742] text-[#D97742]"
                onClick={() => setSelectedCategory('all')}
              >
                View All Projects
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-[#2D2420]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Featured Builds"
            subtitle="Complete vehicle transformations by our team"
            light
          />

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-[#3D322B] border-[#4A3D35] hover:border-[#D97742] transition-colors h-full">
                  <div className="relative aspect-video">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#D97742] text-[#1A1512] px-3 py-1 text-xs font-bold uppercase">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#F5EDE6] text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#8B7D6B] mb-3">
                      {project.vehicle}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.workDone.slice(0, 3).map((work, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#2D2420] text-[#C9B9A8] px-2 py-1"
                        >
                          {work}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Vehicles */}
      <section className="py-16 md:py-24 bg-[#1A1512]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Customer Vehicles"
            subtitle="Share your Weca Offroad build with us!"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden border border-[#4A3D35] hover:border-[#D97742] transition-colors"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-[#8B7D6B] mb-4">
              Want your vehicle featured? Tag us on social media or send us your photos!
            </p>
            <Button className="bg-[#D97742] hover:bg-[#E89F6D] text-[#1A1512] font-bold" asChild>
              <a
                href={businessInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Camera className="w-4 h-4 mr-2" />
                Tag Us @wecaoffroad
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Your Build?"
        subtitle="Let us help you transform your 4x4 into the ultimate adventure machine."
        primaryCTA={{ text: 'Get a Quote', href: '/contact' }}
        secondaryCTA={{ text: 'View Services', href: '/services' }}
        variant="dark"
      />

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1512]/95 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#2D2420] border border-[#4A3D35] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[#1A1512] text-[#F5EDE6] hover:text-[#D97742] transition-colors"
            >
              X
            </button>
            <div className="relative aspect-video">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-[#D97742] text-xs font-bold uppercase tracking-wide mb-1">
                {selectedItem.category.replace('-', ' ')}
              </p>
              <h3 className="text-2xl font-bold text-[#F5EDE6] mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-[#8B7D6B] mb-4">{selectedItem.vehicle}</p>
              <p className="text-[#C9B9A8] mb-4">{selectedItem.description}</p>
              <div>
                <h4 className="text-[#F5EDE6] font-semibold mb-2">Work Done:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.workDone.map((work, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#3D322B] text-[#C9B9A8] px-3 py-1"
                    >
                      {work}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
