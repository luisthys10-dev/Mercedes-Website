'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Calendar, Check } from 'lucide-react';
import { Car } from '@/data/cars';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (car && videoRef.current && car.videoSrc) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    document.body.style.overflow = car ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [car]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${car.name} details`}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" />

          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0d0d0d] border border-white/[0.08]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-white/30 hover:text-white transition-colors"
              aria-label="Sluiten"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Media */}
              <div className="relative aspect-video md:aspect-auto min-h-[240px] md:min-h-[440px] overflow-hidden bg-[#0a0a0a]">
                {!imgError && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={car.imageSrc}
                    alt={car.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
                {car.videoSrc && (
                  <video
                    ref={videoRef}
                    src={car.videoSrc}
                    controls playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-label={`${car.name} video`}
                  />
                )}
                {!car.videoSrc && !imgError && (
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[11px] text-white/40 bg-black/60 px-2 py-1">
                      Video binnenkort beschikbaar
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-8 md:p-10 flex flex-col gap-6">
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">{car.category}</p>
                  <h2 className="font-display text-3xl font-medium text-white mb-1">{car.name}</h2>
                  <p className="text-white/50 text-lg">{car.subtitle}</p>
                  <p className="text-white/30 text-sm italic mt-2">{car.tagline}</p>
                </div>

                <div className="border-t border-white/[0.07]" />

                <div>
                  <p className="text-white text-xl font-medium mb-5">{car.price}</p>

                  <div className="space-y-2 mb-6">
                    {car.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={13} className="text-white/40 mt-0.5 flex-shrink-0" />
                        <span className="text-white/65 text-sm">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {car.specs.map((spec, i) => (
                      <div key={i} className="p-3 bg-white/[0.03] border border-white/[0.05]">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{spec.label}</p>
                        <p className="text-white text-sm font-medium">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <a
                    href="#afspraak"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    <Calendar size={15} />
                    Afspraak maken
                  </a>
                  <a
                    href="tel:+3214848484"
                    className="flex items-center justify-center gap-2 px-5 py-3 text-sm border border-white/15 text-white/70 hover:text-white hover:border-white/35 transition-all"
                  >
                    <Phone size={15} />
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
