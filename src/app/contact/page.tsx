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
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { businessInfo } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

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
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    vehicle: '',
    // Honeypot field - hidden from real users, bots will fill it.
    website: '',
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [serverError, setServerError] = useState<string>('');

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
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!consent) {
      newErrors.consent = 'Please agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('submitting');
    setServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject === 'other'
            ? 'General enquiry'
            : subjectOptions.find(s => s.value === formData.subject)?.label || formData.subject,
          message: formData.message,
          vehicle: formData.vehicle,
          consent,
          // Honeypot field, must be empty.
          website: formData.website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setServerError(data.error || 'Too many attempts. Please wait and try again.');
        } else if (data.issues && Array.isArray(data.issues)) {
          const fieldErrors: Record<string, string> = {};
          for (const issue of data.issues) {
            fieldErrors[issue.path] = issue.message;
          }
          setErrors(fieldErrors);
          setServerError('Please correct the highlighted fields and try again.');
        } else {
          setServerError(data.error || 'Something went wrong. Please try WhatsApp instead.');
        }
        setStatus('error');
        return;
      }

      // Success - open WhatsApp (or mailto) in a new tab, then redirect to thank-you.
      if (contactMethod === 'whatsapp' && data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      } else if (contactMethod === 'email') {
        const selectedSubject = subjectOptions.find(s => s.value === formData.subject)?.label || formData.subject;
        const emailSubject = `${selectedSubject} - Weca Offroad Inquiry`;
        const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nVehicle: ${formData.vehicle || 'Not provided'}\nSubject: ${selectedSubject}\n\nMessage:\n${formData.message}`;
        const mailtoUrl = `mailto:${businessInfo.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
      }

      setStatus('success');
      // Short delay so the user sees the success state before redirect.
      setTimeout(() => {
        router.push('/thank-you');
      }, 600);
    } catch (err) {
      setServerError('Network error. Please try WhatsApp directly.');
      setStatus('error');
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
                  <p className="text-muted-foreground text-sm mb-6">
                    Fill out the form below and choose your preferred contact method.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Honeypot - hidden from real users, bots will fill it. */}
                    <div aria-hidden="true" className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden">
                      <label htmlFor="website">Website (leave empty)</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Server status banner */}
                    {status === 'error' && serverError && (
                      <div role="alert" className="flex items-start gap-3 p-4 border border-[#E67E22]/40 bg-[#E67E22]/10 text-[#F5F5F5]">
                        <AlertCircle className="w-5 h-5 text-[#E67E22] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm">{serverError}</p>
                      </div>
                    )}
                    {status === 'success' && (
                      <div role="status" className="flex items-start gap-3 p-4 border border-[#25D366]/40 bg-[#25D366]/10 text-[#F5F5F5]">
                        <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm">Opening WhatsApp now. Redirecting to the confirmation page...</p>
                      </div>
                    )}

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
                          required
                          autoComplete="name"
                          className={`bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-muted-foreground/80 focus:border-[#E67E22] h-12 ${errors.name ? 'border-[#E67E22]' : ''}`}
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
                          autoComplete="email"
                          className={`bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-muted-foreground/80 focus:border-[#E67E22] h-12 ${errors.email ? 'border-[#E67E22]' : ''}`}
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
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+264 xx xxx xxxx"
                          autoComplete="tel"
                          className="bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-muted-foreground/80 focus:border-[#E67E22] h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehicle" className="text-[#F5F5F5] text-xs font-accent uppercase tracking-wider">
                          Vehicle (optional)
                        </Label>
                        <Input
                          id="vehicle"
                          name="vehicle"
                          value={formData.vehicle}
                          onChange={handleChange}
                          placeholder="e.g. Toyota Hilux 2019"
                          autoComplete="off"
                          className="bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-muted-foreground/80 focus:border-[#E67E22] h-12"
                        />
                      </div>
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
                        className={`bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-muted-foreground/80 focus:border-[#E67E22] ${errors.message ? 'border-[#E67E22]' : ''}`}
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
                              : 'border-[#2A2A2A] text-muted-foreground hover:border-[#E67E22] hover:text-[#F5F5F5]'
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
                              : 'border-[#2A2A2A] text-muted-foreground hover:border-[#E67E22] hover:text-[#F5F5F5]'
                          }`}
                        >
                          <Mail className="w-5 h-5" />
                          <span className="font-accent font-semibold uppercase tracking-wider text-sm">Email</span>
                        </button>
                      </div>
                    </div>

                    {/* Consent checkbox */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={consent}
                          onCheckedChange={(checked) => {
                            setConsent(checked === true);
                            if (errors.consent) {
                              setErrors((prev) => ({ ...prev, consent: '' }));
                            }
                          }}
                          className="mt-1 border-[#2A2A2A] data-[state=checked]:bg-[#E67E22] data-[state=checked]:border-[#E67E22] data-[state=checked]:text-[#0D0D0D]"
                        />
                        <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                          I agree to be contacted about my enquiry and have read the{' '}
                          <Link href="/legal/privacy" className="text-[#E67E22] hover:underline">Privacy Policy</Link>.
                          <span className="text-[#E67E22]"> *</span>
                        </Label>
                      </div>
                      {errors.consent && (
                        <p className="text-sm text-[#E67E22]">{errors.consent}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={status === 'submitting' || status === 'success'}
                      className="w-full bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider h-12 disabled:opacity-60 disabled:cursor-not-allowed"
                      size="lg"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : status === 'success' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" aria-hidden="true" />
                          Sent - Redirecting...
                        </>
                      ) : contactMethod === 'whatsapp' ? (
                        <>
                          <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                          Send via WhatsApp
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" aria-hidden="true" />
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
                        href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`}
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
                        <p className="text-muted-foreground text-sm">
                          {businessInfo.address}
                        </p>
                        <p className="text-muted-foreground/80 text-xs">{businessInfo.city}, {businessInfo.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#E67E22]" />
                      <div>
                        <p className="text-[#F5F5F5] text-sm font-medium">Phone</p>
                        <a
                          href={`tel:${businessInfo.phone[0].replace(/\s/g, '')}`}
                          className="text-muted-foreground hover:text-[#E67E22] transition-colors text-sm"
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
                          className="text-muted-foreground hover:text-[#E67E22] transition-colors text-sm"
                        >
                          {businessInfo.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#E67E22] mt-0.5" />
                      <div>
                        <p className="text-[#F5F5F5] text-sm font-medium">Hours</p>
                        <p className="text-muted-foreground text-sm">Mon-Fri: {businessInfo.hours.weekdays}</p>
                        <p className="text-muted-foreground text-sm">Sat: {businessInfo.hours.saturday}</p>
                        <p className="text-muted-foreground text-sm">Sun: {businessInfo.hours.sunday}</p>
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
                      className="w-10 h-10 flex items-center justify-center bg-[#0D0D0D] text-muted-foreground hover:text-[#E67E22] transition-colors"
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
                      className="w-10 h-10 flex items-center justify-center bg-[#0D0D0D] text-muted-foreground hover:text-[#E67E22] transition-colors"
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
                      className="w-10 h-10 flex items-center justify-center bg-[#0D0D0D] text-muted-foreground hover:text-[#E67E22] transition-colors"
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
            <p className="text-muted-foreground text-sm">Visit our workshop in Swakopmund Industrial</p>
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
                <div className="space-y-3 text-muted-foreground text-sm">
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
