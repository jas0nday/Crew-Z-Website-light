import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { products, formatPrice, formatSubscriptionPrice } from '@/data/productData';
import { useCart } from '@/context/CartContext';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const productFeatures = [
  { feature: 'GPS Speed & Split', speed: true, cox: true, coach: false },
  { feature: 'Stroke Rate (200Hz)', speed: true, cox: true, coach: false },
  { feature: 'Distance Tracking', speed: true, cox: true, coach: false },
  { feature: 'Heart Rate (BLE)', speed: true, cox: true, coach: false },
  { feature: 'Integrated Amplifier', speed: false, cox: true, coach: false },
  { feature: 'Speaker Harness Compatible', speed: false, cox: true, coach: false },
  { feature: 'Multi-Boat Streaming (x8)', speed: false, cox: false, coach: true },
  { feature: 'Live Coach Dashboard', speed: false, cox: false, coach: true },
  { feature: 'Session Data Export', speed: false, cox: false, coach: true },
  { feature: 'IP68 Waterproof', speed: true, cox: true, coach: true },
  { feature: 'NFC Tap-to-Pair', speed: true, cox: true, coach: true },
  { feature: 'OTA Firmware Updates', speed: true, cox: true, coach: true },
];

const vsTraditional = [
  { feature: 'Display', traditional: 'Small fixed LCD', crewz: 'Your smartphone (up to 6.7")' },
  { feature: 'Software Updates', traditional: 'Fixed firmware', crewz: 'Over-the-air via app store' },
  { feature: 'GPS Refresh Rate', traditional: '5Hz single constellation', crewz: '25Hz multi-constellation' },
  { feature: 'Stroke Detection', traditional: 'Basic magnet sensor', crewz: '200Hz IMU' },
  { feature: 'New Features', traditional: 'Buy new hardware', crewz: 'Free app update' },
  { feature: 'Mount System', traditional: 'Boat-specific bracket', crewz: 'Universal phone case' },
  { feature: 'Battery Life', traditional: '6-8 hours typical', crewz: '12+ hours' },
  { feature: 'Heart Rate', traditional: 'Separate display required', crewz: 'Integrated on phone screen' },
  { feature: 'Coach View', traditional: 'Not available', crewz: '8 boats simultaneously' },
  { feature: 'Pairing', traditional: 'Button + menu', crewz: 'NFC tap (2 seconds)' },
];

export default function ComparePage() {
  const { currency } = useCart();

  return (
    <div className="bg-[#FFFDF7]">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12" data-testid="compare-hero">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">Compare</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6 text-[#1A1A2E]">
              Find Your <span className="text-[#007AFF]">CrewZ</span>
            </h1>
            <p className="font-body text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto">
              Three products, one platform. Compare features to find the right CrewZ for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Comparison */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white" data-testid="product-comparison">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">Speed vs Cox vs Coach</h2>
          </motion.div>
          <motion.div {...fadeUp} className="overflow-x-auto">
            <Table data-testid="product-compare-table">
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-[#6B7280] font-heading uppercase tracking-wider text-xs min-w-[200px]">Feature</TableHead>
                  {products.map(p => (
                    <TableHead key={p.slug} className="text-center font-heading uppercase tracking-wider text-xs min-w-[140px]">
                      <Link to={`/products/${p.slug}`} className="text-[#007AFF] hover:text-[#3395FF] transition-colors">
                        {p.name}
                      </Link>
                      <div className="text-[#1A1A2E] text-lg mt-1">
                        {p.isSubscription ? <><span className="text-xs text-[#6B7280]">Free — </span>$50<span className="text-xs text-[#6B7280]">/mo</span></> : formatPrice(p.price_usd, currency)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {productFeatures.map((row) => (
                  <TableRow key={row.feature} className="border-gray-100">
                    <TableCell className="font-body text-sm text-[#6B7280]">{row.feature}</TableCell>
                    {['speed', 'cox', 'coach'].map(slug => (
                      <TableCell key={slug} className="text-center">
                        {row[slug]
                          ? <Check className="w-4 h-4 text-[#007AFF] mx-auto" />
                          : <X className="w-4 h-4 text-[#9CA3AF] mx-auto" />
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow className="border-gray-200">
                  <TableCell className="font-heading text-sm text-[#1A1A2E] uppercase">Target User</TableCell>
                  {products.map(p => (
                    <TableCell key={p.slug} className="text-center font-body text-xs text-[#6B7280]">{p.target}</TableCell>
                  ))}
                </TableRow>
                <TableRow className="border-gray-200">
                  <TableCell />
                  {products.map(p => (
                    <TableCell key={p.slug} className="text-center">
                      <Link to={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1 text-[#007AFF] font-heading uppercase tracking-widest text-xs hover:text-[#3395FF] transition-colors"
                        data-testid={`compare-shop-${p.slug}`}>
                        SHOP <ArrowRight className="w-3 h-3" />
                      </Link>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </section>

      {/* vs Traditional */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="vs-traditional">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E] mb-4">
              CrewZ vs Traditional Rowing Computers
            </h2>
            <p className="font-body text-base text-[#6B7280]">
              Traditional rowing computers haven't changed in 30 years. Here's how CrewZ compares.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="overflow-x-auto">
            <Table data-testid="traditional-compare-table">
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-[#6B7280] font-heading uppercase tracking-wider text-xs min-w-[160px]">Feature</TableHead>
                  <TableHead className="text-[#9CA3AF] font-heading uppercase tracking-wider text-xs min-w-[200px]">Traditional Device</TableHead>
                  <TableHead className="text-[#007AFF] font-heading uppercase tracking-wider text-xs min-w-[200px]">CrewZ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vsTraditional.map((row) => (
                  <TableRow key={row.feature} className="border-gray-100">
                    <TableCell className="font-body text-sm text-[#6B7280]">{row.feature}</TableCell>
                    <TableCell className="font-body text-sm text-[#9CA3AF]">{row.traditional}</TableCell>
                    <TableCell className="font-body text-sm text-[#1A1A2E]">{row.crewz}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
