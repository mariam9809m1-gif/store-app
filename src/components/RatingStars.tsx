/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showText?: boolean;
  maxStars?: number;
}

export default function RatingStars({ 
  rating, 
  size = 16, 
  showText = false, 
  maxStars = 5 
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const roundedRating = Math.round(rating * 2) / 2; // e.g. 4.3 -> 4.5
  
  return (
    <div className="flex items-center gap-1 shrink-0 font-sans select-none" id="rating-stars-container">
      <div className="flex items-center text-amber-500">
        {[...Array(maxStars)].map((_, index) => {
          const starVal = index + 1;
          if (starVal <= fullStars) {
            return (
              <Star 
                key={index} 
                style={{ width: size, height: size }} 
                className="fill-current stroke-current" 
              />
            );
          } else if (starVal === fullStars + 1 && hasHalf) {
            return (
              <StarHalf 
                key={index} 
                style={{ width: size, height: size }} 
                className="fill-current stroke-current" 
              />
            );
          } else {
            return (
              <Star 
                key={index} 
                style={{ width: size, height: size }} 
                className="stroke-current text-gray-300" // empty outline
                fill="none"
              />
            );
          }
        })}
      </div>
      {showText && (
        <span className="text-xs font-semibold text-amber-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
