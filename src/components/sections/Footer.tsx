'use client';
import MercedesStar from '../ui/MercedesStar';

const quickLinks = [
  { label: 'Alle modellen', href: '#modellen' },
  { label: 'AMG', href: '#amg' },
  { label: 'Elektrisch', href: '#elektrisch' },
  { label: 'Afspraak maken', href: '#afspraak' },
  { label: 'Contact', href: '#contact' },
];

const legal = ['Privacybeleid', 'Cookiebeleid', 'Voorwaarden'];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 px-8 md:px-12 border-t border-white/[0.06]" style={{ background: '#030303' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 opacity-70">
                <MercedesStar size={28} opacity={1} rotate={false} />
              </div>
              <div>
                <div className="text-white/80 font-medium text-sm">Groep VDH</div>
                <div className="text-white/25 text-[10px] uppercase tracking-widest">Officieel Mercedes-Benz dealer</div>
              </div>
            </div>
            <p className="text-white/30 text-xs leading-relaxed max-w-[220px]">
              Uw Mercedes-Benz specialist in Herentals. Het beste of niets.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/25 text-[10px] uppercase tracking-widest mb-5">Navigatie</h4>
            <div className="space-y-3">
              {quickLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-xs text-white/40 hover:text-white/80 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/25 text-[10px] uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-1.5 text-xs text-white/40">
              <p>Itegemsesteenweg 83, 2200 Herentals</p>
              <p className="mt-3">+32 (0)14 84 84 84</p>
              <p>info@groepvdh.be</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[11px]">© 2024 Groep VDH · Officieel Mercedes-Benz dealer · Herentals</p>
          <div className="flex gap-6">
            {legal.map(item => (
              <a key={item} href="#" className="text-white/20 text-[11px] hover:text-white/50 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
