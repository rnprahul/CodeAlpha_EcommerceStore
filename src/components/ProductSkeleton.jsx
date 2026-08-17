import React from 'react';
import './ProductSkeleton.css';

export const ProductSkeleton = () => {
  return (
    <div className="product-skeleton-card">
      <div className="skeleton-img-box" />
      <div className="skeleton-body">
        <div className="skeleton-line short" />
        <div className="skeleton-line title" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line short" />
        <div className="skeleton-line btn" />
      </div>
    </div>
  );
};

export const ProductSkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="product-skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};
