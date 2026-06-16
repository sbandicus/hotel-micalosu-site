'use client';

import { useState, useEffect } from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import { CheckCircle, Loader2, ArrowRight, Minus, Plus } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Image from 'next/image';

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
}

const ROOMS: Room[] = [
  { id: 'deluxe', name: 'Deluxe Sea View', price: 220, capacity: 2, image: '/images/suite.jpg', description: 'Vista mozzafiato sul Golfo di Arzachena.' },
  { id: 'dependance', name: 'Sunset Dependance', price: 180, capacity: 2, image: '/images/camere.jpg', description: 'Privacy e relax nel giardino mediterraneo.' },
  { id: 'junior', name: 'Junior Suite Wellness', price: 280, capacity: 3, image: '/images/giardino.jpg', description: 'Lusso e benessere con spazi ampi.' },
];

const calendarCSS = `
  .rdp { margin: 0; --rdp-cell-size: 40px; --rdp-accent-color: #c5a059; --rdp-background-color: #fdf9f4; }
  .rdp-months { flex-wrap: wrap; gap: 16px; }
  .rdp-caption_label { font-size: 14px; font-weight: 700; }
  .rdp-head_cell { font-size: 11px; font-weight: 800; color: #bbb; text-transform: uppercase; }
  .rdp-day_selected:not(.rdp-day_range_middle) { background-color: #c5a059 !important; color: #fff !important; }
  .rdp-day_range_middle { background-color: #f3e9d8 !important; color: #333 !important; }
  .rdp-button:focus-visible { outline: 2px solid #c5a059; }
`;

export default function BookingSystem() {
  const [selectedRoom, setSelectedRoom] = useState<string>('deluxe');
  const [range, setRange] = useState<any>({
    from: startOfDay(new Date()),
    to: addDays(startOfDay(new Date()), 3),
  });
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({ name: '', email: '', phone: '' });

  const room = ROOMS.find(r => r.id === selectedRoom)!;

  const nights = range?.from && range?.to
    ? Math.max(1, Math.ceil((range.to.getTime() - range.from.getTime()) / 86400000))
    : 0;

  const total = room ? room.price * nights : 0;

  const checkAvailability = () => {
    if (!range?.from || !range?.to) return;
    setLoading(true);
    setTimeout(() => { setStep(2); setLoading(false); }, 1000);
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setStep(3); setLoading(false); }, 1200);
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
          <CheckCircle className="text-green-500 w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif mb-3">Prenotazione Inviata</h3>
        <p className="text-gray-400 text-sm mb-8 max-w-xs">Grazie {details.name.split(' ')[0] || ''}. Riceverai una conferma via email.</p>
        <button onClick={() => { setStep(1); setDetails({ name: '', email: '', phone: '' }); }}
          className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all">
          Nuova Prenotazione
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <style>{calendarCSS}</style>

      {/* Hero foto camera selezionata */}
      <div className="relative w-full h-48 sm:h-60 rounded-2xl overflow-hidden mb-8">
        <Image src={room.image} alt={room.name} fill className="object-cover transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gold block mb-1">Camera selezionata</span>
          <h4 className="text-xl sm:text-2xl font-serif text-white leading-tight">{room.name}</h4>
          <p className="text-xs text-white/70 mt-1">{room.description}</p>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-8">
          {/* 1. Selezione camera */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold mb-4">
              <span className="inline-block w-5 h-5 rounded-full bg-gold/10 text-gold text-center leading-5 mr-2">1</span>
              Tipologia Camera
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROOMS.map(r => (
                <button key={r.id} onClick={() => setSelectedRoom(r.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedRoom === r.id ? 'border-gold bg-gold/5' : 'border-gray-100 hover:border-gray-300'
                  }`}>
                  <p className="font-bold text-xs text-gray-900 mb-0.5">{r.name}</p>
                  <p className="text-[11px] text-gold font-black">€{r.price}<span className="text-gray-400 font-normal"> / notte</span></p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Ospiti */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold mb-4">
              <span className="inline-block w-5 h-5 rounded-full bg-gold/10 text-gold text-center leading-5 mr-2">2</span>
              Ospiti
            </p>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 w-fit">
              <button onClick={() => setGuests(g => Math.max(1, g - 1))}
                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-gold transition-colors">
                <Minus size={14} />
              </button>
              <span className="font-bold text-base w-4 text-center">{guests}</span>
              <button onClick={() => setGuests(g => Math.min(4, g + 1))}
                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-gold transition-colors">
                <Plus size={14} />
              </button>
              <span className="text-xs text-gray-400 ml-2">{guests === 1 ? 'ospite' : 'ospiti'}</span>
            </div>
          </div>

          {/* 3. Calendario */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold mb-4">
              <span className="inline-block w-5 h-5 rounded-full bg-gold/10 text-gold text-center leading-5 mr-2">3</span>
              Date del Soggiorno
            </p>
            <div className="overflow-x-auto">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={{ before: new Date() }}
              />
            </div>
          </div>

          {/* Riepilogo */}
          {nights > 0 && (
            <div className="flex items-center justify-between p-4 bg-beige/40 rounded-xl border border-gold/10">
              <div className="text-xs text-gray-500">
                <span className="font-bold text-gray-900">{format(range.from, 'dd MMM')}</span>
                <span className="mx-2 text-gold">→</span>
                <span className="font-bold text-gray-900">{format(range.to, 'dd MMM')}</span>
                <span className="ml-2">· {nights} notti</span>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Totale</p>
                <p className="text-xl font-serif text-gold">€{total}</p>
              </div>
            </div>
          )}

          <button onClick={checkAvailability}
            disabled={!range?.from || !range?.to || loading}
            className="w-full h-14 bg-black text-white rounded-full flex items-center justify-center gap-3 hover:bg-gold transition-all duration-500 disabled:opacity-30 group">
            <span className="text-[11px] font-black uppercase tracking-[0.25em]">
              {loading ? 'Verifica...' : 'Continua la Prenotazione'}
            </span>
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            {loading && <Loader2 size={16} className="animate-spin" />}
          </button>
        </div>
      ) : (
        <form onSubmit={submitBooking} className="space-y-8">
          <div>
            <h4 className="text-2xl font-serif mb-1">I tuoi Dati</h4>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold">Completa la richiesta di prenotazione</p>
          </div>

          <div className="space-y-6">
            {[
              { key: 'name', label: 'Nome e Cognome', type: 'text' },
              { key: 'email', label: 'Indirizzo Email', type: 'email' },
              { key: 'phone', label: 'Telefono', type: 'tel' },
            ].map(field => (
              <div key={field.key} className="border-b border-gray-100 pb-3 focus-within:border-gold transition-colors">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">{field.label}</label>
                <input
                  required
                  type={field.type}
                  value={(details as any)[field.key]}
                  onChange={e => setDetails(d => ({ ...d, [field.key]: e.target.value }))}
                  className="w-full bg-transparent outline-none text-sm font-bold text-gray-900 py-1"
                />
              </div>
            ))}
          </div>

          <div className="p-5 bg-beige/30 rounded-xl border border-gold/10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Totale Stimato</p>
                <p className="text-2xl font-serif">€{total}</p>
              </div>
              <p className="text-xs text-gray-400 text-right">{nights} notti<br />{guests} ospiti</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => setStep(1)}
              className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-black transition-colors">
              ← Indietro
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 max-w-xs h-14 bg-black text-white rounded-full flex items-center justify-center gap-3 hover:bg-gold transition-all disabled:opacity-30">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {loading ? 'Invio...' : 'Conferma Prenotazione'}
              </span>
              {!loading && <ArrowRight size={14} />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
