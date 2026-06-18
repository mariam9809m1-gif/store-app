/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquarePlus, Edit, CheckCircle } from 'lucide-react';
import { ProductReview, Product } from '../types';
import { useStore } from '../store/useStore';
import RatingStars from './RatingStars';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewSectionProps {
  product: Product;
}

export default function ReviewSection({ product }: ReviewSectionProps) {
  const { addReviewToProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // Review statistics
  const totalReviews = product.reviews.length;
  
  // Calculate breakdown
  const starCounts = [0, 0, 0, 0, 0]; // Index 0 is 1 star, Index 4 is 5 star
  product.reviews.forEach((r) => {
    const idx = Math.max(1, Math.min(5, Math.round(r.rating))) - 1;
    starCounts[idx]++;
  });

  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please supply your name.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please provide a short summary title.');
      return;
    }
    if (!comment.trim() || comment.length < 10) {
      setErrorMsg('Please share a detailed review comment (at least 10 characters).');
      return;
    }

    // Submit review to store
    addReviewToProduct(product.id, {
      userName: name.trim(),
      rating,
      title: title.trim(),
      comment: comment.trim(),
    });

    setSuccess(true);
    setErrorMsg('');
    setTitle('');
    setComment('');
    setName('');
    setRating(5);

    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div className="border-t border-gray-200 pt-10 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans" id="product-review-panel">
      {/* Left Column: Overall stats and Breakdown */}
      <div className="lg:col-span-4" id="review-statistics-summary">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Customer reviews</h3>
        
        {/* Rating Core Row */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <RatingStars rating={product.rating} size={20} />
          <span className="text-lg font-bold text-gray-900">{product.rating} out of 5</span>
        </div>
        
        <p className="text-xs text-gray-500 mb-6 font-medium">
          {product.reviewCount.toLocaleString()} global ratings
        </p>

        {/* Dynamic Star Bars */}
        <div className="space-y-2.5 mb-8">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = starCounts[stars - 1];
            const pct = getPercentage(count);
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="text-blue-600 hover:underline cursor-pointer min-w-[40px] truncate leading-none">
                  {stars} star
                </span>
                
                {/* Horizontal Progress bar gutter */}
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden border border-gray-200">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                
                <span className="text-gray-500 w-[35px] text-right font-mono font-medium">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Call to Write Review */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
          <h4 className="text-sm font-bold text-gray-900 mb-1">Review this product</h4>
          <p className="text-xs text-gray-500 mb-3.5">
            Share your thoughts and real-world experience with other buyers
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 py-1.5 px-3 rounded-full text-xs font-bold text-gray-800 flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
            id="write-review-toggle"
          >
            <Edit className="h-4 w-4 text-gray-500" />
            <span>Write a customer review</span>
          </button>
        </div>
      </div>

      {/* Right Column: Review List & Write Form */}
      <div className="lg:col-span-8">
        {/* Form Expansion container */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="bg-amber-50/30 border border-amber-200/60 rounded-xl p-5 mb-8 text-left overflow-hidden shadow-inner"
              id="write-review-form-box"
            >
              {success ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mb-2.5 animate-bounce" />
                  <h4 className="text-md font-bold text-gray-900">Review Submitted!</h4>
                  <p className="text-xs text-gray-500 mt-1">Thank you for sharing your experience. Your feedback keeps our store strong.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-200/50 pb-2.5">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <MessageSquarePlus className="h-4.5 w-4.5 text-amber-500" />
                      Make Your Customer Voice Heard
                    </h4>
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-gray-600 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Errors */}
                  {errorMsg && (
                    <div className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded border border-red-100">
                      ⚠ {errorMsg}
                    </div>
                  )}

                  {/* Interactive Star Picker */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Your Overall Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 focus:outline-none transition-transform active:scale-110 cursor-pointer"
                          aria-label={`Rate ${star} Stars`}
                        >
                          <Star 
                            className={`h-7 w-7 transition-colors ${
                              star <= (hoverRating ?? rating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-600 ml-2 font-mono">
                        {(hoverRating ?? rating)} / 5 stars
                      </span>
                    </div>
                  </div>

                  {/* Form Elements Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Liam Taylor"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white px-3 py-2 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                        Add a Headline Title
                      </label>
                      <input
                        type="text"
                        placeholder="What's most important to know?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-white px-3 py-2 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Written Review Contents
                    </label>
                    <textarea
                      placeholder="What did you like or dislike? How was this product used?"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-white p-3 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 shadow-sm font-bold py-2 px-6 rounded-full text-xs cursor-pointer transition-all active:scale-95"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Reviews List */}
        <div className="text-left">
          <h4 className="text-md font-bold text-slate-800 mb-5 pb-2 border-b border-gray-100">
            Top customer reviews
          </h4>

          {totalReviews === 0 ? (
            <p className="text-sm text-gray-400 py-4 font-mono text-center">No reviews have been added for this product yet.</p>
          ) : (
            <div className="space-y-6">
              {product.reviews.map((r, index) => (
                <div key={r.id} className="border-b border-gray-100 pb-5 last:border-0" id={`customer-review-${r.id}`}>
                  {/* Review User Avatar name */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center font-bold text-xs text-gray-600 select-none uppercase shadow-inner">
                      {r.userName[0]}
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{r.userName}</span>
                  </div>

                  {/* Stars and Summary Title */}
                  <div className="flex items-center gap-2 mb-1">
                    <RatingStars rating={r.rating} size={13} />
                    <span className="text-xs font-bold text-slate-900">
                      {r.title}
                    </span>
                  </div>

                  {/* Review Date and Verification */}
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                    <span>Reviewed in the United States on {r.date}</span>
                    {r.isVerified && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span className="text-orange-700 font-bold">Verified Purchase</span>
                      </>
                    )}
                  </div>

                  {/* Text Comment content */}
                  <p className="text-xs text-gray-700 leading-relaxed font-sans select-text whitespace-pre-wrap">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
