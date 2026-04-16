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
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-24 px-6 md:px-12" data-testid="shop-page">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
          <div>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-2">Shop</p>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold uppercase tracking-tighter text-white">The CrewZ Range</h1>
          </div>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-28 bg-[#111111] border-white/10 text-white text-sm" data-testid="shop-currency-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-white/10">
              <SelectItem value="USD" className="text-white">USD ($)</SelectItem>
              <SelectItem value="GBP" className="text-white">GBP (&pound;)</SelectItem>
              <SelectItem value="AUD" className="text-white">AUD (A$)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div key={product.slug} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#111111] border border-white/10 rounded-sm overflow-hidden hover:border-[#007AFF]/50 hover:shadow-[0_0_30px_rgba(0,122,255,0.1)] transition-all group"
              data-testid={`shop-product-${product.slug}`}>
              <Link to={`/products/${product.slug}`} className="block">
                <div className="relative h-56 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                </div>
              </Link>
              <div className="p-6">
                <Link to={`/products/${product.slug}`}>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase mb-1">{product.name}</h2>
                  <p className="font-heading text-sm text-[#007AFF] uppercase tracking-wider mb-3">{product.target}</p>
                </Link>
                <p className="font-body text-sm text-[#A1A1AA] mb-6 leading-relaxed">{product.shortDesc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl text-white" data-testid={`price-${product.slug}`}>
                    {formatPrice(product.price_usd, currency)}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => addItem(product)}
                      className="bg-[#007AFF] text-white p-3 rounded-sm hover:bg-[#3395FF] transition-all"
                      data-testid={`add-cart-${product.slug}`}>
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <Link to={`/products/${product.slug}`}
                      className="bg-transparent text-white border border-white/20 p-3 rounded-sm hover:border-white hover:bg-white/5 transition-all"
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
          <p className="font-body text-sm text-[#71717A]">
            Free international shipping. All prices exclude local taxes where applicable.
          </p>
        </div>
      </div>
    </div>
  );
}
