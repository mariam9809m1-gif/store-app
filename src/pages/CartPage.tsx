/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, Trash2, ArrowLeft, ShieldCheck, Plus, Minus, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, setView, selectProduct } = useStore();

  // Basic stats
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  const handleQuantityIncrease = (productId: string, currentQty: number, maxStock: number) => {
    if (currentQty < maxStock) {
      updateCartQuantity(productId, currentQty + 1);
    }
  };

  const handleQuantityDecrease = (productId: string, currentQty: number) => {
    if (currentQty > 1) {
      updateCartQuantity(productId, currentQty - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans flex flex-col gap-6" id="cart-page-container">
      {/* Title Header */}
      <div className="flex items-center gap-1.5 self-start">
        <button
          onClick={() => {
            selectProduct(null);
            setView('catalog');
          }}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-orange-600 font-bold hover:underline py-1 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Continue shopping</span>
        </button>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State Design */
        <div className="bg-white rounded-xl p-16 text-center border border-gray-200 flex flex-col items-center justify-center space-y-5 max-w-2xl mx-auto w-full">
          <div className="w-20 h-20 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-amber-500" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mt-2">Your AmaStore Cart is empty</h2>
          
          <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
            Your Shopping Cart lives to serve. Give it purpose — fill it with electronics, office essentials, leather crafts, and premium coffee drippers.
          </p>

          <button
            onClick={() => setView('catalog')}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 font-bold py-2 px-8 rounded-full text-xs shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Shop Today's Featured Items
          </button>
        </div>
      ) : (
        /* Rich Shopping Cart Overview grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List Section */}
          <div className="lg:col-span-9 bg-white border border-gray-200 rounded-xl p-5 md:p-7 text-left space-y-6" id="cart-items-feed">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Shopping Cart
              </h2>
              <span className="text-xs text-gray-400 font-semibold leading-none self-end hidden sm:block">Price</span>
            </div>

            {/* List Feed */}
            <div className="space-y-6">
              {cart.map((item) => {
                const isLowStock = item.product.stock <= 5;
                return (
                  <div 
                    key={item.product.id} 
                    className="flex flex-col sm:flex-row gap-4 md:gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0 font-sans"
                    id={`cart-item-row-${item.product.id}`}
                  >
                    {/* Item Image */}
                    <div 
                      onClick={() => selectProduct(item.product.id)}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg border border-gray-250 bg-gray-50 overflow-hidden cursor-pointer shrink-0 p-2 flex items-center justify-center hover:shadow transition-shadow"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.title} 
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>

                    {/* Item Metadata Column */}
                    <div className="flex-1 flex flex-col text-left space-y-1.5">
                      <h3 
                        onClick={() => selectProduct(item.product.id)}
                        className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer transition-colors leading-tight line-clamp-2"
                      >
                        {item.product.title}
                      </h3>

                      {/* Stock availability banner */}
                      <p className={`text-[10px] font-bold ${isLowStock ? 'text-red-500' : 'text-emerald-650'}`}>
                        {isLowStock ? `Only ${item.product.stock} items remaining in stock` : 'In Stock'}
                      </p>

                      <p className="text-[10px] text-gray-400 font-medium font-sans">
                        Ships in recyclable, eco-friendly certified packaging
                      </p>

                      {/* Cart item utilities: custom quantity slider + Delete */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 pt-2.5">
                        
                        {/* Micro Quantity Selector Block */}
                        <div className="flex items-center border border-gray-350 rounded-md bg-gray-50 shadow-sm">
                          <button
                            onClick={() => handleQuantityDecrease(item.product.id, item.quantity)}
                            className="p-1 px-2.5 hover:bg-gray-200 text-gray-600 font-bold transition-colors border-r border-gray-350"
                            aria-label="Decrease quantity"
                            type="button"
                          >
                            <Minus className="h-3 w-3 stroke-[2.5]" />
                          </button>
                          
                          <span className="font-mono text-xs font-bold text-gray-800 px-3.5 select-none text-center min-w-[20px]">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => handleQuantityIncrease(item.product.id, item.quantity, item.product.stock)}
                            className="p-1 px-2.5 hover:bg-gray-200 text-gray-650 font-bold transition-colors border-l border-gray-350"
                            aria-label="Increase quantity"
                            type="button"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-3 w-3 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* Separate Delete Text Link button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors py-1 px-2 rounded hover:bg-red-50 flex items-center gap-1 text-xs cursor-pointer"
                          type="button"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Single Item Pricing display right-side */}
                    <div className="sm:text-right shrink-0">
                      <p className="text-sm font-bold text-slate-950 font-mono">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          (${item.product.price.toFixed(2)} each)
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtotal line footer inside card */}
            <div className="border-t border-gray-100 pt-5 text-right font-sans">
              <p className="text-sm text-gray-700">
                Subtotal ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}):{' '}
                <strong className="text-base text-slate-950 font-mono font-black ml-1">
                  ${cartSubtotal.toFixed(2)}
                </strong>
              </p>
            </div>
          </div>

          {/* Right Checkout Buy-Box Subtotal card */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-5 text-left shadow-sm space-y-4.5" id="cart-buy-box">
            
            {/* Qualifying free shipping progress indicator check */}
            <div className="flex gap-2 p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-850 text-xs">
              <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Your order qualifies for FREE Shipping.</p>
                <p className="text-[10px] text-emerald-700 mt-0.5 leading-snug">Select this option at checkout to complete transport free of charge.</p>
              </div>
            </div>

            {/* Sum Section */}
            <div className="space-y-1 text-left font-sans">
              <p className="text-gray-500 text-xs">Total Estimated Subtotal</p>
              <p className="text-2xl font-black text-slate-950 font-sans tracking-tight">
                ${cartSubtotal.toFixed(2)}
              </p>
              <p className="text-[11px] text-gray-400">Taxes calculated dynamically at shipping step.</p>
            </div>

            {/* Proceed Button */}
            <button
              onClick={() => setView('checkout')}
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 py-3 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer hover:shadow"
              id="cart-proceed-checkout-cta"
            >
              <CreditCard className="h-4 w-4" />
              <span>Proceed to Checkout</span>
            </button>

            <div className="p-3 bg-slate-50 border border-gray-100 text-[10px] text-gray-500 rounded">
              <p className="leading-snug">🔒 256-bit automated simulation encryption is active. Your keys and real transactions are never processed on simulated platforms.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
