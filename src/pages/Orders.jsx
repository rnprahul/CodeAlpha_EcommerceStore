import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, XCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';

export const Orders = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await orderService.getUserOrders();
      if (res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (err) {
      showToast(err.message || 'Failed to load order history.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, showToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      setCancellingId(orderId);
      const res = await orderService.cancelOrder(orderId);
      if (res.success) {
        showToast('Order cancelled successfully.', 'info');
        await fetchOrders();
      } else {
        showToast(res.message || 'Unable to cancel order.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Failed to cancel order.', 'error');
    } finally {
      setCancellingId(null);
    }
  };

  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;
    order.items.forEach((item) => {
      addToCart(
        {
          id: item.id || item.product,
          name: item.name,
          price: item.price,
          images: [item.image]
        },
        item.quantity,
        item.color,
        item.size
      );
    });
    showToast('Items from previous order added to cart!', 'success');
  };

  if (isLoading) {
    return (
      <div className="page-wrapper container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="badge" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
          Loading your order history...
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="page-wrapper container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '3.5rem 2rem'
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <Package size={36} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Orders Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            You haven't placed any orders with QuickKart yet.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper container" style={{ paddingTop: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Order History</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track, manage, and reorder past purchases</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.map((order) => {
          const statusClass =
            order.status === 'Delivered'
              ? 'badge-delivered'
              : order.status === 'Shipped'
              ? 'badge-shipped'
              : order.status === 'Cancelled'
              ? 'badge-discount'
              : 'badge-processing';

          const isCancelled = order.status === 'Cancelled';
          const canCancel = order.status === 'Processing';

          return (
            <div
              key={order.id || order._id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Order Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-light)',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                      Order #{order.orderNumber || order.id}
                    </span>
                    <span className={`badge badge-status ${statusClass}`}>{order.status}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Placed on {order.date} · Payment: {order.paymentMethod} ({order.paymentStatus})
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-600)' }}>
                    ${(order.total || 0).toFixed(2)}
                  </span>
                  {canCancel && (
                    <button
                      className="btn btn-outline btn-sm text-danger"
                      onClick={() => handleCancelOrder(order.id || order._id)}
                      disabled={cancellingId === (order.id || order._id)}
                    >
                      <XCircle size={14} /> {cancellingId === (order.id || order._id) ? 'Cancelling...' : 'Cancel Order'}
                    </button>
                  )}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleReorder(order)}
                  >
                    <ShoppingBag size={14} /> Buy Again
                  </button>
                </div>
              </div>

              {/* Order Tracking Progress Bar */}
              {!isCancelled && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>
                    <span style={{ color: order.statusStep >= 1 ? 'var(--primary-600)' : 'var(--text-muted)' }}>1. Order Placed</span>
                    <span style={{ color: order.statusStep >= 2 ? 'var(--primary-600)' : 'var(--text-muted)' }}>2. Processing</span>
                    <span style={{ color: order.statusStep >= 3 ? 'var(--primary-600)' : 'var(--text-muted)' }}>3. Shipped</span>
                    <span style={{ color: order.statusStep >= 4 ? 'var(--primary-600)' : 'var(--text-muted)' }}>4. Delivered</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-light)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${(order.statusStep / 4) * 100}%`,
                        height: '100%',
                        backgroundColor: 'var(--primary-500)',
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {(order.items || []).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', objectFit: 'cover', backgroundColor: 'var(--bg-subtle)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <Link to={`/product/${item.id || item.product}`} style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {item.name}
                      </Link>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Qty: {item.quantity} {item.size && `· Size: ${item.size}`} {item.color && `· Color: ${item.color}`}
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
