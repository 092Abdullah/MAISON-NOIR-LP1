import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Cormorant_Garamond } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Maison Noir — Interior Design Studio',
  description:
    'Maison Noir is a full-service interior design studio crafting refined, livable spaces with an emphasis on materiality, light, and quiet luxury.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
