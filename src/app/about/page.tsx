import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { CTASection } from '@/components/ui/cta-section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Heart,
  Users,
  Award,
  MapPin,
  Phone,
  Clock,
  Target,
  Eye,
  CheckCircle,
  Wrench,
} from 'lucide-react';
import { businessInfo } from '@/lib/data';
import { FacebookPageEmbed } from '@/components/ui/facebook-page-embed';

export const metadata: Metadata = {
  title: 'About Weca Offroad | Swakopmund 4x4 Experts',
  description: 'Learn about Weca Offroad Centre, Namibia\'s trusted 4x4 accessories and fitment specialists. Founded in Swakopmund, serving all of Namibia.',
  openGraph: {
    title: 'About Weca Offroad | Swakopmund 4x4 Experts',
    description: 'Namibia\'s trusted 4x4 accessories and fitment specialists since 2015.',
  },
};

const values = [
  {
    icon: Shield,
    title: 'Quality Products',
    description: 'We only stock products we trust and would use on our own vehicles. No compromises on quality.',
    image: '/images/hero/slide-1.webp',
  },
  {
    icon: Heart,
    title: 'Honest Service',
    description: 'Transparent pricing, honest advice, and work done right the first time. Your satisfaction matters.',
    image: '/images/hero/slide-2.webp',
  },
  {
    icon: Users,
    title: 'Expert Knowledge',
    description: 'Years of experience in the 4x4 industry. We know what works in Namibian conditions.',
    image: '/images/hero/slide-3.webp',
  },
  {
    icon: Award,
    title: 'Customer Satisfaction',
    description: 'Your adventure starts with us. We are committed to helping you get the most out of your 4x4.',
    image: '/images/gallery/gallery-1.webp',
  },
];

const certifications = [
  'Tough Dog Authorized Dealer',
  'Front Runner Certified Fitment',
  'Tentco Premium Partner',
  'Import/Export Licensed',
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <PageHero
        title="About Weca Offroad Centre"
        subtitle="Your trusted partner for 4x4 accessories and fitment in Namibia since 2015"
        backgroundImage="/images/about/workshop.webp"
        size="md"
      />

      {/* Company Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Weca Offroad Centre was founded in 2015 in Swakopmund, Namibia, 
                  with a simple mission: to provide quality 4x4 accessories and 
                  professional fitment services to the growing offroad community 
                  in Namibia.
                </p>
                <p>
                  What started as a small workshop has grown into Namibia&apos;s 
                  premier 4x4 accessories store. We have helped thousands of 
                  customers upgrade their vehicles for adventures across the 
                  beautiful Namibian landscape - from the Skeleton Coast to the 
                  dunes of Sossusvlei.
                </p>
                <p>
                  Our team of experienced technicians takes pride in every 
                  installation, ensuring that each vehicle leaves our workshop 
                  ready for the toughest conditions Namibia can offer.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/gallery/gallery-1.webp"
                  alt="Weca Offroad Workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#E67E22] text-[#0D0D0D] p-6">
                <p className="font-heading text-4xl">{new Date().getFullYear() - 2015}+</p>
                <p className="text-sm font-accent uppercase tracking-wider">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="h-full bg-[#2A2A2A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#E67E22]/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-[#E67E22]" />
                </div>
                <h3 className="font-heading text-2xl text-[#F5F5F5] mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide Namibian 4x4 enthusiasts with quality products, 
                  professional installation, and expert advice that enables 
                  them to explore our beautiful country safely and confidently.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full bg-[#2A2A2A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#E67E22]/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-[#E67E22]" />
                </div>
                <h3 className="font-heading text-2xl text-[#F5F5F5] mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be Namibia&apos;s most trusted 4x4 partner, known for quality 
                  products, exceptional service, and a passionate community of 
                  offroad enthusiasts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] mb-6">
                Meet the Owner
              </h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#E67E22] mb-1">
                  {businessInfo.owner}
                </h3>
                <p className="text-muted-foreground/80 text-sm">Owner & Manager</p>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Werner Schaap founded Weca Offroad Centre out of a passion 
                  for 4x4 adventures and a desire to serve the growing offroad 
                  community in Namibia.
                </p>
                <p>
                  With years of experience in the automotive industry and a 
                  deep knowledge of what works in Namibian conditions, Werner 
                  personally oversees every major installation to ensure the 
                  highest quality standards.
                </p>
                <p className="italic text-[#F5F5F5] border-l-2 border-[#E67E22] pl-4">
                  &quot;We treat every vehicle as if it were our own. Our customers 
                  trust us with their adventures, and we take that responsibility 
                  seriously.&quot;
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden border-4 border-[#2A2A2A]">
                  <Image
                    src="/images/about/owner.webp"
                    alt="Werner Schaap - Owner"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#E67E22] flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-[#0D0D0D]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Page Embed — real, live Facebook content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="See Us on Facebook"
            subtitle="Live from our workshop — real posts, real photos, real updates"
          />
          <FacebookPageEmbed />
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="h-full bg-[#2A2A2A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A] to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="w-12 h-12 -mt-12 relative z-10 bg-[#E67E22] flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-[#0D0D0D]" />
                  </div>
                  <h3 className="font-accent text-[#F5F5F5] text-lg mb-2 uppercase tracking-wider">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Certifications & Partnerships"
            subtitle="Authorized dealer and certified fitment center for leading brands"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="h-full bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors">
                <CardContent className="p-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#E67E22] flex-shrink-0" />
                  <span className="text-sm text-[#F5F5F5]">{cert}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Visit Our Workshop"
            subtitle="Conveniently located in Swakopmund Industrial"
          />
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-full bg-[#2A2A2A] border-[#2A2A2A]">
              <CardContent className="p-8">
                <h3 className="font-heading text-xl text-[#F5F5F5] mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#E67E22] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#F5F5F5]">Address</p>
                      <p className="text-muted-foreground">{businessInfo.address}</p>
                      <p className="text-muted-foreground/80 text-sm">{businessInfo.city}, {businessInfo.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-[#E67E22] flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#F5F5F5]">Phone</p>
                      <a href={`tel:${businessInfo.phone[0].replace(/\s/g, '')}`} className="text-muted-foreground hover:text-[#E67E22] transition-colors">
                        {businessInfo.phone[0]}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-[#E67E22] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#F5F5F5]">Business Hours</p>
                      <p className="text-muted-foreground">Mon-Fri: {businessInfo.hours.weekdays}</p>
                      <p className="text-muted-foreground">Saturday: {businessInfo.hours.saturday}</p>
                      <p className="text-muted-foreground">Sunday: {businessInfo.hours.sunday}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild className="bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-[#0D0D0D] font-accent uppercase tracking-wider">
                    <a 
                      href={businessInfo.maps.googleMapsLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/images/about/workshop.webp"
                alt="Weca Offroad Workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Your Project?"
        subtitle="Visit our store or contact us for a quote. We are here to help you build your dream 4x4."
        primaryCTA={{ text: 'Get a Quote', href: '/contact' }}
        secondaryCTA={{ text: 'View Services', href: '/services' }}
        variant="dark"
      />
    </div>
  );
}
