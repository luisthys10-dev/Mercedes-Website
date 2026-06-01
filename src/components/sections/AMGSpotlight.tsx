'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cars } from '@/data/cars';
import ScrollReveal from '../ui/ScrollReveal';
import MercedesStar from '../ui/MercedesStar';

const amgModels = cars.filter(c => c.category === 'AMG').concat(cars.filter(c => c.slug === 'sl-roadster'));

const stats = [
  { value: '843pk', label: 'Max vermogen' },
  { value: '2,9s', label: 'Snelste 0-100' },
  { value: '325', label: 'Top km/h' },
  { value: 'V8', label: 'Biturbo motor' },
];

export default function AMGSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const starY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section id="amg" ref={ref} className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #050505 60%, #150000 100%)' }}>
      {/* AMG streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              width: '30%',
              top: `${15 + i * 18}%`,
              left: 0,
              background: 'linear-gradient(90deg, transparent, #CC0000, transparent)',
            }}
            animate={{ x: ['-100%', '400%'] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div className="absolute top-1/2 left-0 -translate-y-1/2" style={{ y: starY }}>
        <MercedesStar size={500} opacity={0.03} color="#CC0000" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.4em] mb-4 block" style={{ color: '#CC0000' }}>
              Mercedes-AMG
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
              Born On The<br />
              <span style={{ color: '#ff4444' }}>Racetrack</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              AMG — Automotive Performance. Elke vezel ademt motorsport. Elke seconde telt.
            </p>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 amg-glow"
                style={{ background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.2)' }}
              >
                <div className="font-display text-4xl font-bold mb-1" style={{ color: '#ff4444' }}>{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* AMG Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {amgModels.map((car, i) => (
            <ScrollReveal key={car.id} delay={i * 0.12}>
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{ background: 'rgba(204,0,0,0.04)', border: '1px solid rgba(204,0,0,0.15)' }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0000] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] uppercase tracking-widest px-2.5 py-1 font-bold text-white"
                      style={{ background: 'rgba(204,0,0,0.8)' }}
                    >
                      AMG
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-white">{car.name}</h3>
                  <p className="text-sm" style={{ color: '#ff4444' }}>{car.subtitle}</p>
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(204,0,0,0.2)' }}>
                    <div className="text-sm text-white/70">{car.specs[0]?.value} · {car.specs[1]?.value}</div>
                    <div className="text-xs text-white/40">{car.price}</div>
                  </div>
                  <div className="mt-1 h-0.5 bg-gradient-to-r from-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
