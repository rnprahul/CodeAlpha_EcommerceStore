import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => addToCart(item, 1));
    clearWishlist();
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="page-wrapper container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '3.5rem 2rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'var(--accent-rose-light)',
              color: 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <Heart size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Your Wishlist is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Save your favorite items here while browsing so you never lose track of what you love!
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Explore Catalog <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>My Wishlist</h1>
          <p style={{ color: 'var(--text-muted)' }}>You have {wishlistItems.length} saved item(s)</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline btn-sm text-danger" onClick={clearWishlist}>
            <Trash2 size={14} /> Clear Wishlist
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleMoveAllToCart}>
            <ShoppingBag size={14} /> Move All to Cart
          </button>
        </div>
      </div>

      <div className="products-grid">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
