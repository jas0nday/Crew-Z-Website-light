import { useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle, HelpCircle, Mail } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const generalFaqs = [
  { q: 'What phones are compatible with CrewZ?', a: 'CrewZ is compatible with most modern smartphones running iOS 15+ or Android 11+. The waterproof case accommodates phones up to 6.7" screen size.' },
  { q: 'How waterproof is CrewZ?', a: 'CrewZ is rated IP68 \u2014 the highest consumer waterproofing standard. It survives full submersion and is designed for capsize scenarios.' },
  { q: 'How long does the battery last?', a: 'The 10Ah battery provides 12+ hours of continuous on-water use. Enough for a full weekend of training without charging.' },
  { q: 'How do I charge CrewZ?', a: 'CrewZ charges via USB-C. A full charge takes approximately 3-4 hours.' },
  { q: 'What is the Bluetooth range?', a: 'Bluetooth 5.0 provides reliable connections up to approximately 100 metres in open water conditions.' },
  { q: 'How do app updates work?', a: 'The CrewZ app updates through the App Store (iOS) or Google Play (Android) like any other app. Hardware firmware updates are delivered over-the-air via Bluetooth.' },
  { q: 'Can I use CrewZ without a phone?', a: 'No \u2014 CrewZ is designed as a companion to your smartphone. Your phone is the display, and CrewZ is the sensor and data hub.' },
  { q: 'Do you ship internationally?', a: 'Yes. We ship worldwide. Shipping costs and delivery times vary by destination.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy for unused products in original packaging. See our Returns Policy page for full details.' },
  { q: 'How do I pair my heart rate belt?', a: 'Any Bluetooth Low Energy (BLE) heart rate belt can be paired through the CrewZ app settings. Just put the belt in pairing mode and select it in the app.' },
];

export default function SupportPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setError('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#FFFDF7]">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12" data-testid="support-hero">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">Support</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6 text-[#1A1A2E]">
              How Can We <span className="text-[#007AFF]">Help?</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white" data-testid="support-faq">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <HelpCircle className="w-10 h-10 text-[#007AFF] mx-auto mb-4" />
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <Accordion type="single" collapsible className="space-y-2" data-testid="support-faq-accordion">
              {generalFaqs.map((faq) => (
                <AccordionItem key={faq.q} value={`faq-${faq.q.slice(0, 20)}`} className="bg-[#FFFDF7] border border-gray-200 rounded-xl px-6">
                  <AccordionTrigger className="font-body text-sm text-[#1A1A2E] hover:text-[#007AFF] py-4" data-testid={`support-faq-${faq.q.slice(0, 15)}`}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-[#6B7280] leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="contact-section">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <Mail className="w-10 h-10 text-[#007AFF] mx-auto mb-4" />
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">Get in Touch</h2>
            <p className="font-body text-base text-[#6B7280] mt-4">Can't find the answer? Send us a message.</p>
          </motion.div>

          {sent ? (
            <motion.div {...fadeUp} className="bg-white border border-[#007AFF]/30 rounded-xl p-8 text-center" data-testid="contact-success">
              <CheckCircle className="w-12 h-12 text-[#007AFF] mx-auto mb-4" />
              <h3 className="font-heading text-xl text-[#1A1A2E] uppercase mb-2">Message Sent</h3>
              <p className="font-body text-sm text-[#6B7280]">We'll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <motion.form {...fadeUp} onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="font-body text-sm text-red-500" data-testid="contact-error">{error}</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs text-[#6B7280] uppercase tracking-wider mb-1">Name *</label>
                  <Input value={form.name} onChange={update('name')} required
                    className="bg-white border-gray-300 text-[#1A1A2E]" data-testid="contact-name" />
                </div>
                <div>
                  <label className="block font-body text-xs text-[#6B7280] uppercase tracking-wider mb-1">Email *</label>
                  <Input type="email" value={form.email} onChange={update('email')} required
                    className="bg-white border-gray-300 text-[#1A1A2E]" data-testid="contact-email" />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs text-[#6B7280] uppercase tracking-wider mb-1">Subject *</label>
                <Input value={form.subject} onChange={update('subject')} required
                  className="bg-white border-gray-300 text-[#1A1A2E]" data-testid="contact-subject" />
              </div>
              <div>
                <label className="block font-body text-xs text-[#6B7280] uppercase tracking-wider mb-1">Message *</label>
                <Textarea value={form.message} onChange={update('message')} required rows={5}
                  className="bg-white border-gray-300 text-[#1A1A2E] resize-none" data-testid="contact-message" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 rounded-full hover:bg-[#3395FF] hover:shadow-lg hover:shadow-blue-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                data-testid="contact-submit-btn">
                {loading ? 'SENDING...' : <><Send className="w-4 h-4" /> SEND MESSAGE</>}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
