'use client';
import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Zap } from 'lucide-react';
import { Car } from '@/data/cars';

interface CarCardProps {
  car: Car;
  index: number;
  onOpen: (car: Car) => void;
}

export default function CarCard({ car, index, onOpen }: CarCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlay, setShowPlay] = useState(true);

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (!video || !car.videoSrc) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsPlaying(true);
    setShowPlay(false);
  }, [car.videoSrc]);

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.ended) {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const categoryColors: Record<string, string> = {
    AMG: '#CC0000',
    Electric: '#0066CC',
    SUV: '#2e7d32',
    Sedan: '#37474f',
    Coupe: '#4a235a',
    Cabrio: '#4a235a',
    Break: '#546e7a',
    Hatchback: '#880e4f',
  };

  const categoryLabels: Record<string, string> = {
    AMG: 'AMG',
    Electric: 'EQ Elektrisch',
    SUV: 'SUV',
    Sedan: 'Berline',
    Coupe: 'Coupé',
    Cabrio: 'Cabrio',
    Break: 'Break',
    Hatchback: 'Hatchback',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer overflow-hidden"
      style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.06)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(car)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Video / Placeholder container */}
      <div className="relative aspect-video overflow-hidden">
        {car.videoSrc ? (
          <>
            <video
              ref={videoRef}
              src={car.videoSrc}
              muted
              playsInline
              preload="none"
              onEnded={handleEnded}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              aria-label={`${car.name} ${car.subtitle} video`}
            />
            {/* Play indicator */}
            <div className={`absolute top-3 left-3 transition-opacity duration-300 ${showPlay && !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-1.5 px-2.5 py-1 text-white/70 text-xs uppercase tracking-wider" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                <Play size={10} fill="currentColor" />
                <span>Beweeg om te spelen</span>
              </div>
            </div>
            {/* Live indicator */}
            {isPlaying && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 text-xs uppercase tracking-wider text-white" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>Live preview</span>
              </div>
            )}
          </>
        ) : (
          <div className="no-video-placeholder w-full h-full flex items-center justify-center relative">
            <div className="text-white/10 w-20 h-20">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="4"/>
                <line x1="100" y1="5" x2="100" y2="100" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                <line x1="100" y1="100" x2="177" y2="158" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                <line x1="100" y1="100" x2="23" y2="158" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                <circle cx="100" cy="100" r="8" fill="white"/>
              </svg>
            </div>
            <div className="shimmer absolute inset-0" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-xs px-2 py-1" style={{ background: 'rgba(201,168,76,0.2)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>
                Video binnenkort beschikbaar
              </span>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div
          className="absolute top-3 right-3 text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium text-white"
          style={{ background: `${categoryColors[car.category]}cc`, backdropFilter: 'blur(8px)' }}
        >
          {categoryLabels[car.category]}
        </div>

        {/* Gradient overlay */}
        <div className="video-overlay absolute inset-0 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-100 transition-colors">
              {car.name}
            </h3>
            <p className="text-sm font-medium" style={{ color: '#C9A84C' }}>{car.subtitle}</p>
          </div>
          {car.category === 'Electric' && (
            <Zap size={16} style={{ color: '#0066CC' }} className="mt-1 flex-shrink-0" />
          )}
        </div>

        <p className="text-white/40 text-xs italic mt-1 mb-4">{car.tagline}</p>

        <div className="gold-line mb-4" />

        <div className="flex items-center justify-between">
          <span className="text-white/90 text-sm font-medium">{car.price}</span>
          <span
            className="text-xs uppercase tracking-widest font-medium transition-all duration-300 group-hover:translate-x-1"
            style={{ color: '#C9A84C' }}
          >
            Meer info →
          </span>
        </div>
      </div>

      {/* Hover border accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: `1px solid ${car.accentColor}40` }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${car.accentColor}, transparent)` }}
      />
    </motion.article>
  );
}
