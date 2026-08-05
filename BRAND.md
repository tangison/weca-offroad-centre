# BRAND — Weca Offroad Centre

## Brand in one sentence

Weca Offroad Centre is Swakopmund's trusted 4x4 fitment workshop: honest
advice, quality brands, work that survives the Namibian desert.

## Brand voice

- **Direct, not salesy.** We say what a part does, not what it "unleashes".
- **Local, not generic.** We name the terrain, the vehicles, the use cases
  (Hilux, LC 79, mine roads, Damaraland, the Skeleton Coast).
- **Competent, not boastful.** Ten years of fitment work speaks for itself.
- **Practical, not luxurious.** We sell gear that earns its place on the truck.

Banned phrases: "elevate", "seamless", "next-gen", "unleash", "delve",
"tapestry", "in the world of". No em dashes in copy. No fake metrics.

## Visual identity

### Palette

| Role | Hex | Use |
|------|-----|-----|
| Background base | `#0D0D0D` | Page background, dark sections |
| Surface raised | `#1A1A1A` | Cards, sidebars, raised surfaces |
| Border subtle | `#2A2A2A` | Dividers, card borders |
| Text primary | `#F5F5F5` | Headings, body text |
| Text muted | `#888888` | Captions, secondary text |
| Accent — Weca Orange | `#E67E22` | CTAs, highlights, active states |
| Accent hover | `#F39C12` | Hover state for orange CTAs |
| Success / in stock | `#22C55E` | Stock badges, success states |

The palette is intentionally restrained: dark base, one warm accent. No
gradients, no glassmorphism, no purple/blue AI fingerprint.

### Typography

- **Headings** (`font-heading`): display weight, tight tracking, uppercase for
  section labels.
- **Body** (`font-accent` for labels and CTAs, default sans for body):
  uppercase + wide tracking for UI labels and buttons; sentence case for body
  copy.
- Body paragraph width is capped at roughly 65 characters for readability.

### Layout

- Container max-width ~1200–1440px.
- Asymmetric grids where possible; the shop is a 3-column card grid because
  product browsing needs consistency, not asymmetry.
- Section padding is optically tuned, not symmetric (bottom padding slightly
  larger than top where appropriate).
- No `height: 100vh`; `min-height: 100dvh` is used for full-bleed sections.

### Components

- **Cards** exist only where elevation communicates hierarchy (product cards,
  service cards). No border + shadow + background combo.
- **Buttons** are square-cornered, uppercase, tracked. One filled orange CTA
  per section; secondary actions are outline or text links.
- **Badges** are square, not pill.
- **Images** are square-cornered or match the surrounding card radius.

### Iconography

Lucide icons are used throughout. Stroke width is consistent at 1.5px default.

## Motion

Motion is restrained and purposeful. No decorative animation.

- **Page entries**: stagger fade + 10px Y translate, max delay 200ms.
- **Hover**: card border colour shift to orange; image scale 1.05 over 300ms.
- **Press**: `scale(0.98)` on buttons.
- **Mobile filter drawer**: slide up from bottom, 200ms tween.
- **No parallax, no scroll-jacking, no auto-playing carousels.**
- **Reduced motion**: all transitions respect `prefers-reduced-motion`.

Motion engine: Framer Motion is the only runtime motion library. No GSAP,
no Anime.js in this build — the site is content-led and does not need
scroll-driven storytelling.

## Credit

Every public page carries the restrained linked credit "Made by Tangison
Studio" linking to `https://studio.tangison.com`. This is non-negotiable unless
the client explicitly asks for its removal.
