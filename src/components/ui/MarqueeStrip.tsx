'use client';

const items = [
  'Groep VDH', 'Officieel Mercedes-Benz Dealer', 'Herentals',
  'AMG Performance', 'Mercedes-EQ', 'Elektrisch rijden', 'Proefrit aanvragen',
];

export default function MarqueeStrip() {
  const text = items.map(i => `${i}  ·  `).join('');

  return (
    <div className="overflow-hidden py-3 border-y border-white/[0.06] bg-[#080808]">
      <div className="marquee-track">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-[11px] text-white/30 whitespace-nowrap pr-4 tracking-widest uppercase"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
