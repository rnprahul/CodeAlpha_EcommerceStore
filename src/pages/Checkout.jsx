import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  CreditCard,
  QrCode,
  Truck,
  MapPin,
  PackageCheck,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

import { orderService } from '../services/orderService';
import { User, ShoppingBag, ArrowRight } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    appliedPromo,
    refreshCart,
    subtotal = 0,
    discountAmount = 0,
    shippingFee = 0,
    taxAmount = 0,
    totalAmount = 0,
    isLoading
  } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pinCode: user?.address?.pinCode || '',
    country: 'United States'
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({ number: '•••• •••• •••• 4242', expiry: '12/28', cvc: '•••' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Modal State
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pinCode) {
      showToast('Please complete all required shipping fields (Full Name, Phone, Address, City, State, PIN Code).', 'error');
      return;
    }

    if (cartItems.length === 0) {
      showToast('Your shopping cart is empty.', 'error');
      navigate('/cart');
      return;
    }

    try {
      setIsSubmitting(true);
      const selectedPaymentLabel = paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery';
      const orderPayload = {
        shippingAddress: formData,
        deliveryMethod,
        paymentMethod: selectedPaymentLabel,
        promoCode: appliedPromo?.code
      };

      const res = await orderService.createOrder(orderPayload);
      if (res.success && res.data) {
        setCompletedOrder(res.data);
        await refreshCart();
        showToast('🎉 Order placed successfully!', 'success');
      } else {
        showToast(res.message || 'Unable to place order.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Failed to place order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
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
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <User size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Login Required</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Please log in to your QuickKart account to complete checkout.
          </p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Log In to Checkout <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  if (completedOrder) {
    return (
      <div className="page-wrapper container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '620px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '3.5rem 2.5rem',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <CheckCircle2 size={48} />
          </div>

          <span className="badge badge-delivered" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
            ORDER CONFIRMED
          </span>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Thank You for Your Order!
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Your order number is <strong style={{ color: 'var(--primary-600)' }}>{completedOrder.id}</strong>. We've sent a confirmation email to <strong>{completedOrder.shippingAddress.email}</strong>.
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-main)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '2rem',
              fontSize: '0.9rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="text-muted">Estimated Delivery:</span>
              <strong className="text-primary">2–3 Business Days</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="text-muted">Payment Method:</span>
              <strong>{completedOrder.paymentMethod}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted">Total Paid:</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
                ${completedOrder.total.toFixed(2)}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/orders" className="btn btn-primary btn-lg">
              <PackageCheck size={18} /> View Order History
            </Link>
            <Link to="/shop" className="btn btn-outline btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper container" style={{ paddingTop: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'start' }}>
          {/* Left Form Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Step 1: Delivery Address */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '2rem'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={20} className="text-primary" /> 1. Shipping Address
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-input"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    name="state"
                    className="form-input"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">PIN Code *</label>
                  <input
                    type="text"
                    name="pinCode"
                    className="form-input"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Method */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '2rem'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Truck size={20} className="text-primary" /> 2. Delivery Method
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    border: deliveryMethod === 'standard' ? '2px solid var(--primary-500)' : '1px solid var(--border-light)',
                    backgroundColor: deliveryMethod === 'standard' ? 'var(--primary-50)' : 'var(--bg-surface)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>Express Standard Delivery</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Delivered in 2–3 Business Days</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800 }}>{shippingFee === 0 ? 'FREE' : '$9.99'}</span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    border: deliveryMethod === 'overnight' ? '2px solid var(--primary-500)' : '1px solid var(--border-light)',
                    backgroundColor: deliveryMethod === 'overnight' ? 'var(--primary-50)' : 'var(--bg-surface)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'overnight'}
                      onChange={() => setDeliveryMethod('overnight')}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>Priority Overnight Shipping</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Guaranteed Next Day Delivery</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800 }}>$19.99</span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '2rem'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CreditCard size={20} className="text-primary" /> 3. Payment Method
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: paymentMethod === 'card' ? '2px solid var(--primary-500)' : '1px solid var(--border-light)',
                    backgroundColor: paymentMethod === 'card' ? 'var(--primary-50)' : 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  <CreditCard size={22} className="text-primary" /> Credit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: paymentMethod === 'upi' ? '2px solid var(--primary-500)' : '1px solid var(--border-light)',
                    backgroundColor: paymentMethod === 'upi' ? 'var(--primary-50)' : 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  <QrCode size={22} className="text-primary" /> Instant UPI
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: paymentMethod === 'cod' ? '2px solid var(--primary-500)' : '1px solid var(--border-light)',
                    backgroundColor: paymentMethod === 'cod' ? 'var(--primary-50)' : 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  <Truck size={22} className="text-primary" /> Cash on Delivery
                </button>
              </div>

              {/* Dynamic Payment UI */}
              {paymentMethod === 'card' && (
                <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input type="text" className="form-input" value={cardData.number} readOnly />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input type="text" className="form-input" value={cardData.expiry} readOnly />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input type="password" className="form-input" value={cardData.cvc} readOnly />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                  <label className="form-label">Enter UPI ID (e.g. alex@okaxis)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Supports Google Pay, PhonePe, Paytm & BHIM UPI.
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Pay with cash upon package delivery at your doorstep. Please ensure exact cash change.
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Panel */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-md)',
              position: 'sticky',
              top: 'calc(var(--navbar-height) + 1.5rem)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Order Items</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '240px', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {cartItems.map((item) => (
                <div key={item.cartItemId} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div style={{ flex: 1, fontSize: '0.88rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Qty: {item.quantity}</div>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '1rem 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Subtotal</span>
                <span>${(subtotal || 0).toFixed(2)}</span>
              </div>
              {(discountAmount || 0) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                  <span>Discount</span>
                  <span>-${(discountAmount || 0).toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${(shippingFee || 0).toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Tax (8%)</span>
                <span>${(taxAmount || 0).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, marginTop: '0.5rem' }}>
                <span>Final Total</span>
                <span style={{ color: 'var(--primary-600)' }}>${(totalAmount || 0).toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}
              disabled={isSubmitting}
            >
              <Sparkles size={18} /> {isSubmitting ? 'Placing Order...' : `Place Order ($${(totalAmount || 0).toFixed(2)})`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
