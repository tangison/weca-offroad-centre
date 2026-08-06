'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CTAButton {
  text: string;
  href: string;
}

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  variant?: 'primary' | 'secondary' | 'dark';
  className?: string;
}

export function CTASection({
  title,
  subtitle,
  primaryCTA = { text: 'Contact Us', href: '/contact' },
  secondaryCTA = { text: 'WhatsApp Us', href: 'https://wa.me/264811691942' },
  variant = 'dark',
  className,
}: CTASectionProps) {
  const isPrimary = variant === 'primary';

  return (
    <section
      className={cn(
        'py-12 md:py-16 relative',
        isPrimary ? 'bg-[#E67E22]' : 'bg-[#0D0D0D]',
        className
      )}
    >
      {/* Top line */}
      {!isPrimary && <div className="absolute top-0 left-0 right-0 h-px bg-[#2A2A2A]" />}

      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            'font-heading text-2xl md:text-3xl lg:text-4xl tracking-tight mb-3',
            isPrimary ? 'text-[#0D0D0D]' : 'text-[#F5F5F5]'
          )}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={cn(
              'text-sm md:text-base mb-8 max-w-xl mx-auto',
              isPrimary ? 'text-[#0D0D0D]/70' : 'text-muted-foreground'
            )}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href={primaryCTA.href}
            className={cn(
              'inline-flex items-center justify-center font-accent font-semibold uppercase tracking-wider text-sm px-8 py-4 transition-colors',
              isPrimary
                ? 'bg-[#0D0D0D] text-[#F5F5F5] hover:bg-[#1A1A1A]'
                : 'bg-[#E67E22] text-[#0D0D0D] hover:bg-[#F39C12]'
            )}
          >
            {primaryCTA.text}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href={secondaryCTA.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center justify-center font-accent font-semibold uppercase tracking-wider text-sm px-8 py-4 transition-colors',
              isPrimary
                ? 'border border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D]/10'
                : 'border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#E67E22]'
            )}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {secondaryCTA.text}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export type { CTASectionProps };
