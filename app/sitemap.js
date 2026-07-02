const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  'http://localhost:3000';

export default function sitemap() {
  const routes = ['', '/tienda', '/contacto', '/privacidad', '/terminos'];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
