'use client';

const items = [
  'LUXE', 'PRESTATIES', 'INNOVATIE', 'GROEP VDH', 'OFFICIEEL MERCEDES-BENZ DEALER',
  'HERENTALS', 'HET BESTE OF NIETS', 'AMG PERFORMANCE', 'EQ ELEKTRISCH',
];

export default function MarqueeStrip() {
  const text = items.map(i => `${i} · `).join('');

  return (
    <div className="relative overflow-hidden py-4 border-y" style={{ borderColor: 'rgba(201,168,76,0.2)', background: '#050505' }}>
      <div className="marquee-track">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="text-xs font-medium uppercase tracking-[0.3em] whitespace-nowrap px-4"
            style={{ color: '#C9A84C' }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
