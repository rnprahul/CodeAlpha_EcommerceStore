import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Send, ShieldCheck, Truck, RefreshCw, Headphones, Heart } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './Footer.css';

export const Footer = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Thank you for subscribing to QuickKart VIP deals!', 'success');
    setEmail('');
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        {/* Value Proposition Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '3rem',
            marginBottom: '3rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(13, 148, 136, 0.15)', color: '#2dd4bf' }}>
              <Truck size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>Fast & Free Shipping</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>On all orders over $75</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>Secure Checkout</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>256-bit SSL Encryption</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
              <RefreshCw size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>30 Days Easy Return</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Hassle-free money back</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
              <Headphones size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>24/7 Dedicated Support</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Instant customer assistance</div>
            </div>
          </div>
        </div>

        {/* Top Footer Grid */}
        <div className="footer-top-grid">
          {/* Brand Bio */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="brand-icon-wrapper" style={{ width: 36, height: 36 }}>
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="footer-brand-name">
                Quick<span>Kart</span>
              </span>
            </Link>
            <p className="footer-bio">
              QuickKart is your modern online shopping destination delivering premium electronics, fashion, home essentials, and lifestyle products with speed, trust, and simplicity.
            </p>
            <div className="footer-socials">
              <a href="#twitter" className="social-icon-btn" aria-label="Twitter">X</a>
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram">IG</a>
              <a href="#facebook" className="social-icon-btn" aria-label="Facebook">FB</a>
              <a href="#github" className="social-icon-btn" aria-label="GitHub">GH</a>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div>
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/shop" className="footer-link">All Products</Link></li>
              <li><Link to="/category/electronics" className="footer-link">Electronics</Link></li>
              <li><Link to="/category/fashion" className="footer-link">Fashion Apparel</Link></li>
              <li><Link to="/category/home-living" className="footer-link">Home & Living</Link></li>
              <li><Link to="/wishlist" className="footer-link">My Saved Wishlist</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="footer-column-title">Customer Care</h4>
            <ul className="footer-links-list">
              <li><Link to="/orders" className="footer-link">Track Your Order</Link></li>
              <li><Link to="/account" className="footer-link">My Account</Link></li>
              <li><a href="#shipping" className="footer-link">Shipping Policy</a></li>
              <li><a href="#returns" className="footer-link">Returns & Refunds</a></li>
              <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="footer-column-title">Stay Connected</h4>
            <p className="footer-newsletter-text">
              Subscribe to get exclusive discount coupons, early access to sales, and product updates.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }} aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} <strong>QuickKart</strong>. Built with <Heart size={13} style={{ color: '#f43f5e', display: 'inline' }} /> for CodeAlpha Full Stack Internship.
          </div>
          <div className="payment-badges">
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
            <span className="payment-badge">AMEX</span>
            <span className="payment-badge">PAYPAL</span>
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
