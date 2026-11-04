import type { Metadata } from "next";
import { Inter, Newsreader, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KelanaBali — Visual-First Travel Hub untuk Wisatawan Muda",
  description:
    "Bali's Calling — Let's Vibe And Explore Together. Panduan dan perencana perjalanan visual untuk wisatawan muda di Bali.",
  keywords: [
    "Bali Travel",
    "KelanaBali",
    "Itinerary Bali",
    "Wisata Bali Gen-Z",
    "Spot Aesthetic Bali",
    "Bali Travel Hub",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${newsreader.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="bg-white text-brand-dark min-h-screen selection:bg-brand-teal selection:text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

