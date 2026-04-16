import { motion } from 'framer-motion';
import { Smartphone, RefreshCw, Bluetooth, Droplets, Battery, Satellite } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const sections = [
  {
    icon: Smartphone,
    title: 'Smartphone-First Architecture',
    subtitle: 'Why your phone is the best display ever put in a rowing shell',
    content: 'Traditional rowing computers use small, fixed LCD screens with limited resolution and no touch capability. CrewZ takes a fundamentally different approach: your smartphone IS the display. That means a 6" high-resolution touchscreen, intuitive app interface, and all the processing power of a modern phone — used as the front end for our purpose-built hardware.',
    highlight: 'Your phone already has the best screen on the water. We just give it the data.'
  },
  {
    icon: RefreshCw,
    title: 'Over-the-Air Updates',
    subtitle: 'Your CrewZ gets better over time',
    content: 'With traditional devices, the features you get on day one are the features you have forever — unless you buy a new device. CrewZ delivers new features, new metrics, and performance improvements through app store updates. New stroke analysis algorithm? App update. Heart rate zone display? App update. Your hardware investment gets more valuable over time, not less.',
    highlight: 'No planned obsolescence. Just continuous improvement.'
  },
  {
    icon: Bluetooth,
    title: 'BLE 5.0 Connectivity',
    subtitle: 'Seamless wireless connection',
    content: 'CrewZ uses Bluetooth Low Energy 5.0 for a reliable, power-efficient connection between the hardware unit and your smartphone. NFC tap-to-pair means you\'re connected in under 2 seconds — no menus, no scanning, no fumbling with wet hands. The CrewZ Coach unit can simultaneously connect to up to 8 devices for real-time multi-boat coaching.',
    highlight: 'Tap. Connect. Row.'
  },
  {
    icon: Droplets,
    title: 'IP68 Waterproofing',
    subtitle: 'Designed for capsize survival',
    content: 'CrewZ is rated IP68 — the highest consumer waterproofing standard. It\'s not just splash-resistant; it\'s designed to survive full submersion. Rain, spray, capsize — CrewZ keeps working. The sealed enclosure protects both the electronics and your phone, giving you confidence in any conditions.',
    highlight: 'Submerge it. Fish it out. Keep rowing.'
  },
  {
    icon: Battery,
    title: 'Battery Life',
    subtitle: '12+ hours on a single charge',
    content: 'The 10Ah battery in every CrewZ unit provides over 12 hours of continuous on-water use. That\'s enough for a full weekend of training — or an entire regatta — without charging. Traditional devices often provide 6-8 hours. CrewZ outlasts everything on the market.',
    highlight: 'Charge it Friday. Race all weekend.'
  },
  {
    icon: Satellite,
    title: '25Hz GPS Accuracy',
    subtitle: 'Multi-constellation, five times faster',
    content: 'CrewZ uses a SAM-M10Q GPS receiver running at 25Hz with multi-constellation support (GPS, GLONASS, Galileo, BeiDou). Most traditional rowing devices run at 5Hz — updating position just five times per second. At 25Hz, CrewZ captures speed changes within individual strokes, giving you smoother, more accurate split data than any competing device.',
    highlight: '25 position updates per second. Every stroke captured.'
  },
];

export default function TechnologyPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 overflow-hidden" data-testid="tech-hero">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1491911923017-19f90d8d7f83?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwyfHxyb3dpbmclMjBib2F0fGVufDB8fHx8MTc3NjM1ODI3MHww&ixlib=rb-4.1.0&q=85"
            alt="Rowing boat overhead" className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">Technology</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6 text-white">
              The Tech Behind <span className="text-[#007AFF]">CrewZ</span>
            </h1>
            <p className="font-body text-base md:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              A purpose-built rowing computer that leverages the smartphone you already carry. Here's how it works — explained for rowers, not engineers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technology Sections */}
      {sections.map((section, i) => (
        <section key={section.title}
          className={`py-24 md:py-32 px-6 md:px-12 ${i % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#111111]'}`}
          data-testid={`tech-section-${i}`}>
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                <section.icon className="w-12 h-12 text-[#007AFF] mb-4" />
                <h2 className="font-heading text-2xl md:text-3xl font-semibold uppercase tracking-normal text-white mb-2">
                  {section.title}
                </h2>
                <p className="font-heading text-sm uppercase tracking-wider text-[#007AFF]">{section.subtitle}</p>
              </div>
              <div className="lg:col-span-8">
                <p className="font-body text-base text-[#A1A1AA] leading-relaxed mb-6">{section.content}</p>
                <div className="bg-[#007AFF]/10 border-l-2 border-[#007AFF] pl-6 py-3">
                  <p className="font-body text-sm text-white font-medium">{section.highlight}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
