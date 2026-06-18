/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Heart, Share2, Info, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import ImageGallery from '../components/ImageGallery';
import ReviewSection from '../components/ReviewSection';
import RatingStars from '../components/RatingStars';

export default function ProductDetailsPage() {
  const { products, selectedProductId, selectProduct, addToCart, setView } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  // Retrieve matching product
  const product = products.find((p) => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500 font-sans">
        <p className="text-lg font-bold">Item could not be found.</p>
        <button
          onClick={() => selectProduct(null)}
          className="mt-4 text-blue-600 hover:underline font-bold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setView('checkout');
  };

  // Calculate discount amount
  const hasDiscount = !!product.originalPrice;
  const savings = product.originalPrice ? (product.originalPrice - product.price).toFixed(2) : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans flex flex-col gap-6" id="product-details-container">
      {/* Back Link */}
      <button
        onClick={() => selectProduct(null)}
        className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-orange-600 font-bold self-start cursor-pointer hover:underline py-1 transition-all select-none"
        id="detail-back-button"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to search results</span>
      </button>

      {/* Primary Detail Column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Aspect: Carousel Image Gallery */}
        <div className="lg:col-span-5 w-full bg-white p-2 rounded-xl border border-gray-100">
          <ImageGallery images={product.images} productName={product.title} />
        </div>

        {/* Center Aspect: Product Info, description, bullet attributes with specs */}
        <div className="lg:col-span-4 space-y-5 text-left bg-white p-5 border border-gray-200 rounded-xl" id="product-detail-center-column">
          {/* Metadata Path department */}
          <div className="flex items-center justify-between text-[11px] text-sky-600 font-bold uppercase tracking-wider">
            <span>{product.category} Department</span>
            <div className="flex items-center gap-2">
              <button aria-label="Share" className="p-1 hover:text-orange-600 cursor-pointer text-gray-400">
                <Share2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setWishlisted(!wishlisted)} 
                aria-label="Add to Wishlist" 
                className={`p-1 cursor-pointer transition-colors ${wishlisted ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-500'}`}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-950 leading-tight break-words border-b border-gray-100 pb-3" id="detail-product-title">
              {product.title}
            </h1>
          </div>

          {/* Rating Summary */}
          <div className="flex flex-wrap items-center gap-2.5 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-gray-800">{product.rating}</span>
              <RatingStars rating={product.rating} size={15} />
            </div>
            <span className="text-xs text-sky-600 hover:text-orange-600 hover:underline cursor-pointer transition-colors font-medium">
              {product.reviewCount} customer reviews
            </span>
            {product.bestSeller && (
              <span className="bg-orange-100 text-orange-850 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-orange-200 ml-auto">
                🏆 Top rated Selection
              </span>
            )}
          </div>

          {/* Pricing detailed Section */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-1.5 border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">Deal Price:</span>
              <div className="flex items-baseline text-slate-900 font-sans">
                <span className="text-xs font-bold leading-none">$</span>
                <span className="text-3xl font-black tracking-tight leading-none">
                  {Math.floor(product.price)}
                </span>
                <span className="text-xs font-bold leading-none">
                  {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
                </span>
              </div>
              
              {product.isPrime && (
                <span className="text-[10px] font-black text-sky-700 tracking-tighter bg-sky-100 px-1.5 py-0.5 rounded border border-sky-300">
                  ✓ PRIME SHIPPING COMPLETE
                </span>
              )}
            </div>

            {hasDiscount && (
              <div className="text-xs font-sans text-gray-500 space-y-0.5">
                <p>List Price: <span className="line-through">${product.originalPrice?.toFixed(2)}</span></p>
                <p className="text-red-650 font-bold font-sans">You Save: ${savings} ({Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%)</p>
              </div>
            )}
          </div>

          {/* Product Bullets (Key Points) */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>About this item</span>
            </h3>
            <ul className="space-y-1.5">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-gray-700 leading-relaxed font-sans">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Comprehensive Specifications Table */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2.5">Product Specifications</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
              {Object.entries(product.specifications).map(([key, value], idx) => (
                <div 
                  key={key} 
                  className={`grid grid-cols-2 p-2.5 ${
                    idx % 2 === 0 ? "bg-gray-50/70" : "bg-white"
                  } border-b border-gray-100 last:border-0`}
                >
                  <span className="font-semibold text-gray-650">{key}</span>
                  <span className="text-gray-800 font-medium font-sans">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Aspect: The Checkout Buy Box Card */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-5 shadow-md sticky top-28 space-y-5" id="product-detail-buy-box">
          <div className="space-y-1.5 text-left">
            <div className="flex items-baseline text-slate-800 font-sans">
              <span className="text-sm font-semibold">$</span>
              <span className="text-2xl font-black">{product.price.toFixed(2)}</span>
            </div>
            
            <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer font-medium mb-1.5">
              FREE delivery <span className="font-bold">Wednesday, June 10</span> on eligible items.
            </p>

            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Arrives inside an optimized eco-box. Ships from and sold by <span className="text-blue-600 font-semibold cursor-pointer">AmaStore.com</span>
            </p>
          </div>

          <div className="border-t border-b border-gray-100 py-3.5 space-y-1.5 text-xs text-left">
            {/* Stock status indicator */}
            <p className={`font-bold ${product.stock > 0 ? 'text-emerald-650' : 'text-red-650'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-red-500 text-[11px] font-black leading-tight">
                Only {product.stock} left in stock - order soon!
              </p>
            )}

            {/* Quantity select picker */}
            {product.stock > 0 && (
              <div className="flex items-center gap-2">
                <label htmlFor="qty-select" className="text-gray-500 font-medium">Qty:</label>
                <select
                  id="qty-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 rounded-md py-1 px-3 text-xs font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Core Action CTA Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                product.stock === 0
                  ? 'bg-gray-105 text-gray-400 border border-gray-200 cursor-not-allowed'
                  : justAdded
                  ? 'bg-emerald-500 text-white border border-emerald-500 hover:bg-emerald-600'
                  : 'bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 hover:shadow'
              }`}
              id="detail-add-to-cart-cta"
            >
              {justAdded ? (
                <>
                  <Check className="h-4.5 w-4.5 stroke-[2.5]" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <span>Add to Cart</span>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white border border-orange-500 transition py-2.5 px-4 rounded-full text-xs font-bold shadow-sm cursor-pointer hover:shadow"
              id="detail-buy-now-cta"
            >
              Buy Now
            </button>
          </div>

          {/* Secure transaction declaration */}
          <div className="pt-2 text-left space-y-2 font-sans">
            <div className="flex items-center gap-1.5 text-gray-500 text-[10px]">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Secure transaction simulation</span>
            </div>
            
            <div className="p-2 bg-slate-50 border border-gray-200 rounded text-[10px] text-gray-500">
              <p className="leading-tight">⭐ Packaged and protected securely to guarantee high reliability of transit.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Reviews Subsection (Scroll point target) */}
      <ReviewSection product={product} />
    </div>
  );
}
