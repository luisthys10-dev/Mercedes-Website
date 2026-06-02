'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars, categories, CarCategory } from '@/data/cars';
import CarCard from '../ui/CarCard';
import CarDetailModal from '../ui/CarDetailModal';
import { Car } from '@/data/cars';
import ScrollReveal from '../ui/ScrollReveal';

export default function CarShowcase() {
  const [activeCategory, setActiveCategory] = useState<CarCategory | 'all'>('all');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const filteredCars = activeCategory === 'all'
    ? cars
    : cars.filter(c => c.category === activeCategory);

  return (
    <section id="modellen" className="py-24 px-8 md:px-12" style={{ background: '#070707' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <ScrollReveal>
            <p className="text-white/35 text-xs uppercase tracking-[0.3em] mb-3">Het volledige gamma</p>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-white">
                Alle modellen
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                Beweeg over een model om de video te bekijken. Klik voor meer informatie.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-1 mb-12 border-b border-white/[0.06] pb-6">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-xs tracking-wide transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-white text-black font-medium'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]"
          >
            {filteredCars.map((car, index) => (
              <div key={car.id} className="bg-[#070707]">
                <CarCard car={car} index={index} onOpen={setSelectedCar} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCars.length === 0 && (
          <div className="text-center py-20 text-white/25 text-sm">
            Geen modellen in deze categorie
          </div>
        )}
      </div>

      <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </section>
  );
}
