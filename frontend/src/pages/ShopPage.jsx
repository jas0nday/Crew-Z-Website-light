import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { products, formatPrice } from '@/data/productData';
import { useCart } from '@/context/CartContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function ShopPage() {
  const { currency, setCurrency, addItem } = useCart();

  return (
    <div className="bg-[#FFFDF7] min-h-screen pt-32 pb-24 px-6 md:px-12" data-testid="shop-page">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
          <div>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-2">Shop</p>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold uppercase tracking-tighter text-[#1A1A2E]">The CrewZ Range</h1>
            <div className="inline-flex items-center gap-2 bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-xl px-4 py-2 mt-4" data-testid="shop-launch-date">
              <span className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
              <span className="font-body text-sm text-[#007AFF]">Available for order from 1 October 2026</span>
            </div>
          </div>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-28 bg-white border-gray-300 text-[#1A1A2E] text-sm" data-testid="shop-currency-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="USD" className="text-[#1A1A2E]">USD ($)</SelectItem>
              <SelectItem value="GBP" className="text-[#1A1A2E]">GBP (&pound;)</SelectItem>
              <SelectItem value="AUD" className="text-[#1A1A2E]">AUD (A$)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div key={product.slug} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#007AFF]/50 hover:shadow-lg transition-all group"
              data-testid={`shop-product-${product.slug}`}>
              <Link to={`/products/${product.slug}`} className="block">
                <div className="relative h-56 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/products/${product.slug}`}>
                  <h2 className="font-heading text-2xl font-bold text-[#1A1A2E] uppercase mb-1">{product.name}</h2>
                  <p className="font-heading text-sm text-[#007AFF] uppercase tracking-wider mb-3">{product.target}</p>
                </Link>
                <p className="font-body text-sm text-[#6B7280] mb-6 leading-relaxed">{product.shortDesc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl text-[#1A1A2E]" data-testid={`price-${product.slug}`}>
                    {formatPrice(product.price_usd, currency)}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => addItem(product)}
                      className="bg-[#007AFF] text-white p-3 rounded-full hover:bg-[#3395FF] transition-all"
                      data-testid={`add-cart-${product.slug}`}>
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <Link to={`/products/${product.slug}`}
                      className="bg-transparent text-[#1A1A2E] border border-gray-300 p-3 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
                      data-testid={`view-${product.slug}`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-body text-sm text-[#9CA3AF]">
            Free international shipping. All prices exclude local taxes where applicable.
          </p>
        </div>
      </div>
    </div>
  );
}
