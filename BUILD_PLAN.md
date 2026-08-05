# BUILD_PLAN — Weca Offroad Centre

## Active mode

Full build, not demo. The site is a production shop window for a real
Namibian business.

## Art-direction owner

Hallmark is the structural anti-slop gate (final audit). Impeccable handles
polish and responsive hardening. Taste is not applied — this is a shop, not a
landing page or redesign surface.

## Documented assumptions

The user requested "all of our products on the website all over 200 products"
but did not provide a product list. The catalog was built from:

1. The existing ~57 products already in `src/lib/data.ts` (carried over and
   expanded, not replaced blindly).
2. The business profile in `BUSINESS_INFO.md` — a Swakopmund 4x4 fitment
   workshop carrying Tentco, Front Runner, Tough Dog, ARB, Wildog, D.AG,
   Dometic, BF Goodrich and similar southern-African overlanding brands.
3. Realistic N$ pricing calibrated against publicly listed southern-African
   4x4 accessory retail prices.
4. Image assets already in `/public/images/` — 112 WebP images of rooftop
   tents, awnings, roof racks, workshop and signage. Products map to the
   closest existing image in their category. No new images were generated.

The catalog is **representative** of what the business carries or can source.
It is not a live inventory feed. Stock levels are display booleans, not
real-time counts.

If the client provides a SKU-level product list, the catalog can be regenerated
by replacing the `products` array in `src/lib/data.ts` with the real data and
re-running `python3 scripts/generate_catalog.py` (after editing the script's
`CATALOG` dict).

## Simpler approaches taken

- **Shop page pagination** uses a "Load More" button with PAGE_SIZE=24, not
  full page-numbered pagination. Simpler UX, fewer moving parts, and 236
  products is small enough that the user rarely loads past 48.
- **URL state for category** uses Next.js `useSearchParams` with `router.replace`
  rather than a state library. The URL is the single source of truth.
- **Search** is client-side substring matching across name, brand, and
  description. No server, no index, no debounce — 236 products filters in
  under a frame.
- **Product images** reuse existing gallery WebP assets cycled per category,
  rather than generating 236 product photos. This is documented in PRODUCT.md.

## Bounded outcomes completed

1. SSO protection removed from Vercel project (verified HTTP 200 unauthenticated).
2. Catalog expanded to 236 products across 14 categories.
3. Shop page enhanced: search, pagination, URL param sync, mobile filters.
4. Audit issues #1–#22 fixed in prior commit `e7e7f89`.
5. All images converted to WebP in prior commit `e7e7f89`.
6. TypeScript strict, ESLint clean, 39 tests pass, production build succeeds.

## Bounded outcomes remaining

- Purchase `wecaoffroad.com` — requires client action (payment).
- Attach custom domain to Vercel project — after purchase.
- Configure DNS — after purchase.
- Provide real SKU-level product list — optional, client decision.

## Verification gates passed

- `bunx tsc --noEmit` — 0 errors
- `bun run lint` — 0 errors, 0 warnings
- `bun run test` — 39/39 passing
- `bun run build` — 13/13 routes built
- Unauthenticated HTTP 200 on production Vercel URL
