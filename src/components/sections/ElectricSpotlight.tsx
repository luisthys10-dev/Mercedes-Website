'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cars } from '@/data/cars';
import { Zap } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import MercedesStar from '../ui/MercedesStar';

const eqModels = cars.filter(c => c.category === 'Electric');
const facts = [
  { value: '0g', label: 'CO₂ lokaal' },
  { value: '783km', label: 'Max. bereik WLTP' },
  { value: '200kW', label: 'DC laadvermogen' },
  { value: '4', label: 'EQ Modellen' },
];

export default function ElectricSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const starY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="elektrisch" ref={ref} className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #020b1a 0%, #050505 60%, #010810 100%)' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: '#0066CC',
              boxShadow: '0 0 6px #0066CC',
            }}
            animate={{
              y: [0, -80 - Math.random() * 40, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div className="absolute top-1/2 right-0 -translate-y-1/2" style={{ y: starY }}>
        <MercedesStar size={500} opacity={0.03} color="#0066CC" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap size={16} style={{ color: '#0066CC' }} />
              <span className="text-xs uppercase tracking-[0.4em]" style={{ color: '#0066CC' }}>Mercedes-EQ</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
              De Elektrische<br />
              <span style={{ color: '#4a9eff' }}>Toekomst Is Nu</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Mercedes-EQ — de elektrische visie van Mercedes-Benz. Stijlvol, intelligent en emissievrij.
            </p>
          </ScrollReveal>
        </div>

        {/* Facts */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {facts.map((fact, i) => (
              <div
                key={i}
                className="text-center p-6 eq-glow"
                style={{ background: 'rgba(0,102,204,0.06)', border: '1px solid rgba(0,102,204,0.2)' }}
              >
                <div className="font-display text-4xl font-bold mb-1" style={{ color: '#4a9eff' }}>{fact.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{fact.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* EQ Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eqModels.map((car, i) => (
            <ScrollReveal key={car.id} delay={i * 0.1}>
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{ background: 'rgba(0,102,204,0.05)', border: '1px solid rgba(0,102,204,0.15)' }}
              >
                <div className="aspect-video relative overflow-hidden">
                  {car.videoSrc && (
                    <video
                      src={car.videoSrc}
                      muted
                      playsInline
                      loop
                      autoPlay
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                      preload="none"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020b1a] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={12} style={{ color: '#4a9eff' }} />
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#4a9eff' }}>EQ Elektrisch</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{car.name}</h3>
                  <p className="text-sm" style={{ color: '#4a9eff' }}>{car.subtitle}</p>
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,102,204,0.2)' }}>
                    <div className="text-sm text-white/70">{car.specs[1]?.value} bereik</div>
                    <div className="text-xs text-white/40">{car.price}</div>
                  </div>
                  <div className="mt-1 h-0.5 bg-gradient-to-r from-blue-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
