'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
  showAccent?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
  showAccent = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        'mb-8 md:mb-10',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        align === 'right' && 'text-right',
        className
      )}
    >
      {/* Minimal accent line */}
      {showAccent && align === 'center' && (
        <div className="w-8 h-px bg-[#E67E22] mx-auto mb-4" />
      )}

      <h2
        className={cn(
          'font-heading text-2xl md:text-3xl lg:text-4xl tracking-tight',
          light ? 'text-[#F5F5F5]' : 'text-[#F5F5F5]'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-sm md:text-base max-w-xl mt-2',
            align === 'center' && 'mx-auto',
            align === 'left' && 'mr-auto',
            align === 'right' && 'ml-auto',
            light ? 'text-muted-foreground' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export type { SectionHeadingProps };
