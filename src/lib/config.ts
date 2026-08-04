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
      lat: -22.6789,
      lng: 14.5272,
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
  
  // Maps
  maps: {
    googleMapsLink: 'https://maps.app.goo.gl/EPAKvYQ9rdZDqYdJ9',
    directionsLink: 'https://www.google.com/maps/dir/?api=1&destination=Eliaser+Tuhadeleni+Erf+4802+Swakopmund+Industrial',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.8!2d14.5272!3d-22.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQwJzQ0LjAiUyAxNMKwMzEnMzguMCJF!5e0!3m2!1sen!2sna!4v1700000000000!5m2!1sen!2sna',
  },
  
  // Brands carried
  brands: [
    { name: 'Tentco', category: 'Rooftop Tents' },
    { name: 'Front Runner', category: 'Roof Racks & Storage' },
    { name: 'Tough Dog', category: 'Suspension Systems' },
    { name: 'Wildog', category: 'Bumpers & Protection' },
    { name: 'Rhinoman', category: 'Canopies' },
    { name: 'Ecoflow', category: 'Portable Power' },
    { name: 'D.AG', category: 'Snorkels & Accessories' },
    { name: 'Dometic', category: 'Camping Equipment' },
    { name: 'ARB', category: '4x4 Accessories' },
    { name: 'BF Goodrich', category: 'All-Terrain Tyres' },
    { name: 'Vision X', category: 'Lighting' },
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
      'Tough Dog',
      'Tentco',
      'Front Runner',
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
      { href: '/contact', label: 'Contact' },
    ],
    footer: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/shop', label: 'Shop' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/services', label: 'Services' },
      { href: '/testimonials', label: 'Reviews' },
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
  },
} as const;

// Helper functions
export function getAbsoluteUrl(path: string = ''): string {
  return `${siteConfig.domain}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getWhatsAppLink(message?: string): string {
  const baseUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, '')}`;
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
