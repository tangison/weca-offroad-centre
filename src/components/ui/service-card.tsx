'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Wrench,
  ArrowRight,
  Clock,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  startingPrice: string | null;
  duration: string;
  features?: string[];
  image?: string;
  icon?: string;
  className?: string;
}

export function ServiceCard({
  id,
  name,
  description,
  startingPrice,
  duration,
  features,
  image,
  icon,
  className,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 h-full bg-[#2D2420] border-[#4A3D35] hover:border-[#D97742] overflow-hidden">
        {/* Image Header */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2420] to-transparent" />
          </div>
        )}
        
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
                {!image && (
              <div className="p-3 bg-[#D97742]/20 border border-[#D97742]/30 group-hover:bg-[#D97742]/30 transition-colors">
                <Wrench className="w-6 h-6 text-[#D97742]" />
              </div>
            )}
            <div className={cn("flex-1", !image && "pl-0")}>
              <h3 className="font-semibold text-[#F5EDE6] text-lg mb-1 group-hover:text-[#D97742] transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-[#8B7D6B]">
                <Clock className="w-3.5 h-3.5" />
                <span>{duration}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#C9B9A8] mb-4 line-clamp-2">{description}</p>

          {/* Features List */}
          {features && features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {features.slice(0, 3).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-[#C9B9A8]"
                >
                  <div className="w-1.5 h-1.5 bg-[#D97742]" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Footer with Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-[#4A3D35]">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-[#D97742]" />
              <p className="font-bold text-[#D97742]">
                {startingPrice || 'On Request'}
              </p>
            </div>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-[#D97742] hover:text-[#E89F6D] hover:bg-[#3D322B]"
            >
              <Link href="/contact">
                Get Quote
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ServiceCardCompactProps {
  name: string;
  description: string;
  image?: string;
  icon?: string;
  duration?: string;
  startingPrice?: string | null;
  className?: string;
}

export function ServiceCardCompact({
  name,
  description,
  image,
  icon,
  duration,
  startingPrice,
  className,
}: ServiceCardCompactProps) {
  return (
    <Card className={cn(
      'group hover:shadow-md transition-all duration-300 bg-[#2D2420] border-[#4A3D35] hover:border-[#D97742] overflow-hidden',
      className
    )}>
      {/* Image Header for compact card */}
      {image && (
        <div className="relative h-32 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2420] to-transparent" />
        </div>
      )}
      
      <CardContent className={cn("p-4", image && "pt-2")}>
        <div className="flex items-center gap-3 mb-2">
          {!image && (
            <div className="p-2 bg-[#D97742]/20 border border-[#D97742]/30">
              <Wrench className="w-5 h-5 text-[#D97742]" />
            </div>
          )}
          <h3 className="font-semibold text-[#F5EDE6] group-hover:text-[#D97742] transition-colors">
            {name}
          </h3>
        </div>
        <p className="text-sm text-[#C9B9A8] line-clamp-2">{description}</p>
        
        {(duration || startingPrice) && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#4A3D35]">
            {duration && (
              <div className="flex items-center gap-1 text-xs text-[#8B7D6B]">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
            )}
            {startingPrice && (
              <div className="flex items-center gap-1 text-xs text-[#D97742] font-medium">
                <DollarSign className="w-3 h-3" />
                <span>{startingPrice}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { ServiceCardProps, ServiceCardCompactProps };
