import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  Star,
  Zap,
  ArrowLeft,
  Share2,
  AlertCircle
} from 'lucide-react';
import { Rating } from '../components/Rating';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { productService } from '../services/productService';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    let isMounted = true;
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await productService.getProductById(id);
        if (!res || !res.data) {
          throw new Error('Product not found.');
        }

        if (isMounted) {
          const prodData = res.data;
          setProduct(prodData);
          setSelectedImgIndex(0);
          setSelectedColor(prodData.colors?.[0] || null);
          setSelectedSize(prodData.sizes?.[0] || null);
          setQuantity(1);

          // Fetch related products
          if (prodData.category) {
            try {
              const relRes = await productService.getProductsByCategory(prodData.category, { limit: 5 });
              if (isMounted) {
                const filteredRel = (relRes.data || [])
                  .filter((p) => p.id !== prodData.id && p._id !== prodData._id)
                  .slice(0, 4);
                setRelatedProducts(filteredRel);
              }
            } catch {
              // Ignore related error silently
            }
          }
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        if (isMounted) {
          setError(err.message || 'Product not found.');
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProductData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const isSaved = product ? isInWishlist(product.id) : false;

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;
    const result = await addToCart(product, quantity, selectedColor, selectedSize);
    if (result && result.requireLogin) {
      navigate('/login');
    }
  };

  const handleBuyNow = async () => {
    if (!product || product.stock <= 0) return;
    const result = await addToCart(product, quantity, selectedColor, selectedSize);
    if (result && result.requireLogin) {
      navigate('/login');
    } else if (result && result.success) {
      navigate('/checkout');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Product link copied to clipboard!', 'info');
  };

  if (isLoading) {
    return (
      <div className="page-wrapper container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="badge" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
          Loading QuickKart product details...
        </div>
      </div>
    );
  }

  if (error || !product) {
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
            <AlertCircle size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Product Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            The item you are looking for does not exist or may have been removed from our catalog.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper container" style={{ paddingTop: '2rem' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1.5rem' }}
      >
        <ArrowLeft size={16} /> Back to Products
      </button>

      {/* Main Product Layout: Left Gallery + Right Info */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '2.5rem',
          marginBottom: '3rem'
        }}
      >
        {/* Left Column: Gallery */}
        <div>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-subtle)',
              marginBottom: '1rem',
              aspectRatio: '1'
            }}
          >
            <img
              src={product.images[selectedImgIndex]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.discount > 0 && (
              <span
                className="badge badge-discount"
                style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                -{product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto' }}>
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setSelectedImgIndex(idx)}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImgIndex === idx ? '2px solid var(--primary-500)' : '2px solid transparent',
                    transition: 'all var(--transition-fast)'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Meta & Purchase Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="badge badge-category">{product.category}</span>
            <button onClick={handleShare} className="social-icon-btn" aria-label="Share product">
              <Share2 size={16} />
            </button>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>Brand: {product.brand}</span>
            <div style={{ height: '14px', width: '1px', backgroundColor: 'var(--border-light)' }} />
            <Rating value={product.rating} count={product.reviewCount} size={16} />
          </div>

          {/* Price Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem'
            }}
          >
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-600)' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="original-price" style={{ fontSize: '1.2rem' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="badge badge-discount">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
            )}
          </div>

          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Colors Selection */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                Color:
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: c,
                      border: selectedColor === c ? '3px solid var(--primary-500)' : '2px solid var(--border-light)',
                      boxShadow: selectedColor === c ? '0 0 0 2px var(--bg-surface)' : 'none',
                      cursor: 'pointer'
                    }}
                    aria-label={`Color option ${c}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                Size:
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`btn btn-sm ${selectedSize === s ? 'btn-primary' : 'btn-outline'}`}
                    style={{ minWidth: '44px' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ padding: '0.5rem 1rem', fontWeight: 800, fontSize: '1.1rem' }}
              >
                -
              </button>
              <span style={{ padding: '0 1rem', fontWeight: 800 }}>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                style={{ padding: '0.5rem 1rem', fontWeight: 800, fontSize: '1.1rem' }}
              >
                +
              </button>
            </div>
            {product.stock > 0 ? (
              <span style={{ fontSize: '0.85rem', color: 'var(--primary-600)', fontWeight: 600 }}>
                ✓ {product.stock} items in stock
              </span>
            ) : (
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-rose)', fontWeight: 700 }}>
                ✕ Out of Stock
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', marginBottom: '2rem' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingBag size={20} /> {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
            >
              <Zap size={20} /> Buy Now
            </button>
            <button
              className={`btn btn-outline btn-lg ${isSaved ? 'text-danger' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Save to wishlist"
            >
              <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Logistics Trust Badges */}
          <div
            style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-light)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              fontSize: '0.82rem',
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={18} className="text-primary" />
              <span>Free Delivery over $75</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={18} className="text-primary" />
              <span>30 Day Returns</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} className="text-primary" />
              <span>2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Customer Reviews */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '2.5rem',
          marginBottom: '3rem'
        }}
      >
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid var(--border-light)', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('description')}
            style={{
              paddingBottom: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: activeTab === 'description' ? 'var(--primary-600)' : 'var(--text-muted)',
              borderBottom: activeTab === 'description' ? '3px solid var(--primary-500)' : 'none',
              marginBottom: '-2px'
            }}
          >
            Description & Specs
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              paddingBottom: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: activeTab === 'reviews' ? 'var(--primary-600)' : 'var(--text-muted)',
              borderBottom: activeTab === 'reviews' ? '3px solid var(--primary-500)' : 'none',
              marginBottom: '-2px'
            }}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {activeTab === 'description' ? (
          <div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem' }}>
              {product.description} Built with meticulous precision and highest grade components, the {product.name} provides superior durability, comfort, and state-of-the-art performance for demanding users.
            </p>

            {product.specifications && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Technical Specifications</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr
                        key={key}
                        style={{
                          backgroundColor: idx % 2 === 0 ? 'var(--bg-main)' : 'transparent',
                          borderBottom: '1px solid var(--border-light)'
                        }}
                      >
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, width: '35%', color: 'var(--text-main)' }}>
                          {key}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
                  {product.rating.toFixed(1)}
                </div>
                <Rating value={product.rating} showCount={false} size={20} />
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Based on {product.reviewCount} verified reviews
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-main)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700 }}>Michael S.</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2 days ago</span>
                </div>
                <Rating value={5} showCount={false} size={14} />
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Exceeded all expectations! Fast shipping, pristine packaging, and the product performs like magic.
                </p>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-main)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700 }}>Elena P.</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>1 week ago</span>
                </div>
                <Rating value={4.5} showCount={false} size={14} />
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Very high quality build and materials. Would definitely purchase from QuickKart again!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="section-header">
            <div>
              <h2 className="section-title">Related Products</h2>
              <p className="section-subtitle">You might also be interested in these products</p>
            </div>
          </div>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
