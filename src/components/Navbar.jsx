import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Zap,
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  SlidersHorizontal,
  Home,
  Store
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import './Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Perform live API search on searchQuery change with debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await productService.searchProducts(searchQuery.trim(), { limit: 6 });
        setSearchResults(res.data || []);
      } catch (err) {
        console.error('Navbar search error:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearchDropdown(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchDropdown(false);
    }
  };

  const handleSelectProduct = (productId) => {
    setShowSearchDropdown(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <header className="navbar-header">
      {/* Top Announcement Bar */}
      <div className="top-announcement">
        ⚡ <strong>LIMITED TIME:</strong> Free Express Shipping on orders over $75 | Use code <strong>QUICK15</strong> for 15% off
      </div>

      <div className="container">
        <div className="navbar-main">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="QuickKart Home">
            <div className="brand-icon-wrapper">
              <Zap size={22} fill="currentColor" />
            </div>
            <div className="brand-text">
              <span className="brand-name">Quick<span>Kart</span></span>
              <span className="brand-tagline">Shop Quick. Shop Smart.</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Shop All
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/electronics" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Electronics
                </NavLink>
              </li>
              <li>
                <NavLink to="/category/fashion" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Fashion
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="nav-search-container" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  aria-label="Search items"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchDropdown(false);
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSearchDropdown && searchQuery.trim().length >= 2 && (
              <div className="search-suggestions-dropdown">
                {isSearching ? (
                  <div className="no-suggestions" style={{ color: 'var(--text-muted)' }}>
                    Searching product catalog...
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="suggestion-item"
                      onClick={() => handleSelectProduct(product.id)}
                    >
                      <img src={product.images[0]} alt={product.name} className="suggestion-img" />
                      <div className="suggestion-info">
                        <span className="suggestion-title">{product.name}</span>
                        <span className="suggestion-meta">{product.brand} · {product.category}</span>
                      </div>
                      <span className="suggestion-price">${product.price.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <div className="no-suggestions">
                    No products found matching "<strong>{searchQuery}</strong>"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions Right */}
          <div className="nav-actions">
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
              <Heart size={22} />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="nav-icon-btn" aria-label="Shopping Cart">
              <ShoppingBag size={22} />
              {totalItemCount > 0 && <span className="badge-count">{totalItemCount}</span>}
            </Link>

            {/* User Account / Auth */}
            <div className="user-menu-container" ref={userMenuRef}>
              {isAuthenticated ? (
                <button
                  className="user-avatar-btn"
                  onClick={() => setShowUserDropdown((prev) => !prev)}
                  aria-expanded={showUserDropdown}
                >
                  <img src={user.avatar} alt={user.name} className="user-avatar-img" />
                  <span className="user-name-label">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
              ) : (
                <Link to="/login" className="btn btn-outline btn-sm">
                  <User size={16} /> Login
                </Link>
              )}

              {/* User Dropdown Menu */}
              {showUserDropdown && isAuthenticated && (
                <div className="user-dropdown-menu">
                  <Link to="/account" className="user-menu-item" onClick={() => setShowUserDropdown(false)}>
                    <User size={16} /> My Account
                  </Link>
                  <Link to="/orders" className="user-menu-item" onClick={() => setShowUserDropdown(false)}>
                    <Package size={16} /> Order History
                  </Link>
                  <Link to="/wishlist" className="user-menu-item" onClick={() => setShowUserDropdown(false)}>
                    <Heart size={16} /> Saved Wishlist
                  </Link>
                  <div className="user-menu-divider"></div>
                  <button
                    className="user-menu-item text-danger"
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-wrapper" style={{ width: 34, height: 34 }}>
                  <Zap size={18} fill="currentColor" />
                </div>
                <span className="brand-name" style={{ fontSize: '1.25rem' }}>
                  Quick<span>Kart</span>
                </span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} style={{ marginTop: '0.5rem' }}>
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <ul className="mobile-nav-links">
              <li>
                <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <Home size={18} /> Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <Store size={18} /> All Products
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <SlidersHorizontal size={18} /> Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <SlidersHorizontal size={18} /> Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/home-living" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <SlidersHorizontal size={18} /> Home & Living
                </Link>
              </li>
              <li>
                <Link to="/category/sports" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <SlidersHorizontal size={18} /> Sports
                </Link>
              </li>
            </ul>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
              {isAuthenticated ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <img src={user.avatar} alt={user.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    </div>
                  </div>
                  <Link to="/account" className="btn btn-outline btn-sm" style={{ width: '100%', marginBottom: '0.5rem' }}>
                    My Account
                  </Link>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={logout}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to="/login" className="btn btn-outline" style={{ flex: 1 }}>Login</Link>
                  <Link to="/register" className="btn btn-primary" style={{ flex: 1 }}>Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
