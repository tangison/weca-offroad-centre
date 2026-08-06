import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${siteConfig.business.name}.`,
  robots: { index: false, follow: false },
};

const lastUpdated = '6 August 2026';

export default function TermsPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-10 not-prose">
        <p className="text-xs font-accent uppercase tracking-wider text-[#E67E22] mb-2">
          Terms of Service
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-[#F5F5F5] mb-2">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-8 text-[#F5F5F5] font-body">
        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">1. About these terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            These terms govern your use of this website and the services offered by {siteConfig.business.legalName} (&quot;{siteConfig.business.name}&quot;, &quot;we&quot;, &quot;us&quot;). By browsing this site, contacting us, or asking us to quote, source, or fit a product, you accept these terms. If a written quote, invoice, or fitment contract contains terms that differ from these, the terms in that document take precedence for that transaction.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">2. This website</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We built this website to give you accurate, current information about the brands we carry, the services we offer, and the work we have done. We aim to keep it correct, but we make no warranty that every price, specification, lead time, or brand listing is up to date at the moment you read it. Stock shifts quickly and supplier pricing changes without notice. Confirm anything that matters with us before you travel or pay.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The site is currently private. Search engines are asked not to index it. Content and pricing are not final and may change at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">3. Quotes and orders</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A quote we give you on WhatsApp, by email, or in person is valid for 7 days unless we tell you otherwise. Stock is allocated only once a deposit or full payment is received. We will tell you at the time of quoting whether a deposit is required and how much.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Special-order items (items we do not normally carry and bring in at your request) cannot be cancelled, returned, or refunded once the supplier has accepted the order. We will always confirm with you before placing a special order.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">4. Fitment work</h2>
          <p className="text-muted-foreground leading-relaxed">
            Fitment is carried out at our workshop at {siteConfig.location.addressFull}. You must bring a vehicle that is safe to work on, with no loose cargo in the area where work will be performed. We will tell you in advance if a fitment requires the vehicle to stay overnight. We are not responsible for personal items left in the vehicle. Fitment workmanship is guaranteed for 6 months against defects in our installation; supplier warranties on the parts themselves are passed through to you on the terms the supplier gives us.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">5. Returns</h2>
          <p className="text-muted-foreground leading-relaxed">
            Stock items in original, unused condition, with packaging intact, can be returned within 14 days of purchase for a refund or exchange. Special-order items, electrical components, and installed parts cannot be returned. Refunds are issued to the original payment method. We do not refund delivery or fitment charges unless the return is due to an error on our part.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">6. Pricing</h2>
          <p className="text-muted-foreground leading-relaxed">
            All prices are quoted in Namibian Dollars (NAD) and include Namibian Value-Added Tax (VAT) where applicable. EFT, bank transfer, and card payments are accepted. We do not offer credit terms to retail customers. We are not bound by a price displayed on this website if it is incorrect; we will confirm the correct price at the time of quoting.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">7. Limitation of liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the maximum extent permitted by Namibian law, our liability for any single transaction is limited to the amount you paid us for that transaction. We are not liable for indirect, consequential, or special damages, including loss of use of your vehicle, missed trips, or business interruption, even if we were told such damages were possible.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">8. Governing law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These terms and any dispute arising from them are governed by the laws of the Republic of Namibia. The courts of Namibia have exclusive jurisdiction over any dispute, save that we may apply to any competent court for injunctive relief to protect our intellectual property.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-[#F5F5F5] mb-3">9. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about these terms go to {siteConfig.contact.email} or {siteConfig.contact.phone[0]}. You can also see our <Link href="/legal/privacy" className="text-[#E67E22] hover:underline">Privacy Policy</Link> for how we handle your information.
          </p>
        </section>
      </div>
    </article>
  );
}
