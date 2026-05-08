import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, Truck, CheckCircle, Clock } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STATUS_STEPS = ['received', 'confirmed', 'in_production', 'shipped', 'delivered'];
const STATUS_LABELS = { received: 'Order Received', confirmed: 'Confirmed', in_production: 'In Production', shipped: 'Shipped', delivered: 'Delivered' };

function StatusTimeline({ status }) {
  const currentStep = STATUS_STEPS.indexOf(status);
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        {STATUS_STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${i <= currentStep ? 'bg-[#007AFF]' : 'bg-[#F5F3EE] border border-gray-200'}`}>
              {i <= currentStep ? <CheckCircle className="w-4 h-4 text-white" /> : <Clock className="w-3 h-3 text-[#9CA3AF]" />}
            </div>
            {i < STATUS_STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-1 ${i < currentStep ? 'bg-[#007AFF]' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-body text-[#9CA3AF] -mt-2 mb-6">
        {STATUS_STEPS.map(step => (
          <span key={step} className={`text-center ${step === status ? 'text-[#007AFF]' : ''}`}>{STATUS_LABELS[step]}</span>
        ))}
      </div>
    </>
  );
}

function OrderItems({ items }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-sm text-[#007AFF] uppercase tracking-wider mb-4">Order Items</h3>
      {items?.map((item) => (
        <div key={item.product_slug} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
          <div>
            <p className="font-body text-sm text-[#1A1A2E]">{item.product_name}</p>
            <p className="font-body text-xs text-[#9CA3AF]">Qty: {item.quantity}</p>
          </div>
          <span className="font-body text-sm text-[#1A1A2E]">${item.total_usd}</span>
        </div>
      ))}
    </div>
  );
}

function formatCurrencySymbol(currency) {
  if (currency === 'GBP') return '\u00a3';
  if (currency === 'AUD') return 'A$';
  return '$';
}

export default function OrderTrackingPage() {
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get('order') || '');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = useCallback(async (e) => {
    if (e) e.preventDefault();
    if (!orderNumber.trim()) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await fetch(`${API}/orders/track/${orderNumber.trim()}`);
      if (res.ok) { setOrder(await res.json()); }
      else { setError('Order not found. Please check the order number and try again.'); }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }, [orderNumber]);

  useEffect(() => {
    if (searchParams.get('order')) handleTrack();
  }, [searchParams, handleTrack]);

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-32 pb-24 px-6 md:px-12" data-testid="track-order-page">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-2">Order Status</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-[#1A1A2E]">Track Your Order</h1>
        </div>
        <form onSubmit={handleTrack} className="flex gap-3 mb-12" data-testid="track-form">
          <Input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="Enter order number (e.g. CZ-250615-ABC123)" className="bg-white border-gray-300 text-[#1A1A2E] flex-1" data-testid="track-input" />
          <button type="submit" disabled={loading} className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-2 px-6 rounded-full hover:bg-[#3395FF] transition-all disabled:opacity-50" data-testid="track-btn"><Search className="w-4 h-4" /></button>
        </form>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 text-center" data-testid="track-error">
            <p className="font-body text-sm text-red-400">{error}</p>
          </div>
        )}
        {order && (
          <div className="space-y-8" data-testid="track-result">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-heading text-xl text-[#1A1A2E] uppercase">{order.order_number}</p>
                  <p className="font-body text-xs text-[#9CA3AF]">Placed {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <span className="font-heading text-lg text-[#007AFF]">
                  {formatCurrencySymbol(order.currency)}{order.total_display}
                </span>
              </div>
              <StatusTimeline status={order.status} />
              {order.tracking_number && (
                <div className="bg-[#FFFDF7] border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#007AFF]" />
                  <div>
                    <p className="font-body text-xs text-[#6B7280]">Tracking Number</p>
                    <p className="font-body text-sm text-[#1A1A2E]">{order.tracking_number}</p>
                  </div>
                </div>
              )}
            </div>
            <OrderItems items={order.items} />
          </div>
        )}
      </div>
    </div>
  );
}
