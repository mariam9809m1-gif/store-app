/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    closeCartDrawer, 
    cart, 
    removeFromCart, 
    updateCartQuantity,
    setView 
  } = useStore();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartDrawerOpen]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 35;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Dark Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            aria-label="Close cart drawer"
            id="cart-drawer-backdrop"
          />

          {/* Slide-over Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col font-sans border-l border-gray-200"
            id="cart-drawer-panel"
          >
            {/* Amazon Header Style */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative bg-amber-500 text-slate-900 p-2 rounded-lg">
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-white text-slate-900 font-mono text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-slate-900 shadow-xs">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-base font-extrabold tracking-tight">Shopping Cart</h2>
                  <p className="text-xs text-amber-400 font-medium">
                    {totalItems === 0 ? 'Empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCartDrawer}
                className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Goal Bar */}
            <div className="bg-slate-50 border-b border-gray-200 p-3.5 px-5 shrink-0">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Truck className="w-4 h-4 text-amber-600" />
                  {amountNeeded === 0 ? (
                    <span className="text-emerald-600 font-bold">✓ Your order qualifies for FREE Shipping!</span>
                  ) : (
                    <span>Add <strong className="text-slate-900 font-mono">${amountNeeded.toFixed(2)}</strong> more for FREE Shipping</span>
                  )}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${amountNeeded === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-gray-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-2">
                    <ShoppingBag className="w-10 h-10 stroke-1" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Your AmaStore Cart is empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Looks like you haven't added anything yet. Discover our top electronics, fashion, and home essentials.
                  </p>
                  <button
                    onClick={() => {
                      closeCartDrawer();
                      setView('catalog');
                    }}
                    className="mt-4 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Continue Shopping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="pt-4 first:pt-0 flex gap-3.5 items-start group"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-20 h-20 rounded-lg bg-gray-50 border border-gray-200 p-1.5 shrink-0 overflow-hidden flex items-center justify-center">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80';
                        }}
                      />
                    </div>

                    {/* Product Details & Controls */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight">
                          {item.product.title}
                        </h4>
                        <span className="text-sm font-extrabold text-slate-900 font-mono shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        {item.product.isPrime && (
                          <span className="text-[9px] font-black text-sky-600 bg-sky-50 px-1 py-0.5 rounded uppercase border border-sky-200">
                            ✓ prime
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 font-mono">
                          ${item.product.price.toFixed(2)} / ea
                        </span>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5 shadow-2xs">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-900 font-mono select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-1 text-gray-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 rounded transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 text-[11px] font-medium"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="sm:inline hidden">Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Cart Drawer Footer */}
            {cart.length > 0 && (
              <div className="bg-slate-50 border-t border-gray-200 p-4 sm:p-5 space-y-3.5 shadow-lg shrink-0">
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-mono text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-emerald-600">
                    <span>Estimated Shipping</span>
                    <span>{amountNeeded === 0 ? 'FREE' : '$4.99'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-gray-200">
                    <span>Total Amount</span>
                    <span className="font-mono text-amber-600">
                      ${(subtotal + (amountNeeded === 0 ? 0 : 4.99)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => {
                      closeCartDrawer();
                      setView('checkout');
                    }}
                    className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Proceed to Checkout</span>
                  </button>

                  <button
                    onClick={() => {
                      closeCartDrawer();
                      setView('cart');
                    }}
                    className="w-full py-2 px-4 bg-white hover:bg-gray-100 text-slate-700 font-bold text-xs rounded-xl border border-gray-300 transition-all cursor-pointer text-center"
                  >
                    View Full Cart Page
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
