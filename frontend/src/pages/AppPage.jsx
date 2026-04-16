import { motion } from 'framer-motion';
import { Smartphone, RefreshCw, BarChart3, Clock, Download, Settings } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const appFeatures = [
  { icon: BarChart3, title: 'Live Metrics', desc: 'Real-time speed, split, stroke rate, heart rate, and distance on your phone screen.' },
  { icon: Smartphone, title: 'Coach Dashboard', desc: 'Monitor up to 8 boats simultaneously with the Coach view on your tablet.' },
  { icon: Clock, title: 'Session History', desc: 'Every session saved automatically. Review your progress over time.' },
  { icon: Download, title: 'Data Export', desc: 'Download session data as CSV for analysis in your preferred tools.' },
  { icon: RefreshCw, title: 'OTA Updates', desc: 'New features and metrics delivered through app updates. No hardware changes needed.' },
  { icon: Settings, title: 'Device Settings', desc: 'Configure display layout, metric preferences, and alert zones from the app.' },
];

export default function AppPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12" data-testid="app-hero">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">The App</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6 text-white">
              CrewZ <span className="text-[#007AFF]">Companion</span>
            </h1>
            <p className="font-body text-base md:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-8">
              The CrewZ app transforms your smartphone into a professional rowing display. Live metrics, session history, coach dashboard, and over-the-air updates — all in one app.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-[#111111] border border-white/10 rounded-sm py-3 px-6 hover:border-white/30 transition-all inline-flex items-center gap-3" data-testid="app-store-btn">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-[#A1A1AA] font-body">Download on the</p>
                  <p className="text-sm text-white font-heading uppercase">App Store</p>
                </div>
              </a>
              <a href="#" className="bg-[#111111] border border-white/10 rounded-sm py-3 px-6 hover:border-white/30 transition-all inline-flex items-center gap-3" data-testid="play-store-btn">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M3.18 23.78c.44.6 1.24.84 1.97.5l18.63-10.2c.95-.52.95-1.82 0-2.34L5.15.54c-.73-.34-1.53-.1-1.97.5a1.5 1.5 0 00-.18.72V23.06c0 .26.06.5.18.72zM5 3.84L13.6 12 5 20.16V3.84z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-[#A1A1AA] font-body">Get it on</p>
                  <p className="text-sm text-white font-heading uppercase">Google Play</p>
                </div>
              </a>
            </div>
            <p className="mt-4 text-xs text-[#71717A] font-body italic">* App launching alongside hardware. Download links coming soon.</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#111111]" data-testid="app-features">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Your CrewZ Gets Smarter Over Time</h2>
            <p className="font-body text-base text-[#A1A1AA] mt-4 max-w-2xl mx-auto">
              Every app update brings new features, new metrics, and performance improvements. Your CrewZ investment grows in value.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {appFeatures.map((feature, i) => (
              <motion.div key={feature.title} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm hover:border-[#007AFF]/30 transition-all"
                data-testid={`app-feature-${i}`}>
                <feature.icon className="w-8 h-8 text-[#007AFF] mb-4" />
                <h3 className="font-heading text-lg uppercase tracking-wide text-white mb-2">{feature.title}</h3>
                <p className="font-body text-sm text-[#A1A1AA] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Placeholder */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="app-screenshots">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">App Screens</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Live Metrics', 'Coach Dashboard', 'Session History', 'Settings'].map((label, i) => (
              <motion.div key={label} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#111111] border border-white/10 rounded-sm aspect-[9/16] flex items-center justify-center"
                data-testid={`screenshot-${i}`}>
                <div className="text-center px-4">
                  <div className="w-12 h-12 bg-[#007AFF]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Smartphone className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <p className="font-heading text-sm text-white uppercase">{label}</p>
                  <p className="font-body text-xs text-[#71717A] mt-1">Screenshot coming soon</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
