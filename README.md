# Weca Offroad Centre Website

A modern, production-ready website for Weca Offroad Centre - Namibia's premier 4x4 accessories store located in Swakopmund.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui
- **Fonts**: Bebas Neue (headings), Montserrat (body), Rajdhani (labels/prices)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── shop/              # Shop page with product listings
│   ├── gallery/           # Gallery of vehicle builds
│   ├── services/          # Services page
│   ├── testimonials/      # Customer reviews
│   ├── contact/           # Contact page with form
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── robots.ts          # Robots.txt
│   ├── not-found.tsx      # 404 page
│   ├── error.tsx          # Error boundary
│   └── loading.tsx        # Loading state
├── components/
│   ├── layout/            # Navbar, Footer
│   └── ui/                # UI components
├── lib/
│   ├── config.ts          # Site configuration
│   ├── data.ts            # Products, services, testimonials
│   └── utils.ts           # Utility functions
└── public/
    └── images/            # Static images
```

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run linting
bun run lint

# Build for production
bun run build
```

## Environment Variables

No environment variables are required for the base functionality. The site uses static data from `src/lib/data.ts`.

## Deployment

The site is configured for Vercel deployment:

1. Push to GitHub
2. Import project to Vercel
3. Deploy automatically

## Key Features

- **Global Search**: Search products, services, and gallery items (Cmd/Ctrl + K)
- **Mobile-First Design**: Optimized for all screen sizes
- **WhatsApp Integration**: Contact form redirects to WhatsApp
- **Email Support**: Contact via email option available
- **SEO Optimized**: Structured data, sitemap, meta tags
- **Dark Premium Theme**: Minimalist dark brown design

## Content Management

### Updating Products
Edit `src/lib/data.ts`:
```typescript
export const products: Product[] = [
  {
    id: 'unique-id',
    name: 'Product Name',
    brand: 'Brand Name',
    category: 'category-slug',
    price: 'N$ 10,000',
    description: 'Description...',
    features: ['Feature 1', 'Feature 2'],
    image: '/images/product.jpg',
    inStock: true,
  },
];
```

### Updating Business Info
Edit `src/lib/config.ts` for:
- Contact details
- Social links
- Business hours
- Location information

### Updating Images
Replace images in `public/images/`:
- `/images/logo.png` - Site logo
- `/images/hero/` - Hero slideshow images
- `/images/gallery/` - Gallery images
- `/images/shop/` - Shop page images

## License

© 2024 Weca Offroad Centre. All rights reserved.
