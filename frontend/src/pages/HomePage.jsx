import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, RefreshCw, BarChart3, Zap, Check, X, ArrowRight, Mail } from 'lucide-react';
import { products, formatPrice } from '@/data/productData';
import { useCart } from '@/context/CartContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  const { currency } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch(`${API}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubscribed(true);
      setEmail('');
    } catch {}
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1569406125624-98ee19b01d4a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxyb3dpbmclMjBib2F0fGVufDB8fHx8MTc3NjM1ODI3MHww&ixlib=rb-4.1.0&q=85"
            alt="Rowing on water"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">The Future of Rowing Technology</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6">
              THE ROWING<br />COMPUTER.<br /><span className="text-[#007AFF]">REINVENTED.</span>
            </h1>
            <p className="font-body text-base md:text-lg text-[#A1A1AA] max-w-lg mb-4 leading-relaxed">
              Your smartphone becomes a pro-grade rowing display. Real-time GPS metrics at 25Hz. Over-the-air updates. No obsolete hardware.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-sm px-4 py-2 mb-8" data-testid="launch-date-badge">
              <span className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
              <span className="font-heading text-sm text-[#007AFF] uppercase tracking-wider">Available 1 October 2026</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop"
                className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-sm hover:bg-[#3395FF] hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all inline-flex items-center gap-2"
                data-testid="hero-shop-btn">
                PRE-ORDER NOW <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/technology"
                className="bg-transparent text-white border border-white/20 font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-sm hover:border-white hover:bg-white/5 transition-all"
                data-testid="hero-learn-btn">
                LEARN MORE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="products-section">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">The Lineup</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Three Devices. One Mission.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div key={product.slug} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}>
                <Link to={`/products/${product.slug}`}
                  className="block bg-[#111111] border border-white/10 rounded-sm overflow-hidden hover:border-[#007AFF]/50 hover:shadow-[0_0_30px_rgba(0,122,255,0.1)] hover:-translate-y-1 transition-all duration-300 group"
                  data-testid={`product-card-${product.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[#007AFF] font-heading text-sm uppercase tracking-[0.2em]">{product.target}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-white uppercase mb-2">{product.name}</h3>
                    <p className="font-body text-sm text-[#A1A1AA] mb-4 leading-relaxed">{product.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl text-white">{formatPrice(product.price_usd, currency)}</span>
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

      {/* Differentiators */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#111111]" data-testid="differentiators-section">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">The Advantage</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">Your Phone. Our Technology.</h2>
            <p className="font-body text-base md:text-lg text-[#A1A1AA] max-w-2xl mx-auto">
              Using the athlete's own smartphone means better hardware than any dedicated device on the market.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Smartphone, title: 'Larger Screen', desc: 'Your phone has a bigger, higher-resolution display than any dedicated rowing computer.' },
              { icon: RefreshCw, title: 'OTA Updates', desc: 'New features delivered through the app store. Your CrewZ gets better every month.' },
              { icon: BarChart3, title: 'Metrics You Want', desc: 'Community-driven development. We build the features rowers actually ask for.' },
              { icon: Zap, title: 'No Obsolete Hardware', desc: 'Your phone upgrades every few years. Your CrewZ display evolves with it.' },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm hover:border-[#007AFF]/30 transition-all"
                data-testid={`diff-card-${i}`}>
                <item.icon className="w-8 h-8 text-[#007AFF] mb-4" />
                <h3 className="font-heading text-lg uppercase tracking-wide text-white mb-2">{item.title}</h3>
                <p className="font-body text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="comparison-section">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
              Traditional rowing computers haven't changed in 30 years.
            </h2>
            <p className="font-heading text-2xl md:text-3xl text-[#007AFF] uppercase font-semibold">CrewZ has.</p>
          </motion.div>
          <motion.div {...fadeUp} className="space-y-0">
            {[
              { feature: 'Display', old: 'Small fixed LCD', crewz: 'Your smartphone screen' },
              { feature: 'Software Updates', old: 'Fixed firmware forever', crewz: 'Over-the-air via app store' },
              { feature: 'GPS Refresh Rate', old: '5Hz', crewz: '25Hz multi-constellation' },
              { feature: 'Stroke Detection', old: 'Basic sensor', crewz: '200Hz IMU' },
              { feature: 'New Features', old: 'Buy new hardware', crewz: 'Free app update' },
              { feature: 'Mount System', old: 'Boat-specific bracket', crewz: 'Universal phone case' },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 gap-4 py-4 px-4 ${i % 2 === 0 ? 'bg-[#111111]' : ''} border-b border-white/5`}>
                <span className="font-heading text-sm uppercase tracking-wider text-[#A1A1AA]">{row.feature}</span>
                <span className="font-body text-sm text-[#71717A] flex items-center gap-2"><X className="w-3 h-3 text-red-500 shrink-0" />{row.old}</span>
                <span className="font-body text-sm text-white flex items-center gap-2"><Check className="w-3 h-3 text-[#007AFF] shrink-0" />{row.crewz}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#111111]" data-testid="social-proof-section">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Trusted by Rowers</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-16">What Rowers Are Saying</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Finally, a rowing computer that makes sense. My phone is a better display than anything I've ever mounted on a rigger.", name: "Club Rower", role: "Masters Sculler" },
              { quote: "The Cox version replaced both our GPS and our ageing CoxBox in one device. No rewiring. It just works.", name: "University Cox", role: "Coxed Four" },
              { quote: "Seeing 8 boats on one tablet screen changed how I coach. I can compare crews in real time from the launch.", name: "Head Coach", role: "National Programme" },
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm text-left">
                <p className="font-body text-sm text-[#A1A1AA] leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-heading text-sm text-white uppercase">{t.name}</p>
                  <p className="font-body text-xs text-[#71717A]">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-xs text-[#71717A] font-body">* Placeholder testimonials. Real testimonials coming soon.</p>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="email-capture-section">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <Mail className="w-10 h-10 text-[#007AFF] mx-auto mb-4" />
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">Be First in Line</h2>
            <p className="font-body text-base text-[#A1A1AA] mb-8">
              CrewZ launches 1 October 2026. Sign up for launch updates, early access, and rowing tech insights.
            </p>
            {subscribed ? (
              <div className="bg-[#111111] border border-[#007AFF]/30 p-6 rounded-sm" data-testid="subscribe-success">
                <Check className="w-6 h-6 text-[#007AFF] mx-auto mb-2" />
                <p className="font-body text-white">You're in. We'll keep you posted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3" data-testid="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#111111] border border-white/10 text-white rounded-sm px-4 py-3 font-body text-sm focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all placeholder:text-[#71717A]"
                  data-testid="newsletter-email-input"
                />
                <button type="submit"
                  className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-3 px-8 rounded-sm hover:bg-[#3395FF] hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all"
                  data-testid="newsletter-submit-btn">
                  SUBSCRIBE
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
