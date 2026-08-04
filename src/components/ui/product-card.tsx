'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: string | null;
  image: string;
  inStock: boolean;
  category?: string;
  className?: string;
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  image,
  inStock,
  category,
  className,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full bg-brand-bg-secondary border-brand-bg-elevated">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg-tertiary">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-brand-bg-primary/70 flex items-center justify-center">
              <span className="bg-brand-bg-tertiary text-brand-text-primary px-3 py-1 text-sm font-medium border border-brand-bg-elevated">
                Out of Stock
              </span>
            </div>
          )}

          {/* In Stock Indicator */}
          {inStock && (
            <div className="absolute top-3 right-3">
              <span className="bg-green-600/90 text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                In Stock
              </span>
            </div>
          )}

          {/* Brand Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-brand-accent-primary text-brand-text-primary text-xs font-medium border-none">
              {brand}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {category && (
            <p className="text-xs text-brand-text-muted uppercase tracking-wide mb-1">
              {category.replace('-', ' ')}
            </p>
          )}
          
          <h3 className="font-semibold text-brand-text-primary mb-2 line-clamp-2 group-hover:text-brand-accent-primary transition-colors">
            {name}
          </h3>

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-brand-bg-elevated">
            <p className="font-bold text-brand-accent-primary text-lg">
              {price || 'Request Quote'}
            </p>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-brand-accent-primary hover:text-brand-accent-secondary hover:bg-brand-bg-tertiary"
            >
              <Link href={`/shop#${id}`}>
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ProductCardCompactProps {
  id: string;
  name: string;
  brand: string;
  price: string | null;
  image: string;
  inStock: boolean;
  className?: string;
}

export function ProductCardCompact({
  id,
  name,
  brand,
  price,
  image,
  inStock,
  className,
}: ProductCardCompactProps) {
  return (
    <Link href={`/shop#${id}`} className={cn('block', className)}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full bg-brand-bg-secondary border-brand-bg-elevated">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg-tertiary">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          
          {!inStock && (
            <div className="absolute inset-0 bg-brand-bg-primary/50 flex items-center justify-center">
              <span className="bg-brand-bg-tertiary text-brand-text-primary px-2 py-1 text-xs font-medium border border-brand-bg-elevated">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-3">
          <p className="text-xs text-brand-accent-primary font-medium mb-1">{brand}</p>
          <h3 className="font-semibold text-brand-text-primary text-sm line-clamp-2 mb-1 group-hover:text-brand-accent-primary transition-colors">
            {name}
          </h3>
          <p className="font-bold text-brand-text-secondary text-sm">
            {price || 'Request Quote'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export type { ProductCardProps, ProductCardCompactProps };
