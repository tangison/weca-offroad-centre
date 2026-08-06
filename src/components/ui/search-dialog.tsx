'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Wrench, Image as ImageIcon } from 'lucide-react';
import { services, galleryItems } from '@/lib/data';
import { siteConfig } from '@/lib/config';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchResult {
  type: 'product' | 'service' | 'gallery';
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Build search index
  // NOTE: Products are intentionally excluded from search per client
  // instruction (2026-08-06). The fabricated catalog has been removed
  // from the live site; the /shop page shows a "Catalog coming soon"
  // empty state. When the real SKU-level catalog arrives, re-add the
  // products block here (see git history for the original code).
  const searchIndex = useMemo<SearchResult[]>(() => {
    const results: SearchResult[] = [];

    // Services
    services.forEach((service) => {
      results.push({
        type: 'service',
        id: service.id,
        title: service.name,
        description: `From ${service.startingPrice || 'On Request'}`,
        image: service.image,
        href: '/services',
        badge: 'Service',
      });
    });

    // Gallery
    galleryItems.forEach((item) => {
      results.push({
        type: 'gallery',
        id: item.id,
        title: item.title,
        description: item.vehicle,
        image: item.image,
        href: '/gallery',
        badge: item.category.replace('-', ' '),
      });
    });

    return results;
  }, []);

  // Filter results
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();
    
    return searchIndex.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        (item.badge && item.badge.toLowerCase().includes(lowerQuery))
      );
    }).slice(0, 12);
  }, [query, searchIndex]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {
      product: [],
      service: [],
      gallery: [],
    };

    filteredResults.forEach((result) => {
      groups[result.type].push(result);
    });

    return groups;
  }, [filteredResults]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setQuery('');
        setSelectedIndex(0);
      }, 200);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredResults.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : filteredResults.length - 1
        );
      }

      if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        e.preventDefault();
        onClose();
        window.location.href = filteredResults[selectedIndex].href;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'service':
        return Wrench;
      case 'gallery':
        return ImageIcon;
      default:
        return Wrench;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-[#0D0D0D]/95"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center border-b border-[#2A2A2A]">
                <Search className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Search services, gallery..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent border-0 text-[#F5F5F5] placeholder:text-muted-foreground focus-visible:ring-0 text-base py-4 px-3"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="p-4 text-muted-foreground hover:text-[#F5F5F5] transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="py-12 text-center">
                    <Search className="w-8 h-8 text-[#2A2A2A] mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      Start typing to search...
                    </p>
                    <p className="text-muted-foreground/80 text-xs mt-1">
                      Services and gallery items
                    </p>
                  </div>
                ) : filteredResults.length === 0 ? (
                  <div className="py-12 text-center">
                    <Search className="w-8 h-8 text-[#2A2A2A] mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      No results for &quot;{query}&quot;
                    </p>
                    <p className="text-muted-foreground/80 text-xs mt-1">
                      Try different keywords or browse our services
                    </p>
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="inline-block mt-4 px-4 py-2 bg-[#E67E22] text-[#0D0D0D] text-sm font-accent font-semibold uppercase tracking-wider hover:bg-[#F39C12] transition-colors"
                    >
                      Browse Services
                    </Link>
                  </div>
                ) : (
                  <div className="py-2">
                    {/* Services */}
                    {groupedResults.service.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 px-4 py-2 text-muted-foreground text-xs font-accent uppercase tracking-wider border-t border-[#2A2A2A]">
                          <Wrench className="w-3 h-3" />
                          Services ({groupedResults.service.length})
                        </div>
                        {groupedResults.service.map((result) => {
                          const globalIdx = filteredResults.indexOf(result);
                          return (
                            <Link
                              key={`${result.type}-${result.id}`}
                              href={result.href}
                              onClick={onClose}
                              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                                globalIdx === selectedIndex
                                  ? 'bg-[#2A2A2A]'
                                  : 'hover:bg-[#2A2A2A]'
                              }`}
                            >
                              <div className="relative w-10 h-10 flex-shrink-0 bg-[#2A2A2A] overflow-hidden">
                                <Image
                                  src={result.image}
                                  alt={result.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[#F5F5F5] text-sm font-medium truncate">
                                  {result.title}
                                </p>
                                <p className="text-muted-foreground text-xs truncate">
                                  {result.description}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {/* Gallery */}
                    {groupedResults.gallery.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 px-4 py-2 text-muted-foreground text-xs font-accent uppercase tracking-wider border-t border-[#2A2A2A]">
                          <ImageIcon className="w-3 h-3" />
                          Gallery ({groupedResults.gallery.length})
                        </div>
                        {groupedResults.gallery.map((result) => {
                          const globalIdx = filteredResults.indexOf(result);
                          return (
                            <Link
                              key={`${result.type}-${result.id}`}
                              href={result.href}
                              onClick={onClose}
                              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                                globalIdx === selectedIndex
                                  ? 'bg-[#2A2A2A]'
                                  : 'hover:bg-[#2A2A2A]'
                              }`}
                            >
                              <div className="relative w-10 h-10 flex-shrink-0 bg-[#2A2A2A] overflow-hidden">
                                <Image
                                  src={result.image}
                                  alt={result.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[#F5F5F5] text-sm font-medium truncate">
                                  {result.title}
                                </p>
                                <p className="text-muted-foreground text-xs truncate">
                                  {result.description}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              {filteredResults.length > 0 && (
                <div className="border-t border-[#2A2A2A] px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-[#2A2A2A] text-[#F5F5F5] font-mono">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-[#2A2A2A] text-[#F5F5F5] font-mono">↓</kbd>
                      <span className="ml-1">Navigate</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-[#2A2A2A] text-[#F5F5F5] font-mono">Enter</kbd>
                      <span className="ml-1">Select</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-[#2A2A2A] text-[#F5F5F5] font-mono">Esc</kbd>
                      <span className="ml-1">Close</span>
                    </span>
                  </div>
                  <span>{filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
