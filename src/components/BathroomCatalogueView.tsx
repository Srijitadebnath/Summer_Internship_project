import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, SlidersHorizontal, ChevronRight, Check, ShoppingBag, Plus, Minus } from 'lucide-react';
import { CatalogueVideoBanner } from './CatalogueVideoBanner';
import { useCart, products } from '../context/CartContext';
import type { ProductItem } from '../context/CartContext';

interface BathroomCatalogueViewProps {
  onBack: () => void;
}

const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);

  const cartItem = cartItems.find(
    (item) => item.product.id === product.id && item.size === selectedSize
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group bg-gradient-to-br from-[#EBF2FC] via-[#E1ECFA] to-[#D4E4F7]/40 border border-primary/15 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-accent/30 transition-all duration-300"
    >
      <div>
        {/* Product header info */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <span className="text-[8px] font-black text-accent uppercase bg-white px-2.5 py-1 rounded-full border border-neutral-cool shadow-xs">
            {product.brand}
          </span>
          <span className="text-[8px] font-bold text-neutral-dark/50 uppercase">
            {product.category}
          </span>
        </div>

        {/* Styled SVG Vector Drawing Wrapper */}
        <div className="w-full h-32 bg-white rounded-xl flex items-center justify-center border border-neutral-cool shadow-xs mb-4 group-hover:scale-[1.02] transition-transform duration-300">
          {product.icon}
        </div>

        {/* Product Name */}
        <h4 className="font-display font-extrabold text-sm text-primary uppercase leading-tight mb-2 tracking-tight group-hover:text-accent transition-colors">
          {product.name}
        </h4>

        {/* Technical specifications */}
        <div className="border-t border-neutral-cool/80 pt-3 mb-4">
          <ul className="flex flex-col gap-1.5">
            {product.specs.map((spec, idx) => (
              <li key={idx} className="flex items-center gap-1.5 text-[10px] font-medium text-neutral-dark/75">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        {/* Size Selection pills */}
        <div className="mb-4">
          <label className="block text-[9px] font-black text-primary/60 uppercase tracking-wider mb-2">
            Select Option / Size
          </label>
          <div className="flex flex-wrap gap-1.5 select-none">
            {product.sizes.map(size => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-primary border-primary text-white shadow-xs'
                      : 'bg-white border-neutral-cool text-primary/70 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="text-[10px] font-extrabold text-neutral-dark/50 uppercase tracking-wider mb-4">
          Est: <span className="text-primary text-xs font-black normal-case">{product.priceRange}</span>
        </div>

        {/* Quantity Adjuster or Add to Cart Button */}
        {cartItem ? (
          <div className="flex items-center justify-between border border-primary/20 bg-white rounded-xl py-2 px-3 shadow-xs">
            <button
              onClick={() => updateQuantity(product.id, selectedSize, cartItem.quantity - 1)}
              className="w-8 h-8 rounded-lg bg-neutral-cool hover:bg-neutral-cool/80 flex items-center justify-center text-primary font-bold transition-all active:scale-90 cursor-pointer select-none"
              aria-label="Decrease Quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-black text-primary select-none">
              {cartItem.quantity} in Cart
            </span>
            <button
              onClick={() => updateQuantity(product.id, selectedSize, cartItem.quantity + 1)}
              className="w-8 h-8 rounded-lg bg-neutral-cool hover:bg-neutral-cool/80 flex items-center justify-center text-primary font-bold transition-all active:scale-90 cursor-pointer select-none"
              aria-label="Increase Quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product, selectedSize)}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-[10px] tracking-wider uppercase py-3.5 rounded-xl active:scale-[0.97] transition-all duration-200 cursor-pointer shadow-md shadow-primary/10"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Enquiry Cart</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const BathroomCatalogueView: React.FC<BathroomCatalogueViewProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoriesList = ['All', 'Premium Faucets', 'Diverters & Valves', 'Showers & Rails', 'Health Faucets'];
  const brandsList = ['All', 'ROCA', 'PARRYWARE', 'BATHSENSE', 'ESS ESS'];

  // Filter products based on search & selectors
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.id.startsWith('b')) return false;
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchBrand && matchSearch;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="w-full bg-white py-6 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 1. Header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-cool">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 self-start text-xs font-bold text-primary hover:text-accent transition-colors bg-neutral-cool hover:bg-neutral-cool/80 px-4 py-2.5 rounded-full border border-neutral-cool/60 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Categories</span>
          </button>

          <h3 className="font-display font-extrabold text-lg text-primary uppercase tracking-wide">
            Bathroom & Fittings Showcase
          </h3>
        </div>

        {/* 2. Video Banner */}
        <CatalogueVideoBanner
          title="Bathroom & Fittings Catalogue"
          subtitle="Explore our premium bathroom and wellness solutions. We are authorized distributors of ROCA, PARRYWARE, BATHSENSE, and ESS ESS, delivering world-class faucets, overhead rain showers, diverters, and health sprays."
          videoSrc="/videos/bathroomandFittings.mp4"
          category="New Launch"
        />

        {/* 3. Search and Quick Filters bar */}
        <div className="bg-neutral-cool/40 border border-neutral-cool/80 rounded-3xl p-4 sm:p-5 mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search catalog (e.g. Faucet, Roca, Shower)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-cool rounded-xl pl-10 pr-4 py-2.5 text-xs text-primary placeholder:text-neutral-dark/35 focus:border-accent focus:outline-none transition-colors"
            />
            <Search className="w-4 h-4 text-neutral-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Quick info metrics & filters toggle */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs font-bold text-primary select-none self-stretch md:self-auto">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span>Showing {filteredProducts.length} Products</span>
            </div>
            
            {/* Mobile Collapsible Filters Trigger */}
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="md:hidden flex items-center gap-2 bg-white border border-neutral-cool hover:border-primary/30 text-primary px-4 py-2 rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              <span>Filters</span>
              <motion.span
                animate={{ rotate: isMobileFiltersOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px]"
              >
                ▼
              </motion.span>
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Filters Panel */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden mb-6 border border-neutral-cool bg-white rounded-2xl shadow-md p-5 flex flex-col gap-5"
            >
              {/* Subcategories */}
              <div>
                <h4 className="font-display font-black text-[9px] uppercase tracking-wider text-neutral-dark/45 mb-2.5">
                  Subcategories
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsMobileFiltersOpen(false);
                        }}
                        className={`text-[10px] px-3 py-2 rounded-lg transition-all font-extrabold cursor-pointer border ${
                          isSelected
                            ? 'bg-primary border-primary text-white'
                            : 'bg-neutral-cool/30 border-transparent text-primary hover:bg-neutral-cool/50'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Partners */}
              <div>
                <h4 className="font-display font-black text-[9px] uppercase tracking-wider text-neutral-dark/45 mb-2.5">
                  Brand Partners
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {brandsList.map((br) => {
                    const isSelected = selectedBrand === br;
                    return (
                      <button
                        key={br}
                        onClick={() => {
                          setSelectedBrand(br);
                          setIsMobileFiltersOpen(false);
                        }}
                        className={`text-[10px] px-3 py-2 rounded-lg transition-all font-extrabold cursor-pointer border ${
                          isSelected
                            ? 'bg-accent border-accent text-white'
                            : 'bg-neutral-cool/30 border-transparent text-primary hover:bg-neutral-cool/50'
                        }`}
                      >
                        {br}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Split Layout: Sidebar filters & Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Filter Sidebar (col-span 3) - Visible only on Tablet/Desktop (>= md) */}
          <div className="hidden md:flex md:col-span-3 flex-col gap-6 sticky top-24">
            
            {/* Subcategory filter */}
            <div className="bg-white border border-neutral-cool rounded-2xl p-5 shadow-sm">
              <h4 className="font-display font-extrabold text-[10px] uppercase tracking-wider text-neutral-dark/40 mb-3">
                Subcategories
              </h4>
              <div className="flex flex-col gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between font-bold ${
                      selectedCategory === cat
                        ? 'bg-primary text-white'
                        : 'text-neutral-dark/80 hover:bg-neutral-cool/60'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Partner filter */}
            <div className="bg-white border border-neutral-cool rounded-2xl p-5 shadow-sm">
              <h4 className="font-display font-extrabold text-[10px] uppercase tracking-wider text-neutral-dark/40 mb-3">
                Brand Partners
              </h4>
              <div className="flex flex-col gap-1.5">
                {brandsList.map((br) => (
                  <button
                    key={br}
                    onClick={() => setSelectedBrand(br)}
                    className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between font-bold ${
                      selectedBrand === br
                        ? 'bg-accent text-white'
                        : 'text-neutral-dark/80 hover:bg-neutral-cool/60'
                    }`}
                  >
                    <span>{br}</span>
                    {selectedBrand === br ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Products Grid (col-span 9 / full width on mobile) */}
          <div className="col-span-1 md:col-span-9">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-neutral-cool/30 border border-neutral-cool rounded-3xl p-12 text-center select-none"
                >
                  <SlidersHorizontal className="w-8 h-8 text-neutral-dark/30 mx-auto mb-3" />
                  <h4 className="font-display font-extrabold text-sm text-primary uppercase">No Products Found</h4>
                  <p className="font-sans text-xs text-neutral-dark/60 max-w-sm mx-auto mt-1 font-light leading-relaxed">
                    We couldn't find matches for your search. Try resetting the category/brand selectors or check spelling.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedBrand('All');
                      setSearchQuery('');
                    }}
                    className="mt-4 bg-primary hover:bg-primary-hover text-white font-bold text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Reset Selectors
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
