'use client';
import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from '@/data/cars';

interface CarCardProps {
  car: Car;
  index: number;
  onOpen: (car: Car) => void;
}

export default function CarCard({ car, index, onOpen }: CarCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (!video || !car.videoSrc) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsPlaying(true);
  }, [car.videoSrc]);

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.ended) video.pause();
    setIsPlaying(false);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const categoryLabel: Record<string, string> = {
    AMG: 'AMG',
    Electric: 'EQ',
    SUV: 'SUV',
    Sedan: 'Berline',
    Coupe: 'Coupé',
    Cabrio: 'Cabrio',
    Break: 'Break',
    Hatchback: 'Hatchback',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      className="group cursor-pointer overflow-hidden bg-[#0f0f0f] hover:-translate-y-1 transition-transform duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(car)}
    >
      {/* Media — 75% of card height */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>

        {/* Photo */}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={car.imageSrc}
            alt={`${car.name} ${car.subtitle}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setImgError(true)}
            loading={index < 6 ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="absolute inset-0 no-video-placeholder" />
        )}

        {/* Video — fades over photo on hover */}
        {car.videoSrc && (
          <video
            ref={videoRef}
            src={car.videoSrc}
            muted playsInline preload="none"
            onEnded={handleEnded}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400"
            style={{ opacity: isPlaying ? 1 : 0 }}
            aria-label={`${car.name} video`}
          />
        )}

        {/* Overlay gradient */}
        <div className="card-overlay absolute inset-0 pointer-events-none" />

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase tracking-widest text-white/60 bg-black/50 backdrop-blur-sm px-2 py-1">
            {categoryLabel[car.category]}
          </span>
        </div>

        {/* Video hint */}
        {car.videoSrc && !isPlaying && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-[10px] text-white/50 bg-black/50 backdrop-blur-sm px-2 py-1">▶ Video</span>
          </div>
        )}
      </div>

      {/* Info strip — white bg, minimal */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white text-sm font-medium leading-snug">{car.name}</h3>
            <p className="text-white/40 text-xs mt-0.5">{car.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs">{car.price}</p>
            <p className="text-white/30 text-[10px] mt-0.5 group-hover:text-white/60 transition-colors">
              Meer info →
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
