import HomeClient from './HomeClient';

export const metadata = {
  title: 'SrCloock — Streaming, contenido y tienda',
  description: 'En directo en Twitch, últimos vídeos y toda la tienda de SrCloock en un solo sitio.',
};

export default function Page() {
  return <HomeClient />;
}
