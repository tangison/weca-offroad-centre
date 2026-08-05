import Link from 'next/link';
import Image from 'next/image';
import { businessInfo } from '@/lib/data';

/**
 * Footer — hyper-minimal, Collins-style.
 *
 * Design brief:
 *   - The Weca logo is the dominant visual element, not a small corner mark.
 *   - On mobile it scales up to take the full width / most of the footer.
 *   - On desktop it is significantly larger than a typical footer logo.
 *   - No background plate, card, or container behind the logo.
 *   - Essential contact info is preserved but visually understated so it
 *     does not compete with the big logo.
 *   - Top nav already covers Home, About, Shop, Gallery, Services, Reviews,
 *     Contact — so the footer does NOT repeat those links (cuts visual noise,
 *     not functional info).
 *   - Tangison Studio credit stays small and understated at the very bottom.
 *
 * The footer reads as: big logo, then almost nothing else.
 *
 * Asset note: the logo file (public/images/logo.webp) is 523x477 (near-square,
 * aspect ~1.10:1). The container uses that exact aspect ratio so the logo
 * fills its box edge-to-edge with no empty margins on either side.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`;
  const phoneHref = `tel:${businessInfo.phone[0].replace(/\s/g, '')}`;
  const emailHref = `mailto:${businessInfo.email}`;

  return (
    <footer className="bg-[#0D0D0D] mt-auto">
      {/* Main footer body — logo dominant, contact info understated */}
      <div className="container mx-auto px-6 lg:px-8 pt-16 pb-10 md:pt-24 md:pb-14">
        {/* Big logo — dominant visual element of the footer.
            Container uses the logo's actual aspect ratio (1.10:1, derived
            from the source file 523x477) so object-contain fills edge-to-edge.
            Mobile: full width of the container (reads as "big logo, then
            almost nothing else").
            Desktop: capped at 280px wide — significantly larger than a
            typical footer corner mark, but not so large it dominates the
            whole viewport. */}
        <div className="flex flex-col items-start">
          <Link
            href="/"
            className="block w-[70%] max-w-[280px]"
            aria-label="Weca Offroad Centre — home"
          >
            <div className="relative aspect-[523/477] w-full">
              <Image
                src="/images/logo.webp"
                alt="Weca Offroad Centre"
                fill
                className="object-contain object-left"
                priority={false}
                sizes="(max-width: 768px) 70vw, 280px"
              />
            </div>
          </Link>
        </div>

        {/* Essential contact info — preserved (per standing rule: don't delete
            functional info), but condensed to the minimum vertical footprint
            that still keeps every channel reachable. On mobile this is 2 lines
            (contact channels, then address+hours); on desktop it collapses to
            a single row. Text is xs (11–12px) and low-contrast (#555555) so
            it recedes visually while remaining legible and clickable.
            No border-t above — the whitespace alone separates it from the
            logo, keeping the hyper-minimal feel. */}
        <div className="mt-10">
          <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-5 md:flex-wrap">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={phoneHref}
                className="text-[#555555] hover:text-[#F5F5F5] transition-colors text-[11px] font-body"
              >
                {businessInfo.phone[0]}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555555] hover:text-[#F5F5F5] transition-colors text-[11px] font-body"
              >
                WhatsApp
              </a>
              <a
                href={emailHref}
                className="text-[#555555] hover:text-[#F5F5F5] transition-colors text-[11px] font-body break-all"
              >
                {businessInfo.email}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={businessInfo.maps.directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555555] hover:text-[#F5F5F5] transition-colors text-[11px] font-body"
              >
                {businessInfo.addressStreet}, {businessInfo.city}
              </a>
              <span className="text-[#555555]/70 text-[11px] font-body">
                Mon–Fri {businessInfo.hours.weekdays} · Sat {businessInfo.hours.saturday}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright + Tangison credit.
          Small, understated, does not compete with the big logo. */}
      <div className="border-t border-[#1F1F1F]">
        <div className="container mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
            <p className="text-[#666666]/60 text-[11px] font-body">
              © {currentYear} {businessInfo.name}. All rights reserved.
            </p>
            <a
              href="https://studio.tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666666]/60 hover:text-[#888888] transition-colors text-[11px] font-body inline-flex items-center gap-1.5"
            >
              Made by Tangison Studio
              <span aria-hidden="true" className="inline-block w-3 h-3 align-middle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                  <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
