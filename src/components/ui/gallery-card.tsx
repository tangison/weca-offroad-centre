'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Car, CheckCircle, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface GalleryCardProps {
  id: string;
  title: string;
  category: string;
  vehicle: string;
  description: string;
  image: string;
  workDone: string[];
  date: string;
  className?: string;
}

export function GalleryCard({
  title,
  category,
  vehicle,
  description,
  image,
  workDone,
  date,
  className,
}: GalleryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        <Card
          className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 bg-brand-bg-secondary border-brand-bg-elevated"
          onClick={() => setIsOpen(true)}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg-tertiary">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category Badge - shows on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Badge className="bg-brand-accent-primary text-brand-text-primary border-none">
                {category.replace('-', ' ')}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-brand-text-primary mb-1 group-hover:text-brand-accent-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-brand-text-muted flex items-center gap-1">
              <Car className="w-3 h-3" />
              {vehicle}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Detail Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-brand-bg-primary border-brand-bg-elevated">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-brand-text-muted hover:text-brand-text-primary transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="aspect-video w-full overflow-hidden bg-brand-bg-tertiary mb-4">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-brand-accent-primary text-brand-text-primary border-none">
                {category.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="text-brand-text-muted border-brand-bg-elevated">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(date).toLocaleDateString('en-NA', {
                  year: 'numeric',
                  month: 'long',
                })}
              </Badge>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-brand-text-primary">{title}</h2>

            {/* Vehicle */}
            <p className="text-brand-text-secondary flex items-center gap-2">
              <Car className="w-4 h-4 text-brand-accent-primary" />
              {vehicle}
            </p>

            {/* Description */}
            <p className="text-brand-text-secondary">{description}</p>

            {/* Work Done List */}
            <div>
              <h4 className="font-semibold text-brand-text-primary mb-3">Work Completed:</h4>
              <ul className="space-y-2">
                {workDone.map((work, index) => (
                  <li key={index} className="flex items-center gap-2 text-brand-text-secondary">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {work}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-brand-bg-elevated">
              <Button
                asChild
                className="bg-brand-accent-primary hover:bg-brand-accent-secondary text-brand-text-primary font-semibold"
              >
                <Link href="/contact">
                  Request Similar Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface GalleryCardCompactProps {
  title: string;
  category: string;
  image: string;
  vehicle?: string;
  className?: string;
}

export function GalleryCardCompact({
  title,
  category,
  image,
  vehicle,
  className,
}: GalleryCardCompactProps) {
  return (
    <Card className={cn(
      'group overflow-hidden hover:shadow-md transition-all duration-300 bg-brand-bg-secondary border-brand-bg-elevated',
      className
    )}>
      <div className="relative aspect-square overflow-hidden bg-brand-bg-tertiary">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-primary/70 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <Badge className="bg-brand-accent-primary text-brand-text-primary text-xs border-none">
            {category.replace('-', ' ')}
          </Badge>
          {vehicle && (
            <p className="text-xs text-brand-text-secondary mt-1 truncate">{vehicle}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export type { GalleryCardProps, GalleryCardCompactProps };
