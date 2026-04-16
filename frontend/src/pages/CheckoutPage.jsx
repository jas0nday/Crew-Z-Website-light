import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/productData';
import { Input } from '@/components/ui/input';
import { CheckCircle, ArrowRight, ShoppingCart } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CheckoutPage() {
  const { items, currency, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState('form');
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: '', customer_email: '',
    street: '', city: '', state: '', postal_code: '', country: ''
  });

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const total = cartTotal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          shipping_address: {
            street: form.street, city: form.city,
            state: form.state, postal_code: form.postal_code, country: form.country
          },
          items: items.map(i => ({ product_slug: i.slug, quantity: i.quantity })),
          currency
        })
      });
      if (res.ok) {
        const data = await res.json();
        setOrderNumber(data.order_number);
        setStep('success');
        clearCart();
      }
    } catch {}
    setLoading(false);
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center pt-16" data-testid="checkout-empty">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-[#71717A] mx-auto mb-4" />
          <h1 className="font-heading text-4xl text-white uppercase mb-4">Cart is Empty</h1>
          <Link to="/shop" className="text-[#007AFF] hover:underline font-body">Back to Shop</Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center pt-16" data-testid="order-success">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-[#007AFF] mx-auto mb-6" />
          <h1 className="font-heading text-4xl text-white uppercase mb-4">Order Placed</h1>
          <p className="font-body text-sm text-[#A1A1AA] mb-2">Your order number is:</p>
          <p className="font-heading text-2xl text-[#007AFF] mb-6" data-testid="order-number">{orderNumber}</p>
          <p className="font-body text-sm text-[#A1A1AA] mb-8 leading-relaxed">
            Thank you for your pre-order! CrewZ ships from <strong className="text-white">1 October 2026</strong>. We'll send payment instructions and shipping updates to your email before launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/track-order?order=${orderNumber}`}
              className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-3 px-6 rounded-sm hover:bg-[#3395FF] transition-all"
              data-testid="track-order-link">
              TRACK ORDER
            </Link>
            <Link to="/"
              className="border border-white/20 text-white font-heading uppercase tracking-widest text-sm py-3 px-6 rounded-sm hover:border-white hover:bg-white/5 transition-all"
              data-testid="back-home-link">
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6 md:px-12" data-testid="checkout-page">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6" data-testid="checkout-form">
            <div className="bg-[#111111] border border-white/10 rounded-sm p-6">
              <h2 className="font-heading text-lg text-white uppercase mb-4">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">Full Name *</label>
                  <Input value={form.customer_name} onChange={update('customer_name')} required
                    className="bg-[#0A0A0A] border-white/10 text-white" data-testid="input-name" />
                </div>
                <div>
                  <label className="block font-body text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">Email *</label>
                  <Input type="email" value={form.customer_email} onChange={update('customer_email')} required
                    className="bg-[#0A0A0A] border-white/10 text-white" data-testid="input-email" />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-sm p-6">
              <h2 className="font-heading text-lg text-white uppercase mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-body text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">Street Address *</label>
                  <Input value={form.street} onChange={update('street')} required
                    className="bg-[#0A0A0A] border-white/10 text-white" data-testid="input-street" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">City *</label>
                    <Input value={form.city} onChange={update('city')} required
                      className="bg-[#0A0A0A] border-white/10 text-white" data-testid="input-city" />
                  </div>
                  <div>
                    <label className="block font-body text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">State / Province</label>
                    <Input value={form.state} onChange={update('state')}
                      className="bg-[#0A0A0A] border-white/10 text-white" data-testid="input-state" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">Postal Code *</label>
                    <Input value={form.postal_code} onChange={update('postal_code')} required
                      className="bg-[#0A0A0A] border-white/10 text-white" data-testid="input-postal" />
                  </div>
                  <div>
                    <label className="block font-body text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">Country *</label>
                    <Input value={form.country} onChange={update('country')} required
                      className="bg-[#0A0A0A] border-white/10 text-white" data-testid="input-country" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-sm p-4">
              <p className="font-body text-sm text-white">
                CrewZ launches <strong>1 October 2026</strong>. This is a pre-order &mdash; you will not be charged now. Payment instructions will be sent to your email closer to the shipping date.
              </p>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 rounded-sm hover:bg-[#3395FF] hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              data-testid="place-order-btn">
              {loading ? 'PLACING ORDER...' : <><>PLACE PRE-ORDER</> <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="bg-[#111111] border border-white/10 rounded-sm p-6 sticky top-24">
              <h2 className="font-heading text-lg text-white uppercase mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.slug} className="flex justify-between items-center" data-testid={`summary-${item.slug}`}>
                    <div>
                      <p className="font-body text-sm text-white">{item.name}</p>
                      <p className="font-body text-xs text-[#71717A]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-body text-sm text-white">{formatPrice(item.price_usd * item.quantity, currency)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="font-heading text-sm text-[#A1A1AA] uppercase">Total</span>
                <span className="font-heading text-2xl text-white" data-testid="checkout-total">{total.display}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
