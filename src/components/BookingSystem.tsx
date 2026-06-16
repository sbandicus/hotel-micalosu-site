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

export default function BookingSystem() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [range, setRange] = useState<any>({
    from: startOfDay(new Date()),
    to: addDays(startOfDay(new Date()), 3)
  });
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const staticRooms = [
      { id: 'deluxe', name: 'Deluxe Sea View', price: 220, capacity: 2, image: '/images/suite.jpg', description: 'Vista mozzafiato sul Golfo di Arzachena.' },
      { id: 'dependance', name: 'Sunset Dependance', price: 180, capacity: 2, image: '/images/camere.jpg', description: 'Privacy e relax nel giardino mediterraneo.' },
      { id: 'junior', name: 'Junior Suite Wellness', price: 280, capacity: 3, image: '/images/giardino.jpg', description: 'Lusso e benessere con spazi ampi.' }
    ];
    setRooms(staticRooms);
    setSelectedRoom(staticRooms[0].id);
  }, []);

  const checkAvailability = async () => {
    if (!range?.from || !range?.to || !selectedRoom) return;
    setLoading(true);
    setTimeout(() => {
        setStep(2);
        setLoading(false);
    }, 1200);
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setStep(3);
        setLoading(false);
    }, 1500);
  };

  if (step === 3) {
    return (
      <div className="bg-white p-12 text-center flex flex-col items-center min-h-[500px] justify-center rounded-2xl">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle className="text-green-500 w-10 h-10" />
        </div>
        <h3 className="text-3xl font-serif mb-4 text-gray-900">Prenotazione Inviata!</h3>
        <p className="text-gray-500 max-w-xs mx-auto mb-10 text-sm font-light">
          Grazie {details.name.split(' ')[0]}. Riceverai presto una conferma via email.
        </p>
        <button 
          onClick={() => setStep(1)} 
          className="bg-black text-white px-10 py-4 rounded-full hover:bg-gold transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          Nuova Prenotazione
        </button>
      </div>
    );
  }

  const selectedRoomObj = rooms.find(r => r.id === selectedRoom);

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        
        {/* LATO SINISTRO: ANTEPRIMA CAMERA */}
        <div className="relative w-full lg:w-2/5 min-h-[300px] lg:min-h-full overflow-hidden">
          {selectedRoomObj && (
            <>
              <Image 
                src={selectedRoomObj.image} 
                alt={selectedRoomObj.name} 
                fill 
                className="object-cover transition-transform duration-1000 scale-105"
              />
              {/* Overlay per leggibilità */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-black/80 lg:to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full lg:h-full lg:flex lg:flex-col lg:justify-end">
                <div className="max-w-xs">
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-3 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                    La tua selezione
                  </span>
                  <h4 className="text-3xl sm:text-4xl font-serif text-white mb-3 drop-shadow-lg leading-tight">
                    {selectedRoomObj.name}
                  </h4>
                  <p className="text-sm text-white/70 font-light leading-relaxed drop-shadow-md">
                    {selectedRoomObj.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* LATO DESTRO: FORM DI PRENOTAZIONE */}
        <div className="w-full lg:w-3/5 p-6 sm:p-10 lg:p-14 bg-white">
          {step === 1 ? (
            <div className="animate-fade-in space-y-10">
              {/* Step 1: Tipologia */}
              <div>
                <header className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">01</span>
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Scegli la tua Camera</h5>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {rooms.map(room => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={ \`p-4 rounded-xl border-2 transition-all text-left \${
                        selectedRoom === room.id 
                          ? 'border-gold bg-gold/5 shadow-md' 
                          : 'border-gray-50 hover:border-gray-200'
                      }\` }
                    >
                      <p className="font-bold text-[11px] uppercase tracking-wider text-gray-900 mb-1">{room.name}</p>
                      <p className="text-[10px] text-gold font-black italic">€{room.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date e Ospiti */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col">
                  <header className="flex items-center gap-4 mb-6">
                    <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black">02</span>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Dettagli Soggiorno</h5>
                  </header>
                  
                  {/* Numero Ospiti */}
                  <div className="mb-8">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-3">Ospiti</label>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 max-w-[160px]">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-gold"><Minus size={14} /></button>
                      <span className="font-bold text-sm text-gray-800">{guests}</span>
                      <button onClick={() => setGuests(Math.min(4, guests + 1))} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-gold"><Plus size={14} /></button>
                    </div>
                  </div>

                  {/* Riepilogo Date */}
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-3">Check-in / Out</label>
                    <div className="text-xl font-serif text-gray-900">
                      {range?.from ? format(range.from, 'dd MMM') : '--'} 
                      <span className="mx-3 text-gold">→</span>
                      {range?.to ? format(range.to, 'dd MMM') : '--'}
                    </div>
                  </div>
                </div>

                {/* Calendario */}
                <div className="flex justify-center md:justify-end">
                  <style jsx global>{\`
                    .rdp {
                      margin: 0;
                      --rdp-cell-size: 36px;
                      --rdp-accent-color: #c5a059;
                      --rdp-background-color: #fcfaf7;
                      font-family: inherit;
                    }
                    .rdp-day_selected { background-color: var(--rdp-accent-color) !important; }
                    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #f9f6f2; }
                    .rdp-head_cell { font-size: 10px; font-weight: 800; color: #aaa; text-transform: uppercase; }
                    @media (max-width: 640px) {
                      .rdp { --rdp-cell-size: 32px; }
                    }
                  \`}</style>
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    disabled={{ before: new Date() }}
                  />
                </div>
              </div>

              {/* Azione Finale Step 1 */}
              <button 
                onClick={checkAvailability}
                disabled={!range?.from || !range?.to || loading}
                className="w-full h-16 bg-black text-white rounded-full flex items-center justify-center gap-4 hover:bg-gold transition-all duration-500 disabled:opacity-20 shadow-xl group"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                    {loading ? 'Elaborazione...' : 'Procedi alla Conferma'}
                </span>
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
                {loading && <Loader2 size={18} className="animate-spin" />}
              </button>
            </div>
          ) : (
            <form onSubmit={submitBooking} className="animate-fade-in h-full flex flex-col justify-between space-y-12">
              <div className="space-y-12">
                <header>
                  <h4 className="text-3xl font-serif text-gray-900 mb-2">Quasi Fatto</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Inserisci i tuoi dati per riservare la camera</p>
                </header>

                <div className="grid grid-cols-1 gap-8">
                  <div className="relative border-b border-gray-100 focus-within:border-gold transition-colors">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-2">Nome e Cognome</label>
                    <input required type="text" value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})} className="w-full bg-transparent py-2 outline-none text-sm font-bold text-gray-900" />
                  </div>
                  <div className="relative border-b border-gray-100 focus-within:border-gold transition-colors">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-2">Email</label>
                    <input required type="email" value={details.email} onChange={(e) => setDetails({...details, email: e.target.value})} className="w-full bg-transparent py-2 outline-none text-sm font-bold text-gray-900" />
                  </div>
                  <div className="relative border-b border-gray-100 focus-within:border-gold transition-colors">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-2">Telefono</label>
                    <input required type="tel" value={details.phone} onChange={(e) => setDetails({...details, phone: e.target.value})} className="w-full bg-transparent py-2 outline-none text-sm font-bold text-gray-900" />
                  </div>
                </div>

                <div className="p-6 bg-beige/30 rounded-2xl border border-gold/10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Prezzo Totale Stimato</p>
                            <p className="text-3xl font-serif text-gray-900">€{(selectedRoomObj?.price || 0) * (range?.from && range?.to ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) : 0)}</p>
                        </div>
                        <p className="text-[10px] text-gold font-bold italic">
                            {range?.from && range?.to ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) : 0} Notti / {guests} Persone
                        </p>
                    </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6">
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Annulla</button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 max-w-[280px] h-14 bg-black text-white rounded-full flex items-center justify-center gap-3 hover:bg-gold transition-all duration-500 shadow-lg"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {loading ? 'Inviando...' : 'Conferma Prenotazione'}
                  </span>
                  {!loading && <ArrowRight size={14} />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
