'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars, categories, CarCategory } from '@/data/cars';
import CarCard from '../ui/CarCard';
import CarDetailModal from '../ui/CarDetailModal';
import { Car } from '@/data/cars';
import MercedesStar from '../ui/MercedesStar';
import ScrollReveal from '../ui/ScrollReveal';

export default function CarShowcase() {
  const [activeCategory, setActiveCategory] = useState<CarCategory | 'all'>('all');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const filteredCars = activeCategory === 'all'
    ? cars
    : cars.filter(c => c.category === activeCategory);

  return (
    <section id="modellen" className="relative py-24 px-6" style={{ background: '#070707' }}>
      {/* Background star */}
      <MercedesStar
        size={800}
        opacity={0.02}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.4em] mb-4 block" style={{ color: '#C9A84C' }}>
              Het Volledige Gamma
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
              Ontdek Elk Model
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Van compacte hatchback tot supercar — beweeg over een model om de video te starten
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="gold-line mt-8 max-w-xs mx-auto" />
          </ScrollReveal>
        </div>

        {/* Category filter */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                  activeCategory === cat.value
                    ? 'bg-white text-black'
                    : 'border border-white/20 text-white/60 hover:border-white/50 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Cars grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCars.map((car, index) => (
              <CarCard
                key={car.id}
                car={car}
                index={index}
                onOpen={setSelectedCar}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-20 text-white/30">
            Geen modellen gevonden in deze categorie
          </div>
        )}
      </div>

      {/* Detail modal */}
      <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </section>
  );
}
