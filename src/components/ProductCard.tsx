/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, Check, Percent } from 'lucide-react';
import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import RatingStars from './RatingStars';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { selectProduct, addToCart } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent launching product details
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div 
      onClick={() => selectProduct(product.id)}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group cursor-pointer h-full relative"
      id={`product-card-${product.id}`}
    >
      {/* Best Seller or Discount Badge */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {product.bestSeller && (
          <span className="bg-orange-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded shadow-sm">
            Best Seller
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-0.5">
            <Percent className="h-3 w-3 inline shrink-0" />
            <span>Save {discountPercent}%</span>
          </span>
        )}
      </div>

      {/* Product Image Stage */}
      <div className="w-full pt-[90%] relative bg-gray-50 overflow-hidden shrink-0 border-b border-gray-100">
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {product.stock <= 5 && (
          <div className="absolute bottom-2 left-2 bg-red-50 text-red-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-red-200">
            Only {product.stock} left in stock
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex flex-col flex-1 font-sans">
        {/* Category Tag */}
        <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase mb-1">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug break-words mb-1.5 h-10">
          {product.title}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <RatingStars rating={product.rating} size={14} />
          <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer transition-colors">
            {product.reviewCount}
          </span>
        </div>

        {/* Pricing Layout */}
        <div className="flex items-baseline gap-2 mb-2">
          <div className="flex text-gray-900 font-sans">
            <span className="text-xs font-semibold leading-none pt-0.5">$</span>
            <span className="text-xl font-bold tracking-tight leading-none">
              {Math.floor(product.price)}
            </span>
            <span className="text-xs font-semibold leading-none">
              {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
            </span>
          </div>

          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Prime Ribbon */}
        {product.isPrime && (
          <div className="flex items-center gap-1.5 mb-3.5 mt-auto">
            {/* Minimalist Prime tag resembling logo style */}
            <span className="text-[10px] font-black text-sky-500 tracking-tighter bg-sky-50 px-1.5 py-0.5 rounded uppercase border border-sky-200">
              ✓ prime
            </span>
            <span className="text-[11px] text-gray-500">FREE Delivery</span>
          </div>
        )}

        {!product.isPrime && (
          <div className="text-[11px] text-gray-500 mb-3.5 mt-auto">
            Delivery: <span className="font-semibold text-gray-700">Sat, Jun 13</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
            product.stock === 0
              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              : justAdded
              ? 'bg-emerald-500 text-white border border-emerald-500 hover:bg-emerald-600'
              : 'bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 hover:shadow-md'
          }`}
          id={`add-to-cart-btn-${product.id}`}
        >
          {justAdded ? (
            <>
              <Check className="h-4.5 w-4.5 stroke-[2.5]" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4.5 w-4.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
