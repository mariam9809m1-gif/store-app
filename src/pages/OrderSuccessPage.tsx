/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, Truck, Package, Calendar, RefreshCw, ShoppingCart, Home } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';

export default function OrderSuccessPage() {
  const { lastOrderId, estimatedDeliveryDate, shippingAddress, resetOrder } = useStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 font-sans select-none" id="order-success-panel">
      {/* Visual Animation Circle containing Success check */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 md:p-12 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse">
          <CheckCircle className="h-10 w-10 text-emerald-500" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            Your simulated purchase has been securely registered in sandbox state.
          </p>
        </div>

        {/* Order tracking ID box */}
        <div className="p-4 bg-slate-50 border border-gray-200 rounded-xl space-y-1.5 text-xs inline-block min-w-[280px]">
          <p className="text-gray-400 uppercase font-bold tracking-wider text-[10px]">Order Tracking ID</p>
          <p className="font-mono text-base font-black text-slate-900 select-all" id="success-order-id">
            {lastOrderId || "AMZ-91280381"}
          </p>
          <div className="text-[10px] text-sky-600 font-bold bg-sky-50 py-0.5 px-2 rounded border border-sky-100 uppercase tracking-wide inline-block mt-1">
            ✓ Prime 3-Day delivery guaranteed
          </div>
        </div>

        {/* Timeline Tracking widget mimicking mail shipment */}
        <div className="pt-4 pb-2 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-5 flex items-center gap-1.5 justify-center">
            <Truck className="h-4.5 w-4.5 text-amber-500 shrink-0" />
            <span>Estimated delivery tracking timeline</span>
          </h3>

          <div className="grid grid-cols-4 gap-2 relative">
            {/* Horizontal progress background bar connector */}
            <div className="absolute top-3.5 left-[12.5%] right-[12.5%] h-1 bg-gray-200 -z-0" />
            <div className="absolute top-3.5 left-[12.5%] w-1/4 h-1 bg-emerald-500 -z-0" />

            {/* Step 1: Placed */}
            <div className="flex flex-col items-center text-center z-10">
              <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white shadow flex items-center justify-center text-white">
                <CheckCircle className="h-4.5 w-4.5" />
              </div>
              <p className="text-[10px] font-bold text-gray-800 mt-2">Ordered</p>
              <p className="text-[9px] text-gray-400 font-mono">Today</p>
            </div>

            {/* Step 2: Processing */}
            <div className="flex flex-col items-center text-center z-10 font-sans">
              <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white shadow flex items-center justify-center text-white">
                <Package className="h-4.5 w-4.5" />
              </div>
              <p className="text-[10px] font-bold text-gray-800 mt-2">Prepared</p>
              <p className="text-[9px] text-gray-400 font-sans mt-0.5">Clearing bay</p>
            </div>

            {/* Step 3: Shipped */}
            <div className="flex flex-col items-center text-center z-10 opacity-60">
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-400">
                <Truck className="h-4 w-4" />
              </div>
              <p className="text-[10px] font-bold text-gray-500 mt-2">In Transit</p>
              <p className="text-[9px] text-gray-400 font-sans mt-0.5">Pending</p>
            </div>

            {/* Step 4: Arrives */}
            <div className="flex flex-col items-center text-center z-10 opacity-60">
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-gray-400">
                <Calendar className="h-4 w-4" />
              </div>
              <p className="text-[10px] font-bold text-gray-500 mt-2">Arrival</p>
              <p className="text-[9px] text-gray-400 font-sans mt-0.5">Pending</p>
            </div>
          </div>
        </div>

        {/* Estimated Date and Location card */}
        <div className="border-t border-gray-100 pt-5 text-left grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 font-sans">
          <div className="space-y-1.5">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block">Guaranteed Arrival</span>
            <p className="text-sm font-extrabold text-slate-900 flex items-center gap-1">
              <span>{estimatedDeliveryDate || "Wednesday, June 10"}</span>
            </p>
            <p className="text-[10px] text-emerald-650 font-semibold font-sans">⚡ Free Prime High-Priority delivery transit.</p>
          </div>

          <div className="space-y-1.5">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block">Shipping Destination</span>
            <p className="font-semibold text-gray-800 leading-tight">
              {shippingAddress?.fullName || "Jane Spencer"}
            </p>
            <p className="text-[11px] leading-tight text-gray-500">
              {shippingAddress?.addressLine1}{shippingAddress?.addressLine2 ? `, ${shippingAddress?.addressLine2}` : ''}<br />
              {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 pt-7 flex flex-col sm:flex-row gap-3.5 justify-center">
          <button
            onClick={resetOrder}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 shadow-sm hover:shadow hover:scale-[1.01] transition-all font-bold py-2.5 px-6 rounded-full text-xs cursor-pointer flex items-center justify-center gap-1.5"
            id="success-shop-more-btn"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Continue Shopping</span>
          </button>
          
          <button
            onClick={resetOrder}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 font-semibold py-2.5 px-6 rounded-full text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>Back to Homepage</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
