import { describe, it, expect } from "vitest";

/**
 * Route smoke tests.
 *
 * These tests verify that each page module exports a default component
 * (the Next.js page component) and can be imported without errors.
 *
 * They do NOT test rendering or behavior; they catch:
 *   - syntax errors
 *   - bad imports
 *   - missing exports
 *   - circular dependency issues
 *
 * For full integration tests, run `bun run build` and probe the live URL.
 */

const ROUTES = [
  "/",
  "/about",
  "/shop",
  "/gallery",
  "/services",
  "/testimonials",
  "/contact",
];

describe("route modules", () => {
  for (const route of ROUTES) {
    it(`/${route === "/" ? "" : route.slice(1)} exports a default component`, async () => {
      const path =
        route === "/"
          ? "@/app/page"
          : `@/app${route}/page`;
      const mod = await import(path);
      expect(mod.default).toBeDefined();
      expect(typeof mod.default).toBe("function");
    });
  }

  it("/api exports a GET handler", async () => {
    const mod = await import("@/app/api/route");
    expect(mod.GET).toBeDefined();
    expect(typeof mod.GET).toBe("function");
  });

  it("/api/contact exports POST and GET handlers", async () => {
    const mod = await import("@/app/api/contact/route");
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
    expect(typeof mod.GET).toBe("function");
    expect(typeof mod.POST).toBe("function");
  });

  it("/robots.txt exports a default function", async () => {
    const mod = await import("@/app/robots");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("/sitemap.xml exports a default function", async () => {
    const mod = await import("@/app/sitemap");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });
});
