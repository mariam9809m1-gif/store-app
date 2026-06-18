/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full select-none" id="product-detail-image-gallery">
      {/* Thumbnails Row/Column */}
      <div className="flex flex-row md:flex-col gap-2.5 order-2 md:order-1 items-center justify-start overflow-x-auto py-1 md:py-0">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            onMouseEnter={() => setActiveIndex(i)} // hover-to-swap triggers an incredibly fast feel
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md border-2 bg-white overflow-hidden p-1 shrink-0 transition-all cursor-pointer ${
              activeIndex === i 
                ? 'border-amber-500 shadow-md ring-1 ring-amber-500' 
                : 'border-gray-200 hover:border-gray-400'
            }`}
            aria-label={`Show product image ${i + 1}`}
          >
            <img 
              src={image} 
              alt={`${productName} thumbnail ${i + 1}`} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain" 
            />
          </button>
        ))}
      </div>

      {/* Main Display Window */}
      <div className="flex-1 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center p-6 min-h-[300px] md:min-h-[460px] relative order-1 md:order-2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={productName}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="max-h-[260px] md:max-h-[380px] w-auto max-w-full object-contain select-none"
          />
        </AnimatePresence>

        {/* Small magnification badge (decor) */}
        <span className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-medium font-sans select-none tracking-wide bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
          Roll over image to zoom
        </span>
      </div>
    </div>
  );
}
