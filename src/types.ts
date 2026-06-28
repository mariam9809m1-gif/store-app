/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductReview {
  id: string;
  userName: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  isVerified: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  stock: number;
  features: string[];
  specifications: Record<string, string>;
  isPrime: boolean;
  bestSeller?: boolean;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  primeOnly: boolean;
  sortBy: 'featured' | 'price-low-to-high' | 'price-high-to-low' | 'avg-customer-review' | 'best-seller';
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export type ViewType = 'catalog' | 'product-details' | 'cart' | 'checkout' | 'order-success';
