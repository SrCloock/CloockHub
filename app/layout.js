import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import PageTransition from './components/PageTransition';
import CursorGlow from './components/CursorGlow';
import LiveWidget from './components/LiveWidget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'SrCloock',
  description: 'SrCloock — streaming, contenido y tienda.',
  openGraph: {
    title: 'SrCloock',
    description: 'SrCloock — streaming, contenido y tienda.',
    url: SITE_URL,
    siteName: 'SrCloock',
    locale: 'es_ES',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SrCloock',
    description: 'SrCloock — streaming, contenido y tienda.',
    images: ['/og-image.png'],
  },
};

export const viewport = {
  themeColor: '#05070c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <CursorGlow />
        <LiveWidget />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
