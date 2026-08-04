# Implementation Notes - Weca Offroad Centre Website

## Project Summary

This is a production-ready Next.js 16 website for Weca Offroad Centre, a 4x4 accessories store in Swakopmund, Namibia.

## Major Components

### Layout Components
- **Navbar** (`src/components/layout/navbar.tsx`)
  - Fixed header with scroll behavior
  - Desktop dropdown menus for Shop and More
  - Mobile off-canvas menu with smooth transitions
  - Global search trigger (Cmd/Ctrl + K)

- **Footer** (`src/components/layout/footer.tsx`)
  - 4-column responsive layout
  - Contact information, quick links, services, social media
  - Mobile-optimized stacking

### UI Components
- **HeroSlideshow** - Background image carousel with centered content
- **SearchDialog** - Global search modal with keyboard navigation
- **ProductCard** - Product display cards
- **ServiceCard** - Service display cards
- **TestimonialCard** - Customer review cards
- **GalleryCard** - Gallery item cards
- **PageHero** - Page header component
- **CTASection** - Call-to-action section

## Search System

The global search system (`src/components/ui/search-dialog.tsx`) provides:
- Keyboard shortcut support (Cmd/Ctrl + K)
- Search across products, services, and gallery
- Keyboard navigation (Arrow keys, Enter, Escape)
- Grouped results by type
- Mobile-friendly modal

## SEO Implementation

### Metadata
- Site-wide metadata in `src/app/layout.tsx`
- Page-specific metadata on each route
- Open Graph and Twitter cards

### Structured Data
- LocalBusiness schema
- WebSite schema with SearchAction
- BreadcrumbList schema

### Files
- `src/app/sitemap.ts` - Dynamic sitemap generation
- `src/app/robots.ts` - Robots.txt configuration

## Error Handling

- `src/app/not-found.tsx` - Custom 404 page
- `src/app/error.tsx` - Error boundary with retry
- `src/app/global-error.tsx` - Critical error handling
- `src/app/loading.tsx` - Loading spinner

## Shop Features

- Category filtering
- Sort options (name, price, brand)
- Mobile filter drawer
- Product detail modal
- WhatsApp and Email inquiry buttons
- No-results state
- Out of stock indicators

## Contact Form

- Form validation
- Subject selection
- WhatsApp redirect option
- Email redirect option
- Mobile-optimized layout

## Mobile Optimization

- Mobile-first CSS approach
- Touch-friendly tap targets (min 44x44px)
- Responsive typography
- Mobile filter drawer
- Off-canvas mobile menu
- Optimized spacing and padding

## Performance Considerations

- Next.js Image optimization
- Font loading with `display: swap`
- Lazy loading for below-fold images
- Minimal JavaScript bundle
- Static generation where possible

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states
- Skip to content link
- Screen reader friendly

## Theme System

- CSS custom properties for colors
- Consistent square corners (border-radius: 0)
- Dark premium theme (#0D0D0D background)
- Orange accent color (#E67E22)

## Deployment Notes

### Vercel Configuration
- No custom server required
- Image optimization enabled
- Static asset caching

### Build Commands
```bash
bun run build   # Production build
bun run lint    # ESLint check
```

## Future Enhancements

1. **CMS Integration** - Consider Strapi or Sanity for content management
2. **E-commerce** - Add shopping cart and checkout
3. **Booking System** - Service appointment scheduling
4. **Blog** - News and article section
5. **Multi-language** - Support for Afrikaans and German

## File Dependencies

```
src/lib/config.ts ← All configuration
src/lib/data.ts ← Products, services, testimonials
src/components/layout/navbar.tsx ← Search, navigation
src/components/ui/search-dialog.tsx ← Search functionality
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)
