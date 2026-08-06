import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.business.name}.`,
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/legal/privacy',
  },
};

const lastUpdated = '6 August 2026';

export default function PrivacyPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-10 not-prose">
        <p className="text-xs font-accent uppercase tracking-wider text-[#E67E22] mb-2">
          Privacy Policy
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-[#F5F5F5] mb-2">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-8 text-[#F5F5F5] font-body">
        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">1. Who we are</h2>
          <p className="text-muted-foreground leading-relaxed">
            {siteConfig.business.legalName} (&quot;{siteConfig.business.name}&quot;, &quot;we&quot;, &quot;us&quot;) is a Namibian-registered close corporation located at {siteConfig.location.addressFull}. We retail and fit 4x4 accessories, recovery gear, suspension, canopies, camping equipment, and portable power systems. You can reach us at {siteConfig.contact.email} or {siteConfig.contact.phone[0]}.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">2. What we collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We only collect information you give us directly. When you use our contact form, send us an email, or message us on WhatsApp, we receive the name, email address, phone number, vehicle details, and message content you choose to share. We do not use third-party analytics, advertising trackers, or marketing pixels on this website.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our website embeds content from third-party platforms (Google Maps, Google Reviews, and Facebook). Those platforms may set their own cookies and collect information about your visit when you interact with the embedded content. Their use of your information is governed by their own privacy policies, not this one.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">3. How we use what you give us</h2>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
            <li>To respond to your enquiry, quote, or appointment request.</li>
            <li>To prepare a fitment booking, source a part you asked about, or follow up on a job in progress.</li>
            <li>To keep a record of what was discussed so we can help you on future visits.</li>
            <li>To meet our legal and tax record-keeping obligations under Namibian law.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">4. How long we keep it</h2>
          <p className="text-muted-foreground leading-relaxed">
            We keep enquiry and quote records for as long as is reasonable to service an ongoing customer relationship and to satisfy Namibian tax and consumer-protection record-keeping requirements. You can ask us to delete your personal information at any time by emailing {siteConfig.contact.email}, and we will remove it unless we are legally required to retain it.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">5. Who we share it with</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We do not sell, rent, or trade your personal information. We share it only:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
            <li>With our suppliers and brand partners, when needed to source or warranty a part you ordered.</li>
            <li>With our accountants and auditors, to the extent required for tax and financial record-keeping.</li>
            <li>When required by law, court order, or a lawful request from a Namibian authority.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">6. Your rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            You can ask us at any time to confirm what personal information we hold about you, correct anything that is wrong, or delete it. Email {siteConfig.contact.email} and we will respond within 30 days. You also have the right to lodge a complaint with the Namibian Data Protection regulator if you believe we have mishandled your information.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">7. Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We apply reasonable technical and physical safeguards to protect your information against unauthorised access, loss, and misuse. No method of transmission or electronic storage is fully secure, so we cannot guarantee absolute security, but we treat your information with the same care we treat our own business records.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">8. Changes to this policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            If we change this policy, we will update the &quot;Last updated&quot; date at the top of this page. If we make a material change to how we handle your personal information, we will notify you the next time you contact us or visit the workshop.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">9. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about this policy go to {siteConfig.contact.email} or {siteConfig.contact.phone[0]}. You can also visit us at {siteConfig.location.addressFull}. See our <Link href="/legal/cookies" className="text-[#E67E22] hover:underline">Cookie Policy</Link> for details on the specific cookies this site uses.
          </p>
        </section>
      </div>
    </article>
  );
}
