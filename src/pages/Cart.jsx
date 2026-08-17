import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Heart,
  ArrowRight,
  Tag,
  ShieldCheck,
  ArrowLeft,
  User
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    cartItems,
    isLoading,
    isUpdating,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    totalAmount
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyPromoCode(couponInput);
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.id)) {
      toggleWishlist(item);
    }
    removeFromCart(item.cartItemId);
  };

  if (!isAuthenticated) {
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
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <User size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Login Required</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Please log in to your QuickKart account to view and manage your shopping cart.
          </p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Log In to View Cart <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="page-wrapper container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="badge" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
          Loading your QuickKart cart...
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
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
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <ShoppingBag size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Looks like you haven't added any items to your shopping cart yet. Explore our catalog and grab the best deals today!
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)' }}>You have {cartItems.length} unique item(s) in your cart</p>
        </div>
        <button className="btn btn-outline btn-sm text-danger" onClick={clearCart}>
          <Trash2 size={14} /> Clear Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'start' }}>
        {/* Cart Items Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto auto',
                gap: '1.25rem',
                alignItems: 'center',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                padding: '1.25rem'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)' }}
              />

              <div>
                <Link to={`/product/${item.id}`} style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  {item.name}
                </Link>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Brand: {item.brand} {item.color && `· Color: ${item.color}`} {item.size && `· Size: ${item.size}`}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--primary-600)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                <button
                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                  disabled={isUpdating}
                  style={{ padding: '0.4rem 0.75rem', fontWeight: 800, opacity: isUpdating ? 0.6 : 1 }}
                >
                  -
                </button>
                <span style={{ padding: '0 0.6rem', fontWeight: 800, fontSize: '0.95rem' }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                  disabled={isUpdating}
                  style={{ padding: '0.4rem 0.75rem', fontWeight: 800, opacity: isUpdating ? 0.6 : 1 }}
                >
                  +
                </button>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleMoveToWishlist(item)}
                    className="btn btn-outline btn-sm"
                    title="Move to Wishlist"
                    style={{ padding: '0.35rem 0.6rem' }}
                  >
                    <Heart size={14} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="btn btn-outline btn-sm text-danger"
                    title="Remove item"
                    style={{ padding: '0.35rem 0.6rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1rem' }}>
            <Link to="/shop" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Order Summary Sidebar */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: 'calc(var(--navbar-height) + 1.5rem)'
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
            Order Summary
          </h3>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} style={{ marginBottom: '1.5rem' }}>
            <div className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Tag size={14} className="text-primary" /> Promo Code
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Try QUICK15 or FREESHIP"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.88rem' }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Apply
              </button>
            </div>
          </form>

          {appliedPromo && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'var(--primary-100)',
                color: 'var(--primary-800)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1.25rem'
              }}
            >
              <span>Code <strong>{appliedPromo.code}</strong> applied!</span>
              <button onClick={removePromoCode} style={{ color: 'var(--accent-rose)', fontWeight: 800 }}>✕</button>
            </div>
          )}

          {/* Summary Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Subtotal</span>
              <span style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Discount</span>
                <span style={{ fontWeight: 700 }}>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Estimated Shipping</span>
              <span style={{ fontWeight: 700 }}>
                {shippingFee === 0 ? <strong className="text-primary">FREE</strong> : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Estimated Tax (8%)</span>
              <span style={{ fontWeight: 700 }}>${taxAmount.toFixed(2)}</span>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '0.4rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary-600)' }}>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginBottom: '1rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} className="text-primary" /> Guaranteed 256-Bit SSL Checkout
          </div>
        </div>
      </div>
    </div>
  );
};
