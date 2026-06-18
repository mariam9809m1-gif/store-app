/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Landmark, Truck, ShieldAlert, BadgeHelp, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ShippingAddress, PaymentDetails } from '../types';

export default function CheckoutPage() {
  const { cart, submitCheckout, setView } = useStore();

  // Address State
  const [fullName, setFullName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateStr, setStateStr] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country] = useState('United States');
  const [phone, setPhone] = useState('');

  // Payment State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [shippingMethod, setShippingMethod] = useState<'free' | 'expedited'>('free');
  const [errorMsg, setErrorMsg] = useState('');

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCharge = shippingMethod === 'free' ? 0 : 15.00;
  const estimatedTax = cartSubtotal * 0.0825; // 8.25% typical state tax simulation
  const grandTotal = cartSubtotal + shippingCharge + estimatedTax;

  // Pre-fill button helper
  const handlePrePopulate = () => {
    setFullName('Jane Spencer');
    setAddressLine1('1600 Amphitheatre Parkway');
    setAddressLine2('Bldg 40');
    setCity('Mountain View');
    setStateStr('CA');
    setZipCode('94043');
    setPhone('(650) 253-0000');

    setCardNumber('4111 2222 3333 4444');
    setCardName('Jane Spencer');
    setExpiryDate('12/29');
    setCvv('123');
    setErrorMsg('');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!fullName.trim() || !addressLine1.trim() || !city.trim() || !stateStr.trim() || !zipCode.trim() || !phone.trim()) {
      setErrorMsg('Please fully fill out all required Shipping Address fields.');
      return;
    }
    
    // Credit card simple validations
    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 19) {
      setErrorMsg('Please provide a valid card number (13-19 digits).');
      return;
    }

    if (!cardName.trim() || !expiryDate.includes('/') || expiryDate.length < 5) {
      setErrorMsg('Please supply expiration details (MM/YY format).');
      return;
    }

    if (cvv.length < 3) {
      setErrorMsg('Please supply a valid CVV (3-4 digits).');
      return;
    }

    // Success dispatch
    const shipping: ShippingAddress = {
      fullName: fullName.trim(),
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim() || undefined,
      city: city.trim(),
      state: stateStr.trim(),
      zipCode: zipCode.trim(),
      country,
      phone: phone.trim()
    };

    const payment: PaymentDetails = {
      cardNumber: cleanCard,
      cardName: cardName.trim(),
      expiryDate,
      cvv
    };

    submitCheckout(shipping, payment);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500 font-sans">
        <p className="text-lg font-bold">You do not have any items in your checkout session.</p>
        <button
          onClick={() => setView('catalog')}
          className="mt-4 text-blue-600 hover:underline font-bold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans flex flex-col gap-6" id="checkout-panel-container">
      {/* Title Header with Secure indicators */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <button
            onClick={() => setView('cart')}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-orange-600 font-bold hover:underline py-1 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go back to cart</span>
          </button>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
            Simulated Secure Checkout
          </h2>
        </div>

        {/* Demo Fast Fill Button */}
        <button
          type="button"
          onClick={handlePrePopulate}
          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-805 border border-indigo-200 py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer self-stretch sm:self-auto flex items-center justify-center gap-1 sm:shadow-sm"
          id="prefill-checkout-button"
        >
          <span>⚡ Dry Run auto-fill form</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Address & Credit Card Inputs */}
        <form onSubmit={handleCheckoutSubmit} className="lg:col-span-8 space-y-6 text-left" id="checkout-form">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-xs font-bold p-3.5 rounded-lg border border-red-200 flex gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Shipping Address Deck Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm md:text-base border-b border-gray-100 pb-2.5 flex items-center gap-1.5">
              <Truck className="h-5 w-5 text-amber-500" />
              <span>1. Shipping address</span>
            </h3>

            {/* Address Form Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Spencer"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street address, P.O. box, company name"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Address Line 2 <span className="text-gray-400 font-medium">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, building, floor"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mountain View"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CA"
                    value={stateStr}
                    onChange={(e) => setStateStr(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="94043"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(650) 253-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Needed for dynamic delivery tracking updates in notifications.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled
                    value={country}
                    className="w-full bg-gray-100 text-gray-500 border border-gray-200 rounded text-xs p-2.5 cursor-not-allowed font-medium font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secure Payment Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm md:text-base border-b border-gray-100 pb-2.5 flex items-center gap-1.5">
              <CreditCard className="h-5 w-5 text-amber-500" />
              <span>2. Payment method</span>
            </h3>

            {/* Credit details Form */}
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-105 rounded-lg flex gap-2 text-indigo-900 text-xs leading-relaxed">
                <BadgeHelp className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Sandbox Simulation is Active:</strong> You can enter any mock cards during trails. No real transactions are dispatched.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Credit Card Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="xxxx xxxx xxxx xxxx"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 pl-10 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                  <Landmark className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Cardholder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Spencer"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Expiration Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    CVV Security Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="123"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded text-xs p-2.5 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Options Selector Box */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm md:text-base border-b border-gray-100 pb-2.5 flex items-center gap-1.5">
              <Truck className="h-5 w-5 text-amber-500" />
              <span>3. Review items and shipping options</span>
            </h3>

            <div className="space-y-4">
              <p className="text-xs text-gray-500">Pick a shipping speed for your delivery:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label 
                  onClick={() => setShippingMethod('free')}
                  className={`border rounded-lg p-3.5 cursor-pointer flex items-start gap-3 transition-all ${
                    shippingMethod === 'free' 
                      ? 'border-amber-400 bg-amber-50/20 ring-1 ring-amber-400' 
                      : 'border-gray-250 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="ship-method" 
                    checked={shippingMethod === 'free'} 
                    onChange={() => {}}
                    className="mt-0.5" 
                  />
                  <div className="text-xs">
                    <p className="font-bold text-emerald-700">FREE Standard Shipping</p>
                    <p className="text-gray-500 font-medium mt-0.5">Arrives in 3-5 business days</p>
                  </div>
                </label>

                <label 
                  onClick={() => setShippingMethod('expedited')}
                  className={`border rounded-lg p-3.5 cursor-pointer flex items-start gap-3 transition-all ${
                    shippingMethod === 'expedited' 
                      ? 'border-amber-400 bg-amber-50/20 ring-1 ring-amber-400' 
                      : 'border-gray-250 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="ship-method" 
                    checked={shippingMethod === 'expedited'} 
                    onChange={() => {}}
                    className="mt-0.5" 
                  />
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">Expedited Priority Shipping ($15.00)</p>
                    <p className="text-gray-500 font-medium mt-0.5">Guaranteed delivery in 1-2 business days</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Right Side: Order Calculation & Submit Checkout Box */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-5 shadow-md flex flex-col gap-4 sticky top-28" id="checkout-calculations-sidebar">
          
          <button
            type="submit"
            onClick={handleCheckoutSubmit}
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 py-3 rounded-full text-xs font-bold transition shadow hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            id="checkout-place-order-cta"
          >
            <CheckCircle className="h-4.5 w-4.5" />
            <span>Place your order</span>
          </button>

          <p className="text-[10px] text-gray-400 leading-tight text-center">
            By placing your simulated order, you agree to AmaStore's terms of service and sandbox conditions.
          </p>

          <div className="border-t border-gray-150 pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 text-left mb-3">Order Summary</h4>
            
            <div className="space-y-2 text-xs font-sans text-gray-600">
              <div className="flex justify-between">
                <span>Items:</span>
                <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span className="font-mono">{shippingCharge === 0 ? 'FREE' : `$${shippingCharge.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>Estimated Tax (8.25%):</span>
                <span className="font-mono">${estimatedTax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-gray-900 text-sm md:text-base pt-1">
                <span>Order Total:</span>
                <span className="font-mono text-red-650">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-150 pt-4 text-left">
            <h4 className="text-[11px] font-bold text-slate-805 uppercase tracking mb-2.5">Items in Order ({cart.length})</h4>
            <div className="max-h-[160px] overflow-y-auto space-y-2.5 pr-1 text-xs">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-2 items-center" id={`checkout-summary-item-${item.product.id}`}>
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.title} 
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 object-contain shrink-0 border border-gray-100 rounded p-0.5 bg-gray-50" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900">{item.product.title}</p>
                    <p className="text-[10px] text-gray-400 font-mono font-medium">Qty: {item.quantity} × ${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
