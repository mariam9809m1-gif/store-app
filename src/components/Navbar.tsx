/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, ShoppingCart, MapPin, Menu, X, ChevronDown, User } from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../services/productService';

export default function Navbar() {
  const { cart, filters, updateFilters, setView, selectProduct } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ searchQuery: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    updateFilters({ category });
    selectProduct(null); // Return to catalog
    setView('catalog');
  };

  const handleLogoClick = () => {
    selectProduct(null);
    updateFilters({ searchQuery: '', category: 'All Categories' });
    setView('catalog');
  };

  return (
    <header className="sticky top-0 z-50 w-full" id="site-header">
      {/* Upper Main Bar */}
      <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between gap-4 md:gap-6 font-sans">
        {/* Brand Logo */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-1 cursor-pointer select-none group"
          id="nav-logo-container"
        >
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            AMA<span className="text-amber-400 group-hover:text-white">STORE</span>
          </span>
          {/* Subtle curved smiley-arrow underlogo mimicking e-commerce giant */}
          <div className="hidden sm:block relative w-16 h-2 -mt-1 ml-0.5">
            <svg viewBox="0 0 100 20" className="absolute top-0 left-0 w-full h-full text-amber-400 fill-none stroke-current stroke-3">
              <path d="M5 5 Q 50 22 95 5 M 88 5 L 94 4 L 92 11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Location Selector (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 hover:ring-1 hover:ring-white rounded cursor-pointer transition-all duration-200">
          <MapPin className="h-5 w-5 text-amber-400 shrink-0" />
          <div className="text-left font-sans">
            <p className="text-[11px] text-gray-300 leading-none">Deliver to</p>
            <p className="text-xs font-semibold leading-tight mt-0.5">United States</p>
          </div>
        </div>

        {/* Advanced Search Bar (Spans full center width) */}
        <div className="hidden md:flex flex-1 max-w-2xl bg-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 transition-all">
          {/* Category Dropdown Selector */}
          <div className="relative shrink-0">
            <select
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-2 pr-8 h-full rounded-l-md border-r border-gray-300 font-sans cursor-pointer focus:outline-none appearance-none"
              id="search-category-dropdown"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All Categories' ? 'All' : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 h-3.5 w-3.5 pointer-events-none" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search AmaStore items, brands..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            onClick={() => {
              setView('catalog');
              selectProduct(null);
            }}
            className="flex-1 px-4 py-2 text-sm text-slate-800 focus:outline-none placeholder-gray-400"
            id="nav-search-input"
          />

          {/* Search Action Button */}
          <button 
            onClick={() => {
              setView('catalog');
              selectProduct(null);
            }}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 p-2.5 px-5 font-bold transition-all shrink-0 cursor-pointer flex items-center justify-center"
            aria-label="Search Catalog"
            id="nav-search-button"
          >
            <Search className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Navigation Action Links */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
          {/* Account Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 hover:ring-1 hover:ring-white rounded cursor-pointer transition-all">
            <User className="h-4.5 w-4.5 text-gray-300 md:hidden" />
            <div className="text-left font-sans hidden md:block">
              <p className="text-[11px] text-gray-300 leading-none">Hello, Sign in</p>
              <div className="flex items-center gap-0.5">
                <p className="text-xs font-semibold leading-tight mt-0.5 text-white">Account & Lists</p>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Returns & Orders (Hidden on mobile) */}
          <div className="hidden sm:block text-left px-2.5 py-1.5 hover:ring-1 hover:ring-white rounded cursor-pointer transition-all font-sans">
            <p className="text-[11px] text-gray-300 leading-none">Returns</p>
            <p className="text-xs font-semibold leading-tight mt-0.5 text-white">& Orders</p>
          </div>

          {/* Shopping Cart Trigger Indicator */}
          <div 
            onClick={() => {
              selectProduct(null);
              setView('cart');
            }}
            className="flex items-end gap-1 px-2.5 py-1.5 hover:ring-1 hover:ring-white rounded cursor-pointer transition-all select-none relative group font-sans"
            id="nav-cart-trigger"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-white group-hover:text-amber-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-900 text-xs font-black min-w-5 h-5 flex items-center justify-center rounded-full border border-slate-900 px-1 font-mono animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-extrabold leading-none pb-0.5 text-white">Cart</span>
          </div>

          {/* Mobile Search/Menu Trigger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 hover:text-amber-400 cursor-pointer"
            aria-label="Toggle Mobile Menu"
            id="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Lower Sub-Navigation Bar */}
      <div className="bg-slate-800 text-white px-4 py-1.5 flex items-center justify-between text-xs font-sans overflow-x-auto select-none border-b border-slate-700">
        <div className="flex items-center gap-1 sm:gap-4 shrink-0">
          <button 
            onClick={() => handleCategoryChange('All Categories')}
            className="flex items-center gap-1 font-bold hover:text-amber-400 transition-colors cursor-pointer mr-2 shrink-0 py-0.5"
          >
            <Menu className="h-4 w-4" />
            <span>All Departments</span>
          </button>

          {/* Loop over actual categories for quick updates */}
          {CATEGORIES.filter(cat => cat !== 'All Categories').map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`hover:text-amber-400 transition-colors cursor-pointer shrink-0 py-0.5 px-1 rounded ${
                filters.category === cat ? "text-amber-400 font-bold border-b-2 border-amber-400" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 text-amber-400 font-medium shrink-0">
          <span className="text-gray-400">⚡ Super Fast Shipping Included for Members</span>
        </div>
      </div>

      {/* Mobile Integrated Search + Filters (Displays when mobile menu toggled or on search screens) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white p-3.5 border-t border-slate-800 flex flex-col gap-3 font-sans animate-in fade-in slide-in-from-top-3">
          {/* Mobile Search Field */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search items..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-slate-800 text-white px-3.5 py-2 pl-10 text-xs rounded border border-slate-700 focus:outline-none focus:border-amber-400 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Category List Filters for Small Screens */}
          <div className="mt-1">
            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Departments</p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    handleCategoryChange(cat);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left p-2 rounded text-xs transition-colors ${
                    filters.category === cat ? 'bg-amber-400 text-slate-900 font-semibold' : 'bg-slate-800 text-gray-200 hover:bg-slate-700'
                  }`}
                >
                  {cat === 'All Categories' ? 'All Departments' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
