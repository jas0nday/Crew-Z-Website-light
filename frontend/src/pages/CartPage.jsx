import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/productData';
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CartPage() {
  const { items, currency, setCurrency, updateQuantity, removeItem, cartTotal, cartCount } = useCart();
  const total = cartTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center pt-16" data-testid="cart-empty">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-[#71717A] mx-auto mb-4" />
          <h1 className="font-heading text-4xl text-white uppercase mb-4">Your Cart is Empty</h1>
          <p className="font-body text-[#A1A1AA] mb-8">Add some CrewZ products to get started.</p>
          <Link to="/shop"
            className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-sm hover:bg-[#3395FF] transition-all inline-flex items-center gap-2"
            data-testid="cart-shop-btn">
            SHOP NOW <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6 md:px-12" data-testid="cart-page">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-white">Your Cart</h1>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-28 bg-[#111111] border-white/10 text-white text-sm" data-testid="cart-currency-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-white/10">
              <SelectItem value="USD" className="text-white">USD ($)</SelectItem>
              <SelectItem value="GBP" className="text-white">GBP (&pound;)</SelectItem>
              <SelectItem value="AUD" className="text-white">AUD (A$)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div key={item.slug}
              className="bg-[#111111] border border-white/10 rounded-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              data-testid={`cart-item-${item.slug}`}>
              <div className="flex-1">
                <h3 className="font-heading text-lg text-white uppercase">{item.name}</h3>
                <p className="font-body text-sm text-[#A1A1AA]">{formatPrice(item.price_usd, currency)} each</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    className="w-8 h-8 bg-[#0A0A0A] border border-white/10 rounded-sm flex items-center justify-center text-white hover:border-white/30 transition-colors"
                    data-testid={`qty-minus-${item.slug}`}>
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-body text-white" data-testid={`qty-value-${item.slug}`}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    className="w-8 h-8 bg-[#0A0A0A] border border-white/10 rounded-sm flex items-center justify-center text-white hover:border-white/30 transition-colors"
                    data-testid={`qty-plus-${item.slug}`}>
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="font-heading text-lg text-white min-w-[80px] text-right" data-testid={`item-total-${item.slug}`}>
                  {formatPrice(item.price_usd * item.quantity, currency)}
                </span>
                <button onClick={() => removeItem(item.slug)}
                  className="text-[#71717A] hover:text-red-500 transition-colors"
                  data-testid={`remove-${item.slug}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="font-heading text-lg text-[#A1A1AA] uppercase">Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
            <span className="font-heading text-3xl text-white" data-testid="cart-total">{total.display}</span>
          </div>
          <Link to="/checkout"
            className="w-full bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 rounded-sm hover:bg-[#3395FF] hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all flex items-center justify-center gap-2"
            data-testid="checkout-btn">
            PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-center mt-4 text-xs text-[#71717A] font-body">Secure checkout. International shipping available.</p>
        </div>
      </div>
    </div>
  );
}
