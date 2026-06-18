/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Star, Info, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../services/productService';
import ProductCard from '../components/ProductCard';

export default function CatalogPage() {
  const { products, filters, updateFilters, resetFilters, selectProduct } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter and Sort in real-time
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query match
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.features.some((f) => f.toLowerCase().includes(query))
      );
    }

    // Category match
    if (filters.category !== 'All Categories') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price limits bound
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Rating limit minimum
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Sort order mapping
    if (filters.sortBy === 'price-low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high-to-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'avg-customer-review') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured - default/id representation
      // We push best sellers of any query to the top if featured
      result.sort((a, b) => {
        if (a.bestSeller && !b.bestSeller) return -1;
        if (!a.bestSeller && b.bestSeller) return 1;
        return 0;
      });
    }

    return result;
  }, [products, filters]);

  // Featured Hot Deals for Top Carousel Banner
  const heroFeaturedProduct = useMemo(() => {
    return products.find(p => p.id === 'prod-1') || products[0];
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans flex flex-col gap-6" id="catalog-page-container">
      
      {/* Prime Premium Hero Banner Ad */}
      {filters.searchQuery === '' && (
        <div 
          onClick={() => selectProduct(heroFeaturedProduct.id)}
          className="relative bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl overflow-hidden shadow-inner p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 text-white min-h-[340px] cursor-pointer group hover:shadow-lg transition-transform"
          id="hero-featured-banner"
        >
          {/* Wave/Glow Background effects */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex-1 text-left space-y-4 z-10">
            <div className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
              ★ Premium Recommendation
            </div>
            
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight select-none">
              AetherSound Pro ANC
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base max-w-lg line-clamp-3 leading-relaxed">
              Block out the world with next-generation hybrid active noise cancellation (45dB). Experience high-definition audio and absolute comfort for days.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="text-left">
                <p className="text-[10px] text-gray-400 leading-none uppercase">Starting At</p>
                <p className="text-2xl font-black text-amber-400">$189.99</p>
              </div>
              <span className="text-xs text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-1 rounded font-bold uppercase transition-colors group-hover:bg-sky-500/20">
                ⭐ Prime Included
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors pt-2 select-none">
              <span>View details</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          <div className="w-52 h-52 md:w-80 md:h-80 relative flex items-center justify-center shrink-0 z-10 bg-white/5 rounded-full p-4 backdrop-blur-3xl group-hover:scale-105 transition-transform duration-500">
            <img 
              src={heroFeaturedProduct.images[0]} 
              alt={heroFeaturedProduct.title}
              referrerPolicy="no-referrer"
              className="max-h-[220px] md:max-h-[280px] w-auto h-auto object-contain drop-shadow-[0_20px_30px_rgba(255,255,255,0.08)]" 
            />
          </div>
        </div>
      )}

      {/* Primary Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters Dashboard */}
        <aside className="lg:col-span-3 bg-white p-5 border border-gray-200 rounded-xl space-y-7 sticky top-28 hidden lg:block" id="filters-desktop-sidebar">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 uppercase tracking-wider">
              <SlidersHorizontal className="h-4 w-4 text-amber-500" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-orange-600 font-semibold cursor-pointer flex items-center gap-1 transition-colors"
              title="Reset Filters"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Department Categories Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Departments</h4>
            <div className="space-y-1 text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateFilters({ category: cat })}
                  className={`w-full text-left p-1.5 rounded transition ${
                    filters.category === cat
                      ? "bg-amber-100 text-amber-900 font-bold border border-amber-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat === 'All Categories' ? 'All Departments' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Constraints */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Price Range</h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilters({ minPrice: Number(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-1.5 pl-5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                />
              </div>
              <span className="text-gray-400 text-xs">-</span>
              <div className="flex-1 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice === 1000 ? '' : filters.maxPrice}
                  onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) || 1000 })}
                  className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-1.5 pl-5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                />
              </div>
            </div>
            
            {/* Common ranges Quick buttons */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {[
                { label: "Under $50", min: 0, max: 50 },
                { label: "$50 to $150", min: 50, max: 150 },
                { label: "$150 & Above", min: 150, max: 1000 }
              ].map((range) => (
                <button
                  key={range.label}
                  onClick={() => updateFilters({ minPrice: range.min, maxPrice: range.max })}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-semibold py-1 px-2 rounded cursor-pointer transition-colors"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Reviews Filters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Customer Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2].map((starsRating) => (
                <button
                  key={starsRating}
                  onClick={() => updateFilters({ minRating: starsRating })}
                  className={`w-full flex items-center gap-1.5 text-xs cursor-pointer rounded p-1 transition ${
                    filters.minRating === starsRating ? "bg-amber-100/50" : ""
                  }`}
                >
                  <div className="flex text-amber-500 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < starsRating ? 'fill-current' : 'text-gray-300 stroke-current'
                        }`}
                        fill={i < starsRating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 hover:text-orange-600 font-medium font-sans">
                    & Up
                  </span>
                </button>
              ))}
              <button
                onClick={() => updateFilters({ minRating: 0 })}
                className={`text-xs text-blue-600 hover:underline cursor-pointer block font-semibold ${
                  filters.minRating === 0 ? "hidden" : ""
                }`}
              >
                Clear Rating Filter
              </button>
            </div>
          </div>

          <div className="p-3 bg-blue-50/50 border border-blue-100 text-[11px] text-blue-800 rounded-lg flex gap-2">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>Pricing limits and catalog availability update in real-time instantly across simulated clicks.</p>
          </div>
        </aside>

        {/* Core Products Feed Area */}
        <main className="lg:col-span-9 flex flex-col gap-4">
          
          {/* Header Control Panel: Total items, mobile filters button, sorting select */}
          <div className="bg-white p-3.5 border border-gray-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-sans" id="catalog-header-bar">
            <div>
              {filters.searchQuery.trim() !== '' ? (
                <span>
                  Showing results for "<strong className="text-gray-800 font-bold">{filters.searchQuery}</strong>" 
                  {filters.category !== 'All Categories' && <> in <strong className="text-gray-800 font-bold">{filters.category}</strong></>}
                  <span className="text-gray-400 font-mono ml-2">({filteredProducts.length} items found)</span>
                </span>
              ) : (
                <span>
                  Showing <strong className="text-gray-800 font-black">{filteredProducts.length}</strong> items 
                  {filters.category !== 'All Categories' && <> in <strong className="text-indigo-950 font-bold">{filters.category}</strong></>}
                </span>
              )}
            </div>

            {/* Mobile Filter buttons and Sorting Box */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center gap-1 bg-gray-100 text-gray-700 font-bold py-1.5 px-3 rounded text-xs select-none cursor-pointer hover:bg-gray-200"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-amber-500" />
                <span>Filters {sidebarOpen ? '▼' : '▲'}</span>
              </button>

              <div className="flex items-center gap-1 text-slate-800 ml-auto whitespace-nowrap">
                <ArrowUpDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <label htmlFor="sort-select" className="text-xs text-gray-500 font-medium">Sort by:</label>
                <select
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                  className="bg-transparent text-xs font-bold pl-1 pr-2 cursor-pointer focus:outline-none border-b border-gray-200 focus:border-amber-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="avg-customer-review">Avg. Customer Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Expandable Mobile Sidebar Filter elements */}
          {sidebarOpen && (
            <div className="lg:hidden bg-gray-50 rounded-xl p-4.5 border border-gray-200 space-y-4 font-sans animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="font-bold text-gray-800 text-xs">Filter Settings</span>
                <button onClick={() => setSidebarOpen(false)} className="text-xs text-blue-600 font-bold">Done</button>
              </div>

              {/* Price and Ratings sliders combined for mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Price Limits</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={(e) => updateFilters({ minPrice: Number(e.target.value) || 0 })}
                      className="w-full bg-white border border-gray-300 rounded text-xs p-1 font-mono"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice === 1000 ? '' : filters.maxPrice}
                      onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) || 1000 })}
                      className="w-full bg-white border border-gray-300 rounded text-xs p-1 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Customer Rating</h4>
                  <div className="flex gap-2 flex-wrap">
                    {[4, 3, 2].map((starsRating) => (
                      <button
                        key={starsRating}
                        onClick={() => updateFilters({ minRating: starsRating })}
                        className={`text-xs p-1 px-2.5 rounded border transition ${
                          filters.minRating === starsRating 
                            ? 'bg-amber-400 text-slate-800 font-bold border-amber-400' 
                            : 'bg-white text-gray-600 border-gray-300'
                        }`}
                      >
                        {starsRating}★ & Up
                      </button>
                    ))}
                    <button 
                      onClick={() => updateFilters({ minRating: 0 })}
                      className="text-xs p-1 px-2 rounded bg-gray-100 text-gray-700 text-[10px]"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Grid Results Feed */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center border border-gray-200 flex flex-col items-center justify-center space-y-4">
              <span className="text-5xl">🔍</span>
              <h3 className="text-lg font-bold text-gray-900 mt-2">No matching products found</h3>
              <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                We couldn't spot any items matching your selected department, pricing boundaries, or searchQuery. Try broad keywords or reset configurations.
              </p>
              <button
                onClick={resetFilters}
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 py-2 px-6 rounded-full text-xs font-bold cursor-pointer hover:shadow transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products-dynamic-catalog-grid">
              {filteredProducts.map((p) => (
                <div key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
