import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Rating } from './Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

export const ProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const primaryImg = product.images && product.images[0];
  const hoverImg = product.images && product.images[1];

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const result = await addToCart(product, 1);
    if (result && result.requireLogin) {
      navigate('/login');
    }
  };

  return (
    <div className="product-card">
      {/* Image Container with Badges */}
      <div className="product-card-image-box">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <img
            src={primaryImg}
            alt={product.name}
            className={`product-card-img primary-img ${hoverImg ? 'has-hover' : ''}`}
            loading="lazy"
          />
          {hoverImg && (
            <img
              src={hoverImg}
              alt={`${product.name} alternate`}
              className="product-card-img hover-img"
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="product-card-badges">
          {product.discount > 0 && (
            <span className="badge badge-discount">-{product.discount}%</span>
          )}
          {product.trending && (
            <span className="badge" style={{ backgroundColor: 'var(--slate-900)', color: '#fff' }}>
              HOT
            </span>
          )}
        </div>

        {/* Floating Wishlist Heart */}
        <button
          className={`wishlist-toggle-btn ${isSaved ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Button Overlay */}
        {onQuickView && (
          <button
            className="quick-view-overlay-btn"
            onClick={() => onQuickView(product)}
            aria-label="Quick preview"
          >
            <Eye size={15} /> Quick View
          </button>
        )}
      </div>

      {/* Card Info */}
      <div className="product-card-content">
        <div className="product-brand-category">
          <span>{product.brand}</span>
          <span style={{ color: 'var(--primary-600)' }}>{product.category}</span>
        </div>

        <Link to={`/product/${product.id}`} className="product-title-link">
          {product.name}
        </Link>

        <div className="product-card-rating">
          <Rating value={product.rating} count={product.reviewCount} size={14} />
        </div>

        <div className="product-card-price-row">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
};
