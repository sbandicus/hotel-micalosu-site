'use client';

import Header from '@/components/Header';
import BookingSystem from '@/components/BookingSystem';
import ScrollReveal from '@/components/ScrollReveal';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  MapPin, Phone, Mail, Instagram, Facebook, Star, 
  Waves, Utensils, Heart, Ship, Compass, Palmtree, Quote, Camera, Music, Sparkles
} from 'lucide-react';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-white selection:bg-gold/30">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image 
            src="/images/hotel-vista-mare.jpg" 
            alt="Vista Arcipelago La Maddalena" 
            fill 
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <motion.div style={{ opacity }} className="relative text-center text-white px-6 z-10">
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center space-x-1 mb-8">
              {[...Array(4)].map((_, i) => <Star key={i} size={14} fill="#c5a059" color="#c5a059" />)}
            </div>
            <h1 className="text-7xl md:text-[10rem] mb-6 italic font-serif leading-none tracking-tight">
              Micalosu
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-[0.5em] uppercase mb-12">
              Sardinia Luxury Escape
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="#booking" 
                className="group relative px-14 py-5 bg-gold text-white rounded-full overflow-hidden transition-all shadow-2xl"
              >
                <span className="relative z-10 text-sm tracking-widest uppercase font-bold">Prenota Ora</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-sm tracking-widest uppercase font-bold pointer-events-none">Inizia il viaggio</span>
              </a>
            </div>
          </ScrollReveal>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 vertical-text font-bold">Scroll</span>
              <div className="w-px h-12 bg-white/20" />
            </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="hotel" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black mb-8 block">The Experience</span>
              <h2 className="text-3xl md:text-5xl font-serif leading-snug text-gray-900 mb-12">
                "Un luogo dove il tempo rallenta e la bellezza selvaggia della Gallura incontra l'ospitalità raffinata."
              </h2>
              <div className="w-20 h-px bg-gold/30 mx-auto" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* L'Hotel Grid Section */}
      <section className="pb-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <ScrollReveal direction="right" className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
                    <Image src="/images/giardino.jpg" alt="Giardino Hotel" fill className="object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="absolute -bottom-12 -right-12 w-2/3 aspect-square rounded-3xl overflow-hidden border-[12px] border-white shadow-2xl hidden md:block">
                    <Image src="/images/hotel-vista-mare.jpg" alt="Vista Mare" fill className="object-cover" />
                </div>
            </ScrollReveal>
            
            <ScrollReveal direction="left">
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">Architettura & Natura</span>
              <h3 className="text-4xl md:text-6xl mb-10 font-serif leading-tight">Un borgo di granito sospeso sul mare</h3>
              <div className="space-y-8 text-gray-500 text-lg leading-relaxed mb-12 font-light">
                <p>
                  Costruito seguendo l'antica sapienza delle maestranze sarde, l'Hotel Micalosu sorge tra i monoliti di granito di Arzachena, degradando dolcemente verso le acque smeraldine di Cannigione.
                </p>
                <p>
                  Ogni spazio è studiato per garantire la massima privacy, come in un vero villaggio mediterraneo dove ogni sentiero tra i fiori conduce alla tua oasi privata.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="group cursor-default">
                    <div className="w-14 h-14 rounded-2xl bg-beige group-hover:bg-gold transition-colors flex items-center justify-center text-gold group-hover:text-white mb-6">
                      <Waves size={28} />
                    </div>
                    <h5 className="font-bold text-xs uppercase tracking-widest mb-2">Infinity Pool</h5>
                    <p className="text-xs text-gray-400">Vista mozzafiato su La Maddalena.</p>
                </div>
                <div className="group cursor-default">
                    <div className="w-14 h-14 rounded-2xl bg-beige group-hover:bg-gold transition-colors flex items-center justify-center text-gold group-hover:text-white mb-6">
                      <Compass size={28} />
                    </div>
                    <h5 className="font-bold text-xs uppercase tracking-widest mb-2">Private Beach</h5>
                    <p className="text-xs text-gray-400">Accesso esclusivo ai segreti della costa.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Le Camere */}
      <section id="camere" className="py-32 bg-[#F9F6F2]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <ScrollReveal direction="right" className="max-w-2xl">
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-black mb-4 block">Refined Living</span>
              <h2 className="text-4xl md:text-6xl mb-6 font-serif">Camere & Suites</h2>
              <p className="text-gray-500 font-light text-xl italic">Spazi pensati per il riposo, circondati dal silenzio della natura gallurese.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <a href="#booking" className="text-sm font-bold uppercase tracking-widest border-b-2 border-gold/20 hover:border-gold pb-2 transition-all">Vedi tutte le tipologie</a>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Deluxe Sea View', type: 'Corpo Centrale', img: '/images/suite.jpg', price: '220', features: ['Balcone Privato', 'King Size Bed', 'Nespresso'] },
              { title: 'Sunset Dependance', type: 'Giardino Privato', img: '/images/camere.jpg', price: '180', features: ['Ingresso Indipendente', 'Patio Esterno', 'Privacy'] },
              { title: 'Junior Suite', type: 'Vista Panoramica', img: '/images/giardino.jpg', price: '280', features: ['Area Wellness', 'Terrazza', 'Vip Setup'] },
            ].map((room, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group bg-white h-full relative overflow-hidden transition-all duration-700 hover:-translate-y-4">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image 
                      src={room.img} 
                      alt={room.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gold mb-2 block">{room.type}</span>
                      <h4 className="text-3xl font-serif mb-4">{room.title}</h4>
                      <p className="text-xs text-white/60 flex items-center gap-2">Da <span className="text-lg font-bold text-white">€{room.price}</span> / notte</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-3 mb-8">
                      {room.features.map((f, j) => (
                        <li key={j} className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center">
                          <div className="w-1 h-1 rounded-full bg-gold mr-3" /> {f}
                        </li>
                      ))}
                    </ul>
                    <a href="#booking" className="block text-center py-4 border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Prenota Soggiorno</a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Eventi & Matrimoni Section - EXCLUSIVE FEATURE */}
      <section id="eventi" className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal direction="right">
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">Destinazione Eventi</span>
                <h2 className="text-4xl md:text-6xl mb-8 font-serif leading-tight">Celebrazioni che lasciano il segno</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-12 font-light">
                  L'Hotel Micalosu è da oltre 30 anni il palcoscenico dei matrimoni più suggestivi della Gallura. La nostra posizione strategica e l'architettura a borgo offrono scenari naturali incomparabili per il tuo giorno più bello.
                </p>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center text-gold shrink-0">
                      <Heart size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-2 font-sans">Wedding Planner dedicati</h4>
                      <p className="text-sm text-gray-500">Un team esperto per curare ogni dettaglio, dal banchetto agli allestimenti.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center text-gold shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-2 font-sans">Scenari Panoramici</h4>
                      <p className="text-sm text-gray-500">Ampie terrazze vista mare e giardini mediterranei per aperitivi al tramonto.</p>
                    </div>
                  </div>
                </div>

                <a href="#contatti" className="inline-block px-12 py-5 border-2 border-gold text-gold rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-all duration-500">
                  Richiedi un Preventivo Eventi
                </a>
              </ScrollReveal>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal direction="left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                      <Image src="/images/Ristorante.jpg" alt="Dining Event" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                      <Image src="/images/giardino.jpg" alt="Garden Event" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="pt-12 space-y-4">
                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                      <Image src="/images/hotel-vista-mare.jpg" alt="Vista Evento" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                      <Image src="/images/suite.jpg" alt="Couple Suite" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Serivzi & Esperienze */}
      <section className="py-32 bg-[#FAF9F7]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black mb-4 block">The Lifestyle</span>
            <h2 className="text-4xl md:text-5xl font-serif">I Nostri Servizi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Ship />, title: "Boat Tour", desc: "La Maddalena" },
              { icon: <Camera />, title: "Photo Shoot", desc: "Wedding Book" },
              { icon: <Music />, title: "Live Music", desc: "Evening Lounge" },
              { icon: <Palmtree />, title: "Private Park", desc: "Relax Area" },
            ].map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-3xl text-center group hover:bg-gold transition-all duration-500 shadow-sm border border-gray-50">
                  <div className="w-16 h-16 rounded-2xl bg-beige group-hover:bg-white/20 flex items-center justify-center text-gold group-hover:text-white mx-auto mb-6 transition-colors">
                    {service.icon}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2 group-hover:text-white font-sans">{service.title}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest group-hover:text-white/70">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <Quote className="mx-auto mb-10 text-gold/30" size={60} />
              <p className="text-2xl md:text-3xl font-serif italic text-gray-800 mb-10 leading-relaxed">
                "Una perla rara a Cannigione. La pace che si respira in questo hotel è indescrivibile. Il servizio è caloroso e autentico, ti senti a casa ma con il lusso di una vista impareggiabile."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center font-bold text-gold text-xs">FB</div>
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-900">Federico B.</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest italic font-sans leading-none">Verified Guest • TripAdvisor</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-32 bg-beige/30 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <ScrollReveal direction="right">
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">Reserva direct</span>
                <h2 className="text-5xl font-serif mb-10">Pianifica la tua prossima estate</h2>
                <div className="space-y-6 text-gray-500 font-light leading-relaxed mb-10">
                  <p>Prenota direttamente dal nostro sito per usufruire dei vantaggi esclusivi:</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-900 font-sans">
                      <div className="w-2 h-2 rounded-full bg-gold" /> Miglior Prezzo Garantito
                    </li>
                    <li className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-900 font-sans">
                      <div className="w-2 h-2 rounded-full bg-gold" /> Drink di Benvenuto all'arrivo
                    </li>
                    <li className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-900 font-sans">
                      <div className="w-2 h-2 rounded-full bg-gold" /> Cancellazione Flessibile
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2} direction="left">
                <div className="bg-white rounded-3xl p-4 sm:p-8 md:p-12 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)] border border-gray-50">
                  <BookingSystem />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contatti" className="bg-[#0D0D0D] text-white pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5">
              <ScrollReveal direction="right">
                <div className="mb-10">
                  <Image src="/images/Logo-Gold.png" alt="Logo" width={180} height={60} className="object-contain" />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm">
                  Un santuario di ospitalità sarda, dove l'attenzione ai dettagli e l'amore per il territorio creano esperienze indimenticabili dal 1994.
                </p>
                <div className="flex gap-6">
                  <a href="https://www.instagram.com/hotelmicalosu/" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"><Instagram size={18} /></a>
                  <a href="https://www.facebook.com/hotelmicalosu/" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"><Facebook size={18} /></a>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="md:col-span-3">
              <ScrollReveal delay={0.1}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-gold">Contatti</h4>
                <div className="space-y-8 text-gray-400">
                  <div className="flex gap-4">
                    <MapPin size={20} className="text-gold shrink-0" />
                    <p className="text-xs leading-relaxed uppercase tracking-widest font-sans">Loc. Micalosu, snc<br/>Arzachena (SS), Italy</p>
                  </div>
                  <div className="flex gap-4">
                    <Phone size={20} className="text-gold shrink-0" />
                    <p className="text-xs font-bold tracking-widest font-sans">+39 0789 86326</p>
                  </div>
                  <div className="flex gap-4">
                    <Mail size={20} className="text-gold shrink-0" />
                    <p className="text-xs font-bold tracking-widest font-sans">info@hotelmicalosu.it</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="md:col-span-4">
              <ScrollReveal delay={0.2}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-gold">News & Offers</h4>
                <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest leading-relaxed font-sans">Iscriviti per ricevere novità sulla Gallura e offerte riservate.</p>
                <form className="relative">
                  <input 
                    type="email" 
                    placeholder="E-MAIL" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xs font-bold tracking-[0.3em] focus:border-gold outline-none transition-colors"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gold font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors">Join</button>
                </form>
              </ScrollReveal>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-600 font-sans">
              © 2026 Hotel Micalosu. P.IVA 02130490906. Made by Digital Luxury.
            </p>
            <div className="flex gap-10">
              <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-gray-600 hover:text-white transition-colors font-sans">Privacy</a>
              <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-gray-600 hover:text-white transition-colors font-sans">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
