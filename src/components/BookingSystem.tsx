'use client';

import { useState, useEffect } from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon, Users, CheckCircle, Loader2, ArrowRight, Minus, Plus } from 'lucide-react';
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
      <div className="bg-white p-12 text-center flex flex-col items-center min-h-[500px] justify-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle className="text-green-500 w-10 h-10" />
        </div>
        <h3 className="text-3xl font-serif mb-4">Prenotazione Inviata!</h3>
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
    <div className="flex flex-col h-full bg-white rounded-2xl">
      {/* Contenitore Griglia Principale */}
      <div className="grid lg:grid-cols-2 gap-0 min-h-[600px] overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        
        {/* Colonna Sinistra: Immagine e Info Stanza */}
        <div className="relative h-64 lg:h-auto bg-gray-50 border-r border-gray-100">
          {selectedRoomObj && (
            <>
              <Image 
                src={selectedRoomObj.image} 
                alt={selectedRoomObj.name} 
                fill 
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-2 block">La tua scelta</span>
                <h4 className="text-2xl font-serif mb-2">{selectedRoomObj.name}</h4>
                <p className="text-xs text-white/70 font-light">{selectedRoomObj.description}</p>
              </div>
            </>
          )}
        </div>

        {/* Colonna Destra: Form e Selezione */}
        <div className="p-8 lg:p-12 flex flex-col justify-between bg-white">
          {step === 1 ? (
            <div className="space-y-8 animate-fade-in">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gold mb-4 text-center lg:text-left">1. Seleziona Tipologia</label>
                <div className="grid grid-cols-1 gap-2">
                  {rooms.map(room => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative ${
                        selectedRoom === room.id 
                          ? 'border-gold bg-gold/5 ring-1 ring-gold/20' 
                          : 'border-gray-100 hover:border-gold/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs tracking-wide text-gray-900">{room.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold italic font-serif">€{room.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gold mb-4">2. Ospiti</label>
                  <div className="flex items-center justify-between p-3 bg-beige/50 rounded-xl border border-gray-50">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-gold transition-colors"><Minus size={14} /></button>
                    <span className="font-bold text-sm">{guests}</span>
                    <button onClick={() => setGuests(Math.min(4, guests + 1))} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-gold transition-colors"><Plus size={14} /></button>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                    <div className="text-right">
                        <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-gold mb-4">Check-in / Out</span>
                        <div className="text-xs font-bold text-gray-500 py-3">
                            {range?.from ? format(range.from, 'dd/MM') : '--'} → {range?.to ? format(range.to, 'dd/MM') : '--'}
                        </div>
                    </div>
                </div>
              </div>

              <div className="flex justify-center pt-4 scale-90 lg:scale-100">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  disabled={{ before: new Date() }}
                />
              </div>

              <button 
                onClick={checkAvailability}
                disabled={!range?.from || !range?.to || loading}
                className="w-full flex items-center justify-center gap-4 bg-black text-white p-5 rounded-full hover:bg-gold transition-all duration-300 disabled:opacity-30 shadow-xl"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    {loading ? 'Verifica in corso...' : 'Continua Prenotazione'}
                </span>
                {!loading && <ArrowRight size={16} />}
                {loading && <Loader2 size={16} className="animate-spin" />}
              </button>
            </div>
          ) : (
            <form onSubmit={submitBooking} className="space-y-8 animate-fade-in h-full flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-serif mb-2">I tuoi Dettagli</h4>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Completa la richiesta di prenotazione</p>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <input required type="text" value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})} placeholder=" " className="peer w-full bg-transparent border-b border-gray-100 py-3 outline-none focus:border-gold transition-colors text-xs font-bold" />
                    <label className="absolute left-0 top-3 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 peer-focus:text-gold peer-focus:-translate-y-6 peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all pointer-events-none">Nome Completo</label>
                  </div>
                  <div className="relative">
                    <input required type="email" value={details.email} onChange={(e) => setDetails({...details, email: e.target.value})} placeholder=" " className="peer w-full bg-transparent border-b border-gray-100 py-3 outline-none focus:border-gold transition-colors text-xs font-bold" />
                    <label className="absolute left-0 top-3 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 peer-focus:text-gold peer-focus:-translate-y-6 peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all pointer-events-none">Indirizzo Email</label>
                  </div>
                  <div className="relative">
                    <input required type="tel" value={details.phone} onChange={(e) => setDetails({...details, phone: e.target.value})} placeholder=" " className="peer w-full bg-transparent border-b border-gray-100 py-3 outline-none focus:border-gold transition-colors text-xs font-bold" />
                    <label className="absolute left-0 top-3 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 peer-focus:text-gold peer-focus:-translate-y-6 peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all pointer-events-none">Telefono</label>
                  </div>
                </div>

                <div className="bg-beige p-6 rounded-2xl border border-gold/10">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gold mb-2">
                        <span>Totale Stimato</span>
                        <span>€{(selectedRoomObj?.price || 0) * (range?.from && range?.to ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) : 0)}</span>
                    </div>
                    <p className="text-[8px] text-gray-400 uppercase tracking-widest italic leading-relaxed">
                        Prezzo basato su {range?.from && range?.to ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) : 0} notti per {guests} persone.
                    </p>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button type="button" onClick={() => setStep(1)} className="text-[9px] font-black uppercase tracking-widest text-gray-300 hover:text-gold transition-colors underline underline-offset-8">Indietro</button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-10 py-5 rounded-full hover:bg-gold transition-all duration-500 shadow-xl flex items-center gap-3"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {loading ? 'Invio...' : 'Conferma'}
                  </span>
                  {!loading && <ArrowRight size={14} />}
                  {loading && <Loader2 size={14} className="animate-spin" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
