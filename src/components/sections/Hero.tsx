'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen min-h-[680px] overflow-hidden flex items-center">
      {/* Video */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover scale-110"
          src="/videos/01-amg-gt-4-deurs.mp4"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-8 md:px-16 lg:px-24 max-w-3xl"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Officieel Mercedes-Benz dealer · Herentals
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Het beste.<br />Of niets.
        </motion.h1>

        <motion.p
          className="text-white/50 text-base font-light mb-10 max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Ontdek het volledige Mercedes-Benz gamma bij uw officiële dealer in Herentals.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a
            href="#modellen"
            className="px-8 py-3.5 bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-colors duration-200"
          >
            Ontdek modellen
          </a>
          <a
            href="#afspraak"
            className="px-8 py-3.5 border border-white/25 text-white text-sm font-medium tracking-wide hover:border-white/60 hover:bg-white/5 transition-all duration-200"
          >
            Afspraak maken
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-white/30" size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
}
