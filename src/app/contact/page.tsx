'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Send,
} from 'lucide-react';
import { businessInfo } from '@/lib/data';

// TikTok Icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const subjectOptions = [
  { value: 'product', label: 'Product Inquiry' },
  { value: 'service', label: 'Service Quote' },
  { value: 'question', label: 'General Question' },
  { value: 'warranty', label: 'Warranty Claim' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    // Email required if contact method is email
    if (contactMethod === 'email' && !formData.email.trim()) {
      newErrors.email = 'Email is required for email contact';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const selectedSubject = subjectOptions.find(s => s.value === formData.subject)?.label || formData.subject;

    if (contactMethod === 'whatsapp') {
      // Build WhatsApp message
      const message = `Hi Weca Offroad,

*Name:* ${formData.name}
*Email:* ${formData.email || 'Not provided'}
*Phone:* ${formData.phone || 'Not provided'}
*Subject:* ${selectedSubject}

*Message:*
${formData.message}`;

      // Redirect to WhatsApp
      const whatsappUrl = `https://wa.me/${businessInfo.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Build email
      const emailSubject = `${selectedSubject} - Weca Offroad Inquiry`;
      const emailBody = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${selectedSubject}

Message:
${formData.message}`;

      const mailtoUrl = `mailto:${businessInfo.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Contact Us"
        subtitle="Get in touch for quotes, inquiries, or just to say hello"
        backgroundImage="/images/about/workshop.webp"
        size="sm"
      />

      {/* Contact Content */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                <CardContent className="p-5 md:p-8">
                  <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-[#888888] text-sm mb-6">
                    Fill out the form below and choose your preferred contact method.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#F5F5F5] text-xs font-accent uppercase tracking-wider">
                          Name <span className="text-[#E67E22]">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#888888]/50 focus:border-[#E67E22] h-12 ${errors.name ? 'border-[#E67E22]' : ''}`}
                        />
                        {errors.name && (
                          <p className="text-sm text-[#E67E22]">{errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#F5F5F5] text-xs font-accent uppercase tracking-wider">
                          Email {contactMethod === 'email' && <span className="text-[#E67E22]">*</span>}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#888888]/50 focus:border-[#E67E22] h-12 ${errors.email ? 'border-[#E67E22]' : ''}`}
                        />
                        {errors.email && (
                          <p className="text-sm text-[#E67E22]">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#F5F5F5] text-xs font-accent uppercase tracking-wider">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+264 xx xxx xxxx"
                          className="bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#888888]/50 focus:border-[#E67E22] h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[#F5F5F5] text-xs font-accent uppercase tracking-wider">
                          Subject <span className="text-[#E67E22]">*</span>
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, subject: value }));
                            if (errors.subject) {
                              setErrors((prev) => ({ ...prev, subject: '' }));
                            }
                          }}
                        >
                          <SelectTrigger className={`bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] h-12 ${errors.subject ? 'border-[#E67E22]' : ''}`}>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                            {subjectOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value} className="text-[#F5F5F5] hover:bg-[#2A2A2A] focus:bg-[#2A2A2A]">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.subject && (
                          <p className="text-sm text-[#E67E22]">{errors.subject}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#F5F5F5] text-xs font-accent uppercase tracking-wider">
                        Message <span className="text-[#E67E22]">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your vehicle, what you're looking for..."
                        rows={5}
                        className={`bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#888888]/50 focus:border-[#E67E22] ${errors.message ? 'border-[#E67E22]' : ''}`}
                      />
                      {errors.message && (
                        <p className="text-sm text-[#E67E22]">{errors.message}</p>
                      )}
                    </div>

                    {/* Contact Method Selection */}
                    <div className="space-y-3">
                      <Label className="text-[#F5F5F5] text-xs font-accent uppercase tracking-wider">
                        Send Via
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setContactMethod('whatsapp')}
                          className={`flex items-center justify-center gap-2 p-4 border transition-colors ${
                            contactMethod === 'whatsapp'
                              ? 'bg-[#E67E22] border-[#E67E22] text-[#0D0D0D]'
                              : 'border-[#2A2A2A] text-[#888888] hover:border-[#E67E22] hover:text-[#F5F5F5]'
                          }`}
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-accent font-semibold uppercase tracking-wider text-sm">WhatsApp</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMethod('email')}
                          className={`flex items-center justify-center gap-2 p-4 border transition-colors ${
                            contactMethod === 'email'
                              ? 'bg-[#E67E22] border-[#E67E22] text-[#0D0D0D]'
                              : 'border-[#2A2A2A] text-[#888888] hover:border-[#E67E22] hover:text-[#F5F5F5]'
                          }`}
                        >
                          <Mail className="w-5 h-5" />
                          <span className="font-accent font-semibold uppercase tracking-wider text-sm">Email</span>
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider h-12"
                      size="lg"
                    >
                      {contactMethod === 'whatsapp' ? (
                        <>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send via WhatsApp
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send via Email
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-5">
              {/* Quick Contact */}
              <Card className="bg-[#E67E22] text-[#0D0D0D] border-0">
                <CardContent className="p-5">
                  <h3 className="font-heading text-lg uppercase tracking-wide mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <Button
                      asChild
                      className="w-full bg-[#0D0D0D] text-[#F5F5F5] hover:bg-[#1A1A1A] font-accent font-semibold uppercase tracking-wider h-11"
                    >
                      <a
                        href={`https://wa.me/${businessInfo.whatsapp.replace(/\+/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Us
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F5F5F5] font-accent font-semibold uppercase tracking-wider h-11"
                    >
                      <a href={`tel:${businessInfo.phone[0].replace(/\s/g, '')}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F5F5F5] font-accent font-semibold uppercase tracking-wider h-11"
                    >
                      <a href={`mailto:${businessInfo.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email Us
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                <CardContent className="p-5">
                  <h3 className="font-heading text-lg uppercase tracking-wide text-[#F5F5F5] mb-4">
                    Contact Info
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#E67E22] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#F5F5F5] text-sm font-medium">Address</p>
                        <p className="text-[#888888] text-sm">
                          {businessInfo.address}
                        </p>
                        <p className="text-[#888888]/60 text-xs">{businessInfo.city}, {businessInfo.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#E67E22]" />
                      <div>
                        <p className="text-[#F5F5F5] text-sm font-medium">Phone</p>
                        <a
                          href={`tel:${businessInfo.phone[0].replace(/\s/g, '')}`}
                          className="text-[#888888] hover:text-[#E67E22] transition-colors text-sm"
                        >
                          {businessInfo.phone[0]}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#E67E22]" />
                      <div>
                        <p className="text-[#F5F5F5] text-sm font-medium">Email</p>
                        <a
                          href={`mailto:${businessInfo.email}`}
                          className="text-[#888888] hover:text-[#E67E22] transition-colors text-sm"
                        >
                          {businessInfo.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#E67E22] mt-0.5" />
                      <div>
                        <p className="text-[#F5F5F5] text-sm font-medium">Hours</p>
                        <p className="text-[#888888] text-sm">Mon-Fri: {businessInfo.hours.weekdays}</p>
                        <p className="text-[#888888] text-sm">Sat: {businessInfo.hours.saturday}</p>
                        <p className="text-[#888888] text-sm">Sun: {businessInfo.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social */}
              <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                <CardContent className="p-5">
                  <h3 className="font-heading text-lg uppercase tracking-wide text-[#F5F5F5] mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={businessInfo.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-[#0D0D0D] text-[#888888] hover:text-[#E67E22] transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a
                      href={businessInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-[#0D0D0D] text-[#888888] hover:text-[#E67E22] transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" strokeWidth="2" />
                      </svg>
                    </a>
                    <a
                      href={businessInfo.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-[#0D0D0D] text-[#888888] hover:text-[#E67E22] transition-colors"
                      aria-label="TikTok"
                    >
                      <TikTokIcon className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 md:py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-[#F5F5F5] mb-2">
              Find Us
            </h2>
            <p className="text-[#888888] text-sm">Visit our workshop in Swakopmund Industrial</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="relative aspect-video overflow-hidden border border-[#2A2A2A]">
              <iframe
                src={businessInfo.maps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Weca Offroad Location"
              />
            </div>

            <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
              <CardContent className="p-5">
                <h3 className="font-heading text-lg uppercase tracking-wide text-[#F5F5F5] mb-4">
                  Getting Here
                </h3>
                <div className="space-y-3 text-[#888888] text-sm">
                  <p>
                    We are located in the Swakopmund Industrial area, easily 
                    accessible from the main roads. Look for our signage on 
                    Eliaser Tuhadeleni Street.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F5]">Parking:</strong> Free parking available on-site.
                  </p>
                </div>
                <Button
                  asChild
                  className="mt-6 bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider"
                >
                  <a
                    href={businessInfo.maps.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
