# Content Replacement Guide

This guide explains where to update various content on the Weca Offroad Centre website.

## Business Information

### Contact Details
**File:** `src/lib/config.ts`

```typescript
contact: {
  phone: ['+264 81 169 1942', '+264 85 269 1942'],
  email: 'wecaoffroadcentre@gmail.com',
  whatsapp: '+264 81 169 1942',
}
```

### Business Hours
**File:** `src/lib/config.ts`

```typescript
hours: {
  weekdays: '08:00 - 17:00',
  saturday: '08:00 - 12:00',
  sunday: 'Closed',
}
```

### Address
**File:** `src/lib/config.ts`

```typescript
location: {
  address: 'Eliaser Tuhadeleni Erf 4802',
  city: 'Swakopmund',
  country: 'Namibia',
  postalCode: '13001',
}
```

### Social Media Links
**File:** `src/lib/config.ts`

```typescript
social: {
  facebook: 'https://www.facebook.com/...',
  instagram: 'https://www.instagram.com/...',
  tiktok: 'https://www.tiktok.com/@...',
}
```

## Products

### Adding/Editing Products
**File:** `src/lib/data.ts`

```typescript
export const products: Product[] = [
  {
    id: 'unique-id',           // Required: unique identifier
    name: 'Product Name',       // Required: display name
    brand: 'Brand Name',        // Required: brand/manufacturer
    category: 'category-slug',  // Required: must match a category ID
    price: 'N$ 10,000',         // Optional: price string or null
    description: '...',         // Required: product description
    features: ['Feature 1'],    // Required: array of features
    image: '/images/...',       // Required: image path
    inStock: true,              // Required: availability
  },
];
```

### Product Categories
**File:** `src/lib/data.ts`

```typescript
export const productCategories = [
  { id: 'all', name: 'All Products' },
  { id: 'category-slug', name: 'Category Name' },
];
```

## Services

### Adding/Editing Services
**File:** `src/lib/data.ts`

```typescript
export const services: Service[] = [
  {
    id: 'unique-id',
    name: 'Service Name',
    description: 'Service description...',
    startingPrice: 'N$ 1,000',  // or null for "On Request"
    duration: '2-4 hours',
    features: ['Feature 1', 'Feature 2'],
    image: '/images/...',
  },
];
```

## Testimonials

### Adding/Editing Testimonials
**File:** `src/lib/data.ts`

```typescript
export const testimonials: Testimonial[] = [
  {
    id: 'unique-id',
    name: 'Customer Name',
    location: 'City',
    rating: 5,              // 1-5 stars
    text: 'Review text...',
    service: 'Service Name',
    vehicle: 'Vehicle Model',
    date: '2024-01-15',
    avatar: '/images/...',   // Optional
  },
];
```

## Gallery

### Adding/Editing Gallery Items
**File:** `src/lib/data.ts`

```typescript
export const galleryItems: GalleryItem[] = [
  {
    id: 'unique-id',
    title: 'Project Title',
    category: 'full-build',    // Must match a gallery category
    vehicle: 'Vehicle Model',
    description: 'Project description...',
    image: '/images/...',
    workDone: ['Item 1', 'Item 2'],
    date: '2024-01-15',
  },
];
```

## Brands

### Adding/Editing Brands
**File:** `src/lib/data.ts`

```typescript
export const brands: Brand[] = [
  {
    name: 'Brand Name',
    logo: '/brands/logo.png',
    description: 'Brand description',
    website: 'https://...',     // Optional
  },
];
```

## Images

### Logo
**Path:** `public/images/logo.png`
- Used in navbar, footer, 404 page
- Recommended: PNG with transparent background
- Size: ~200-400px wide

### Hero Slideshow
**Path:** `public/images/hero/`
- Files: slide-1.jpg, slide-2.jpg, etc.
- Recommended: 1920x1080px, landscape orientation
- Update paths in `src/lib/data.ts` → `heroSlides`

### Product Images
**Path:** `public/images/products/` (or existing paths)
- Recommended: 800x800px, square aspect ratio
- Update image paths in `src/lib/data.ts` → `products`

### Gallery Images
**Path:** `public/images/gallery/`
- Recommended: 1200x900px, 4:3 aspect ratio
- Update image paths in `src/lib/data.ts` → `galleryItems`

### About Page
**Path:** `public/images/about/`
- workshop.jpg - Workshop image
- owner.jpg - Owner photo

## Metadata & SEO

### Site Title & Description
**File:** `src/lib/config.ts`

```typescript
seo: {
  defaultTitle: 'Weca Offroad Centre | Namibia\'s #1 4x4 Store',
  defaultDescription: '...',
  keywords: ['4x4 accessories', 'offroad', ...],
}
```

### Domain
**File:** `src/lib/config.ts`

```typescript
domain: 'https://wecaoffroad.com',
```

## Navigation

### Main Navigation
**File:** `src/lib/config.ts`

```typescript
navigation: {
  main: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    ...
  ],
}
```

## Theme Colors

### Primary Colors
**File:** `src/app/globals.css`

```css
--background: #0D0D0D;      /* Dark background */
--foreground: #F5F5F5;      /* Light text */
--primary: #E67E22;         /* Orange accent */
--muted: #2A2A2A;           /* Border/secondary bg */
```

## Favicon

### Current Setup
The logo is used as favicon:
- `public/images/logo.png`

### Custom Favicon
To use a dedicated favicon:
1. Create favicon.ico (16x16, 32x32)
2. Create apple-touch-icon.png (180x180)
3. Update `src/app/layout.tsx`:
```typescript
icons: {
  icon: '/favicon.ico',
  apple: '/apple-touch-icon.png',
}
```

## Deployment Checklist

After updating content:
1. Run `bun run lint` to check for errors
2. Run `bun run build` to verify build
3. Test all pages on mobile
4. Verify all links work
5. Check images load correctly
6. Submit updated sitemap to Google Search Console
