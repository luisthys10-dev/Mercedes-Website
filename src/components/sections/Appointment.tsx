'use client';
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars } from '@/data/cars';
import { CheckCircle, Loader2 } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import MercedesStar from '../ui/MercedesStar';

type TimeSlot = 'Ochtend' | 'Namiddag' | 'Avond';

export default function Appointment() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', model: '', date: '', message: '',
  });
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('Namiddag');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Naam is verplicht';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Geldig e-mailadres vereist';
    if (!form.model) e.model = 'Selecteer een model';
    if (!form.date) e.date = 'Kies een datum';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  const inputClass = (field: string) => `w-full px-4 py-3 bg-white/5 border text-white text-sm outline-none transition-all duration-200 focus:border-amber-400/60 placeholder-white/30 ${
    errors[field] ? 'border-red-500/50' : 'border-white/10'
  }`;

  return (
    <section id="afspraak" className="relative py-28 px-6 overflow-hidden" style={{ background: '#080808' }}>
      <MercedesStar size={700} opacity={0.025} className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.4em] mb-4 block" style={{ color: '#C9A84C' }}>
              Groep VDH · Herentals
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Maak een Afspraak
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/50">Onze experts staan klaar om u persoonlijk te begeleiden bij uw perfecte Mercedes-Benz.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}><div className="gold-line mt-6 max-w-xs mx-auto" /></ScrollReveal>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="mb-6 flex justify-center"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <CheckCircle size={40} style={{ color: '#C9A84C' }} />
                </div>
              </motion.div>
              <h3 className="font-display text-3xl font-bold text-white mb-3">Afspraak Bevestigd!</h3>
              <p className="text-white/60">We contacteren u spoedig via e-mail of telefoon om uw afspraak te bevestigen.</p>
              <button
                onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', model: '', date: '', message: '' }); }}
                className="mt-8 px-6 py-3 border text-sm uppercase tracking-widest transition-all"
                style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
              >
                Nieuwe Afspraak
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" noValidate>
              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Uw naam *"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="E-mailadres *"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="tel"
                      placeholder="Telefoonnummer"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className={inputClass('phone')}
                    />
                  </div>
                  <div>
                    <select
                      value={form.model}
                      onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                      className={`${inputClass('model')} appearance-none`}
                      style={{ background: '#0e0e0e' }}
                    >
                      <option value="">Gewenst model *</option>
                      {cars.map(car => (
                        <option key={car.id} value={car.slug}>
                          {car.name} {car.subtitle}
                        </option>
                      ))}
                    </select>
                    {errors.model && <p className="text-red-400 text-xs mt-1">{errors.model}</p>}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                      className={inputClass('date')}
                      min={new Date().toISOString().split('T')[0]}
                      style={{ colorScheme: 'dark' }}
                    />
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div className="flex gap-2">
                    {(['Ochtend', 'Namiddag', 'Avond'] as TimeSlot[]).map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`flex-1 py-3 text-xs uppercase tracking-widest transition-all duration-200 ${
                          timeSlot === slot
                            ? 'text-black font-semibold'
                            : 'border border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
                        }`}
                        style={timeSlot === slot ? { background: 'white', color: 'black' } : {}}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <textarea
                  placeholder="Bericht of bijzonderheden (optioneel)"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  className={`${inputClass('message')} resize-none`}
                />
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-sm font-semibold uppercase tracking-widest bg-white text-black transition-all duration-300 hover:bg-white/90 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Verwerken...</>
                  ) : (
                    'Afspraak Bevestigen →'
                  )}
                </button>
              </ScrollReveal>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
