import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, RefreshCw, BarChart3, Zap, Check, X, ArrowRight, Mail } from 'lucide-react';
import { products, formatPrice, formatSubscriptionPrice } from '@/data/productData';
import { useCart } from '@/context/CartContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0">
        <img src="https://customer-assets.emergentagent.com/job_performance-first-2/artifacts/q3f60lgj_92-027-19A%20%20DAY.jpg" alt="Australian Quad Scull racing at international regatta" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/80 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">The Future of Rowing Technology</p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6 text-white">
            THE ROWING<br />COMPUTER.<br /><span className="text-[#007AFF]">REINVENTED.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-gray-300 max-w-lg mb-4 leading-relaxed">
            Your smartphone becomes a pro-grade rowing display. Real-time GPS metrics at 25Hz. Over-the-air updates. No obsolete hardware.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#007AFF]/20 border border-[#007AFF]/40 rounded-xl px-4 py-2 mb-8" data-testid="launch-date-badge">
            <span className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
            <span className="font-heading text-sm text-white uppercase tracking-wider">Available 1 September 2026</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-full hover:bg-[#3395FF] hover:shadow-lg hover:shadow-blue-100 transition-all inline-flex items-center gap-2" data-testid="hero-shop-btn">
              PRE-ORDER NOW <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/technology" className="bg-white/10 text-white border border-white/30 font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-full hover:bg-white/20 transition-all" data-testid="hero-learn-btn">
              LEARN MORE
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCards({ currency }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12" data-testid="products-section">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">The Lineup</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">Three Devices. One Mission.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div key={product.slug} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}>
              <Link to={`/products/${product.slug}`} className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#007AFF]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group shadow-sm" data-testid={`product-card-${product.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[#007AFF] font-heading text-sm uppercase tracking-[0.2em]">{product.target}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-[#1A1A2E] uppercase mb-2">{product.name}</h3>
                  <p className="font-body text-sm text-[#6B7280] mb-4 leading-relaxed">{product.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xl text-[#1A1A2E]">
                      {product.isSubscription ? 'Free — $50/mo' : formatPrice(product.price_usd, currency)}
                    </span>
                    <span className="text-[#007AFF] font-heading uppercase tracking-widest text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      PRE-ORDER <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  const items = [
    { icon: Smartphone, title: 'Larger Screen', desc: 'Your phone has a bigger, higher-resolution display than any dedicated rowing computer.' },
    { icon: RefreshCw, title: 'OTA Updates', desc: 'New features delivered through the app store. Your CrewZ gets better every month.' },
    { icon: BarChart3, title: 'Metrics You Want', desc: 'Community-driven development. We build the features rowers actually ask for.' },
    { icon: Zap, title: 'No Obsolete Hardware', desc: 'Your phone upgrades every few years. Your CrewZ display evolves with it.' },
  ];
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white" data-testid="differentiators-section">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">The Advantage</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E] mb-4">Your Phone. Our Technology.</h2>
          <p className="font-body text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto">Using the athlete's own smartphone means better hardware than any dedicated device on the market.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <motion.div key={item.title} {...fadeUp} className="bg-[#FFFDF7] border border-gray-200 p-8 rounded-xl hover:border-[#007AFF]/30 transition-all" data-testid={`diff-card-${item.title.toLowerCase().replace(/\s/g, '-')}`}>
              <item.icon className="w-8 h-8 text-[#007AFF] mb-4" />
              <h3 className="font-heading text-lg uppercase tracking-wide text-[#1A1A2E] mb-2">{item.title}</h3>
              <p className="font-body text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    { feature: 'Display', old: 'Small fixed LCD', crewz: 'Your smartphone screen' },
    { feature: 'Software Updates', old: 'Fixed firmware forever', crewz: 'Over-the-air via app store' },
    { feature: 'GPS Refresh Rate', old: '5Hz', crewz: '25Hz multi-constellation' },
    { feature: 'Stroke Detection', old: 'Basic sensor', crewz: '200Hz IMU' },
    { feature: 'New Features', old: 'Buy new hardware', crewz: 'Free app update' },
    { feature: 'Mount System', old: 'Boat-specific bracket', crewz: 'Universal phone case' },
  ];
  return (
    <section className="py-24 md:py-32 px-6 md:px-12" data-testid="comparison-section">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E] mb-4">Traditional rowing computers haven't changed in 30 years.</h2>
          <p className="font-heading text-2xl md:text-3xl text-[#007AFF] uppercase font-semibold">CrewZ has.</p>
        </motion.div>
        <motion.div {...fadeUp} className="space-y-0">
          {rows.map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-3 gap-4 py-4 px-4 ${i % 2 === 0 ? 'bg-white' : ''} border-b border-gray-100`}>
              <span className="font-heading text-sm uppercase tracking-wider text-[#6B7280]">{row.feature}</span>
              <span className="font-body text-sm text-[#9CA3AF] flex items-center gap-2"><X className="w-3 h-3 text-red-500 shrink-0" />{row.old}</span>
              <span className="font-body text-sm text-[#1A1A2E] flex items-center gap-2"><Check className="w-3 h-3 text-[#007AFF] shrink-0" />{row.crewz}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  const testimonials = [
    { quote: "Finally, a rowing computer that makes sense. My phone is a better display than anything I've ever mounted on a rigger.", name: "Club Rower", role: "Masters Sculler" },
    { quote: "The Cox version replaced both our GPS and our ageing CoxBox in one device. No rewiring. It just works.", name: "University Cox", role: "Coxed Four" },
    { quote: "Seeing 8 boats on one tablet screen changed how I coach. I can compare crews in real time from the launch.", name: "Head Coach", role: "National Programme" },
  ];
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white" data-testid="social-proof-section">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Trusted by Rowers</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E] mb-16">What Rowers Are Saying</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <motion.div key={t.name} {...fadeUp} className="bg-[#FFFDF7] border border-gray-200 p-8 rounded-xl text-left">
              <p className="font-body text-sm text-[#6B7280] leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <p className="font-heading text-sm text-[#1A1A2E] uppercase">{t.name}</p>
                <p className="font-body text-xs text-[#9CA3AF]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-xs text-[#9CA3AF] font-body">* Placeholder testimonials. Real testimonials coming soon.</p>
      </div>
    </section>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setError('');
    try {
      await fetch(`${API}/newsletter`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      setSubscribed(true);
      setEmail('');
    } catch {
      setError('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12" data-testid="email-capture-section">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <Mail className="w-10 h-10 text-[#007AFF] mx-auto mb-4" />
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E] mb-4">Be First in Line</h2>
          <p className="font-body text-base text-[#6B7280] mb-8">CrewZ launches 1 September 2026. Sign up for launch updates, early access, and rowing tech insights.</p>
          {subscribed ? (
            <div className="bg-white border border-[#007AFF]/30 p-6 rounded-xl" data-testid="subscribe-success">
              <Check className="w-6 h-6 text-[#007AFF] mx-auto mb-2" />
              <p className="font-body text-[#1A1A2E]">You're in. We'll keep you posted.</p>
            </div>
          ) : (
            <>
              {error && <p className="font-body text-sm text-red-500 mb-4" data-testid="subscribe-error">{error}</p>}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3" data-testid="newsletter-form">
                <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-gray-200 text-[#1A1A2E] rounded-xl px-4 py-3 font-body text-sm focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all placeholder:text-[#9CA3AF]"
                  data-testid="newsletter-email-input" />
                <button type="submit" className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-3 px-8 rounded-full hover:bg-[#3395FF] hover:shadow-lg hover:shadow-blue-100 transition-all" data-testid="newsletter-submit-btn">SUBSCRIBE</button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { currency } = useCart();
  return (
    <div>
      <HeroSection />
      <ProductCards currency={currency} />
      <Differentiators />
      <ComparisonSection />
      <SocialProof />
      <EmailCapture />
    </div>
  );
}
