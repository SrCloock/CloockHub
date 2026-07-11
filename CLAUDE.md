# CloockHub — web de SrCloock

Next.js 14 (app router, JS sin TypeScript) + framer-motion + Supabase. Deploy en Vercel.

## Comandos

- `npm run dev` — desarrollo en :3000
- `npm run build` — build de producción (¡nunca con el dev server corriendo: comparten `.next` y se corrompe!)
- `npm run start` — sirve el build

En local, `/api/social/twitch|youtube` devuelven 503 sin credenciales de entorno; la UI ya contempla esos estados de error.

## Design system (julio 2026)

Sistema espacial definido íntegramente en `app/globals.css` — leerlo antes de tocar estilos:

- **Tokens** en `:root`: fondos `--bg-0/--bg-1/--surface`, acento único teal `--accent` (+ violeta solo para luz ambiental), radios `--r-*`, sombras `--shadow-*` + `--edge-light`, easing `--ease`.
- **Tipografía** con `next/font` en `app/layout.js`: Inter (texto) y Space Grotesk (display) como variables CSS. No añadir `<link>` de Google Fonts.
- **Motion**: solo `transform`/`opacity`. Los orbes de luz (`.ambient .orb`) son gradientes radiales pre-difuminados; no animar `filter`.
- **`PageTransition` anima solo opacity**: un transform en ese wrapper convierte a los elementos `position:fixed` (header, barra de progreso) en hijos de su containing block y los desplaza.
- **Glass** (backdrop-filter) solo como detalle: header con scroll, chips, live widget.
- Scroll narrativo: `ScrollProgress`, `Manifesto` (palabras iluminadas con scroll), parallax del hero en `HomeClient`.
- `GlowCard` da a las tarjetas una luz que sigue al puntero vía `--mx/--my`; `Reveal` es el reveal estándar al entrar en viewport.
- Los grids (`.grid3`, `.social-grid`) asumen wrappers de `Reveal` como hijos directos y estiran la tarjeta interior para igualar alturas.
