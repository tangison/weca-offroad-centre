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

## Client correction pass (2026-08-06)

### Site privacy (DONE — commit `e3e72c1`)

Client (Shalyn) said the site must not be publicly discoverable while she
reviews it. Implemented as:
- `src/app/robots.ts`: `Disallow: /` for all user agents, sitemap reference removed.
- `public/robots.txt`: synced to `Disallow: /` (static fallback).
- `src/app/layout.tsx`: `metadata.robots` set to `index: false, follow: false`.
- No sitemap submitted to Google Search Console or Bing Webmaster Tools
  (neither was submitted previously — noted in PROOF.md).
- Site stays directly accessible (no SSO re-added) — only search engines
  are blocked. Re-enable by flipping the three flags back to `true` and
  re-adding the sitemap reference in `robots.ts`.

### Construction disclaimer (DONE — commit `e3e72c1`)

Client requested a disclaimer that the site is under construction and
being built by Tangison Studio. Added as a small understated line in the
footer, above the copyright/credit bar:
"This website is under construction by Tangison Studio. Content and
pricing are not final." The Tangison Studio text links to
https://studio.tangison.com.

### Fake shop catalog removed (DONE — commit `e3e72c1`)

Client flagged that the 236 fabricated products in `/shop` did not match
their descriptions/pictures and were confusing her during review. The
fabricated catalog has been removed from the live `/shop` page:
- `src/app/shop/page.tsx`: full rewrite as "Catalog coming soon" empty
  state (no product grid, no search, no filters, no dialog). Preserves
  the shop hero + price-match banner + WhatsApp CTA + cross-link to
  /services.
- `src/app/shop/layout.tsx`: metadata description updated (was "200+
  accessories" + named Front Runner/ARB/Warn — all removed).
- The fabricated 236-product array in `src/lib/data.ts` is FROZEN in
  place (not deleted) so it can serve as a structural reference when the
  real SKU-level catalog arrives. It is no longer imported by the shop
  page. The data.test.ts "200+ products" assertion still passes against
  the frozen array.

### Brand list replaced (DONE — commit pending push)

The brand carousel was built from web research before the client's actual
brand list was available. The client has now given the real list directly.
- Removed: Front Runner, ARB, BF Goodrich, Rhinoman (4 brands not carried).
- Kept: Wildog, Dometic, Tentco, Tough Dog, EcoFlow (5 existing logos reused).
- Added: WARN, Howling Moon, Fox, Runva, GOBI X, Ratel, Moremi, DeGraaf
  Exhausts, Fredlin Hoists, EFS, Tougher, Beesdam, Escape Gear, AluBlack,
  Rockford (15 new logos sourced from each brand's own official site;
  Escape Gear fetched via Wayback Machine archive because escapegear.com
  is behind Cloudflare bot protection).
- Logos are now display-only (non-clickable). Removed `target="_blank"`
  outbound links per client instruction.
- Pending: DAG (no independent official site found — distributed by 4x4
  Wholesalers Africa; client to provide logo directly).
- Do NOT add: 'Gerbers' (name unconfirmed), tyre brands (client has not
  named which).

### Vehicle-based browsing (LOGGED — not built, awaiting real catalog)

Client requested vehicle-specific sections (e.g. a Hilux page showing
everything for that vehicle) alongside the existing category departments
(camping, rooftop, suspension, etc.). This is a real, good IA request
but cannot be built against the placeholder catalog — it requires
vehicle-fitment data on each product, which the real SKU-level catalog
from the client's POS / online supplier data feed will provide.

When the real catalog arrives with vehicle-fitment fields:
1. Add a `vehicleFitment` field to the `Product` interface in
   `src/lib/data.ts` (array of vehicle make/model/year strings).
2. Create a `/vehicles` route with a vehicle picker (make → model → year)
   that filters products by fitment.
3. Add a "Shop by Vehicle" nav item and a vehicle-picker CTA on the
   homepage and /shop.
4. Each product card in /shop shows a "Fits your vehicle" badge when the
   visitor has selected a vehicle.

Do NOT attempt to build this against the placeholder catalog.

### Stock system integration (LOGGED — open question for Tangi)

Client asked whether their upcoming POS/stock system could sync with the
website. Cannot be scoped until we know which system they are implementing.

**Research update (2026-08-06):** The client's stock system has been
identified as **Robotill** — a South African, primarily Windows-based /
offline retail POS (one-time license model), not a cloud SaaS with a
public API by default. There is a Namibian reseller / installer
(namibia4u.com) that may be who's setting this up locally.

**Implication:** A live real-time sync between Robotill and the website
is unlikely to be a simple API integration. Realistic paths are:
- **Periodic CSV export / import** — Robotill can export product + stock
  CSVs; a Vercel Cron job fetches and ingests them on a schedule.
- **Custom middleware reading Robotill's local database directly** —
  Robotill stores data in a local DB (likely SQL Server Express or
  SQLite depending on edition); a small sync service could read it and
  push updates to the website via an API route.

Both paths require knowing exactly which Robotill edition / tier the
client ends up with (Express, Pro, Enterprise), as data access differs
per edition.

Tangi to ask the client:
1. Confirm the system is Robotill, and which edition (Express / Pro / Enterprise).
2. Is the Namibian reseller (namibia4u.com) installing/configuring it?
3. Does this edition support CSV export of products + stock levels?
4. Does this edition expose its local database for read access?
5. What is the desired update frequency (real-time, hourly, daily)?
6. Does the product data include vehicle-fitment fields, or only
   SKU / price / stock?

**Action for this pass:** RESEARCH ONLY. Do NOT start building any
integration, export script, or middleware yet. This is pending Tangi
confirming the exact Robotill setup with the client first.

Common patterns (for reference once the edition is confirmed):
- Robotill CSV export + Vercel Cron: scheduled job fetches CSV from a
  known URL (or accepts a manual upload), parses, and updates the
  product catalog. Simplest path; no DB access needed.
- Robotill DB read + middleware: a small Node/Python service runs on
  the same network as the Robotill install, reads the DB, and exposes
  a JSON API that the website polls. More complex; requires network
  access from Vercel to the middleware host.
- Manual sync: client exports CSV from Robotill, uploads via an admin
  page on the website, which ingests and updates the catalog. Lowest
  tech, highest manual effort.

Do NOT plan the integration until the Robotill edition is confirmed.

## Verification gates passed

- `bunx tsc --noEmit` — 0 errors
- `bun run lint` — 0 errors, 0 warnings
- `bun run test` — 39/39 passing
- `bun run build` — 13/13 routes built
- Unauthenticated HTTP 200 on production Vercel URL
