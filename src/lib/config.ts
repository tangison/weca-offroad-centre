/**
 * Site Configuration for Weca Offroad Centre
 * 
 * This file contains all site-wide configuration including:
 * - Domain and URLs
 * - Business information
 * - Social links
 * - SEO defaults
 * - Brand partners
 */

export const siteConfig = {
  // Primary domain - use this for all absolute URLs
  domain: 'https://wecaoffroad.com',
  
  // Alternate domains
  alternateDomains: [
    'https://weca.co.za',
    'https://weca4x4.co.za',
  ],
  
  // Site info
  name: 'Weca Offroad Centre',
  shortName: 'Weca Offroad',
  tagline: "The only 4x4 shop in Swakopmund with EVERYTHING you need",
  description: "Namibia's premier 4x4 accessories store. Quality products, professional fitment, and expert advice for offroad enthusiasts.",
  
  // Business details
  business: {
    name: 'Weca Offroad Centre',
    legalName: 'Weca Offroad Centre CC',
    owner: 'Werner Schaap',
    founded: '2015',
    type: 'Retail & Services',
    industry: '4x4 Accessories & Fitment',
  },
  
  // Location
  location: {
    address: 'Eliaser Tuhadeleni Erf 4802',
    addressFull: 'Eliaser Tuhadeleni Erf 4802, Swakopmund Industrial, 13001, Namibia',
    street: 'CNR Eberston and Nelson Mandela Street',
    city: 'Swakopmund',
    region: 'Erongo',
    country: 'Namibia',
    postalCode: '13001',
    coordinates: {
      lat: -22.6712912,
      lng: 14.5492686,
    },
  },
  
  // Contact
  contact: {
    phone: ['+264 81 169 1942', '+264 85 269 1942'],
    landline: ['+264 64 462 725', '+264 64 462 840'],
    email: 'wecaoffroadcentre@gmail.com',
    whatsapp: '+264 81 169 1942',
  },
  
  // Hours
  hours: {
    weekdays: '08:00 - 17:00',
    saturday: '08:00 - 12:00',
    sunday: 'Closed',
    formatted: {
      weekdays: 'Monday - Friday: 08:00 - 17:00',
      saturday: 'Saturday: 08:00 - 12:00',
      sunday: 'Sunday: Closed',
    },
  },
  
  // Social links
  social: {
    facebook: 'https://www.facebook.com/100064362595359/',
    instagram: 'https://www.instagram.com/wecaoffroadcentre/',
    tiktok: 'https://www.tiktok.com/@wecaoffroadcentre',
    whatsapp: 'https://wa.me/264811691942',
  },
  
  // Maps - real Google Place ID for Weca Offroad Centre, Swakopmund.
  // place_id verified via Google Maps: ChIJoa5Ba9xYdhwRzBnhVLf64Pc
  // (verified by loading https://www.google.com/maps/search/?api=1&query_place_id=...
  // which resolves to the "Weca Offroad centre/Opposite lock Swakopmund" listing
  // at -22.6712912, 14.5492686, Plus Code 8GHX+FP Swakopmund).
  //
  // IMPORTANT: The legacy `q=place_id:...&output=embed` format was deprecated by
  // Google for the public Embed API without an API key. Loading that URL in an
  // iframe renders a zoomed-out world map with no business pin (verified
  // 2026-08-07 via agent-browser + VLM analysis). The working format for the
  // public Embed API is `q=<business name + city>&z=17&output=embed`, which
  // resolves the listing server-side and renders a red pin with the business
  // name in an info card. The place_id is still kept for the share/review URLs
  // (those endpoints accept place_id directly and continue to work).
  maps: {
    placeId: 'ChIJoa5Ba9xYdhwRzBnhVLf64Pc',
    googleMapsLink: 'https://www.google.com/maps/place/?q=place_id:ChIJoa5Ba9xYdhwRzBnhVLf64Pc',
    directionsLink: 'https://www.google.com/maps/dir/?api=1&destination=-22.6712912,14.5492686&destination_place_id=ChIJoa5Ba9xYdhwRzBnhVLf64Pc',
    embedUrl: 'https://maps.google.com/maps?q=Weca+Offroad+Centre+Swakopmund&z=17&output=embed',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJoa5Ba9xYdhwRzBnhVLf64Pc',
    plusCode: '8GHX+FP Swakopmund, Namibia',
  },
  
  // Brands carried - confirmed real list per client (Shalyn), 2026-08-06.
  // Updated to remove Front Runner, ARB, BF Goodrich, Rhinoman, D.AG,
  // Vision X (not carried) and add the 15 newly confirmed brands.
  // Logo files live in /public/brands/ and the carousel renders them
  // from src/lib/data.ts `brands` array. This config list is for SEO
  // and reference only.
  brands: [
    { name: 'Wildog', category: 'Bumpers & Protection' },
    { name: 'GOBI X', category: 'Front Bumpers' },
    { name: 'Ratel', category: 'Bos Bumpers' },
    { name: 'Dometic', category: 'Camping Equipment' },
    { name: 'Tentco', category: 'Rooftop Tents' },
    { name: 'Howling Moon', category: 'Rooftop Tents & Awnings' },
    { name: 'Fox', category: 'Performance Suspension' },
    { name: 'Tough Dog', category: 'Suspension Systems' },
    { name: 'EFS', category: '4x4 Suspension' },
    { name: 'EcoFlow', category: 'Portable Power' },
    { name: 'Runva', category: 'Electric Winches' },
    { name: 'WARN', category: 'Winches & Recovery' },
    { name: 'Moremi', category: 'Custom Campers & Trailers' },
    { name: 'AluBlack', category: 'Flatbed Trays & Canopies' },
    { name: 'Fredlin Hoists', category: 'Rooftop Tent Hoists' },
    { name: 'DeGraaf Exhausts', category: 'Performance Exhausts' },
    { name: 'Tougher', category: 'Seat Covers' },
    { name: 'Beesdam', category: 'Premium Seat Covers' },
    { name: 'Escape Gear', category: 'Vehicle Seat Covers' },
    { name: 'Rockford', category: 'Premium Audio' },
  ],
  
  // SEO defaults
  seo: {
    titleTemplate: '%s | Weca Offroad Centre',
    defaultTitle: "Weca Offroad Centre | Namibia's #1 4x4 Store",
    defaultDescription: "Namibia's premier 4x4 accessories store. Quality products, professional fitment, and expert advice for offroad enthusiasts. Rooftop tents, suspension, bumpers, and more.",
    keywords: [
      '4x4 accessories Namibia',
      'offroad equipment',
      'rooftop tents',
      'suspension systems',
      'Swakopmund',
      'vehicle fitment',
      'Wildog',
      'Tentco',
      'WARN',
      '4x4 parts Namibia',
      'offroad modifications',
      'vehicle accessories Swakopmund',
      'canopies Namibia',
      'bumpers Namibia',
      'recovery gear',
    ],
    locale: 'en_NA',
    language: 'en',
  },
  
  // Navigation
  navigation: {
    main: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/shop', label: 'Shop' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/services', label: 'Services' },
    ],
    more: [
      { href: '/testimonials', label: 'Reviews' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
    footer: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/shop', label: 'Shop' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/services', label: 'Services' },
      { href: '/testimonials', label: 'Reviews' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  
  // Shop categories
  categories: [
    { id: 'all', name: 'All Products', slug: 'all' },
    { id: 'rooftop-tents', name: 'Rooftop Tents', slug: 'rooftop-tents' },
    { id: 'suspension', name: 'Suspension & Shocks', slug: 'suspension' },
    { id: 'bumpers', name: 'Bumpers & Protection', slug: 'bumpers' },
    { id: 'canopies', name: 'Canopies & Storage', slug: 'canopies' },
    { id: 'lighting', name: 'Lighting', slug: 'lighting' },
    { id: 'camping', name: 'Camping Equipment', slug: 'camping' },
    { id: 'recovery', name: 'Recovery Gear', slug: 'recovery' },
    { id: 'tyres', name: 'Tyres & Wheels', slug: 'tyres' },
  ],
  
  // Feature flags
  features: {
    enableSearch: true,
    enableWhatsAppRedirect: true,
    enableProductModal: true,
    // Site-wide "under construction" banner. When true, a slim non-dismissible
    // strip renders at the top of the header on every page (see navbar.tsx)
    // alongside the footer disclaimer. Flip to false and rebuild to remove
    // the header banner cleanly - no markup to delete across files.
    underConstruction: true,
  },
} as const;

// Helper functions
export function getAbsoluteUrl(path: string = ''): string {
  return `${siteConfig.domain}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getWhatsAppLink(message?: string): string {
  const baseUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

export function getTelLink(phone: string = siteConfig.contact.phone[0]): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}

export function getEmailLink(subject?: string): string {
  const email = siteConfig.contact.email;
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

export function getMapsLink(): string {
  return siteConfig.maps.googleMapsLink;
}

export function getDirectionsLink(): string {
  return siteConfig.maps.directionsLink;
}

export type SiteConfig = typeof siteConfig;
