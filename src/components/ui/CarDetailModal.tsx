'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Calendar, CheckCircle, Zap } from 'lucide-react';
import { Car } from '@/data/cars';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (car && videoRef.current && car.videoSrc) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    if (car) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [car]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${car.name} ${car.subtitle} details`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.1)' }}
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-white/50 hover:text-white transition-colors"
              aria-label="Sluiten"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Video */}
              <div className="relative aspect-video md:aspect-auto min-h-[250px] md:min-h-[400px] overflow-hidden">
                {car.videoSrc ? (
                  <video
                    ref={videoRef}
                    src={car.videoSrc}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label={`${car.name} ${car.subtitle} film`}
                  />
                ) : (
                  <div className="no-video-placeholder w-full h-full flex flex-col items-center justify-center gap-4">
                    <div className="text-white/10 w-24 h-24">
                      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="4"/>
                        <line x1="100" y1="5" x2="100" y2="100" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                        <line x1="100" y1="100" x2="177" y2="158" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                        <line x1="100" y1="100" x2="23" y2="158" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                        <circle cx="100" cy="100" r="8" fill="white"/>
                      </svg>
                    </div>
                    <p className="text-white/30 text-sm">Nog geen video beschikbaar</p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {car.category === 'Electric' && <Zap size={14} style={{ color: '#0066CC' }} />}
                    <span className="text-xs uppercase tracking-widest text-white/40">{car.category}</span>
                  </div>
                  <h2 className="font-display text-4xl font-bold text-white mb-1">{car.name}</h2>
                  <p className="text-xl font-medium mb-2" style={{ color: '#C9A84C' }}>{car.subtitle}</p>
                  <p className="text-white/50 italic mb-6">&ldquo;{car.tagline}&rdquo;</p>

                  <div className="gold-line mb-6" />

                  {/* Price */}
                  <p className="text-2xl font-bold text-white mb-6">{car.price}</p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {car.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle size={14} style={{ color: '#C9A84C' }} />
                        <span className="text-white/80 text-sm">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {car.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{spec.label}</div>
                        <div className="text-white font-semibold">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#afspraak"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
                  >
                    <Calendar size={16} />
                    Afspraak Maken
                  </a>
                  <a
                    href="tel:+3214848484"
                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium border border-white/20 text-white/80 hover:border-white/50 hover:text-white transition-all duration-300"
                  >
                    <Phone size={16} />
                    Bel ons
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
