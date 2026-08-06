import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `Cookie policy for ${siteConfig.business.name}.`,
  robots: { index: false, follow: false },
};

const lastUpdated = '6 August 2026';

export default function CookiesPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-10 not-prose">
        <p className="text-xs font-accent uppercase tracking-wider text-[#E67E22] mb-2">
          Cookie Policy
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-[#F5F5F5] mb-2">
          Cookie Policy
        </h1>
        <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-8 text-[#F5F5F5] font-body">
        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">1. What a cookie is</h2>
          <p className="text-muted-foreground leading-relaxed">
            A cookie is a small text file a website asks your browser to store on your device. Cookies let a site remember things between page loads, like whether you are logged in or what is in a cart. This policy explains which cookies this website sets and which are set by third-party content we embed.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">2. Cookies we set</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We do not set any advertising, tracking, or analytics cookies on this website. The only cookies set by us are:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
            <li><strong className="text-[#F5F5F5]">Essential session cookies.</strong> Used only if you submit the contact form, to prevent duplicate submissions. Deleted when you close your browser.</li>
            <li><strong className="text-[#F5F5F5]">Accessibility preference cookies.</strong> Used only if you toggle a reduced-motion or contrast preference that we add in future. Not currently in use.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We do not use Google Analytics, Meta Pixel, TikTok Pixel, or any other marketing tracker.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">3. Cookies set by embedded content</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We embed three pieces of live third-party content on this site. When you load a page that contains them, those platforms may set their own cookies on your browser:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
            <li><strong className="text-[#F5F5F5]">Google Maps embed</strong> on the <Link href="/contact" className="text-[#E67E22] hover:underline">Contact page</Link> and the home page. Google may set cookies including <code className="text-[#E67E22]">NID</code>, <code className="text-[#E67E22]">PREF</code>, and <code className="text-[#E67E22]">khcookie</code>. See <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-[#E67E22] hover:underline">Google&apos;s cookie policy</a>.</li>
            <li><strong className="text-[#F5F5F5]">Google Reviews embed</strong> on the <Link href="/testimonials" className="text-[#E67E22] hover:underline">Testimonials page</Link>. Same Google cookie families as above.</li>
            <li><strong className="text-[#F5F5F5]">Facebook Page embed</strong> on the <Link href="/about" className="text-[#E67E22] hover:underline">About page</Link>. Meta may set cookies including <code className="text-[#E67E22]">fr</code>, <code className="text-[#E67E22]">xs</code>, <code className="text-[#E67E22]">c_user</code>, and <code className="text-[#E67E22]">datr</code>. See <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer" className="text-[#E67E22] hover:underline">Meta&apos;s cookie policy</a>.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We cannot control which cookies those platforms set, and we cannot read them. Their use of your information is governed by their own policies, linked above.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">4. How to control or delete cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            You can control cookies through your browser settings. Most browsers let you:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
            <li>Block all cookies.</li>
            <li>Block only third-party cookies.</li>
            <li>Delete cookies that have already been set.</li>
            <li>Ask for confirmation before each cookie is set.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Blocking cookies may stop embedded Google Maps, Google Reviews, and Facebook content from rendering. The rest of the site will continue to work normally. Instructions for your browser: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#E67E22] hover:underline">Chrome</a>, <a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#E67E22] hover:underline">Firefox</a>, <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#E67E22] hover:underline">Safari</a>, <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#E67E22] hover:underline">Edge</a>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">5. Changes to this policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            If we add a new third-party embed, a new contact channel, or a feature that introduces new cookies, we will update this page and the &quot;Last updated&quot; date above.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions go to {siteConfig.contact.email} or {siteConfig.contact.phone[0]}. See our <Link href="/legal/privacy" className="text-[#E67E22] hover:underline">Privacy Policy</Link> for how we handle your information more broadly.
          </p>
        </section>
      </div>
    </article>
  );
}
