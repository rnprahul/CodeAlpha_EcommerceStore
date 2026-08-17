import React from 'react';
import { RotateCcw, Filter, Star } from 'lucide-react';
import { categories } from '../data/categories';
import './FilterSidebar.css';

export const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  inStockOnly,
  setInStockOnly,
  onResetFilters
}) => {
  return (
    <aside className="filter-sidebar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem' }}>
          <Filter size={18} className="text-primary" /> Filters
        </div>
        <button
          onClick={onResetFilters}
          className="btn btn-outline btn-sm"
          style={{ padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}
        >
          <RotateCcw size={12} /> Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="filter-group-title">Category</h4>
        <ul className="filter-options-list">
          <li>
            <label className="filter-checkbox-label">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === 'all'}
                onChange={() => setSelectedCategory('all')}
              />
              <span>All Categories</span>
            </label>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat.slug}
                  onChange={() => setSelectedCategory(cat.slug)}
                />
                <span>{cat.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="filter-group-title">Price Range</h4>
        <div className="price-range-inputs">
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="range-slider"
          />
          <div className="price-values-display">
            <span>$0</span>
            <span>Up to <strong>${maxPrice}</strong></span>
          </div>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="filter-group-title">Rating</h4>
        <ul className="filter-options-list">
          {[4.5, 4.0, 3.5].map((stars) => (
            <li key={stars}>
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === stars}
                  onChange={() => setMinRating(stars)}
                />
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {stars}★ & above
                </span>
              </label>
            </li>
          ))}
          <li>
            <label className="filter-checkbox-label">
              <input
                type="radio"
                name="rating"
                checked={minRating === 0}
                onChange={() => setMinRating(0)}
              />
              <span>All Ratings</span>
            </label>
          </li>
        </ul>
      </div>

      {/* Availability Filter */}
      <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
        <label className="filter-checkbox-label">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>In Stock Items Only</span>
        </label>
      </div>
    </aside>
  );
};
