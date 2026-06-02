'use client';
import { cars } from '@/data/cars';
import { Zap } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const eqModels = cars.filter(c => c.category === 'Electric');
const facts = [
  { value: '0g', label: 'CO₂ lokaal' },
  { value: '783 km', label: 'Max. bereik WLTP' },
  { value: '200 kW', label: 'DC laadvermogen' },
  { value: '4', label: 'EQ modellen' },
];

export default function ElectricSpotlight() {
  return (
    <section id="elektrisch" className="py-24 px-8 md:px-12 border-t border-white/[0.06]" style={{ background: '#060606' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={13} className="text-white/40" />
              <span className="text-white/35 text-xs uppercase tracking-[0.3em]">Mercedes-EQ</span>
            </div>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-white">
                Elektrisch rijden
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                Mercedes-EQ — stijlvol, intelligent en emissievrij. De toekomst is hier.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats — clean numbers */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] mb-16">
            {facts.map((fact, i) => (
              <div key={i} className="bg-[#060606] p-8 text-center">
                <div className="font-display text-3xl font-medium text-white mb-2">{fact.value}</div>
                <div className="text-xs text-white/35 uppercase tracking-widest">{fact.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* EQ Models */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eqModels.map((car, i) => (
            <ScrollReveal key={car.id} delay={i * 0.08}>
              <div className="group cursor-pointer">
                <div className="aspect-video relative overflow-hidden bg-[#0f0f0f] mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={car.imageSrc}
                    alt={car.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-400 group-hover:scale-[1.02] transition-transform"
                  />
                  {car.videoSrc && (
                    <video
                      src={car.videoSrc}
                      muted playsInline loop autoPlay
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                      preload="none"
                    />
                  )}
                  <div className="card-overlay absolute inset-0" />
                </div>
                <h3 className="text-white text-sm font-medium">{car.name}</h3>
                <p className="text-white/40 text-xs mt-0.5">{car.subtitle}</p>
                <p className="text-white/25 text-xs mt-2">{car.price}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
