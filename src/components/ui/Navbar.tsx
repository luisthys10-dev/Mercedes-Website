'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import MercedesStar from './MercedesStar';

const navLinks = [
  { label: 'Alle Modellen', href: '#modellen' },
  { label: 'AMG', href: '#amg' },
  { label: 'Elektrisch', href: '#elektrisch' },
  { label: "SUV's", href: '#modellen' },
  { label: 'Afspraak', href: '#afspraak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10">
              <MercedesStar size={40} opacity={1} rotate={false} />
            </div>
            <div>
              <div className="font-display text-white font-bold text-lg leading-none">Groep VDH</div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: '#C9A84C' }}>Mercedes-Benz</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 relative group uppercase tracking-wider"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-amber-400 to-amber-200 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+3214848484"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Phone size={14} />
              <span>Bel ons</span>
            </a>
            <a
              href="#afspraak"
              className="px-5 py-2 border text-sm font-medium transition-all duration-300"
              style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = '#C9A84C';
                el.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.color = '#C9A84C';
              }}
            >
              Afspraak
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu openen"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <MercedesStar size={200} opacity={0.05} className="absolute" />
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="font-display text-3xl text-white hover:text-amber-400 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#afspraak"
              className="mt-4 px-8 py-3 border border-amber-400 text-amber-400 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setMenuOpen(false)}
            >
              Afspraak Maken
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
