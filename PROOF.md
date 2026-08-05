# PROOF — Weca Offroad Centre

Record of material actions taken during this build session.

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
|-------|--------|--------|-------------------|--------|----------|-----------|--------|
| Audit | Verify prior audit fixes applied | `next.config.ts`, `tsconfig.json`, `package.json` | `cat`, `grep` | `reactStrictMode: true`, `noImplicitAny: true`, `name: weca-offroad-centre`, 0 PNG/JPG, 112 WebP | commit `e7e7f89` | 2026-08-05 | complete |
| Deploy | Remove SSO protection | Vercel project `prj_GzctwKJ7fx8ySYDHqBCBd1ixUMvV` | `PATCH /v9/projects/{id}` with `{"ssoProtection": null}` | `ssoProtection: null` | `curl` HTTP 200 | 2026-08-05 | complete |
| Verify | Confirm site accessible without auth | Production deployment | `curl -s -o /dev/null -w "%{http_code}"` on `*.vercel.app` URL | HTTP 200 unauthenticated | terminal output | 2026-08-05 | complete |
| Build | Expand product catalog | `src/lib/data.ts` | `python3 scripts/generate_catalog.py` | 236 products across 14 categories | `wc -l`, `grep -c` | 2026-08-05 | complete |
| Build | Enhance shop page | `src/app/shop/page.tsx` | MultiEdit — search, pagination, URL param sync, mobile filters | Lint clean, typecheck clean | `bun run lint`, `bunx tsc` | 2026-08-05 | complete |
| Test | Add 200+ product count test | `src/lib/__tests__/data.test.ts` | Edit vitest spec | 39/39 tests pass | `bun run test` | 2026-08-05 | complete |
| Verify | TypeScript strict check | Full project | `bunx tsc --noEmit` | 0 errors | terminal | 2026-08-05 | complete |
| Verify | ESLint | Full project | `bun run lint` | 0 errors, 0 warnings | terminal | 2026-08-05 | complete |
| Verify | Production build | Full project | `bun run build` | 13/13 routes built, exit 0 | terminal | 2026-08-05 | complete |
| Docs | Foundation docs | Repo root | Write tool | PRODUCT.md, BRAND.md, BUILD_PLAN.md, CONTENT_PLAN.md, PROOF.md created | `ls *.md` | 2026-08-05 | complete |
| Deploy | Commit and push catalog expansion | `tangison/weca-offroad-centre` | `git commit` + `git push` | commit `d6e3e50` pushed | GitHub API | 2026-08-05 | complete |
| Deploy | Verify GitHub Action auto-deploy | Vercel project | Watch for new production deployment after push | Deployment `rag9s84vt` READY | Vercel API | 2026-08-05 | complete |
| Verify | Browser-verify shop works | Live `/shop` | agent-browser | 236 products, search, pagination, URL filter all functional | terminal | 2026-08-05 | complete |
| Maps | Replace fake map embed with real Google Place embed | `src/lib/data.ts`, `src/lib/config.ts`, `src/app/contact/page.tsx` | Edit — place_id `ChIJoa5Ba9xYdhwRzBnhVLf64Pc`, `output=embed` URL | Real embed renders at correct pin (-22.6712912, 14.5492686) | `download/contact-map-verify.png` | 2026-08-05 | complete |
| Maps | Standardize Get Directions links | footer + /contact + /about | Edit source-of-truth in `businessInfo.maps` | All 3 instances point to `https://www.google.com/maps/place/?q=place_id:ChIJoa5Ba9xYdhwRzBnhVLf64Pc` | agent-browser eval | 2026-08-05 | complete |
| Review | Fix Leave a Review link | footer + /testimonials | Edit — point to `search.google.com/local/writereview?placeid=...` | 2 instances verified, both point to Google review composer (was Facebook) | agent-browser eval | 2026-08-05 | complete |
| Footer | Minimal rebuild | `src/components/layout/footer.tsx` | Rewrite — 3 columns (Brand+social, Explore, Contact), removed Services column | Footer height 466px (visibly shorter), 16 links (down from 20+) | `download/footer-verify.png` | 2026-08-05 | complete |
| Credit | Replace Gemsweb credit with Tangison | `src/components/layout/footer.tsx` | Edit — "Made by Tangison Studio" → `https://studio.tangison.com` | Verified live: text + href both correct, "Gemsweb" gone, "Made with ❤️" gone | agent-browser eval | 2026-08-05 | complete |
| SEO | Fix structured-data logo refs | `src/components/ui/structured-data.tsx` | Edit — `.png` → `.webp` | Schema.org image/logo now point to WebP asset | grep | 2026-08-05 | complete |
| Deploy | Commit and push maps/footer/credit fixes | `tangison/weca-offroad-centre` | `git commit` + `git push` | commit `63c046c` pushed | GitHub API | 2026-08-05 | complete |
| Deploy | Verify GitHub Action auto-deploy (2nd) | Vercel project | Watch for new production deployment | Deployment `pyoshrkvi` READY, all routes HTTP 200 | Vercel API | 2026-08-05 | complete |
| Verify | TypeScript strict check | Full project | `bunx tsc --noEmit` | 0 errors | terminal | 2026-08-05 | complete |
| Verify | ESLint | Full project | `bun run lint` | 0 errors, 0 warnings | terminal | 2026-08-05 | complete |
| Verify | Tests | Full project | `bun run test` | 39/39 passing | terminal | 2026-08-05 | complete |
| Verify | Production build | Full project | `bun run build` | 13/13 routes built, exit 0 | terminal | 2026-08-05 | complete |
| Deploy | Deployment-gap audit (user reported changes not live) | Local repo, GitHub remote, Vercel API | `git status`, `git log --oneline -10`, `git ls-remote origin`, `curl https://api.vercel.com/v6/deployments?projectId=...&target=production`, `curl https://api.vercel.com/v3/deployments/{uid}/aliases`, `curl https://api.vercel.com/v9/projects/{id}/domains` | Local HEAD `271fe8b` matches remote `271fe8b29da79b9d247dc94525d741359d51ac3d`; latest deployment `dpl_5eM4oVqr1xgWZ3x2Pm59T3WP5W9n` (READY, commit `271fe8b2`) IS aliased to `weca-off-road-centre-gemsweb-promo.vercel.app`; project domain config confirms `weca-off-road-centre-gemsweb-promo.vercel.app` is attached to project `prj_GzctwKJ7fx8ySYDHqBCBd1ixUMvV` (verified=true) | `git ls-remote`, Vercel API responses | 2026-08-05 04:16 UTC | complete |
| Verify | Raw fetch of live production `/contact` URL | `https://weca-off-road-centre-gemsweb-promo.vercel.app/contact` | `curl -s -L -H "Cache-Control: no-cache" "...?cb=$EPOCH" -o /tmp/live_contact.html`; grep for old/new markers | 77,551 bytes; all NEW markers present (`ChIJoa5Ba9xYdhwRzBnhVLf64Pc` x2, `output=embed` x1, `writereview` x2, `Tangison` x2, `studio.tangison.com` x2); all OLD markers absent (`0x0` x0, `maps.app.goo.gl` x0, `Gemsweb` x0, `Made with` x0); HTTP/2 200 from Vercel edge (x-vercel-id: hkg1::twd2f); iframe src verified as `https://maps.google.com/maps?q=place_id:ChIJoa5Ba9xYdhwRzBnhVLf64Pc&output=embed`; footer h3 headings reduced to `[Explore, Contact]` (was 4 columns); footer link count = 16 (was 20+); credit text "Made by Tangison Studio" with href `https://studio.tangison.com` verified | `/home/z/my-project/download/live-contact-proof-2026-08-05.html` (raw 77,551-byte HTML saved) | 2026-08-05 04:16 UTC | complete |
| Bug | Fix WhatsApp URL with spaces (found during verification) | `src/components/layout/footer.tsx`, `src/components/layout/navbar.tsx`, `src/app/shop/page.tsx` (x2), `src/app/contact/page.tsx` | Edit — change `.replace(/\+/g, '')` → `.replace(/\D/g, '')` so all non-digit chars (spaces, parens, dashes) are stripped | WhatsApp URLs render as `https://wa.me/264811691942` (was `https://wa.me/264 81 169 1942` broken with spaces) | grep post-fix | 2026-08-05 | complete |

## Pending client actions

1. **Purchase `wecaoffroad.com`** — requires payment, cannot be automated.
2. **Attach custom domain to Vercel** — `vercel domains add wecaoffroad.com`
   then assign to project, after purchase.
3. **Configure DNS** — point `wecaoffroad.com` A record and `www` CNAME to
   Vercel's nameservers, after domain is in Vercel account.
4. **Provide Tavily API key + SKU list** — for scraping authentic product
   images from manufacturers' sites (Tentco, Front Runner, Tough Dog, Wildog,
   Rhinoman, ARB, Ecoflow, Dometic, BF Goodrich). No AI images will be
   generated for /shop per client instruction; existing placeholders remain
   until the scrape is delivered.
5. **(Optional) Confirm YouTube/LinkedIn** — social audit found Facebook,
   Instagram, TikTok, WhatsApp all correct and live. Ask client whether a
   YouTube or LinkedIn profile exists to add to the footer social block.
6. **(Optional) Add Vercel-GitHub Login Connection** — visit
   `https://vercel.com/dashboard/login-connections` to enable native git
   integration. The GitHub Action workaround already provides auto-deploy on
   push, so this is not blocking.
