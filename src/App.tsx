/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CatalogPage from './pages/CatalogPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

export default function App() {
  const { currentView } = useStore();

  const renderActivePage = () => {
    switch (currentView) {
      case 'catalog':
        return <CatalogPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      default:
        return <CatalogPage />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans select-none overflow-x-hidden antialiased text-slate-800" id="app-root-layout">
      {/* Prime Header Navigation elements */}
      <Navbar />

      {/* Main Container Stage with elegant fade page transitions */}
      <main className="flex-grow flex flex-col relative w-full pt-2 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="w-full flex flex-col flex-grow"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate Footings links */}
      <Footer />
    </div>
  );
}

