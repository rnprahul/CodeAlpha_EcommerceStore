import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { orderService } from '../services/orderService';

export const Account = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserProfile } = useAuth();
  const { wishlistCount } = useWishlist();

  const [activeSection, setActiveSection] = useState('profile');
  const [orderCount, setOrderCount] = useState(0);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    const loadOrdersCount = async () => {
      try {
        const res = await orderService.getUserOrders();
        if (res.success && Array.isArray(res.data)) {
          setOrderCount(res.data.length);
        }
      } catch {
        // Fallback
      }
    };
    if (user) {
      loadOrdersCount();
    }
  }, [user]);

  if (!user) return null;

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
  };

  const defaultAddress = user.addresses && user.addresses.length > 0 ? user.addresses[0] : {
    fullName: user.name,
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'IL',
    pinCode: '62704',
    country: 'United States'
  };

  return (
    <div className="page-wrapper container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* Sidebar Nav */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '1.5rem'
          }}
        >
          <div style={{ textAlign: 'center', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user.name}
              style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.75rem auto' }}
            />
            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{user.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</div>
            <span className="badge badge-category" style={{ marginTop: '0.5rem', fontSize: '0.7rem' }}>
              ROLE: {user.role ? user.role.toUpperCase() : 'USER'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveSection('profile')}
              className={`mobile-nav-link ${activeSection === 'profile' ? 'active' : ''}`}
            >
              <User size={18} /> My Profile
            </button>
            <Link to="/orders" className="mobile-nav-link">
              <Package size={18} /> Orders ({orderCount})
            </Link>
            <Link to="/wishlist" className="mobile-nav-link">
              <Heart size={18} /> Wishlist ({wishlistCount})
            </Link>
            <button
              onClick={() => setActiveSection('addresses')}
              className={`mobile-nav-link ${activeSection === 'addresses' ? 'active' : ''}`}
            >
              <MapPin size={18} /> Addresses
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className={`mobile-nav-link ${activeSection === 'settings' ? 'active' : ''}`}
            >
              <Settings size={18} /> Settings
            </button>
            <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '0.5rem 0' }} />
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="mobile-nav-link text-danger"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div>
          {/* Quick Stats Banner */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'var(--primary-100)', color: 'var(--primary-600)' }}>
                <Package size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{orders.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Orders</div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'var(--accent-rose-light)', color: 'var(--accent-rose)' }}>
                <Heart size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{wishlistCount}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wishlist Items</div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-600)' }}>Verified User</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MongoDB Atlas Authenticated</div>
              </div>
            </div>
          </div>

          {/* Section: Profile Info Form */}
          {activeSection === 'profile' && (
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '2rem'
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Personal Profile Details</h2>
              <form onSubmit={handleProfileSave}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={profileForm.email}
                      readOnly
                      style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary">Save Profile Changes</button>
              </form>
            </div>
          )}

          {/* Section: Addresses */}
          {activeSection === 'addresses' && (
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '2rem'
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Saved Shipping Addresses</h2>
              <div
                style={{
                  border: '1.5px solid var(--primary-500)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  backgroundColor: 'var(--primary-50)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '1rem' }}>Default Delivery Address</strong>
                  <span className="badge badge-category">DEFAULT</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {defaultAddress.fullName || user.name}<br />
                  {defaultAddress.street || '742 Evergreen Terrace'}<br />
                  {defaultAddress.city || 'Springfield'}, {defaultAddress.state || 'IL'} - {defaultAddress.pinCode || '62704'}<br />
                  {defaultAddress.country || 'United States'}
                </div>
              </div>
            </div>
          )}

          {/* Section: Settings */}
          {activeSection === 'settings' && (
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '2rem'
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Account Preferences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                  <input type="checkbox" defaultChecked accentColor="var(--primary-500)" />
                  <span>Receive email order tracking updates and notifications</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                  <input type="checkbox" defaultChecked accentColor="var(--primary-500)" />
                  <span>Receive VIP promotional promo codes and sales alerts</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
