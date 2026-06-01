'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import MercedesStar from '../ui/MercedesStar';

const headline1 = 'RIJD HET BESTE';
const headline2 = 'OF NIETS.';

function TypewriterText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={`${className} ${!done ? 'typewriter-cursor' : ''}`}>
      {displayed}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Parallax background video */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
          src="/videos/01-amg-gt-4-deurs.mp4"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </motion.div>

      {/* Rotating star watermark */}
      <MercedesStar
        size={600}
        opacity={0.04}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span
            className="text-xs uppercase tracking-[0.4em] font-medium"
            style={{ color: '#C9A84C' }}
          >
            Welkom bij Groep VDH · Herentals
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <TypewriterText text={headline1} delay={800} />
        </motion.h1>

        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-8"
          style={{ color: '#C9A84C' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <TypewriterText text={headline2} delay={1600} />
        </motion.h1>

        <motion.div
          className="gold-line my-6 max-w-xs mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 3, ease: 'easeOut' }}
        />

        <motion.p
          className="text-white/60 text-lg italic font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          Officieel Mercedes-Benz dealer · Herentals
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          <a
            href="#modellen"
            className="px-8 py-4 text-black font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
          >
            Ontdek Onze Modellen
          </a>
          <a
            href="#afspraak"
            className="px-8 py-4 border border-white/30 text-white font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:border-white hover:bg-white/5"
          >
            Maak een Afspraak
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom info */}
      <motion.div
        className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <div className="flex items-center gap-2 text-white/50 text-xs">
          <MapPin size={12} style={{ color: '#C9A84C' }} />
          <span>Herentals, België</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-xs">
          <Phone size={12} style={{ color: '#C9A84C' }} />
          <span>+32 (0)14 84 84 84</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}>
          <ChevronDown className="text-white/40" size={28} />
        </motion.div>
      </motion.div>
    </div>
  );
}
