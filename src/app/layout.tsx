import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ['normal', 'italic'],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: "Hotel Micalosu | Esperienza di Lusso a Cannigione, Sardegna",
  description: "Vivi l'essenza autentica della Gallura all'Hotel Micalosu. Camere panoramiche, cucina d'eccellenza e vista mozzafiato sull'Arcipelago di La Maddalena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="font-sans min-h-full selection:bg-gold/30">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
