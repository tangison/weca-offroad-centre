'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, MapPin, Car, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  vehicle: string;
  date?: string;
  className?: string;
}

export function TestimonialCard({
  name,
  location,
  rating,
  text,
  service,
  vehicle,
  date,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 bg-brand-bg-secondary border-brand-bg-elevated">
        <CardContent className="p-6">
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < rating
                    ? 'text-brand-accent-primary fill-brand-accent-primary'
                    : 'text-brand-bg-elevated'
                )}
              />
            ))}
            {date && (
              <span className="ml-auto text-xs text-brand-text-muted">
                {new Date(date).toLocaleDateString('en-NA', {
                  year: 'numeric',
                  month: 'short',
                })}
              </span>
            )}
          </div>

          {/* Quote Icon */}
          <Quote className="w-8 h-8 text-brand-accent-primary/30 mb-2" />

          {/* Review Text */}
          <p className="text-brand-text-secondary mb-4 line-clamp-4 italic">
            "{text}"
          </p>

          {/* Customer Info */}
          <div className="pt-4 border-t border-brand-bg-elevated">
            <p className="font-semibold text-brand-text-primary">{name}</p>
            <p className="text-sm text-brand-text-muted flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </p>

            {/* Service and Vehicle Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className="bg-brand-accent-primary/20 text-brand-accent-primary border border-brand-accent-primary/30 text-xs">
                <Wrench className="w-3 h-3 mr-1" />
                {service}
              </Badge>
              <Badge className="bg-brand-bg-tertiary text-brand-text-secondary border border-brand-bg-elevated text-xs">
                <Car className="w-3 h-3 mr-1" />
                {vehicle}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface TestimonialCardCompactProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  service?: string;
  vehicle?: string;
  className?: string;
}

export function TestimonialCardCompact({
  name,
  location,
  rating,
  text,
  service,
  vehicle,
  className,
}: TestimonialCardCompactProps) {
  return (
    <Card className={cn(
      'h-full bg-brand-bg-secondary border-brand-bg-elevated',
      className
    )}>
      <CardContent className="p-4">
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-3 h-3',
                i < rating
                  ? 'text-brand-accent-primary fill-brand-accent-primary'
                  : 'text-brand-bg-elevated'
              )}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-sm text-brand-text-secondary mb-3 line-clamp-3 italic">
          "{text}"
        </p>

        {/* Customer Info */}
        <div>
          <p className="font-semibold text-brand-text-primary text-sm">{name}</p>
          <p className="text-xs text-brand-text-muted">{location}</p>
        </div>

        {/* Optional Service and Vehicle */}
        {(service || vehicle) && (
          <div className="flex flex-wrap gap-1 mt-2">
            {service && (
              <span className="text-xs bg-brand-accent-primary/20 text-brand-accent-primary px-2 py-0.5">
                {service}
              </span>
            )}
            {vehicle && (
              <span className="text-xs bg-brand-bg-tertiary text-brand-text-muted px-2 py-0.5">
                {vehicle}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { TestimonialCardProps, TestimonialCardCompactProps };
