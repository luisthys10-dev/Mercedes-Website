'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MercedesStar from './MercedesStar';

const navLinks = [
  { label: 'Modellen', href: '#modellen' },
  { label: 'AMG', href: '#amg' },
  { label: 'Elektrisch', href: '#elektrisch' },
  { label: 'Afspraak', href: '#afspraak' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/[0.06] py-4'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 opacity-90">
              <MercedesStar size={32} opacity={1} rotate={false} />
            </div>
            <div>
              <div className="text-white font-semibold text-sm tracking-wide leading-none">Groep VDH</div>
              <div className="text-[10px] text-white/40 tracking-widest uppercase mt-0.5">Mercedes-Benz</div>
            </div>
          </a>

          {/* Desktop nav — gecentreerd */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+3214848484"
              className="text-[13px] text-white/50 hover:text-white transition-colors duration-200"
            >
              +32 14 84 84 84
            </a>
            <a
              href="#afspraak"
              className="px-5 py-2 text-[13px] font-medium text-white border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-200"
            >
              Afspraak maken
            </a>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden text-white/70 hover:text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-center items-start px-10 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute top-6 right-8 text-white/50 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <X size={22} />
            </button>

            <div className="text-white/20 text-xs uppercase tracking-widest mb-4">Menu</div>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-3xl font-light text-white/80 hover:text-white transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#afspraak"
              className="mt-6 px-6 py-3 border border-white/20 text-white text-sm tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              onClick={() => setMenuOpen(false)}
            >
              Afspraak maken →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
