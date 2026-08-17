import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { Rating } from './Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './QuickViewModal.css';

export const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quickview-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Gallery Left */}
        <div className="quickview-gallery">
          <img
            src={product.images[selectedImgIndex]}
            alt={product.name}
            className="quickview-main-image"
          />
          {product.images.length > 1 && (
            <div className="quickview-thumbnails">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className={`quickview-thumb ${selectedImgIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImgIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Right */}
        <div className="quickview-info">
          <div style={{ fontSize: '0.8rem', color: 'var(--primary-600)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            {product.brand} · {product.category}
          </div>
          <h2 className="quickview-title">{product.name}</h2>
          <Rating value={product.rating} count={product.reviewCount} size={16} />

          <div className="quickview-price-row">
            <span className="quickview-current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="original-price" style={{ fontSize: '1rem' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="badge badge-discount">Save {product.discount}%</span>
            )}
          </div>

          <p className="quickview-desc">{product.description}</p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Select Color:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: selectedColor === color ? '3px solid var(--primary-500)' : '2px solid var(--border-light)',
                      cursor: 'pointer'
                    }}
                    aria-label={`Color option ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Select Size:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`btn btn-sm ${selectedSize === size ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ padding: '0.4rem 0.8rem', fontWeight: 700 }}
              >
                -
              </button>
              <span style={{ padding: '0 0.8rem', fontWeight: 700 }}>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                style={{ padding: '0.4rem 0.8rem', fontWeight: 700 }}
              >
                +
              </button>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.stock} items available</span>
          </div>

          <div className="quickview-actions">
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAddToCart}>
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button
              className={`btn btn-outline ${isSaved ? 'text-danger' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Wishlist"
            >
              <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-600)', fontWeight: 600, fontSize: '0.9rem' }}
            >
              View Full Details & Specifications <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
