import './globals.css';
import PageTransition from './components/PageTransition';
import CursorGlow from './components/CursorGlow';
import LiveWidget from './components/LiveWidget';

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

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Inter:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CursorGlow />
        <LiveWidget />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
