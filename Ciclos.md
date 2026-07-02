# Ciclos de mejora — CloockHub

Registro de ciclos de mejora ejecutados sobre la web. Cada entrada tiene una
nota PREVIA (estado real antes de tocar nada) y una nota POSTERIOR (qué
cambió, en concreto).

---

## Ciclo 1 — Fundaciones técnicas (SEO, metadata, imágenes, rendimiento)

### PREVIA
- No existía favicon ni apple-touch-icon: el navegador mostraba el icono
  genérico de Next.js.
- No había Open Graph ni Twitter Card: compartir el link en redes/Discord/WhatsApp
  no mostraba imagen ni descripción, solo el título pelado.
- No había `sitemap.xml` ni `robots.txt`: Google no tenía forma estructurada
  de descubrir las páginas ni instrucciones de rastreo.
- Los thumbnails de YouTube/Twitch se pintaban con `<img>` normal: sin
  lazy-loading real, sin `srcset` responsive, sin optimización de formato.
- `next.config.js` estaba vacío — ni siquiera había dominios remotos
  autorizados para imágenes optimizadas.
- El glow que sigue al cursor (`CursorGlow.js`) escribía en el DOM en cada
  evento `mousemove` sin ningún throttle ni `requestAnimationFrame`.

### Cambios
- `app/icon.svg`: favicon con el mismo fragmento (shard) dorado→teal→violeta
  del hero, sobre fondo `--bg`. Se intentó primero generarlo dinámicamente
  con `next/og` (`ImageResponse`), pero esa ruta rompe el `next build` en
  Windows (`TypeError: Invalid URL` dentro de `@vercel/og` al resolver la
  fuente por defecto) — se optó por un SVG estático, sin ese riesgo en
  ninguna plataforma. No hay `apple-icon` dedicado por ahora (gap conocido,
  ver nota posterior).
- `public/og-image.png`: tarjeta Open Graph 1200×630 con la paleta de marca,
  generada una vez con un script puntual (`sharp`, instalado solo para esa
  ejecución y no persistido en `package.json`) y commiteada como asset
  estático — se usa tanto para Open Graph como Twitter Card.
- `metadataBase` añadido en `app/layout.js` usando
  `VERCEL_PROJECT_PRODUCTION_URL` (dominio estable de Vercel en producción,
  ya lo inyecta la plataforma sin configurar nada) con fallback a
  `VERCEL_URL` y luego a `localhost:3000` en desarrollo.
- `app/sitemap.js` y `app/robots.js`: generación automática con las rutas
  reales del sitio (home, tienda, tiktok, contacto, privacidad, términos).
- `next.config.js`: `images.remotePatterns` para `i.ytimg.com` y
  `static-cdn.jtvnw.net` (dominios reales de los que ya se pedían thumbnails).
- Thumbnails de YouTube/Twitch migrados a `next/image` con `fill` +
  `sizes`, contenedores con `position:relative` y ratio fijo.
- `CursorGlow.js`: el movimiento del ratón ahora se aplica dentro de un
  `requestAnimationFrame`, cancelando el frame pendiente si llega un evento
  nuevo antes — evita escribir en el DOM más veces de las que el navegador
  puede pintar.

### POSTERIOR
- La pestaña del navegador y los accesos directos ya muestran un icono de
  marca en vez del logo genérico de Next.
- Compartir el link de la web en redes ahora genera vista previa con imagen
  y texto (verificable con el Rich Results Test de Google o el debugger de
  Open Graph de Facebook una vez esté desplegado en un dominio público).
- `/sitemap.xml` y `/robots.txt` responden con las rutas reales del sitio.
- Los thumbnails cargan de forma perezosa y con el tamaño optimizado por
  Next en vez de la imagen original sin procesar.
- El glow del cursor deja de escribir en el DOM en cada pixel de movimiento;
  ahora como mucho una vez por frame de pantalla.
- Pendiente/no verificable desde aquí: cómo se ve la tarjeta OG real en
  Twitter/Discord, porque para leerla esos servicios necesitan poder
  acceder a la URL pública ya desplegada — no se puede comprobar en local.
- Gap conocido y aceptado: no hay `apple-icon` dedicado (180×180) — iOS
  usará el `icon.svg` general o una captura de pantalla como fallback.
  Se puede añadir más adelante como PNG estático si hace falta.
- Verificado con `npm run build` (compila y prerrenderiza `/icon.svg`,
  `/sitemap.xml` y `/robots.txt` sin errores).

---

## Ciclo 2 — Hero asimétrico real + jerarquía visual entre secciones

### PREVIA
- El hero seguía perfectamente simétrico: todo centrado (`text-align:center`,
  columna única, icono pequeño arriba del título) pese a que la composición
  asimétrica se pidió desde el primer encargo — nunca llegó a aplicarse ahí,
  solo en las cards y el "sobre mí".
- El eyebrow del hero seguía con el copy viejo ("desarrollo, diseño y
  contenido bajo un mismo sello"), que ya no encajaba con el reposicionamiento
  hacia streaming hecho en la ronda anterior.
- Bug real de jerarquía: `#sobre-mi` y `#redes` llevaban ambas la clase
  `.alt`, así que iban seguidas con el mismo fondo — no había alternancia ni
  contraste entre secciones, todas pesaban visualmente igual pese a que
  streaming es la función principal del sitio (según el brief: "esto es lo
  importante").

### Cambios
- Hero reestructurado a un grid de dos columnas asimétrico (`.hero-grid`,
  60/40) en escritorio: texto alineado a la izquierda con el fragmento
  (shard) ahora como pieza decorativa grande, girada y con glow, a la
  derecha — no un icono pequeño centrado arriba del título. En móvil colapsa
  a una columna centrada (mismo criterio que ya se usaba en `.about-grid`).
- Eyebrow y copy del hero actualizados a coherencia con streaming.
- Quitada la clase `.alt` de `#redes`: ahora `#sobre-mi` es la única sección
  "alt", y `#redes` (streaming) tiene su propio tratamiento — más padding,
  fondo con foco de luz (`spotlight`) y cabecera más grande — para que se
  lea como la sección protagonista, no como una más de la lista.
- Bug encontrado de paso: había dos `@keyframes pulse` con el mismo nombre
  en `globals.css` (el del glow del `.shard` original y el del punto del
  banner en directo añadido en la ronda anterior). En CSS gana la última
  definición, así que el `.shard` llevaba semanas animando con el keyframe
  equivocado (escala/opacidad en vez del drop-shadow de color pensado
  originalmente). Se renombró el del banner a `livePulse` para separarlos.

### POSTERIOR
- El hero ya no es simétrico: en pantallas de escritorio el texto vive a la
  izquierda y el shard decorativo (más grande, rotado, con glow) ocupa la
  derecha, rompiendo la composición centrada que arrastraba desde el
  primer rediseño.
- Las tres secciones de la home alternan visualmente: `sobre-mi` (alt),
  `redes` (spotlight, la más "pesada"), sin dos fondos iguales seguidos.
- Verificado con `npm run build`.

---

## Ciclo 3 — Footer con estética Arcane

### PREVIA
- El footer no había cambiado desde el scaffold original: texto centrado en
  JetBrains Mono, sin logo, sin divisor, sin enlaces a redes — un bloque
  genérico debajo de una página con mucho trabajo de dirección de arte
  encima. Rompía la coherencia visual justo en el cierre de cada página.
- La lista de redes sociales (`SOCIALS`) estaba hardcodeada dentro de
  `SocialSection.js`; para reutilizarla en el footer sin duplicar datos
  (y arriesgar que se desincronizaran los links) hacía falta centralizarla.

### Cambios
- `lib/socials.js`: única fuente de verdad para nombre/handle/URL de cada
  red, importada tanto por `SocialSection.js` como por el nuevo `Footer.js`.
- `Footer.js` reescrito: divisor tipo "pincelada" (mismo SVG con gradiente
  dorado→teal→magenta que separa el hero del resto en la home) arriba del
  todo, logo de marca, fila de enlaces a redes con el mismo `glitch-hover`
  que usa el nav, y los enlaces legales que ya existían.
- CSS del footer con fondo `--bg-alt` + un halo teal sutil, tipografía
  Rajdhani para los enlaces de redes (coherente con el resto de la UI).

### POSTERIOR
- El footer ya no es una plantilla genérica: comparte divisor pintado, logo,
  tipografía y micro-interacción (`glitch-hover`) con el resto del sitio, y
  además ahora enlaza directamente a todas las redes, no solo a legal.
- Un solo array (`lib/socials.js`) alimenta tanto la sección de streaming
  como el footer — cambiar una URL ya no requiere tocar dos sitios.
- Verificado con `npm run build`.

---

## Ciclo 4 — Contacto y páginas legales heredando el rediseño

### PREVIA
- `contacto`, `privacidad` y `terminos` eran las únicas páginas que seguían
  con el layout genérico del scaffold: texto plano sobre el fondo de la
  sección, sin panel, sin borde, sin nada de la dirección de arte del resto
  del sitio — se notaba el salto al navegar desde la home.
- Bug real encontrado: en `globals.css` quedaron **tres reglas apuntando a
  `'Sora'`** (`.card h3`, `input/textarea`, `.legal h3`) después de que en el
  Ciclo 1 se cambiara la fuente del body a Inter y se dejara de cargar Sora
  en `layout.js`. Esas reglas llevaban desde entonces cayendo en el
  sans-serif por defecto del sistema sin que se notara a simple vista.
- El botón de enviar del formulario de contacto tenía `style={{border:'none'}}`
  puesto a mano — un resto de cuando `.btn-gold` tenía fondo sólido; con el
  cambio a borde+relleno en hover del Ciclo 1, ese override dejaba el botón
  de contacto sin el borde dorado que sí tienen el resto de botones "gold"
  del sitio, inconsistente sin motivo.

### Cambios
- Las tres reglas con `'Sora'` corregidas a `'Inter'` (coherente con la
  fuente real cargada).
- Quitado el `style={{border:'none'}}` inline del botón de envío.
- `.legal` ahora es un panel real: fondo `--bg-card`, borde, `clip-path`
  orgánico sutil (reutilizando el mismo criterio de bordes irregulares que
  las cards) y los `<h3>` llevan un acento vertical teal a la izquierda en
  vez de ser texto plano. El contenido legal en sí (textos de RGPD/términos)
  no se ha tocado — solo el envoltorio visual.
- Nuevo `.form-panel` en `contacto`: el formulario ahora vive dentro de un
  panel con el mismo tratamiento visual que el resto de paneles del sitio,
  en vez de flotar suelto sobre el fondo de la sección.

### POSTERIOR
- Las tres páginas "secundarias" ya no rompen la coherencia visual del
  sitio — comparten paneles, tipografía real (Inter, no el fallback del
  sistema) y acentos de color con el resto.
- El botón de contacto vuelve a verse igual que los demás botones "gold".
- Verificado con `npm run build`.

---

## Ciclo 5 — Accesibilidad del live-float + estados de carga con estética propia

### PREVIA
- El mini-reproductor flotante (`LiveWidget.js`) solo se podía mover con
  `onPointerDown` sobre la cabecera — un usuario que navegue solo con
  teclado no tenía ninguna forma de arrastrarlo, y tampoco había ningún rol
  ARIA ni nombre accesible: para un lector de pantalla era una `<div>`
  flotante sin contexto, salvo por el link del título.
- No había forma de cerrar el widget con teclado salvo tabulando hasta el
  botón de cierre (funcionaba, pero no había atajo, ni foco inicial claro).
- Los estados de "cargando" en `SocialSection.js` ("Comprobando directo…")
  eran texto plano sin ningún tratamiento visual — contrastaba con lo
  cuidado del resto de la interfaz, se sentía como un estado sin terminar.

### Cambios
- `LiveWidget.js`: la posición del panel flotante pasa a `useMotionValue`
  (`x`, `y`) compartidos entre el gesto de arrastre y el teclado, en vez de
  dejar que Framer Motion gestione un transform interno inaccesible.
  La cabecera (`live-float-head`) ahora es focable (`tabIndex=0`,
  `role="button"`, `aria-label` explicando que se puede arrastrar o mover
  con las flechas) y responde a `ArrowUp/Down/Left/Right` desplazando el
  panel 24px por pulsación.
- Añadido `role="dialog"` + `aria-label` en el contenedor flotante, y cierre
  con `Escape` además del botón `×`.
- Nuevo `.skeleton` en `globals.css`: bloque con el mismo `clip-path`
  orgánico que las cards y una animación de barrido de luz (gradiente
  dorado→teal) en vez de gris plano — se usa en `SocialSection.js` mientras
  `twitch.status === 'loading'` y mientras `youtube.status === 'loading'`,
  sustituyendo el texto "Comprobando directo…" / la ausencia de contenido.

### POSTERIOR
- El widget flotante ya se puede mover completamente con teclado (Tab hasta
  la cabecera, flechas para desplazar, Escape o el botón para cerrar) y
  tiene nombre y rol accesibles para lectores de pantalla.
- Los estados de carga de Twitch/YouTube ahora muestran un placeholder con
  la misma identidad visual del resto del sitio en vez de texto suelto.
- No verificado con lector de pantalla real (NVDA/VoiceOver) — la revisión
  se ha hecho por estructura ARIA y comportamiento de teclado, no con un
  lector de pantalla en marcha.
- Verificado con `npm run build`.

---
