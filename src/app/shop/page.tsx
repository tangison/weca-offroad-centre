'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PageHero } from '@/components/ui/page-hero';
import { CTASection } from '@/components/ui/cta-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Filter,
  MessageCircle,
  CheckCircle,
  X,
  ChevronDown,
  Mail,
  Search,
  Loader2,
} from 'lucide-react';
import { products, productCategories, businessInfo, brands } from '@/lib/data';
import type { Product } from '@/lib/data';

const PAGE_SIZE = 24;

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Derive category from URL — single source of truth, no duplicate state
  const selectedCategory = searchParams.get('category') || 'all';
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination when category changes via URL (back/forward nav).
  // React-recommended pattern: adjust state during render, not in useEffect.
  // See https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [prevCategory, setPrevCategory] = useState(selectedCategory);
  if (selectedCategory !== prevCategory) {
    setPrevCategory(selectedCategory);
    setVisibleCount(PAGE_SIZE);
  }

  // Update URL when category changes — URL is the source of truth
  const updateCategory = useCallback((categoryId: string) => {
    setVisibleCount(PAGE_SIZE);
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  // Filter + sort with useMemo for performance on 236+ products
  const sortedProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          if (!a.price || !b.price) return 0;
          return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
        case 'price-high':
          if (!a.price || !b.price) return 0;
          return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
        case 'brand':
          return a.brand.localeCompare(b.brand);
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Reset pagination when search or sort changes (called from handlers, not effects)
  const resetPagination = () => setVisibleCount(PAGE_SIZE);
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    resetPagination();
  };
  const handleSortChange = (value: string) => {
    setSortBy(value);
    resetPagination();
  };

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  const clearFilters = () => {
    updateCategory('all');
    setSearchQuery('');
    setSortBy('name');
  };

  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Shop 4x4 Accessories"
        subtitle="Quality products for your offroad adventures. Browse our selection and request a quote."
        backgroundImage="/images/shop/shop-hero.webp"
        size="sm"
      />

      {/* Price Match Banner */}
      <section className="py-4 bg-[#E67E22]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#0D0D0D] font-accent font-semibold uppercase tracking-wide text-sm">
            We beat any written quotation in Namibia! Contact us for competitive pricing.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Mobile Filter Bar */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F5F5] font-accent uppercase tracking-wider text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
              {selectedCategory !== 'all' && (
                <span className="w-5 h-5 bg-[#E67E22] text-[#0D0D0D] text-xs flex items-center justify-center">1</span>
              )}
            </button>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="flex-1 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] font-accent uppercase tracking-wider text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                <SelectItem value="name" className="text-[#F5F5F5]">Name (A-Z)</SelectItem>
                <SelectItem value="price-low" className="text-[#F5F5F5]">Price (Low-High)</SelectItem>
                <SelectItem value="price-high" className="text-[#F5F5F5]">Price (High-Low)</SelectItem>
                <SelectItem value="brand" className="text-[#F5F5F5]">Brand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div>
                  <h3 className="font-accent text-[#F5F5F5] mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Search
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search products..."
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#666] text-sm px-4 py-3 focus:outline-none focus:border-[#E67E22]"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => handleSearchChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#F5F5F5]"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-accent text-[#F5F5F5] mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {productCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => updateCategory(category.id)}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-[#E67E22] text-[#0D0D0D] font-accent font-semibold'
                            : 'text-[#888888] hover:bg-[#1A1A1A] hover:text-[#F5F5F5]'
                        }`}
                      >
                        {category.name}
                        <span className="float-right text-xs opacity-70">
                          {category.id === 'all'
                            ? products.length
                            : products.filter((p) => p.category === category.id).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-accent text-[#F5F5F5] mb-4 uppercase tracking-wider text-sm">Sort By</h3>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                      <SelectItem value="name" className="text-[#F5F5F5] hover:bg-[#2A2A2A]">Name (A-Z)</SelectItem>
                      <SelectItem value="price-low" className="text-[#F5F5F5] hover:bg-[#2A2A2A]">Price (Low to High)</SelectItem>
                      <SelectItem value="price-high" className="text-[#F5F5F5] hover:bg-[#2A2A2A]">Price (High to Low)</SelectItem>
                      <SelectItem value="brand" className="text-[#F5F5F5] hover:bg-[#2A2A2A]">Brand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick Contact */}
                <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <CardContent className="p-6">
                    <p className="font-accent text-[#F5F5F5] mb-2 uppercase tracking-wider text-sm">Need Help?</p>
                    <p className="text-sm text-[#888888] mb-4">
                      Our team can help you choose the right products.
                    </p>
                    <Button
                      asChild
                      className="w-full bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider"
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
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <p className="text-[#888888] text-sm">
                  Showing{' '}
                  <span className="font-accent text-[#F5F5F5]">
                    {visibleProducts.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-accent text-[#F5F5F5]">
                    {sortedProducts.length}
                  </span>{' '}
                  product{sortedProducts.length !== 1 ? 's' : ''}
                  {searchQuery && <span className="text-[#888888]"> for "{searchQuery}"</span>}
                </p>
                {(selectedCategory !== 'all' || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="text-[#E67E22] text-sm font-accent uppercase tracking-wider hover:underline self-start"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Mobile Search */}
              <div className="lg:hidden mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#666] text-sm px-4 py-3 focus:outline-none focus:border-[#E67E22]"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
                </div>
              </div>

              {/* Products */}
              {visibleProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {visibleProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: Math.min(index * 0.02, 0.2) }}
                        onClick={() => setSelectedProduct(product)}
                        className="cursor-pointer"
                      >
                        <Card className="group bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#E67E22] transition-colors overflow-hidden h-full">
                          <div className="relative aspect-square overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center">
                                <span className="text-[#888888] text-xs font-accent uppercase tracking-wider">Out of Stock</span>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-3 md:p-4">
                            <p className="text-[#E67E22] text-[10px] md:text-xs font-accent uppercase tracking-wider mb-1">
                              {product.brand}
                            </p>
                            <h3 className="text-[#F5F5F5] font-medium text-xs md:text-sm mb-2 line-clamp-2 group-hover:text-[#E67E22] transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-[#E67E22] font-accent font-semibold text-sm md:text-base">
                              {product.price}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="mt-10 flex flex-col items-center gap-3">
                      <Button
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="bg-[#1A1A1A] border border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider"
                      >
                        <Loader2 className="w-4 h-4 mr-2" />
                        Load More Products
                      </Button>
                      <p className="text-[#888888] text-xs">
                        Showing {visibleProducts.length} of {sortedProducts.length}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* No Results State */
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#1A1A1A] flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-[#888888]" />
                  </div>
                  <h3 className="font-heading text-2xl text-[#F5F5F5] mb-2">No Products Found</h3>
                  <p className="text-[#888888] text-sm mb-6">
                    {searchQuery
                      ? `No products match "${searchQuery}" in this category.`
                      : 'No products match the selected category.'}
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider"
                  >
                    View All Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-10 bg-[#1A1A1A] border-t border-[#2A2A2A]">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-[#888888] text-[10px] uppercase tracking-widest text-center mb-6 font-accent">
            Authorized Dealer
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {brands.map((brand) => (
              <span
                key={brand.name}
                className="text-[#888888] text-sm font-accent uppercase tracking-wider hover:text-[#E67E22] transition-colors cursor-pointer"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0D0D0D]/90 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#1A1A1A] border-t border-[#2A2A2A] max-h-[70vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
                <h3 className="font-heading text-lg text-[#F5F5F5]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-[#888888] hover:text-[#F5F5F5]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-[#2A2A2A]">
                <h4 className="font-accent text-[#F5F5F5] uppercase tracking-wider text-sm mb-3">Search</h4>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] text-[#F5F5F5] placeholder:text-[#888] text-sm px-4 py-3 focus:outline-none focus:border-[#E67E22]"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="p-4">
                <h4 className="font-accent text-[#F5F5F5] uppercase tracking-wider text-sm mb-3">Categories</h4>
                <div className="space-y-1">
                  {productCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        updateCategory(category.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#E67E22] text-[#0D0D0D] font-accent font-semibold'
                          : 'text-[#888888] hover:bg-[#2A2A2A] hover:text-[#F5F5F5]'
                      }`}
                    >
                      {category.name}
                      <span className="float-right text-xs opacity-70">
                        {category.id === 'all'
                          ? products.length
                          : products.filter((p) => p.category === category.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-[#2A2A2A] flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 border border-[#2A2A2A] text-[#888888] hover:text-[#F5F5F5] font-accent uppercase tracking-wider text-sm"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#E67E22] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider text-sm"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] border-[#2A2A2A]">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#F5F5F5] font-heading">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#E67E22] text-[#0D0D0D] px-3 py-1 text-xs font-accent font-semibold uppercase">
                      {selectedProduct.brand}
                    </span>
                    {selectedProduct.inStock ? (
                      <span className="bg-[#22C55E] text-[#0D0D0D] px-3 py-1 text-xs font-accent font-semibold uppercase">In Stock</span>
                    ) : (
                      <span className="border border-[#2A2A2A] text-[#888888] px-3 py-1 text-xs font-accent uppercase">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <p className="text-3xl font-accent font-bold text-[#E67E22]">
                    {selectedProduct.price || 'Request Quote'}
                  </p>

                  <p className="text-[#888888]">{selectedProduct.description}</p>

                  <div>
                    <h4 className="font-accent text-[#F5F5F5] mb-2 uppercase tracking-wider text-sm">Features:</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-[#888888]"
                        >
                          <CheckCircle className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button
                      asChild
                      className="w-full bg-[#E67E22] hover:bg-[#F39C12] text-[#0D0D0D] font-accent font-semibold uppercase tracking-wider"
                    >
                      <a
                        href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}?text=Hi, I'm interested in the ${selectedProduct.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Request Quote via WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#2A2A2A] font-accent uppercase tracking-wider">
                      <a href={`mailto:${businessInfo.email}?subject=Inquiry: ${selectedProduct.name}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email Inquiry
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <CTASection
        title="Need Help Choosing?"
        subtitle="Our team can help you find the right products for your vehicle and budget."
        primaryCTA={{ text: 'Contact Us', href: '/contact' }}
        secondaryCTA={{ text: 'Call Now', href: `tel:${businessInfo.phone[0].replace(/\s/g, '')}` }}
        variant="dark"
      />
    </div>
  );
}
