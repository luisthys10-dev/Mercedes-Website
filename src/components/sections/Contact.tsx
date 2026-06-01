'use client';
import { MapPin, Phone, Clock } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const info = [
  {
    icon: MapPin,
    title: 'Adres',
    lines: ['Itegemsesteenweg 83', '2200 Herentals', 'België'],
    accent: '#C9A84C',
  },
  {
    icon: Phone,
    title: 'Telefoon & E-mail',
    lines: ['+32 (0)14 84 84 84', 'info@groepvdh.be', 'Groep VDH'],
    accent: '#C9A84C',
  },
  {
    icon: Clock,
    title: 'Openingsuren',
    lines: ['Ma – Vr: 08:00 – 18:00', 'Zaterdag: 09:00 – 17:00', 'Zondag: Gesloten'],
    accent: '#C9A84C',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6" style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.4em] mb-4 block" style={{ color: '#C9A84C' }}>Kom langs</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Contacteer Ons</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-line max-w-xs mx-auto mt-4" />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {info.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.12} direction="up">
                <div
                  className="p-8 h-full group hover:border-amber-400/30 transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <Icon size={20} style={{ color: '#C9A84C' }} />
                  </div>
                  <h3 className="text-white font-semibold uppercase tracking-widest text-xs mb-4">{item.title}</h3>
                  <div className="space-y-1">
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-white/60 text-sm">{line}</p>
                    ))}
                  </div>
                  <div
                    className="mt-6 h-px bg-gradient-to-r from-amber-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
