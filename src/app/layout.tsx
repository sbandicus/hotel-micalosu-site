import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

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
  title: "Hotel Micalosu | Luxury Experience in Cannigione, Sardinia",
  description: "Experience the authentic essence of Gallura at Hotel Micalosu. Modern minimalist design, gourmet restaurant, and breathtaking views of La Maddalena archipelago.",
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
      <body className="font-sans min-h-full selection:bg-gold/30">{children}</body>
    </html>
  );
}
