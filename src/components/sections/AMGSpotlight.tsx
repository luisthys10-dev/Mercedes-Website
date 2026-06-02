'use client';
import { cars } from '@/data/cars';
import ScrollReveal from '../ui/ScrollReveal';

const amgModels = cars.filter(c => c.category === 'AMG').concat(cars.filter(c => c.slug === 'sl-roadster'));

const stats = [
  { value: '843 pk', label: 'Max. vermogen' },
  { value: '2,9 s', label: '0 – 100 km/h' },
  { value: '325 km/h', label: 'Topsnelheid' },
  { value: 'V8', label: 'Biturbo motor' },
];

export default function AMGSpotlight() {
  return (
    <section id="amg" className="py-24 px-8 md:px-12 border-t border-white/[0.06]" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <p className="text-white/35 text-xs uppercase tracking-[0.3em] mb-3">Mercedes-AMG</p>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-white">
                Born on the racetrack
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                AMG — pure rijdynamiek, hoge prestaties en een onverwisselbare identiteit.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#050505] p-8 text-center">
                <div className="font-display text-3xl font-medium text-white mb-2">{stat.value}</div>
                <div className="text-xs text-white/35 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* AMG Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {amgModels.map((car, i) => (
            <ScrollReveal key={car.id} delay={i * 0.08}>
              <div className="group cursor-pointer">
                <div className="aspect-video relative overflow-hidden bg-[#0f0f0f] mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={car.imageSrc}
                    alt={car.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
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
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white bg-black/60 backdrop-blur-sm px-2 py-1">
                      AMG
                    </span>
                  </div>
                </div>
                <h3 className="text-white text-sm font-medium">{car.name}</h3>
                <p className="text-white/40 text-xs mt-0.5">{car.subtitle}</p>
                <p className="text-white/25 text-xs mt-1">{car.specs[0]?.value} · {car.specs[1]?.value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
