/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Globe, ArrowUp } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Footer() {
  const { setView, selectProduct } = useStore();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterLinkClick = () => {
    selectProduct(null);
    setView('catalog');
    handleBackToTop();
  };

  return (
    <footer className="bg-slate-900 text-gray-300 font-sans mt-auto" id="site-footer">
      {/* Back to Top */}
      <button 
        onClick={handleBackToTop}
        className="w-full bg-slate-800 hover:bg-slate-700 py-3.5 text-center text-xs font-semibold text-white transition-all cursor-pointer border-b border-slate-700 flex items-center justify-center gap-1.5"
        id="footer-back-to-top"
      >
        <ArrowUp className="w-3.5 h-3.5" />
        <span>Back to top</span>
      </button>

      {/* Corporate Links Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="text-white font-bold text-sm mb-3.5">Get to Know Us</h3>
          <ul className="space-y-2 text-xs">
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Careers</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Blog</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">About AmaStore</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Investor Relations</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">AmaStore Devices</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm mb-3.5">Make Money with Us</h3>
          <ul className="space-y-2 text-xs">
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Sell products on AmaStore</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Sell on AmaStore Business</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Sell apps on AmaStore</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Become an Affiliate</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Advertise Your Products</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm mb-3.5">Payment Products</h3>
          <ul className="space-y-2 text-xs">
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">AmaStore Business Card</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Shop with Points</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Reload Your Balance</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">AmaStore Currency Converter</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm mb-3.5">Let Us Help You</h3>
          <ul className="space-y-2 text-xs">
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">AmaStore and COVID-19</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Your Account</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Your Orders</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Shipping Rates & Policies</a></li>
            <li><a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Help Center</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-1.5 text-white" id="footer-logo">
            <span className="text-lg font-black tracking-tight">AMA<span className="text-amber-400">STORE</span></span>
          </div>

          {/* Regional Picker */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-700 hover:border-amber-400 transition cursor-pointer">
              <Globe className="h-3.5 w-3.5" />
              <span>English</span>
            </button>
            <span className="px-2 font-mono text-gray-700">|</span>
            <span className="text-gray-500 font-sans">USD - U.S. Dollar</span>
            <span className="px-2 font-mono text-gray-700">|</span>
            <span className="text-gray-500 font-sans">United States</span>
          </div>
        </div>

        {/* Small Legal */}
        <div className="max-w-7xl mx-auto px-4 mt-8 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-[11px] text-gray-500">
            <a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Conditions of Use</a>
            <a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Privacy Notice</a>
            <a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Consumer Health Data Privacy Disclosure</a>
            <a onClick={handleFooterLinkClick} className="hover:underline cursor-pointer">Your Ads Privacy Choices</a>
          </div>
          <p className="text-[11px] text-gray-500 mt-3 text-center md:text-left">
            © 1996–2026, AmaStore, Inc. or its affiliates. All rights reserved. Built with pride for AI Studio.
          </p>
        </div>
      </div>
    </footer>
  );
}
