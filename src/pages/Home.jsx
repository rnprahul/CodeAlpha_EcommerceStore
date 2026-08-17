import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  Award,
  Star,
  CheckCircle2,
  Flame,
  AlertCircle
} from 'lucide-react';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import { productService } from '../services/productService';

export const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchHomeProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [featuredRes, trendingRes] = await Promise.all([
          productService.getFeaturedProducts(8),
          productService.getTrendingProducts(4)
        ]);

        if (isMounted) {
          setFeaturedProducts(featuredRes.data || []);
          setTrendingProducts(trendingRes.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch home page products:', err);
        if (isMounted) {
          setError(err.message || 'Unable to load products. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchHomeProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page-wrapper">
      {/* 1. HERO SECTION */}
      <section
        style={{
          backgroundColor: 'var(--slate-900)',
          color: '#ffffff',
          padding: '4.5rem 0',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '4rem'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.25) 0%, rgba(13, 148, 136, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div
                className="badge"
                style={{
                  backgroundColor: 'rgba(13, 148, 136, 0.2)',
                  color: '#2dd4bf',
                  border: '1px solid rgba(45, 212, 191, 0.3)',
                  padding: '0.4rem 0.8rem',
                  marginBottom: '1.25rem'
                }}
              >
                ⚡ NEW SEASON COLLECTION 2026
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.25rem',
                  color: '#ffffff'
                }}
              >
                Everything You Need. <br />
                <span style={{ color: 'var(--primary-400)' }}>Delivered Simply.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#94a3b8',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                  marginBottom: '2rem'
                }}
              >
                Discover over 1,000+ curated tech gadgets, premium streetwear, home essentials, and lifestyle accessories with fast express delivery.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/shop" className="btn btn-primary btn-lg">
                  Shop Now <ArrowRight size={20} />
                </Link>
                <Link to="/category/electronics" className="btn btn-outline btn-lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
                  Explore Gadgets
                </Link>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  marginTop: '2.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>50k+</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Happy Customers</div>
                </div>
                <div style={{ height: '30px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>4.9 ★</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Average Rating</div>
                </div>
                <div style={{ height: '30px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>24h</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Fast Dispatch</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                  alt="QuickKart Hero Showcase"
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Hero Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <div style={{ padding: '0.6rem', borderRadius: '50%', backgroundColor: 'var(--primary-100)', color: 'var(--primary-700)' }}>
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Top Pick 2026</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AcousticPro ANC Wireless</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SPOTLIGHT */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Browse through our top curated collections</p>
          </div>
          <Link to="/shop" className="see-all-link">
            All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked top deals and customer favorites</p>
          </div>
          <Link to="/shop" className="see-all-link">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <ProductSkeletonGrid count={8} />
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
            <AlertCircle size={32} style={{ color: 'var(--accent-rose)', marginBottom: '0.5rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>{error}</p>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. PROMOTIONAL OFFER BANNER */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div
          style={{
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, #0d9488 0%, #0f172a 100%)',
            color: '#ffffff',
            padding: '3.5rem 2.5rem',
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: '2rem',
            alignItems: 'center',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div>
            <span className="badge badge-discount" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              SPECIAL PROMO
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
              Summer Tech Fest — Save Up To 30% Off
            </h2>
            <p style={{ color: '#e2e8f0', fontSize: '1.05rem', marginBottom: '1.75rem', maxWidth: '540px' }}>
              Upgrade your setup with premium noise-canceling headphones, mechanical keyboards, and 4K displays. Use promo code <strong>QUICK15</strong> at checkout.
            </p>
            <Link to="/category/electronics" className="btn btn-secondary btn-lg">
              Explore Deals <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80"
              alt="Promo Banner"
              style={{
                maxWidth: '280px',
                margin: '0 auto',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                transform: 'rotate(-4deg)'
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. TRENDING NOW SECTION */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-rose)', fontWeight: 700, fontSize: '0.88rem' }}>
              <Flame size={18} /> TRENDING NOW
            </div>
            <h2 className="section-title">Most Popular Right Now</h2>
          </div>
          <Link to="/shop?sort=rating" className="see-all-link">
            Shop Trending <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <ProductSkeletonGrid count={4} />
        ) : (
          <div className="products-grid">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* 6. WHY QUICKKART BENEFITS */}
      <section
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
          padding: '4rem 0',
          marginBottom: '4rem'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <h2 className="section-title">Why Shop With QuickKart?</h2>
            <p className="section-subtitle">We guarantee an uncompromised shopping experience from checkout to delivery</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem'
            }}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-main)'
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-100)',
                  color: 'var(--primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <Truck size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fast Express Delivery</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Guaranteed dispatch within 24 hours with real-time live package tracking to your doorstep.
              </p>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-main)'
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-amber-light)',
                  color: 'var(--accent-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>100% Secure Payments</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Bank-level 256-bit encryption ensuring your credit cards and UPI transactions remain protected.
              </p>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-main)'
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <RefreshCw size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>30 Days Easy Return</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                If you aren't 100% satisfied with your item, return it effortlessly for a full prompt refund.
              </p>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-main)'
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: '#fce7f3',
                  color: '#db2777',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verified Quality</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Every single item is thoroughly inspected by our quality assurance team before shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          <h2 className="section-title">Loved by Thousands</h2>
          <p className="section-subtitle">See what our real verified shoppers have to say</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', color: 'var(--accent-amber)', marginBottom: '0.75rem' }}>
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "The AcousticPro headphones arrived within 24 hours! Sound quality is unreal and noise cancellation cuts out all office noise."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Customer Sarah M."
                style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sarah Jenkins</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <CheckCircle2 size={12} /> Verified Buyer
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', color: 'var(--accent-amber)', marginBottom: '0.75rem' }}>
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "QuickKart's checkout experience is seamless. Ordered the Japanese denim jacket and the fit was spot on. Highly recommended!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Customer David R."
                style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>David Ross</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <CheckCircle2 size={12} /> Verified Buyer
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', color: 'var(--accent-amber)', marginBottom: '0.75rem' }}>
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "Bought the BaristaPro Espresso machine for my home office. Coffee tastes just like artisanal cafes. Customer service was super helpful too."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                alt="Customer Emily T."
                style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Emily Taylor</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <CheckCircle2 size={12} /> Verified Buyer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW POPUP */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
