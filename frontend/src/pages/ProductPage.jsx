import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductBySlug, formatPrice } from '@/data/productData';
import { useCart } from '@/context/CartContext';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Check, ArrowRight, Navigation, Activity, MapPin, Heart, Shield, Zap, Gauge, Volume2, Plug, ArrowLeftRight, Radio, LayoutDashboard, Database, Tablet, Bell, Download, Circle } from 'lucide-react';
import { useState } from 'react';

const iconMap = { Navigation, Activity, MapPin, Heart, Shield, Zap, Gauge, Volume2, Plug, ArrowLeftRight, Radio, LayoutDashboard, Database, Tablet, Bell, Download };

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { currency, setCurrency, addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-white uppercase mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-[#007AFF] hover:underline font-body">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12" data-testid="product-hero">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="relative">
            <div className="aspect-[4/3] bg-[#111111] border border-white/10 rounded-sm overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#111111] to-transparent" />
            </div>
            <p className="mt-3 text-xs text-[#71717A] font-body italic">* Product photography placeholder. Final product images coming soon.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-2">{product.target}</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-none mb-3 text-white">
              {product.name}
            </h1>
            <p className="font-heading text-xl text-[#A1A1AA] uppercase tracking-wide mb-6">{product.tagline}</p>
            <p className="font-body text-base text-[#A1A1AA] leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-heading text-3xl text-white" data-testid="product-price">
                {formatPrice(product.price_usd, currency)}
              </span>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-24 bg-[#111111] border-white/10 text-white text-sm" data-testid="currency-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  <SelectItem value="USD" className="text-white">USD</SelectItem>
                  <SelectItem value="GBP" className="text-white">GBP</SelectItem>
                  <SelectItem value="AUD" className="text-white">AUD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <button onClick={handleAddToCart}
                className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-sm hover:bg-[#3395FF] hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all inline-flex items-center gap-2"
                data-testid="add-to-cart-btn">
                {added ? <><Check className="w-4 h-4" /> ADDED</> : <><ShoppingCart className="w-4 h-4" /> ADD TO CART</>}
              </button>
              <Link to="/cart"
                className="bg-transparent text-white border border-white/20 font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-sm hover:border-white hover:bg-white/5 transition-all inline-flex items-center gap-2"
                data-testid="view-cart-btn">
                VIEW CART <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-[#71717A] font-body">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> IP68 Waterproof</span>
              <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> NFC Pairing</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#111111]" data-testid="product-features">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Features</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Built for Performance</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, i) => {
              const Icon = iconMap[feature.icon] || Circle;
              return (
                <motion.div key={feature.title} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm hover:border-[#007AFF]/30 transition-all"
                  data-testid={`feature-card-${i}`}>
                  <Icon className="w-8 h-8 text-[#007AFF] mb-4" />
                  <h3 className="font-heading text-lg uppercase tracking-wide text-white mb-2">{feature.title}</h3>
                  <p className="font-body text-sm text-[#A1A1AA] leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="product-specs">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Specifications</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Tech Specs</h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <Table data-testid="specs-table">
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-[#007AFF] font-heading uppercase tracking-wider text-xs">Specification</TableHead>
                  <TableHead className="text-[#007AFF] font-heading uppercase tracking-wider text-xs">Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.specs.map((spec) => (
                  <TableRow key={spec.label} className="border-white/5">
                    <TableCell className="font-body text-sm text-[#A1A1AA]">{spec.label}</TableCell>
                    <TableCell className="font-body text-sm text-white">{spec.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#111111]" data-testid="product-faq">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">FAQ</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Questions & Answers</h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <Accordion type="single" collapsible className="space-y-2" data-testid="product-faq-accordion">
              {product.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-[#0A0A0A] border border-white/10 rounded-sm px-6">
                  <AccordionTrigger className="font-body text-sm text-white hover:text-[#007AFF] py-4" data-testid={`faq-trigger-${i}`}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-[#A1A1AA] leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Compatibility Note */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-sm text-[#A1A1AA]">
            Compatible with <span className="text-white">iOS 15+</span> and <span className="text-white">Android 11+</span>.
            Works with phones up to 6.7" screen size.
          </p>
        </div>
      </section>
    </div>
  );
}
