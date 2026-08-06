import { siteConfig } from '@/lib/config';

/**
 * JSON-LD structured data components.
 *
 * Each component renders a <script type="application/ld+json"> tag that
 * search engines (Google, Bing, Yandex) can parse to understand the page
 * content and eligibility for rich results.
 *
 * Components:
 *   - LocalBusinessStructuredData  (root layout, every page)
 *   - WebsiteStructuredData         (root layout, every page)
 *   - BreadcrumbStructuredData      (inner pages with breadcrumbs)
 *   - ServiceStructuredData         (per-service detail - future)
 *   - FAQPageStructuredData         (any page with FAQ accordion)
 *   - OrganizationStructuredData    (about page)
 *   - ContactPointStructuredData    (contact page)
 */

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore', // More specific than LocalBusiness
    '@id': `${siteConfig.domain}/#organization`,
    name: siteConfig.business.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.domain,
    telephone: siteConfig.contact.phone[0],
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      postalCode: siteConfig.location.postalCode,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.location.coordinates.lat,
      longitude: siteConfig.location.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '12:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'NAD',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    image: `${siteConfig.domain}/og-image.png`,
    logo: `${siteConfig.domain}/logo.svg`,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
    ],
    hasMap: siteConfig.maps.googleMapsLink,
    areaServed: {
      '@type': 'Country',
      name: 'Namibia',
    },
  };

  return <JsonLd data={structuredData} />;
}

export function WebsiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.business.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.domain}/logo.svg`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.domain}/shop?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={structuredData} />;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.url}`,
    })),
  };

  return <JsonLd data={structuredData} />;
}

interface ServiceItem {
  name: string;
  description: string;
  url: string;
  priceFrom?: string;
  category?: string;
}

export function ServiceStructuredData({ service }: { service: ServiceItem }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${siteConfig.domain}${service.url}`,
    provider: {
      '@type': 'AutoPartsStore',
      name: siteConfig.business.name,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Namibia',
    },
    ...(service.priceFrom && {
      offers: {
        '@type': 'Offer',
        price: service.priceFrom.replace(/[^\d.]/g, ''),
        priceCurrency: 'NAD',
        availability: 'https://schema.org/InStock',
      },
    }),
    ...(service.category && {
      category: service.category,
    }),
  };

  return <JsonLd data={structuredData} />;
}

export function ServiceListStructuredData({ services }: { services: ServiceItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `${siteConfig.domain}${service.url}`,
        provider: {
          '@type': 'AutoPartsStore',
          name: siteConfig.business.name,
          url: siteConfig.domain,
        },
      },
    })),
  };

  return <JsonLd data={structuredData} />;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPageStructuredData({ faqs }: { faqs: FAQItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={structuredData} />;
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.domain}/#organization`,
    name: siteConfig.business.name,
    legalName: siteConfig.business.legalName,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/logo.svg`,
    foundingDate: siteConfig.business.founded,
    founder: {
      '@type': 'Person',
      name: siteConfig.business.owner,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      postalCode: siteConfig.location.postalCode,
      addressCountry: siteConfig.location.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone[0],
        email: siteConfig.contact.email,
        contactType: 'customer service',
        areaServed: 'Namibia',
        availableLanguage: ['English', 'Afrikaans'],
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
    ],
  };

  return <JsonLd data={structuredData} />;
}

export function ContactPageStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Weca Offroad Centre',
    url: `${siteConfig.domain}/contact`,
    mainEntity: {
      '@type': 'AutoPartsStore',
      name: siteConfig.business.name,
      telephone: siteConfig.contact.phone[0],
      email: siteConfig.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.location.address,
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.region,
        postalCode: siteConfig.location.postalCode,
        addressCountry: siteConfig.location.country,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:00',
          closes: '12:00',
        },
      ],
    },
  };

  return <JsonLd data={structuredData} />;
}
