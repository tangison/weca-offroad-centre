import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Home, ShoppingBag, Mail, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative w-32 h-16 mx-auto">
            <Image
              src="/images/logo.png"
              alt="Weca Offroad Centre"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 404 */}
        <h1 className="font-heading text-8xl md:text-9xl text-[#E67E22] mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] mb-4">
          Page Not Found
        </h2>
        <p className="text-[#888888] text-sm mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button asChild className="bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-[#2A2A2A] text-[#F5F5F5] hover:border-[#E67E22] font-accent uppercase tracking-wider">
            <Link href="/shop">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Shop
            </Link>
          </Button>
        </div>

        {/* Secondary Links */}
        <div className="border-t border-[#2A2A2A] pt-6">
          <p className="text-[#888888] text-xs mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="text-[#888888] hover:text-[#E67E22] transition-colors">
              Services
            </Link>
            <Link href="/gallery" className="text-[#888888] hover:text-[#E67E22] transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-[#888888] hover:text-[#E67E22] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Help text */}
        <p className="mt-8 text-[#888888]/60 text-xs">
          Need help?{' '}
          <a
            href="https://wa.me/264811691942"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E67E22] hover:underline"
          >
            WhatsApp us
          </a>
        </p>
      </div>
    </div>
  );
}
