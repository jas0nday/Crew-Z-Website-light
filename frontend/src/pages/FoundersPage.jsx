import { motion } from 'framer-motion';
import { Medal, GraduationCap, Flame, Trophy, Award, Star } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const achievements = [
  { icon: Medal, title: 'Australian Olympic Team Member', detail: 'Barcelona 1992, Atlanta 1996, Sydney 2000' },
  { icon: Trophy, title: 'Australian Rowing Team', detail: '13 selections, 1988 to 2005' },
  { icon: Award, title: 'AIS Scholarship Holder', detail: 'Australian Institute of Sport \u2014 1990, 1991, 1992, 2000, 2003' },
  { icon: Star, title: 'Australian Rowing Team Captain', detail: '2005' },
  { icon: Flame, title: 'Olympic Torch Bearer', detail: 'Sydney 2000' },
  { icon: GraduationCap, title: 'RMIT University Blue', detail: '1994' },
];

const education = [
  { degree: 'MBA in Entrepreneurial Management', institution: 'Australian Institute of Management' },
  { degree: 'Bachelor of Commerce', institution: 'Deakin University' },
];

export default function FoundersPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12" data-testid="founders-hero">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">The Founder</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6 text-white">
              Built by a Rower,<br /><span className="text-[#007AFF]">for Rowers.</span>
            </h1>
            <p className="font-body text-xl text-[#A1A1AA] italic leading-relaxed mb-6">
              "I've sat in that seat. I know what you need."
            </p>
            <p className="font-body text-base text-[#A1A1AA] leading-relaxed">
              After three Olympic Games and 17 years in the Australian Rowing Team, I knew exactly what was missing from every piece of technology I ever used on the water. CrewZ is what I wish I'd had.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="relative aspect-[3/4] bg-[#111111] border border-white/10 rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1501117251959-59533d62881e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxyb3dpbmclMjBjb2FjaCUyMHdhdGVyfGVufDB8fHx8MTc3NjM1ODI2M3ww&ixlib=rb-4.1.0&q=85"
                alt="Founder on water" className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#111111] to-transparent" />
            </div>
            <p className="mt-3 text-xs text-[#71717A] font-body italic">* Professional photo placeholder</p>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#111111]" data-testid="founders-achievements">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Athletic Career</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Three Olympic Games. 17 Years.</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm hover:border-[#007AFF]/30 transition-all"
                data-testid={`achievement-${i}`}>
                <item.icon className="w-8 h-8 text-[#007AFF] mb-3" />
                <h3 className="font-heading text-base uppercase tracking-wide text-white mb-1">{item.title}</h3>
                <p className="font-body text-sm text-[#A1A1AA]">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Narrative */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="founders-education">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">Education</p>
              <div className="space-y-6">
                {education.map(ed => (
                  <div key={ed.degree}>
                    <h3 className="font-heading text-lg text-white uppercase">{ed.degree}</h3>
                    <p className="font-body text-sm text-[#A1A1AA]">{ed.institution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">The Vision</p>
              <p className="font-body text-base text-[#A1A1AA] leading-relaxed mb-6">
                Every rowing computer I used during my career had the same limitations: small screens, outdated software, and features designed by people who'd never raced. When smartphones became powerful enough, I saw the opportunity to build something fundamentally different.
              </p>
              <p className="font-body text-base text-[#A1A1AA] leading-relaxed">
                CrewZ isn't a tech company trying to understand rowing. It's a rowing company that understands technology. Every feature, every metric, every design decision comes from 17 years of elite competition and coaching experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Links Placeholder */}
      <section className="py-16 px-6 md:px-12 bg-[#111111]" data-testid="founders-social">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-sm text-[#71717A] mb-4">Connect with the founder</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-[#A1A1AA] hover:text-[#007AFF] transition-colors font-heading text-sm uppercase tracking-wider" data-testid="founder-linkedin">
              LinkedIn
            </a>
            <a href="#" className="text-[#A1A1AA] hover:text-[#007AFF] transition-colors font-heading text-sm uppercase tracking-wider" data-testid="founder-twitter">
              Twitter / X
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
