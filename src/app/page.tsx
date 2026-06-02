'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Navbar from '@/components/ui/Navbar';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

const CarShowcase = dynamic(() => import('@/components/sections/CarShowcase'), { ssr: false });
const ElectricSpotlight = dynamic(() => import('@/components/sections/ElectricSpotlight'), { ssr: false });
const AMGSpotlight = dynamic(() => import('@/components/sections/AMGSpotlight'), { ssr: false });
const Appointment = dynamic(() => import('@/components/sections/Appointment'), { ssr: false });

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <CarShowcase />
        <ElectricSpotlight />
        <AMGSpotlight />
        <Appointment />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
