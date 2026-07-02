import './globals.css';
import PageTransition from './components/PageTransition';
import CursorGlow from './components/CursorGlow';
import LiveWidget from './components/LiveWidget';

export const metadata = {
  title: 'SrCloock',
  description: 'SrCloock — streaming, contenido y tienda.',
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
