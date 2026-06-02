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
      className="group cursor-pointer relative overflow-hidden"
      style={{ minHeight: '450px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(car)}
    >
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
        <div className="absolute inset-0 bg-[#111]" />
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

      {/* Dark gradient overlay at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 45%, transparent 75%)' }}
      />

      {/* Category tag — top left */}
      <div className="absolute top-4 left-4">
        <span className="text-[10px] uppercase tracking-widest text-white/60 bg-black/50 backdrop-blur-sm px-2 py-1">
          {categoryLabel[car.category]}
        </span>
      </div>

      {/* Video hint — top right */}
      {car.videoSrc && !isPlaying && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[10px] text-white/50 bg-black/50 backdrop-blur-sm px-2 py-1">▶ Video</span>
        </div>
      )}

      {/* Name + price overlaid on gradient */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8">
        <h3 className="text-white text-base font-medium leading-snug">{car.name}</h3>
        <p className="text-white/50 text-xs mt-0.5">{car.subtitle}</p>
        <div className="flex items-center justify-between mt-3">
          <p className="text-white/55 text-xs">{car.price}</p>
          <p className="text-white/35 text-[10px] uppercase tracking-widest group-hover:text-white/70 transition-colors">
            Meer info →
          </p>
        </div>
      </div>
    </motion.article>
  );
}
