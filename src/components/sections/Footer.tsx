'use client';
import MercedesStar from '../ui/MercedesStar';

const quickLinks = ['Alle Modellen', 'AMG', 'Elektrisch', "SUV's", 'Afspraak', 'Contact'];
const legal = ['Privacybeleid', 'Cookiebeleid', 'Algemene Voorwaarden'];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden py-16 px-6" style={{ background: '#030303', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <MercedesStar size={500} opacity={0.02} className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <MercedesStar size={40} opacity={1} rotate={false} />
              </div>
              <div>
                <div className="font-display text-white font-bold text-lg leading-none">Groep VDH</div>
                <div className="text-[10px] uppercase tracking-widest" style={{ color: '#C9A84C' }}>Officieel Mercedes-Benz Dealer</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Het beste of niets — de filosofie die ons elke dag drijft om u de ultieme Mercedes-Benz ervaring te geven.
            </p>
            <div className="mt-4">
              <div className="h-px bg-gradient-to-r from-amber-400/40 to-transparent w-32" />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">Snelle Links</h4>
            <div className="space-y-3">
              {quickLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace("'s", '').replace(' ', '')}`}
                  className="block text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">Contact</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>Itegemsesteenweg 83</p>
              <p>2200 Herentals</p>
              <p className="mt-4" style={{ color: '#C9A84C' }}>+32 (0)14 84 84 84</p>
              <p>info@groepvdh.be</p>
            </div>
          </div>
        </div>

        <div className="gold-line mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © 2024 Groep VDH · Officieel Mercedes-Benz dealer · Herentals
          </p>
          <div className="flex gap-6">
            {legal.map(item => (
              <a key={item} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
