import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, SearchX, AlertCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { QuickViewModal } from '../components/QuickViewModal';
import { ProductSkeletonGrid } from '../components/ProductSkeleton';
import { productService } from '../services/productService';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Data & API UI States
  const [productsList, setProductsList] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI Drawer & Modal States
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    if (cat) setSelectedCategory(cat);
    if (search !== null) setSearchQuery(search);
    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Fetch products from MongoDB API whenever filters or pagination changes
  useEffect(() => {
    let isMounted = true;
    const fetchShopProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = {
          page: currentPage,
          limit: itemsPerPage,
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          search: searchQuery.trim() || undefined,
          maxPrice: maxPrice < 1000 ? maxPrice : undefined,
          rating: minRating > 0 ? minRating : undefined,
          inStock: inStockOnly ? 'true' : undefined,
          sort: sortBy !== 'relevance' ? sortBy : undefined
        };

        const res = await productService.getProducts(params);

        if (isMounted) {
          setProductsList(res.data || []);
          setPaginationMeta(
            res.meta || {
              page: currentPage,
              limit: itemsPerPage,
              total: (res.data || []).length,
              totalPages: 1
            }
          );
        }
      } catch (err) {
        console.error('Failed to fetch shop products:', err);
        if (isMounted) {
          setError(err.message || 'Unable to load products. Please try again.');
          setProductsList([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchShopProducts();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, sortBy, currentPage]);

  // Reset page to 1 when filters change
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (val) => {
    setMaxPrice(val);
    setCurrentPage(1);
  };

  const handleMinRatingChange = (val) => {
    setMinRating(val);
    setCurrentPage(1);
  };

  const handleInStockChange = (val) => {
    setInStockOnly(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(1000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('relevance');
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams({});
  };

  const totalPages = paginationMeta.totalPages || 1;

  return (
    <div className="page-wrapper container" style={{ paddingTop: '2rem' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            {selectedCategory === 'all'
              ? 'All Products'
              : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Showing <strong>{paginationMeta.total}</strong> items
            {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
          </p>
        </div>

        {/* Top Actions: Mobile Filter Toggle & Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => setShowMobileFilter(true)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpDown size={16} className="text-muted" />
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              style={{ width: 'auto', padding: '0.5rem 0.8rem', fontSize: '0.9rem' }}
            >
              <option value="relevance">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Desktop Sidebar */}
        <div className="desktop-sidebar-container">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            maxPrice={maxPrice}
            setMaxPrice={handleMaxPriceChange}
            minRating={minRating}
            setMinRating={handleMinRatingChange}
            inStockOnly={inStockOnly}
            setInStockOnly={handleInStockChange}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Products Area */}
        <div>
          {isLoading ? (
            <ProductSkeletonGrid count={itemsPerPage} />
          ) : error ? (
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '4rem 2rem',
                textAlign: 'center'
              }}
            >
              <AlertCircle size={40} style={{ color: 'var(--accent-rose)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Unable to Load Products</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                {error}
              </p>
              <button className="btn btn-primary" onClick={() => setCurrentPage(1)}>
                Try Again
              </button>
            </div>
          ) : productsList.length > 0 ? (
            <>
              <div className="products-grid">
                {productsList.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '3rem'
                  }}
                >
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty Search Results State */
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '4rem 2rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}
              >
                <SearchX size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Products Found</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                We couldn't find any items matching your selected filter criteria or search query.
              </p>
              <button className="btn btn-primary" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {showMobileFilter && (
        <div className="modal-overlay" onClick={() => setShowMobileFilter(false)}>
          <div
            className="mobile-drawer-content"
            style={{ width: '320px', maxWidth: '90vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 800 }}>Filter Catalog</h3>
              <button onClick={() => setShowMobileFilter(false)} aria-label="Close filters">✕</button>
            </div>
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              maxPrice={maxPrice}
              setMaxPrice={handleMaxPriceChange}
              minRating={minRating}
              setMinRating={handleMinRatingChange}
              inStockOnly={inStockOnly}
              setInStockOnly={handleInStockChange}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
