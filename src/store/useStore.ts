/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Product, 
  CartItem, 
  FilterOptions, 
  ShippingAddress, 
  PaymentDetails, 
  ViewType,
  ProductReview,
  User,
  Toast
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
  
  // UI Drawer / Modal states
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Toast notifications state
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Authentication state (persisted)
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;

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
  primeOnly: false,
  sortBy: 'featured',
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      currentView: 'catalog',
      selectedProductId: null,
      filters: defaultFilters,
      cart: [],
      isCartDrawerOpen: false,
      isAuthModalOpen: false,
      toasts: [],
      user: null,
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

      openCartDrawer: () => set({ isCartDrawerOpen: true }),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),

      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),

      addToast: (message, type = 'success') => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        setTimeout(() => {
          get().removeToast(id);
        }, 3500);
      },

      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      })),

      login: (name, email) => {
        set({ user: { name, email, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}` } });
        get().addToast(`Welcome back, ${name}!`, 'success');
        set({ isAuthModalOpen: false });
      },

      logout: () => {
        set({ user: null });
        get().addToast('You have been signed out.', 'info');
      },

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.cart.findIndex(item => item.product.id === product.id);
          if (existingIndex > -1) {
            const updatedCart = [...state.cart];
            const nextQty = updatedCart[existingIndex].quantity + quantity;
            updatedCart[existingIndex].quantity = Math.min(nextQty, product.stock);
            return { cart: updatedCart };
          }
          return { cart: [...state.cart, { product, quantity: Math.min(quantity, product.stock) }] };
        });
        get().addToast(`Added "${product.title}" to Cart!`, 'success');
      },

      removeFromCart: (productId) => {
        const item = get().cart.find(i => i.product.id === productId);
        set((state) => ({
          cart: state.cart.filter(item => item.product.id !== productId)
        }));
        if (item) {
          get().addToast(`Removed "${item.product.title}" from Cart`, 'info');
        }
      },

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
          isVerified: true
        };

        const updatedProducts = state.products.map(p => {
          if (p.id === productId) {
            const nextReviews = [newReview, ...p.reviews];
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

      submitCheckout: (shipping, payment) => {
        const orderId = `AMZ-${Math.floor(10000000 + Math.random() * 90000000)}`;
        const estDate = new Date();
        estDate.setDate(estDate.getDate() + 3);
        const estDateStr = estDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        });

        set({
          shippingAddress: shipping,
          paymentDetails: payment,
          lastOrderId: orderId,
          estimatedDeliveryDate: estDateStr,
          cart: [],
          currentView: 'order-success'
        });
        get().addToast('Order placed successfully!', 'success');
      },

      resetOrder: () => set({
        shippingAddress: null,
        paymentDetails: null,
        lastOrderId: null,
        estimatedDeliveryDate: null,
        currentView: 'catalog'
      })
    }),
    {
      name: 'amazon-clone-store-v2',
      partialize: (state) => ({ cart: state.cart, user: state.user }),
    }
  )
);
