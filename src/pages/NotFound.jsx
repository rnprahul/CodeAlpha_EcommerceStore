import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Store, Search } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="page-wrapper container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
      <div
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '4rem 2rem',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        <div
          style={{
            fontSize: '5rem',
            fontWeight: 900,
            color: 'var(--primary-500)',
            lineHeight: 1,
            marginBottom: '1rem',
            fontFamily: 'var(--font-heading)'
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          Oops! The product or page you are looking for might have been moved, renamed, or no longer exists.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/shop" className="btn btn-outline btn-lg">
            <Store size={18} /> Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
};
