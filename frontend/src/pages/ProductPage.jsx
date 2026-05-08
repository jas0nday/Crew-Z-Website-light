import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductBySlug, formatPrice, formatSubscriptionPrice } from '@/data/productData';
import { useCart } from '@/context/CartContext';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Check, ArrowRight, Navigation, Activity, MapPin, Heart, Shield, Zap, Gauge, Volume2, Plug, ArrowLeftRight, Radio, LayoutDashboard, Database, Tablet, Bell, Download, Circle } from 'lucide-react';
import { useState } from 'react';

const iconMap = { Navigation, Activity, MapPin, Heart, Shield, Zap, Gauge, Volume2, Plug, ArrowLeftRight, Radio, LayoutDashboard, Database, Tablet, Bell, Download };
const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

function SubscriptionHero({ product, currency, setCurrency, onSelectTier, selectedTier, billingCycle, setBillingCycle, added }) {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12" data-testid="product-hero">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
          <div className="aspect-[4/3] bg-white border border-gray-200 rounded-xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
          </div>
          <p className="mt-3 text-xs text-[#9CA3AF] font-body italic">* Product photography placeholder.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-2">{product.target}</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-none mb-3 text-[#1A1A2E]">{product.name}</h1>
          <p className="font-heading text-lg text-[#6B7280] uppercase tracking-wide mb-4">Subscription only. No hardware needed.</p>
          <p className="font-body text-base text-[#6B7280] leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex bg-gray-100 rounded-full p-1" data-testid="billing-toggle">
              <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-1.5 rounded-full font-heading text-xs uppercase tracking-wider transition-all ${billingCycle === 'monthly' ? 'bg-[#007AFF] text-white' : 'text-[#6B7280]'}`} data-testid="billing-monthly">Monthly</button>
              <button onClick={() => setBillingCycle('annual')} className={`px-4 py-1.5 rounded-full font-heading text-xs uppercase tracking-wider transition-all ${billingCycle === 'annual' ? 'bg-[#007AFF] text-white' : 'text-[#6B7280]'}`} data-testid="billing-annual">Annual <span className="text-[10px]">(save ~2 months)</span></button>
            </div>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-24 bg-white border-gray-300 text-[#1A1A2E] text-sm" data-testid="currency-select"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="USD" className="text-[#1A1A2E]">USD</SelectItem>
                <SelectItem value="GBP" className="text-[#1A1A2E]">GBP</SelectItem>
                <SelectItem value="AUD" className="text-[#1A1A2E]">AUD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 mb-6" data-testid="subscription-tiers">
            {product.subscriptionTiers.map((tier) => {
              const isTBD = tier.price === null;
              const isFree = tier.price === 0;
              const displayPrice = isTBD ? null : billingCycle === 'annual' ? tier.annualPrice : tier.price;
              const isSelected = selectedTier?.id === tier.id;
              return (
                <button key={tier.id} onClick={() => !isTBD && onSelectTier(tier)} disabled={isTBD}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${isSelected ? 'border-[#007AFF] bg-[#007AFF]/5 shadow-md' : isTBD ? 'border-gray-100 bg-gray-50 opacity-60' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  data-testid={`tier-${tier.id}`}>
                  <div className="text-left">
                    <p className="font-heading text-sm text-[#1A1A2E] uppercase">{tier.label}</p>
                    <p className="font-body text-xs text-[#6B7280]">{tier.desc}</p>
                  </div>
                  <div className="text-right">
                    {isTBD ? (
                      <p className="font-heading text-lg text-[#9CA3AF]">TBD</p>
                    ) : isFree ? (
                      <p className="font-heading text-xl text-[#007AFF]">Free</p>
                    ) : (
                      <>
                        <p className="font-heading text-xl text-[#1A1A2E]">{formatSubscriptionPrice(displayPrice, currency)}</p>
                        <p className="font-body text-xs text-[#6B7280]">/{billingCycle === 'annual' ? 'year' : 'month'}</p>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="inline-flex items-center gap-2 bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-xl px-4 py-2 mb-6" data-testid="product-launch-date">
            <span className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
            <span className="font-body text-sm text-[#007AFF]">Available for order from 1 September 2026</span>
          </div>

          <button onClick={() => selectedTier && onSelectTier(selectedTier, true)} disabled={!selectedTier || selectedTier.price === null}
            className="w-full bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-full hover:bg-[#3395FF] hover:shadow-lg hover:shadow-blue-100 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
            data-testid="add-to-cart-btn">
            {added ? <><Check className="w-4 h-4" /> ADDED</> : (
              selectedTier ? (
                selectedTier.price === 0 ? 'SIGN UP FREE' :
                `PRE-ORDER \u2014 ${formatSubscriptionPrice(billingCycle === 'annual' ? selectedTier.annualPrice : selectedTier.price, currency)}/${billingCycle === 'annual' ? 'YR' : 'MO'}`
              ) : 'SELECT A PLAN'
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ProductHero({ product, currency, setCurrency, onAddToCart, added }) {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12" data-testid="product-hero">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
          <div className="aspect-[4/3] bg-white border border-gray-200 rounded-xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
          </div>
          <p className="mt-3 text-xs text-[#9CA3AF] font-body italic">* Product photography placeholder. Final product images coming soon.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-2">{product.target}</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-none mb-3 text-[#1A1A2E]">{product.name}</h1>
          <p className="font-heading text-xl text-[#6B7280] uppercase tracking-wide mb-6">{product.tagline}</p>
          <p className="font-body text-base text-[#6B7280] leading-relaxed mb-8">{product.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-heading text-3xl text-[#1A1A2E]" data-testid="product-price">{formatPrice(product.price_usd, currency)}</span>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-24 bg-white border-gray-300 text-[#1A1A2E] text-sm" data-testid="currency-select"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="USD" className="text-[#1A1A2E]">USD</SelectItem>
                <SelectItem value="GBP" className="text-[#1A1A2E]">GBP</SelectItem>
                <SelectItem value="AUD" className="text-[#1A1A2E]">AUD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-xl px-4 py-2 mb-6" data-testid="product-launch-date">
            <span className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
            <span className="font-body text-sm text-[#007AFF]">Available for order from 1 September 2026</span>
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <button onClick={onAddToCart} className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-full hover:bg-[#3395FF] hover:shadow-lg hover:shadow-blue-100 transition-all inline-flex items-center gap-2" data-testid="add-to-cart-btn">
              {added ? <><Check className="w-4 h-4" /> ADDED</> : <><ShoppingCart className="w-4 h-4" /> PRE-ORDER</>}
            </button>
            <Link to="/cart" className="bg-transparent text-[#1A1A2E] border border-gray-300 font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-full hover:border-[#007AFF] hover:text-[#007AFF] transition-all inline-flex items-center gap-2" data-testid="view-cart-btn">
              VIEW CART <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#9CA3AF] font-body">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> IP68 Waterproof</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> NFC Pairing</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductFeatures({ features }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white" data-testid="product-features">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Features</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">Built for Performance</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] || Circle;
            return (
              <motion.div key={feature.title} {...fadeUp} transition={{ duration: 0.6 }}
                className="bg-[#FFFDF7] border border-gray-200 p-8 rounded-xl hover:border-[#007AFF]/30 transition-all"
                data-testid={`feature-card-${feature.title.toLowerCase().replace(/\s/g, '-')}`}>
                <Icon className="w-8 h-8 text-[#007AFF] mb-4" />
                <h3 className="font-heading text-lg uppercase tracking-wide text-[#1A1A2E] mb-2">{feature.title}</h3>
                <p className="font-body text-sm text-[#6B7280] leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductSpecs({ specs }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12" data-testid="product-specs">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Specifications</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">Tech Specs</h2>
        </motion.div>
        <motion.div {...fadeUp}>
          <Table data-testid="specs-table">
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-[#007AFF] font-heading uppercase tracking-wider text-xs">Specification</TableHead>
                <TableHead className="text-[#007AFF] font-heading uppercase tracking-wider text-xs">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specs.map((spec) => (
                <TableRow key={spec.label} className="border-gray-100">
                  <TableCell className="font-body text-sm text-[#6B7280]">{spec.label}</TableCell>
                  <TableCell className="font-body text-sm text-[#1A1A2E]">{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  );
}

function ProductFAQ({ faqs }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white" data-testid="product-faq">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">FAQ</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">Questions & Answers</h2>
        </motion.div>
        <motion.div {...fadeUp}>
          <Accordion type="single" collapsible className="space-y-2" data-testid="product-faq-accordion">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={`faq-${faq.q.slice(0, 20)}`} className="bg-[#FFFDF7] border border-gray-200 rounded-xl px-6">
                <AccordionTrigger className="font-body text-sm text-[#1A1A2E] hover:text-[#007AFF] py-4">{faq.q}</AccordionTrigger>
                <AccordionContent className="font-body text-sm text-[#6B7280] leading-relaxed pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { currency, setCurrency, addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-[#1A1A2E] uppercase mb-4">Product Not Found</h1>
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

  const handleSelectTier = (tier, addToCart = false) => {
    setSelectedTier(tier);
    if (addToCart && tier.price !== null) {
      const isAnnual = billingCycle === 'annual';
      const slug = isAnnual ? `${tier.id}-annual` : tier.id;
      const price = isAnnual ? tier.annualPrice : tier.price;
      if (tier.price === 0) return; // Free tier — no cart
      addItem({
        slug,
        name: `CrewZ ${tier.label} (${isAnnual ? 'Annual' : 'Monthly'})`,
        price_usd: price,
        isSubscription: true,
        billingCycle: isAnnual ? 'annual' : 'monthly',
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="bg-[#FFFDF7]">
      {product.isSubscription ? (
        <SubscriptionHero product={product} currency={currency} setCurrency={setCurrency} onSelectTier={handleSelectTier} selectedTier={selectedTier} billingCycle={billingCycle} setBillingCycle={setBillingCycle} added={added} />
      ) : (
        <ProductHero product={product} currency={currency} setCurrency={setCurrency} onAddToCart={handleAddToCart} added={added} />
      )}
      <ProductFeatures features={product.features} />
      <ProductSpecs specs={product.specs} />
      <ProductFAQ faqs={product.faqs} />
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-sm text-[#6B7280]">
            Compatible with <span className="text-[#1A1A2E]">iOS 15+</span> and <span className="text-[#1A1A2E]">Android 11+</span>. Works with phones up to 6.7" screen size.
          </p>
        </div>
      </section>
    </div>
  );
}
