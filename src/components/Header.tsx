'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger subito al montaggio per evitare stati inconsistenti
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "L'Hotel", href: "#hotel" },
    { name: "Camere", href: "#camere" },
    { name: "Eventi", href: "#eventi" },
    { name: "Contatti", href: "#contatti" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 transition-all duration-700 pointer-events-auto ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl py-4 shadow-[0_1px_10px_rgba(0,0,0,0.05)] z-[1000]' 
            : 'bg-transparent py-8 z-[1000]'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative z-[1100] group">
            <div className="flex items-center gap-3">
              <Image 
                src="/images/Logo-Gold.png" 
                alt="Hotel Micalosu" 
                width={isScrolled ? 140 : 180} 
                height={50} 
                className="object-contain transition-all duration-700"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-12 relative z-[1100]">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-gold ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="#booking" 
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl hover:scale-105 active:scale-95 ${
                isScrolled 
                  ? 'bg-gold text-white hover:bg-black' 
                  : 'bg-white text-black hover:bg-gold hover:text-white'
              }`}
            >
              Prenota Ora
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden relative z-[1100]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-black" size={32} strokeWidth={1} />
            ) : (
              <Menu className={isScrolled ? 'text-black' : 'text-white'} size={32} strokeWidth={1} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[1050] bg-white transition-all duration-700 flex flex-col justify-center items-center ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-[-10%]'
      }`}>
        <nav className="flex flex-col items-center space-y-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif italic text-gray-900 hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="#booking" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-12 py-5 bg-gold text-white rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-2xl"
          >
            Prenota Soggiorno
          </Link>
        </nav>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-6">
            <div className="flex gap-8">
                <Instagram size={20} className="text-gray-400" />
                <Facebook size={20} className="text-gray-400" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Arzachena, Sardegna</p>
        </div>
      </div>
    </>
  );
}
