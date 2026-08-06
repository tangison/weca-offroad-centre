'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Phone, MessageCircle, Mail, Search } from 'lucide-react';
import { businessInfo, shopCategories } from '@/lib/data';
import { SearchDialog } from '@/components/ui/search-dialog';
import { ConstructionBanner } from '@/components/layout/construction-banner';
import { siteConfig } from '@/lib/config';

// TikTok Icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/services', label: 'Services' },
];

const moreLinks = [
  { href: '/testimonials', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const shopHoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const moreHoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsShopDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileShopOpen(false);
    setIsMobileMoreOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close dropdowns on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShopDropdownOpen(false);
        setIsMoreDropdownOpen(false);
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Shop hover handlers with delay
  const handleShopMouseEnter = () => {
    if (shopHoverTimeout.current) {
      clearTimeout(shopHoverTimeout.current);
    }
    setIsShopDropdownOpen(true);
  };

  const handleShopMouseLeave = () => {
    shopHoverTimeout.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 150);
  };

  // More hover handlers with delay
  const handleMoreMouseEnter = () => {
    if (moreHoverTimeout.current) {
      clearTimeout(moreHoverTimeout.current);
    }
    setIsMoreDropdownOpen(true);
  };

  const handleMoreMouseLeave = () => {
    moreHoverTimeout.current = setTimeout(() => {
      setIsMoreDropdownOpen(false);
    }, 150);
  };

  const isActive = (href: string) => pathname === href;

  // Desktop dropdown vertical offset. The dropdowns are position:fixed
  // relative to the viewport, so their `top` must account for the full
  // header height (banner + nav row). The construction banner adds ~30px
  // when the underConstruction flag is on; the offset is computed at build
  // time from the config flag so flipping the flag adjusts the dropdowns
  // automatically with no separate edit required.
  const dropdownTop = siteConfig.features.underConstruction ? 'top-[98px]' : 'top-[68px]';

  return (
    <>
      {/* Header - fixed. Contains the optional construction banner (slim
          strip at the very top) and the nav row below it. The two are
          wrapped in a single fixed container so they move as one unit
          and share z-50 stacking. */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Construction banner - conditional on siteConfig.features.underConstruction.
            Rendered above the nav row so it is the first thing visible.
            Not dismissible; stays for the whole visit while the flag is on. */}
        <ConstructionBanner />

        {/* Nav row - carries the scroll-state bg/padding (was previously on
            the <header> itself; moved here when the banner was added so the
            banner can have its own bg independent of scroll state). */}
        <div
          className={`transition-all duration-200 ${
            isScrolled
              ? 'bg-[#0D0D0D]/98 backdrop-blur-sm border-b border-[#2A2A2A] py-3'
              : 'bg-transparent py-4'
          }`}
        >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <div className="relative h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-44">
                <Image
                  src="/images/logo.webp"
                  alt="Weca Offroad Centre"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.label === 'Shop') {
                  return (
                    <div 
                      key={link.href} 
                      className="relative" 
                      ref={dropdownRef}
                      onMouseEnter={handleShopMouseEnter}
                      onMouseLeave={handleShopMouseLeave}
                    >
                      <button
                        onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                        className={`flex items-center gap-1 px-4 py-2 text-xs font-accent uppercase tracking-wider transition-colors ${
                          isActive(link.href) || pathname.startsWith('/shop')
                            ? 'text-[#E67E22]'
                            : 'text-[#F5F5F5] hover:text-[#E67E22]'
                        }`}
                        aria-expanded={isShopDropdownOpen}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-150 ${
                            isShopDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-xs font-accent uppercase tracking-wider transition-colors ${
                      isActive(link.href)
                        ? 'text-[#E67E22]'
                        : 'text-[#F5F5F5] hover:text-[#E67E22]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div 
                className="relative" 
                ref={moreDropdownRef}
                onMouseEnter={handleMoreMouseEnter}
                onMouseLeave={handleMoreMouseLeave}
              >
                <button
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                  className={`flex items-center gap-1 px-4 py-2 text-xs font-accent uppercase tracking-wider transition-colors ${
                    moreLinks.some(l => isActive(l.href))
                      ? 'text-[#E67E22]'
                      : 'text-[#F5F5F5] hover:text-[#E67E22]'
                  }`}
                  aria-expanded={isMoreDropdownOpen}
                  aria-haspopup="true"
                >
                  More
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-150 ${
                      isMoreDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-muted-foreground hover:text-[#F5F5F5] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="btn-pill inline-flex items-center justify-center bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-xs px-6 py-3 transition-colors"
              >
                Get A Quote
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-muted-foreground hover:text-[#F5F5F5] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#F5F5F5] hover:text-[#E67E22] transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
        </div>
      </header>

      {/* Desktop Shop Dropdown */}
      <AnimatePresence>
        {isShopDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className={`fixed ${dropdownTop} left-1/2 -translate-x-1/2 z-40 hidden lg:block`}
            onMouseEnter={handleShopMouseEnter}
            onMouseLeave={handleShopMouseLeave}
          >
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 min-w-[500px]">
              <div className="grid grid-cols-2 gap-8">
                {/* Categories */}
                <div>
                  <h3 className="text-[#E67E22] text-[10px] font-accent uppercase tracking-wider mb-4">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {shopCategories.slice(0, 6).map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="block text-muted-foreground hover:text-[#F5F5F5] hover:bg-[#2A2A2A] px-3 py-2 text-sm transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="border-l border-[#2A2A2A] pl-6">
                  <h3 className="text-[#E67E22] text-[10px] font-accent uppercase tracking-wider mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/shop"
                      onClick={() => setIsShopDropdownOpen(false)}
                      className="flex items-center gap-2 text-[#F5F5F5] hover:text-[#E67E22] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span className="text-sm">View All Products</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsShopDropdownOpen(false)}
                      className="flex items-center gap-2 text-[#F5F5F5] hover:text-[#E67E22] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span className="text-sm">Need Help Choosing?</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop More Dropdown */}
      <AnimatePresence>
        {isMoreDropdownOpen && (
          <motion.div
            ref={moreDropdownRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className={`fixed ${dropdownTop} right-[calc((100vw-1280px)/2+32px)] z-40 hidden lg:block`}
            onMouseEnter={handleMoreMouseEnter}
            onMouseLeave={handleMoreMouseLeave}
          >
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-2 min-w-[160px]">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMoreDropdownOpen(false)}
                  className={`block px-4 py-3 text-sm transition-colors ${
                    isActive(link.href)
                      ? 'text-[#E67E22] bg-[#2A2A2A]'
                      : 'text-muted-foreground hover:text-[#F5F5F5] hover:bg-[#2A2A2A]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Off-Canvas Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 lg:hidden bg-[#0D0D0D]/95"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs z-50 lg:hidden bg-[#0D0D0D] border-l border-[#2A2A2A] flex flex-col"
            >
              {/* Top */}
              <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
                <Link href="/" onClick={handleLinkClick}>
                  <div className="relative h-10 w-28">
                    <Image
                      src="/images/logo.webp"
                      alt="Weca Offroad Centre"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#F5F5F5] hover:text-[#E67E22] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-2">
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    if (link.label === 'Shop') {
                      return (
                        <li key={link.href}>
                          <button
                            onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                            className={`w-full flex items-center justify-between py-3 px-4 text-left text-base font-accent uppercase tracking-wider transition-colors ${
                              pathname.startsWith('/shop')
                                ? 'text-[#E67E22]'
                                : 'text-[#F5F5F5] hover:text-[#E67E22]'
                            }`}
                          >
                            {link.label}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-150 ${
                                isMobileShopOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isMobileShopOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="overflow-hidden pl-2"
                              >
                                {shopCategories.slice(0, 6).map((category) => (
                                  <li key={category.id}>
                                    <Link
                                      href={category.href}
                                      onClick={handleLinkClick}
                                      className="block py-2.5 px-4 text-muted-foreground hover:text-[#F5F5F5] transition-colors text-sm"
                                    >
                                      {category.name}
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link
                                    href="/shop"
                                    onClick={handleLinkClick}
                                    className="block py-2.5 px-4 text-[#E67E22] font-medium text-sm"
                                  >
                                    View All Products
                                  </Link>
                                </li>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={handleLinkClick}
                          className={`block py-3 px-4 text-base font-accent uppercase tracking-wider transition-colors ${
                            isActive(link.href)
                              ? 'text-[#E67E22]'
                              : 'text-[#F5F5F5] hover:text-[#E67E22]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}

                  {/* More Section */}
                  <li>
                    <button
                      onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
                      className={`w-full flex items-center justify-between py-3 px-4 text-left text-base font-accent uppercase tracking-wider transition-colors ${
                        moreLinks.some(l => isActive(l.href))
                          ? 'text-[#E67E22]'
                          : 'text-[#F5F5F5] hover:text-[#E67E22]'
                      }`}
                    >
                      More
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-150 ${
                          isMobileMoreOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isMobileMoreOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden pl-2"
                        >
                          {moreLinks.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={handleLinkClick}
                                className={`block py-2.5 px-4 text-sm transition-colors ${
                                  isActive(link.href)
                                    ? 'text-[#E67E22]'
                                    : 'text-muted-foreground hover:text-[#F5F5F5]'
                                }`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                </ul>
              </nav>

              {/* Bottom */}
              <div className="border-t border-[#2A2A2A] p-4 space-y-3">
                <Link href="/contact" onClick={handleLinkClick} className="block">
                  <button className="btn-pill w-full bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm py-3 transition-colors">
                    Get A Quote
                  </button>
                </Link>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${businessInfo.phone[0].replace(/\s/g, '')}`}
                    className="flex flex-col items-center gap-1 py-3 bg-[#1A1A1A] text-muted-foreground hover:text-[#E67E22] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-[10px] font-accent uppercase">Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 py-3 bg-[#1A1A1A] text-muted-foreground hover:text-[#E67E22] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[10px] font-accent uppercase">WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="flex flex-col items-center gap-1 py-3 bg-[#1A1A1A] text-muted-foreground hover:text-[#E67E22] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-[10px] font-accent uppercase">Email</span>
                  </a>
                </div>

                {/* Social */}
                <div className="flex justify-center gap-2 pt-2">
                  <a
                    href={businessInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-muted-foreground hover:text-[#E67E22] transition-colors"
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
                    className="w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-muted-foreground hover:text-[#E67E22] transition-colors"
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
                    className="w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-muted-foreground hover:text-[#E67E22] transition-colors"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
