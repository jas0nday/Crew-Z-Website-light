import { createContext, useContext, useState, useEffect } from 'react';
import { CURRENCY_RATES, CURRENCY_SYMBOLS } from '@/data/productData';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('crewz-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    localStorage.setItem('crewz-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.slug === product.slug);
      if (existing) {
        return prev.map(i => i.slug === product.slug ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { slug: product.slug, name: product.name, price_usd: product.price_usd, quantity }];
    });
  };

  const removeItem = (slug) => setItems(prev => prev.filter(i => i.slug !== slug));

  const updateQuantity = (slug, quantity) => {
    if (quantity <= 0) return removeItem(slug);
    setItems(prev => prev.map(i => i.slug === slug ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const cartTotal = () => {
    const totalUsd = items.reduce((sum, i) => sum + i.price_usd * i.quantity, 0);
    const rate = CURRENCY_RATES[currency] || 1;
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    return { totalUsd, display: `${symbol}${Math.round(totalUsd * rate)}` };
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, currency, setCurrency, addItem, removeItem, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}
