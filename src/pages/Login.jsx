import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Mail, Lock, UserCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectPath = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setErrorMessage(result.message || 'Invalid email or password');
    }
  };

  const handleDemoLogin = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    // Demo user login via test credentials
    const result = await login('alex.morgan@example.com', 'password123');
    setIsSubmitting(false);

    if (result.success) {
      navigate(redirectPath, { replace: true });
    } else {
      // Fallback demo auto-reg
      const regResult = await login('alex.morgan@example.com', 'password123');
      if (regResult.success) navigate(redirectPath, { replace: true });
    }
  };

  return (
    <div className="page-wrapper container" style={{ paddingTop: '3.5rem' }}>
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="brand-icon-wrapper" style={{ width: 44, height: 44, margin: '0 auto 0.75rem auto' }}>
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Sign in to manage your QuickKart orders & wishlist
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--accent-rose-light)',
              color: 'var(--accent-rose)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
              borderLeft: '4px solid var(--accent-rose)'
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Demo User Fast Track */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isSubmitting}
          className="btn btn-outline"
          style={{
            width: '100%',
            marginBottom: '1.5rem',
            borderColor: 'var(--primary-500)',
            color: 'var(--primary-600)',
            backgroundColor: 'var(--primary-50)'
          }}
        >
          <UserCheck size={18} /> Continue as Demo User (Alex Morgan)
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
          <span>OR SIGN IN WITH EMAIL</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="alex.morgan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                accentColor="var(--primary-500)"
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="spin-icon" /> Signing in...
              </>
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have a QuickKart account?{' '}
          <Link to="/register" style={{ color: 'var(--primary-600)', fontWeight: 700 }}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};
