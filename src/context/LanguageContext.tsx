'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'it' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  it: {
    // Header
    nav_hotel: "L'Hotel",
    nav_rooms: "Camere",
    nav_events: "Eventi",
    nav_contacts: "Contatti",
    nav_book: "Prenota Ora",
    
    // Hero
    hero_subtitle: "Un'oasi di lusso in Sardegna",
    hero_cta: "Prenota Ora",
    hero_hover_cta: "Inizia il viaggio",
    
    // Intro / Dove siamo
    intro_label: "Dove Siamo",
    intro_text: "Situato a Cannigione, l'Hotel Micalosu è immerso nel verde del territorio di Arzachena e circondato da splendide colline di granito, che offrono una vista mozzafiato sull'Arcipelago di La Maddalena e il Golfo di Arzachena.",
    
    // Hotel
    hotel_label: "L'Hotel",
    hotel_title: "Un villaggio di granito affacciato sul mare",
    hotel_p1: "La struttura, sfruttando la naturale pendenza collinare del territorio che la circonda, offre ai suoi ospiti la possibilità di soggiornare sia nelle ampie camere con terrazza panoramica che si trovano all'interno del corpo principale, che nelle residenze che si estendono ad est, quasi a formare un piccolo villaggio ricco di angoli riservati e suggestivi.",
    hotel_p2: "Questa sua particolare caratteristica architettonica, arricchita dalla presenza di un grande giardino, offre un'esperienza unica nel suo genere, in cui l'esclusività e i servizi d'eccellenza dell'Hotel si fondono con l'indipendenza delle tante camere con vista sull'Arcipelago di La Maddalena.",
    
    // Stanze
    rooms_label: "Le Stanze",
    rooms_title: "Camere & Dependance",
    rooms_subtitle: "Le camere sono dotate dei comfort indispensabili per poter trascorrere, nel modo più piacevole possibile, tutti i momenti di riposo e ricarica della propria vacanza.",
    room_terrace_title: "Camere con Terrazza",
    room_terrace_type: "Corpo Principale",
    room_terrace_desc: "Ampie camere con terrazza panoramica all'interno del corpo principale della struttura.",
    room_dependance_title: "Dependance",
    room_dependance_type: "Giardino Privato",
    room_dependance_desc: "Più isolate e indipendenti rispetto alla struttura, ideali per chi desidera totale autonomia e assoluta privacy.",
    room_view_title: "Vista Arcipelago",
    room_view_type: "Vista Panoramica",
    room_view_desc: "Camere con vista sull'Arcipelago di La Maddalena, in angoli riservati e suggestivi.",
    room_price_from: "Da",
    room_night: "/ notte",
    room_book_btn: "Prenota Soggiorno",
    
    // Eventi
    events_label: "Eventi",
    events_title: "Oltre 30 anni di eventi indimenticabili",
    events_p1: "Hotel Micalosu offre eventi indimenticabili con oltre 30 anni di esperienza, specializzandosi in matrimoni. La nostra struttura unisce eleganza, bellezza naturale e servizio impeccabile per celebrazioni uniche.",
    events_p2: "Da pionieri nel settore, offriamo servizi di alta qualità in una location pittoresca circondata dalla bellezza di Arzachena. I nostri chef esperti creano menu personalizzati utilizzando ingredienti freschi e di alta qualità. Con un impegno per un servizio impeccabile, il nostro staff dedicato si assicura che ogni dettaglio sia curato.",
    events_p3: "Scegli Hotel Micalosu per un'esperienza indimenticabile che incarna la storia e la tradizione di Arzachena.",
    events_cta: "Contattaci per il tuo Evento",
    
    // Booking Form
    book_label: "Prenota Direttamente",
    book_title: "Prenota adesso",
    book_step1: "Tipologia Camera",
    book_step2: "Ospiti",
    book_step3: "Date del Soggiorno",
    book_ospite: "ospite",
    book_ospiti: "ospiti",
    book_checkin_out: "Check-in / Out",
    book_nights: "notti",
    book_total: "Totale Stimato",
    book_continue: "Continua la Prenotazione",
    book_loading: "Verifica...",
    book_details_title: "I tuoi Dati",
    book_details_subtitle: "Completa la richiesta di prenotazione",
    book_name: "Nome e Cognome",
    book_email: "Indirizzo Email",
    book_phone: "Telefono",
    book_back: "Indietro",
    book_confirm: "Conferma Prenotazione",
    book_sending: "Invio...",
    book_success: "Prenotazione Inviata",
    book_success_msg: "Grazie. Riceverai una conferma via email.",
    book_new: "Nuova Prenotazione",

    // Footer
    footer_news: "Novità & Offerte",
    footer_news_sub: "Iscriviti per ricevere novità sulla Gallura e offerte riservate.",
    footer_join: "Iscriviti",
    footer_privacy: "Privacy",
    footer_cookies: "Cookies",
  },
  en: {
    // Header
    nav_hotel: "Hotel",
    nav_rooms: "Rooms",
    nav_events: "Events",
    nav_contacts: "Contacts",
    nav_book: "Book Now",
    
    // Hero
    hero_subtitle: "A luxury oasis in Sardinia",
    hero_cta: "Book Now",
    hero_hover_cta: "Start the journey",
    
    // Intro / Where we are
    intro_label: "Where we are",
    intro_text: "Nestled in an oasis of serenity and tranquility where nature takes center stage, Hotel Micalosu is located in the splendid town of Cannigione on the renowned Costa Smeralda. This enchanting hotel is surrounded by breathtaking granite hills, offering stunning views of the La Maddalena Archipelago and the Gulf of Arzachena.",
    
    // Hotel
    hotel_label: "Hotel",
    hotel_title: "A granite village overlooking the sea",
    hotel_p1: "The structure, taking advantage of the natural hillside slope of the surrounding territory, offers its guests the possibility of staying both in the large rooms with panoramic terraces located inside the main body, and in the residences that extend to the east, almost forming a small village full of private and suggestive corners.",
    hotel_p2: "This unique architectural feature, enhanced by the presence of a large garden, provides a one-of-a-kind experience where the exclusivity and excellent services of the hotel blend with the independence of the many rooms overlooking the La Maddalena Archipelago.",
    
    // Rooms
    rooms_label: "Rooms",
    rooms_title: "Rooms & Annexes",
    rooms_subtitle: "The rooms are equipped with essential amenities to ensure that guests can enjoy their moments of rest and recharge during their vacation in the most pleasant way possible.",
    room_terrace_title: "Terrace Rooms",
    room_terrace_type: "Main Building",
    room_terrace_desc: "Large rooms with panoramic terrace inside the main body of the structure.",
    room_dependance_title: "Annexes",
    room_dependance_type: "Private Garden",
    room_dependance_desc: "More secluded and independent from the main building, ideal for those who desire total autonomy and absolute privacy.",
    room_view_title: "Archipelago View",
    room_view_type: "Panoramic View",
    room_view_desc: "Rooms with views of the La Maddalena Archipelago, in private and suggestive corners.",
    room_price_from: "From",
    room_night: "/ night",
    room_book_btn: "Book Stay",
    
    // Events
    events_label: "Events",
    events_title: "Over 30 years of unforgettable events",
    events_p1: "Hotel Micalosu offers unforgettable events with over 30 years of experience, specializing in weddings. Our venue combines elegance, natural beauty, and impeccable service for unique celebrations.",
    events_p2: "As pioneers in the sector, we offer high-quality services in a picturesque location surrounded by the beauty of Arzachena. Our expert chefs create personalized menus using fresh, high-quality ingredients. With a commitment to impeccable service, our dedicated staff ensures every detail is cared for.",
    events_p3: "Choose Hotel Micalosu for an unforgettable experience that embodies the history and tradition of Arzachena.",
    events_cta: "Contact us for your Event",
    
    // Booking Form
    book_label: "Book Directly",
    book_title: "Book now",
    book_step1: "Room Type",
    book_step2: "Guests",
    book_step3: "Stay Dates",
    book_ospite: "guest",
    book_ospiti: "guests",
    book_checkin_out: "Check-in / Out",
    book_nights: "nights",
    book_total: "Estimated Total",
    book_continue: "Continue Booking",
    book_loading: "Checking...",
    book_details_title: "Your Details",
    book_details_subtitle: "Complete the booking request",
    book_name: "Full Name",
    book_email: "Email Address",
    book_phone: "Phone",
    book_back: "Back",
    book_confirm: "Confirm Booking",
    book_sending: "Sending...",
    book_success: "Booking Sent",
    book_success_msg: "Thank you. You will receive an email confirmation soon.",
    book_new: "New Booking",

    // Footer
    footer_news: "News & Offers",
    footer_news_sub: "Sign up to receive news about Gallura and exclusive offers.",
    footer_join: "Join",
    footer_privacy: "Privacy",
    footer_cookies: "Cookies",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
