import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { businessInfo } from '@/lib/data';

// TikTok Icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

// Minimal link set per footer rebuild brief
const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#2A2A2A] mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand + Social */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-10 w-32">
                <Image
                  src="/images/logo.webp"
                  alt="Weca Offroad Centre"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-[#888888] text-sm mb-5 max-w-xs">
              {businessInfo.tagline}. Quality 4x4 accessories, professional fitment, and expert advice.
            </p>
            <div className="flex gap-2">
              <a
                href={businessInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-[#888888] hover:text-[#E67E22] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={businessInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-[#888888] hover:text-[#E67E22] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" strokeWidth="2" />
                </svg>
              </a>
              <a
                href={businessInfo.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-[#888888] hover:text-[#E67E22] transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${businessInfo.whatsapp.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-[#888888] hover:text-[#E67E22] transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#F5F5F5] font-accent text-xs uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-[#888888] hover:text-[#F5F5F5] transition-colors text-sm py-1 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={businessInfo.maps.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888888] hover:text-[#F5F5F5] transition-colors text-sm py-1 block"
                >
                  Leave a Review
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#F5F5F5] font-accent text-xs uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E67E22] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#888888] text-sm block">
                    {businessInfo.address}
                  </span>
                  <span className="text-[#888888]/60 text-xs">
                    {businessInfo.city}, {businessInfo.country}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                <a
                  href={`tel:${businessInfo.phone[0].replace(/\s/g, '')}`}
                  className="text-[#888888] hover:text-[#F5F5F5] transition-colors text-sm"
                >
                  {businessInfo.phone[0]}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-[#888888] hover:text-[#F5F5F5] transition-colors text-sm break-all"
                >
                  {businessInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E67E22] flex-shrink-0 mt-0.5" />
                <div className="text-[#888888] text-sm space-y-0.5">
                  <p>Mon-Fri: {businessInfo.hours.weekdays}</p>
                  <p>Sat: {businessInfo.hours.saturday}</p>
                  <p>Sun: {businessInfo.hours.sunday}</p>
                </div>
              </li>
            </ul>
            <a
              href={businessInfo.maps.directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#1A1A1A] text-[#888888] hover:text-[#F5F5F5] transition-colors text-sm"
            >
              <MapPin className="w-3 h-3" />
              Get Directions
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2A2A2A]">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#888888]/60 text-xs text-center md:text-left">
              © {currentYear} {businessInfo.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs">
              <Link href="/privacy" className="text-[#888888]/60 hover:text-[#888888] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-[#888888]/60 hover:text-[#888888] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Credit — Made by Tangison Studio */}
      <div className="bg-[#E67E22]">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <a
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[#0D0D0D] hover:opacity-90 transition-opacity group"
          >
            <span className="font-heading text-sm tracking-wide">
              Made by Tangison Studio
            </span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
}
