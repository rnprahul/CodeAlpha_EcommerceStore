import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { QuickViewModal } from '../components/QuickViewModal';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import { productService } from '../services/productService';

export const CategoryPage = () => {
  const { slug } = useParams();

  const category = categories.find((c) => c.slug === slug) || categories[0];

  const [productsList, setProductsList] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = {
          category: category.slug,
          limit: 30,
          maxPrice: maxPrice < 1000 ? maxPrice : undefined,
          rating: minRating > 0 ? minRating : undefined,
          inStock: inStockOnly ? 'true' : undefined
        };

        const res = await productService.getProducts(params);
        if (isMounted) {
          setProductsList(res.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch category products:', err);
        if (isMounted) {
          setError(err.message || 'Unable to load category products.');
          setProductsList([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCategoryProducts();
    return () => {
      isMounted = false;
    };
  }, [category.slug, maxPrice, minRating, inStockOnly]);

  return (
    <div className="page-wrapper container" style={{ paddingTop: '2rem' }}>
      {/* Category Hero Banner */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          padding: '2.5rem',
          color: '#ffffff',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <img
          src={category.image}
          alt={category.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.85) 40%, rgba(15,23,42,0.3) 100%)', zIndex: 2 }} />
        <div style={{ position: 'relative', zIndex: 3, maxWidth: '600px' }}>
          <span className="badge badge-category" style={{ marginBottom: '0.75rem', backgroundColor: 'var(--primary-500)', color: '#ffffff' }}>
            CATEGORY COLLECTION
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            {category.name}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1rem' }}>{category.description}</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>
        <FilterSidebar
          selectedCategory={category.slug}
          setSelectedCategory={() => {}}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          onResetFilters={() => {
            setMaxPrice(1000);
            setMinRating(0);
            setInStockOnly(false);
          }}
        />

        <div>
          <div style={{ marginBottom: '1.5rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            Showing {productsList.length} products in {category.name}
          </div>

          {isLoading ? (
            <ProductSkeletonGrid count={8} />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
              <AlertCircle size={32} style={{ color: 'var(--accent-rose)', marginBottom: '0.5rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>{error}</p>
            </div>
          ) : productsList.length > 0 ? (
            <div className="products-grid">
              {productsList.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
              <h3>No items match the selected price/rating filter.</h3>
            </div>
          )}
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};
