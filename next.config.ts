import type { NextConfig } from "next";

const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains, with preload list opt-in.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent clickjacking. We allow same-origin so our own pages can be
  // iframed (e.g. a future /embed route), but nobody else can frame us.
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Stop browsers from MIME-sniffing content types.
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Referrer policy: send origin only on same origin, full URL on same origin
  // only. Cross-origin requests get the origin only when HTTPS is preserved.
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Permissions policy: lock down powerful APIs to self only.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  // Content Security Policy: only allow resources from our own origin,
  // next/font, Google Fonts, Google Maps, Google Reviews, Facebook plugin,
  // and inline styles/scripts that Next.js generates.
  // Note: 'unsafe-inline' on style-src is required for Next.js inline styles.
  // 'unsafe-inline' on script-src is required for Next.js inline hydration.
  // Vercel Analytics uses a nonce but we still allow 'unsafe-inline' to
  // keep Next.js happy without breaking its own runtime.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://platform.twitter.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: *.vercel.app *.googleusercontent.com *.fbcdn.net",
      "media-src 'self'",
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com https://www.facebook.com https://web.facebook.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com https://region1.google-analytics.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://wa.me",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  // Don't expose the server version.
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Common old URLs that should land on the canonical routes.
      { source: "/home", destination: "/", permanent: true },
      { source: "/reviews", destination: "/testimonials", permanent: true },
      { source: "/privacy", destination: "/legal/privacy", permanent: true },
      { source: "/terms", destination: "/legal/terms", permanent: true },
      { source: "/cookies", destination: "/legal/cookies", permanent: true },
      { source: "/sitemap", destination: "/site-map", permanent: true },
    ];
  },
};

export default nextConfig;
