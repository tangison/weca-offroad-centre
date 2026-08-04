# Weca Offroad Centre Website

A modern, production-ready website for Weca Offroad Centre, Namibia's premier 4x4 accessories store located in Swakopmund.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, standalone output)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 with shadcn/ui (new-york style)
- **Fonts:** Bebas Neue (headings), Montserrat (body), Rajdhani (labels/prices)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Database:** Prisma 6 with SQLite (development); swap to PostgreSQL for production when ready
- **Package Manager:** Bun
- **Runtime:** Node.js 20 or later (Vercel uses 24.x)

## Project Structure

```
src/
├── app/                       # Next.js App Router
│   ├── page.tsx               # Home page
│   ├── about/                 # About page
│   ├── shop/                  # Shop page with product listings
│   ├── gallery/               # Gallery of vehicle builds
│   ├── services/              # Services page
│   ├── testimonials/          # Customer reviews
│   ├── contact/               # Contact page with form
│   ├── api/                   # API routes
│   │   ├── route.ts           # Site manifest endpoint
│   │   └── contact/route.ts   # Contact form handler (WhatsApp redirect)
│   ├── sitemap.ts             # Dynamic sitemap
│   ├── robots.ts              # Robots.txt
│   ├── not-found.tsx          # 404 page
│   ├── error.tsx              # Error boundary
│   ├── global-error.tsx       # Critical error handler
│   └── loading.tsx            # Loading state
├── components/
│   ├── layout/                # Navbar, Footer
│   └── ui/                    # UI components (shadcn/ui)
├── lib/
│   ├── config.ts              # Site configuration (business info, SEO, navigation)
│   ├── data.ts                # Products, services, testimonials, gallery data
│   ├── db.ts                  # Prisma client
│   └── utils.ts               # Utility functions
├── data/                      # Static data sources
└── hooks/                     # Custom React hooks

prisma/
└── schema.prisma              # Database schema

public/
├── images/                    # All images (WebP format)
│   ├── hero/                  # Hero slideshow images
│   ├── gallery/               # Gallery images
│   ├── about/                 # About page images
│   ├── brand/                 # Brand images
│   ├── shop/                  # Shop page images
│   └── social/                # Social media images
├── logo.svg                   # SVG logo
├── logo.webp                  # Raster logo fallback
├── favicon.webp               # Favicon
├── manifest.json              # PWA manifest
└── robots.txt                 # Static robots (in addition to dynamic)
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or later
- Node.js 20 or later

### Setup

```bash
# Clone the repository
git clone https://github.com/tangison/weca-offroad-centre.git
cd weca-offroad-centre

# Copy environment template
cp .env.example .env

# Install dependencies
bun install

# Set up the database (creates db/custom.db from schema)
bun run db:push

# Start development server
bun run dev
```

The site will be available at `http://localhost:3000`.

### Environment Variables

The `.env` file is gitignored. Copy `.env.example` to `.env` and adjust as needed:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Prisma database URL. Defaults to `file:./db/custom.db` (SQLite). For production, use a PostgreSQL or MySQL connection string. |

When authentication is added later:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_URL` | Auth only | The canonical URL of the deployed site (e.g. `https://wecaoffroad.com`) |
| `NEXTAUTH_SECRET` | Auth only | Random secret. Generate with `openssl rand -base64 32` |

### Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the development server (port 3000) |
| `bun run build` | Build for production |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Create and apply a Prisma migration |
| `bun run db:reset` | Reset the database (DESTRUCTIVE) |

## Deployment

### Vercel (Production)

The site is deployed to Vercel and connected to this GitHub repository. Every push to `main` triggers an automatic production deployment via the GitHub Action at `.github/workflows/deploy.yml`.

The deployment uses these GitHub repo secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Manual Deployment

To deploy manually from the CLI:

```bash
# Install Vercel CLI
bun add -g vercel

# Authenticate
vercel login

# Deploy to production
vercel --prod
```

## Key Features

- **Global Search:** Search products, services, and gallery items with `Cmd`/`Ctrl` + `K`
- **Mobile-First Design:** Optimized for all screen sizes
- **WhatsApp Integration:** Contact form and product enquiries redirect to WhatsApp
- **Email Support:** Email contact option available
- **SEO Optimized:** Structured data (`LocalBusiness`, `WebSite`), dynamic sitemap, meta tags, Open Graph, Twitter cards
- **PWA Ready:** Web manifest and icons
- **Premium Dark Theme:** Custom dark palette with orange accent (`#E67E22`)
- **Accessibility:** Skip-to-content link, semantic HTML, ARIA labels, keyboard navigation
- **Image Optimization:** All images converted to WebP format (82% smaller than originals)
- **Error Handling:** Custom 404, error, and loading states

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
    image: '/images/product.webp',  // WebP format
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
- SEO defaults
- Navigation

### Updating Images

Replace images in `public/images/`. All images should be in **WebP format** for optimal performance. Use the conversion script at `scripts/convert_to_webp.js` to bulk-convert existing JPG/PNG images.

## CI/CD

GitHub Actions workflows are defined in `.github/workflows/`:

- `deploy.yml`: Deploys to Vercel production on every push to `main`
- `ci.yml`: Runs lint and build on every pull request to `main`

## License

© 2024-2026 Weca Offroad Centre. All rights reserved.

See the [LICENSE](./LICENSE) file for details.

## Contact

- **Website:** https://wecaoffroad.com (pending registration)
- **Email:** wecaoffroadcentre@gmail.com
- **Phone:** +264 81 169 1942
- **WhatsApp:** +264 81 169 1942
- **Address:** Eliaser Tuhadeleni Erf 4802, Swakopmund Industrial, 13001, Namibia
