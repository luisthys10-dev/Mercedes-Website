'use client';
import { MapPin, Phone, Clock } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const info = [
  {
    icon: MapPin,
    title: 'Adres',
    lines: ['Itegemsesteenweg 83', '2200 Herentals', 'België'],
  },
  {
    icon: Phone,
    title: 'Contact',
    lines: ['+32 (0)14 84 84 84', 'info@groepvdh.be'],
  },
  {
    icon: Clock,
    title: 'Openingsuren',
    lines: ['Ma – Vr: 08:00 – 18:00', 'Zaterdag: 09:00 – 17:00', 'Zondag: Gesloten'],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-8 md:px-12 border-t border-white/[0.06]" style={{ background: '#060606' }}>
      <div className="max-w-7xl mx-auto">

        <div className="mb-14">
          <ScrollReveal>
            <p className="text-white/35 text-xs uppercase tracking-[0.3em] mb-3">Kom langs</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white">Contact</h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05]">
          {info.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-[#060606] p-10 h-full group hover:bg-[#0a0a0a] transition-colors duration-300">
                  <Icon size={18} className="text-white/30 mb-6" />
                  <h3 className="text-white/40 text-xs uppercase tracking-widest mb-4">{item.title}</h3>
                  <div className="space-y-1.5">
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-white/70 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
