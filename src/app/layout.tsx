import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Groep VDH | Officieel Mercedes-Benz Dealer Herentals',
  description: 'Groep VDH — uw officiële Mercedes-Benz dealer in Herentals. Ontdek het volledige gamma van 25 modellen. Het beste of niets.',
  keywords: 'Mercedes-Benz, Groep VDH, dealer, Herentals, AMG, EQ, elektrisch',
  openGraph: {
    title: 'Groep VDH | Officieel Mercedes-Benz Dealer',
    description: 'Het beste of niets. Officieel Mercedes-Benz dealer in Herentals.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
