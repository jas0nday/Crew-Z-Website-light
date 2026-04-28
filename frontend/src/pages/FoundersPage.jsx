import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Medal, GraduationCap, Flame, Trophy, Award, Star } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };
const slideLeft = { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } };
const slideRight = { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.2 } };

const founderPhotos = [
  { url: 'https://customer-assets.emergentagent.com/job_performance-first-2/artifacts/zsqy72oq_1992%20m4x.JPG', caption: "Men's Quad Scull \u2014 Barcelona 1992 Olympic Games" },
  { url: 'https://customer-assets.emergentagent.com/job_performance-first-2/artifacts/0felq96c_1996%20m2x.JPG', caption: "Men's Double Scull \u2014 Atlanta 1996 Olympic Games" },
  { url: 'https://customer-assets.emergentagent.com/job_performance-first-2/artifacts/q3f60lgj_92-027-19A%20%20DAY.jpg', caption: 'Australian Quad Scull \u2014 International Regatta' },
  { url: 'https://customer-assets.emergentagent.com/job_performance-first-2/artifacts/bfqgoml5_99N12-22%20%20%20DAY.jpg', caption: 'Single Scull \u2014 World Cup Racing' },
  { url: 'https://customer-assets.emergentagent.com/job_performance-first-2/artifacts/ilp2cnxx_Quad%20in%20Rochester.jpg', caption: 'Quad Scull \u2014 Rochester Regatta' },
];

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
];

function FounderHero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12" data-testid="founders-hero">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...slideLeft}>
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">The Founder</p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6 text-[#1A1A2E]">
            Built by a Rower,<br /><span className="text-[#007AFF]">for Rowers.</span>
          </h1>
          <p className="font-body text-xl text-[#6B7280] italic leading-relaxed mb-6">"I've sat in that seat. I know what you need."</p>
          <p className="font-body text-base text-[#6B7280] leading-relaxed">
            After three Olympic Games and 17 years in the Australian Rowing Team, I knew exactly what was missing from every piece of technology I ever used on the water. CrewZ is what I wish I'd had.
          </p>
        </motion.div>
        <motion.div {...slideRight}>
          <div className="relative aspect-[3/4] bg-white border border-gray-200 rounded-xl overflow-hidden">
            <img src="https://customer-assets.emergentagent.com/job_performance-first-2/artifacts/0felq96c_1996%20m2x.JPG" alt="Founder racing at the 1996 Atlanta Olympic Games" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A1628] to-transparent p-6 pt-16">
              <p className="font-heading text-sm text-[#007AFF] uppercase tracking-wider">Atlanta 1996</p>
              <p className="font-body text-xs text-gray-300">Men's Double Scull \u2014 Olympic Games</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white" data-testid="founders-achievements">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Athletic Career</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">Three Olympic Games. 17 Years.</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <motion.div key={item.title} {...fadeUp} className="bg-[#FFFDF7] border border-gray-200 p-6 rounded-xl hover:border-[#007AFF]/30 transition-all" data-testid={`achievement-${item.title.slice(0, 10)}`}>
              <item.icon className="w-8 h-8 text-[#007AFF] mb-3" />
              <h3 className="font-heading text-base uppercase tracking-wide text-[#1A1A2E] mb-1">{item.title}</h3>
              <p className="font-body text-sm text-[#6B7280]">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RacingArchive({ activePhoto, setActivePhoto }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12" data-testid="founders-gallery">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-3">Racing Archive</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A2E]">From the Water</h2>
        </motion.div>
        <motion.div {...fadeUp} className="mb-12">
          <div className="relative aspect-[21/9] bg-white border border-gray-200 rounded-xl overflow-hidden max-w-5xl mx-auto">
            {founderPhotos.map((photo, idx) => (
              <img key={photo.url} src={photo.url} alt={photo.caption} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === activePhoto ? 'opacity-100' : 'opacity-0'}`} />
            ))}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A1628] to-transparent p-6 pt-16">
              <p className="font-body text-sm text-white">{founderPhotos[activePhoto].caption}</p>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {founderPhotos.map((photo, i) => (
              <button key={photo.url} onClick={() => setActivePhoto(i)} className={`w-2 h-2 rounded-full transition-all ${i === activePhoto ? 'bg-[#007AFF] w-6' : 'bg-gray-300 hover:bg-gray-400'}`} data-testid={`gallery-dot-${i}`} />
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {founderPhotos.map((photo, i) => (
            <motion.button key={photo.url} {...fadeUp} onClick={() => setActivePhoto(i)}
              className={`relative aspect-square bg-white border rounded-xl overflow-hidden transition-all ${i === activePhoto ? 'border-[#007AFF] shadow-[0_0_20px_rgba(0,122,255,0.2)]' : 'border-gray-200 hover:border-gray-400'}`} data-testid={`gallery-thumb-${i}`}>
              <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12" data-testid="founders-education">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">Education</p>
            <div className="space-y-6">
              {education.map(ed => (
                <div key={ed.degree}>
                  <h3 className="font-heading text-lg text-[#1A1A2E] uppercase">{ed.degree}</h3>
                  <p className="font-body text-sm text-[#6B7280]">{ed.institution}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#007AFF] font-heading uppercase tracking-[0.2em] text-sm mb-4">The Vision</p>
            <p className="font-body text-base text-[#6B7280] leading-relaxed mb-6">
              Every rowing computer I used during my career had the same limitations: small screens, outdated software, and features designed by people who'd never raced. When smartphones became powerful enough, I saw the opportunity to build something fundamentally different.
            </p>
            <p className="font-body text-base text-[#6B7280] leading-relaxed">
              CrewZ isn't a tech company trying to understand rowing. It's a rowing company that understands technology. Every feature, every metric, every design decision comes from 17 years of elite competition and coaching experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function FoundersPage() {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const totalPhotos = founderPhotos.length;
    const interval = setInterval(() => {
      setActivePhoto(prev => (prev + 1) % totalPhotos);
    }, 5000);
    return () => clearInterval(interval);
    // totalPhotos is derived from module-level constant; runs once on mount
  }, []);

  return (
    <div className="bg-[#FFFDF7]">
      <FounderHero />
      <Achievements />
      <RacingArchive activePhoto={activePhoto} setActivePhoto={setActivePhoto} />
      <EducationSection />
      <section className="py-16 px-6 md:px-12 bg-white" data-testid="founders-social">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-sm text-[#9CA3AF] mb-4">Connect with the founder</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-[#6B7280] hover:text-[#007AFF] transition-colors font-heading text-sm uppercase tracking-wider" data-testid="founder-linkedin">LinkedIn</a>
            <a href="#" className="text-[#6B7280] hover:text-[#007AFF] transition-colors font-heading text-sm uppercase tracking-wider" data-testid="founder-twitter">Twitter / X</a>
          </div>
        </div>
      </section>
    </div>
  );
}
