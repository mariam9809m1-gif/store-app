/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { 
  Product, 
  CartItem, 
  FilterOptions, 
  ShippingAddress, 
  PaymentDetails, 
  ViewType,
  ProductReview
} from '../types';
import { INITIAL_PRODUCTS } from '../services/productService';

interface AppState {
  // Products list from service (with mutable reviews)
  products: Product[];
  
  // Navigation / Routing state
  currentView: ViewType;
  selectedProductId: string | null;
  
  // Catalog filters / Search status
  filters: FilterOptions;
  
  // Shopping cart items state
  cart: CartItem[];
  
  // Shipping and Payment simulation info
  shippingAddress: ShippingAddress | null;
  paymentDetails: PaymentDetails | null;
  
  // Last placed order ID & details for the Success Screen
  lastOrderId: string | null;
  estimatedDeliveryDate: string | null;

  // Actions
  setView: (view: ViewType) => void;
  selectProduct: (id: string | null) => void;
  updateFilters: (updates: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Checkout & Review Actions
  addReviewToProduct: (productId: string, review: Omit<ProductReview, 'id' | 'date' | 'isVerified'>) => void;
  submitCheckout: (shipping: ShippingAddress, payment: PaymentDetails) => void;
  resetOrder: () => void;
}

const defaultFilters: FilterOptions = {
  searchQuery: '',
  category: 'All Categories',
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  sortBy: 'featured',
};

export const useStore = create<AppState>((set) => ({
  products: INITIAL_PRODUCTS,
  currentView: 'catalog',
  selectedProductId: null,
  filters: defaultFilters,
  cart: [],
  shippingAddress: null,
  paymentDetails: null,
  lastOrderId: null,
  estimatedDeliveryDate: null,

  setView: (view) => set({ currentView: view }),
  
  selectProduct: (id) => set({ 
    selectedProductId: id, 
    currentView: id ? 'product-details' : 'catalog' 
  }),
  
  updateFilters: (updates) => set((state) => ({ 
    filters: { ...state.filters, ...updates } 
  })),
  
  resetFilters: () => set({ filters: defaultFilters }),

  addToCart: (product, quantity = 1) => set((state) => {
    const existingIndex = state.cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...state.cart];
      const nextQty = updatedCart[existingIndex].quantity + quantity;
      
      // Enforce stock bounds
      updatedCart[existingIndex].quantity = Math.min(nextQty, product.stock);
      return { cart: updatedCart };
    }
    return { cart: [...state.cart, { product, quantity: Math.min(quantity, product.stock) }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId)
  })),

  updateCartQuantity: (productId, quantity) => set((state) => {
    const updatedCart = state.cart.map(item => {
      if (item.product.id === productId) {
        return { 
          ...item, 
          quantity: Math.max(1, Math.min(quantity, item.product.stock)) 
        };
      }
      return item;
    });
    return { cart: updatedCart };
  }),

  clearCart: () => set({ cart: [] }),

  addReviewToProduct: (productId, reviewInput) => set((state) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newReview: ProductReview = {
      ...reviewInput,
      id: `rev-${Date.now()}`,
      date: todayStr,
      isVerified: true // Mock as verified buy
    };

    const updatedProducts = state.products.map(p => {
      if (p.id === productId) {
        const nextReviews = [newReview, ...p.reviews];
        // Recalculate rating and count
        const totalRating = nextReviews.reduce((sum, rev) => sum + rev.rating, 0);
        const avgRating = parseFloat((totalRating / nextReviews.length).toFixed(1));
        return {
          ...p,
          reviews: nextReviews,
          rating: avgRating,
          reviewCount: nextReviews.length
        };
      }
      return p;
    });

    return { products: updatedProducts };
  }),

  submitCheckout: (shipping, payment) => set((state) => {
    const orderId = `AMZ-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3); // 3-day prime/regular shipping standard
    const estDateStr = estDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });

    return {
      shippingAddress: shipping,
      paymentDetails: payment,
      lastOrderId: orderId,
      estimatedDeliveryDate: estDateStr,
      cart: [], // Drain cart upon final order completion
      currentView: 'order-success'
    };
  }),

  resetOrder: () => set({
    shippingAddress: null,
    paymentDetails: null,
    lastOrderId: null,
    estimatedDeliveryDate: null,
    currentView: 'catalog'
  })
}));
