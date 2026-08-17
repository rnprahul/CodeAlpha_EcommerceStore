import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CategoryCard.css';

export const CategoryCard = ({ category }) => {
  if (!category) return null;

  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <img src={category.image} alt={category.name} className="category-card-bg" />
      <div className="category-card-overlay"></div>
      <div className="category-card-content">
        <h3 className="category-name">{category.name}</h3>
        <div className="category-meta">
          <span>{category.productCount} Products</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};
