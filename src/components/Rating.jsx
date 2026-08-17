import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export const Rating = ({ value = 0, count, size = 16, showCount = true }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.3 && value % 1 <= 0.8;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="rating-stars" aria-label={`Rating ${value} out of 5`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} fill="currentColor" />
      ))}
      {hasHalfStar && <StarHalf key="half" size={size} fill="currentColor" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} style={{ opacity: 0.3 }} />
      ))}
      {showCount && <span className="rating-count">({value.toFixed(1)}{count ? ` · ${count}` : ''})</span>}
    </div>
  );
};
