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

## Ciclo 6 — Navegación (header y menú móvil)

### PREVIA
- El botón de menú móvil (`.navtoggle`) tenía `aria-label="Abrir menú"` fijo,
  sin cambiar nunca a "Cerrar menú" cuando el panel ya estaba abierto, y sin
  `aria-expanded` ni `aria-controls` — un lector de pantalla no tenía forma
  de saber si el menú estaba desplegado o no.
- El icono del botón era siempre "☰": al abrir el menú no cambiaba a una
  "✕" ni ningún otro indicador visual — para un usuario vidente que lo pulsa,
  no hay confirmación en el propio botón de que hizo algo (solo se nota si
  mira el panel que aparece debajo).
- El menú móvil no se cerraba con `Escape` ni al pulsar fuera de él — solo
  se cerraba al elegir un enlace o volver a pulsar el botón.

### Cambios
- `Header.js`: `aria-expanded={navOpen}`, `aria-controls="site-nav"` en el
  botón, `id="site-nav"` en el panel, y `aria-label` dinámico
  ("Abrir menú" / "Cerrar menú").
- El icono del botón cambia entre "☰" y "✕" según `navOpen`.
- Cierre con `Escape` y al hacer click fuera del `<nav>` (listener global
  solo activo mientras el menú está abierto, para no penalizar el resto de
  la página).

### POSTERIOR
- El estado del menú móvil ahora es anunciable por un lector de pantalla
  (`aria-expanded`/`aria-controls`) y visualmente confirmado en el propio
  icono del botón.
- El menú se puede cerrar sin tener que encontrar de nuevo el botón exacto:
  `Escape` o click fuera funcionan.
- No verificado con lector de pantalla real, igual que en el Ciclo 5.
- Verificado con `npm run build`.

---

## Ciclo 7 — Página de TikTok: expuesta en el nav público sin control de dueño

### PREVIA
- `/tiktok` no es una feature para visitantes: es el panel del propio
  SrCloock para conectar su cuenta y publicar vídeos directamente desde la
  web (sube el archivo, llama a la Content Posting API de TikTok). Pese a
  eso, estaba enlazada en el menú principal (`Header.js`) igual que
  "Tienda" o "Contacto".
- Hallazgo de fondo más serio: el flujo OAuth (`login`/`callback`) está bien
  implementado (PKCE + `state`, cookies `httpOnly`+`secure`), pero **no
  comprueba en ningún momento que quien se conecta sea el dueño del
  sitio**. Cualquier visitante que llegue a `/tiktok` puede pulsar
  "Conectar con TikTok", autenticarse con **su propia cuenta** y usar el
  formulario para publicar vídeos a través de la app de TikTok registrada
  por SrCloock. No compromete la cuenta de SrCloock (cada visitante solo
  controla su propio token, en su propia cookie), pero convierte sin
  querer una herramienta personal en un "subidor de vídeos a TikTok
  gratis para cualquiera", fuera del propósito declarado de la
  integración — y es el tipo de uso que las plataformas suelen revisar al
  auditar una app.
- Bug de UX de bajo nivel: si TikTok no está configurado en el servidor
  (faltan `TIKTOK_CLIENT_KEY`/`SECRET`/`REDIRECT_URI`), el botón "Conectar
  con TikTok" es un `<a href="/api/tiktok/login">` normal; esa ruta
  devuelve un JSON de error plano (503), así que el visitante vería un
  JSON crudo en el navegador en vez de un mensaje entendible.

### Cambios
- Quitado el enlace "TikTok" del menú principal (`Header.js`): sigue
  siendo accesible por URL directa para SrCloock, pero deja de ofrecerse
  como sección más de la web a cualquier visitante.
- `GET /api/tiktok/me` ahora también devuelve `configured:
  isTiktokConfigured()`. La página usa ese dato para mostrar un aviso
  ("La integración con TikTok no está configurada todavía") en vez de un
  enlace que aterriza en JSON crudo cuando falta configurar las claves.

### No implementado — decisión pendiente del usuario
- **No he añadido ningún control de acceso al flujo de conexión/publicación.**
  Restringirlo solo al dueño requeriría un mecanismo de autenticación
  propio (contraseña compartida por variable de entorno, allowlist del
  `open_id` de TikTok tras el primer login, etc.) y una credencial que yo
  no puedo inventar ni configurar en Vercel por mi cuenta. Lo dejo
  documentado aquí como el hallazgo más importante de este ciclo para que
  se decida conscientemente: o se gatea el acceso, o se asume que es un
  uso aceptable tal cual.

### POSTERIOR
- El nav público ya no ofrece la herramienta de gestión de TikTok como si
  fuera una sección de contenido más.
- Si falta configurar TikTok en el servidor, el visitante que sí llegue a
  `/tiktok` ve un aviso legible en vez de JSON crudo.
- El problema de fondo (cualquiera puede conectar su propia cuenta y
  publicar a través de la app) sigue abierto — ver nota anterior.
- Verificado con `npm run build`.

---

## Ciclo 8 — Tienda: botón "Comprar" que no compra nada

### PREVIA
- Cada producto de `app/tienda/page.js` mostraba un botón "Comprar →" con
  `href="#"` — no es solo un placeholder de copy (eso ya se acordó dejarlo
  pendiente), es una **acción que aparenta funcionar y no hace nada**: un
  visitante real que pulse ese botón esperando ir a pagar solo verá la
  página saltar al principio. Esto entra directamente en la prioridad 2 del
  criterio de ciclos (datos/resultados engañosos), no en "falta contenido".

### Cambios
- `PRODUCTS` pasa a admitir un campo `url` opcional por producto.
- Si un producto tiene `url`, el CTA es un enlace real (`target="_blank"`)
  que lleva a esa pasarela/ficha de compra.
- Si no tiene `url` (como ahora, mientras no haya tienda real conectada),
  el CTA se sustituye por un estado honesto: "Próximamente" sin `href`,
  visualmente atenuado (`aria-disabled`), en vez de un enlace que finge
  funcionar.

### POSTERIOR
- Ya no hay ningún botón en la web que aparente ser una acción de compra
  real y no lleve a ningún sitio. En cuanto haya URLs de producto reales,
  basta con añadir el campo `url` a cada entrada de `PRODUCTS` para que el
  botón pase a funcionar solo, sin tocar el JSX.
- Verificado con `npm run build`.

---

## Ciclo 9 — Metadata real por página (título/descripción/robots)

### PREVIA
- Solo `privacidad` y `terminos` tenían `export const metadata` propio. La
  home, `/tienda`, `/contacto` y `/tiktok` heredaban el título y la
  descripción genéricos del layout raíz ("SrCloock" / "streaming, contenido
  y tienda") — en la pestaña del navegador, en resultados de Google y al
  compartir el link, todas las páginas se veían y describían igual, sin
  forma de distinguirlas.
- Motivo técnico de por qué no se había hecho ya: esos cuatro `page.js`
  eran Client Components (`'use client'` en la primera línea), y Next.js no
  permite exportar `metadata` desde un Client Component — hacía falta
  separar la UI interactiva de la exportación de metadata.

### Cambios
- Cada uno de esos cuatro `page.js` se dividió en dos archivos: la UI
  interactiva se movió tal cual a un componente cliente
  (`HomeClient.js`, `TiendaClient.js`, `ContactoClient.js`,
  `TiktokClient.js`), y el nuevo `page.js` de cada ruta es un Server
  Component que solo exporta `metadata` y renderiza el cliente.
- Título y descripción propios para home, tienda y contacto.
- `/tiktok` recibe además `robots: { index: false, follow: false }` — dado
  el hallazgo del Ciclo 7 (es una herramienta de gestión personal, no una
  página pensada para visitantes ni para buscadores), y se ha quitado de
  `app/sitemap.js` por el mismo motivo.

### POSTERIOR
- Cada página tiene ahora su propio título/descripción reales: se nota en
  la pestaña del navegador, en resultados de búsqueda y al compartir cada
  URL por separado.
- `/tiktok` queda explícitamente fuera del sitemap y marcada como
  `noindex`, coherente con no ofrecerla ya en el menú público.
- No se ha tocado ningún comportamiento de UI: el refactor solo mueve dónde
  vive el JSX, no cambia lo que renderiza.
- Verificado con `npm run build` (21 rutas generadas sin error).

---

## Ciclo 10 — Accesibilidad y consistencia del formulario de contacto

### PREVIA
- Al enviar el formulario, el resultado ("Mensaje enviado" / "Algo ha
  fallado") aparecía como un `<p>` normal sin `aria-live` ni `role="status"`:
  un usuario de lector de pantalla no recibía ningún aviso de que el envío
  había terminado, ni si había ido bien o mal — tenía que volver a explorar
  la página a ciegas para enterarse.
- Bug de consistencia encontrado de paso: el mensaje de error usaba solo la
  clase `form-note` (texto en el color neutro `--text-dim`), no
  `form-note-error` (rojo, ya definida en `globals.css` y usada en la
  página de TikTok) — el error de contacto se veía visualmente igual que un
  mensaje de éxito.

### Cambios
- Los mensajes de resultado ahora viven dentro de un contenedor
  `role="status" aria-live="polite"` que permanece montado en el DOM (solo
  cambia su contenido), para que los lectores de pantalla anuncien el
  resultado en cuanto llega.
- El mensaje de error del formulario de contacto ahora usa
  `form-note-error`, igual que el resto de mensajes de error del sitio.

### POSTERIOR
- Un usuario de lector de pantalla que envíe el formulario se entera del
  resultado sin tener que volver a navegar la página.
- El mensaje de error de contacto ya se ve visualmente distinto del de
  éxito, coherente con el resto de la web.
- No verificado con lector de pantalla real, igual que en ciclos anteriores
  de accesibilidad.
- Verificado con `npm run build`.

---

## Ciclo 11 — `lib/twitch.js` y `lib/youtube.js`: peticiones sin timeout

### PREVIA
- Ninguna de las llamadas `fetch` a las APIs de Twitch/YouTube tenía límite
  de tiempo. Si Google o Twitch se quedaban colgados o respondían muy
  lento, la petición del servidor podía quedarse esperando indefinidamente.
  En la práctica esto significa que el skeleton de carga añadido en el
  Ciclo 5 (o el "Comprobando directo…") se podría quedar girando para
  siempre en vez de caer al estado de error ya implementado — el manejo de
  errores existía, pero solo cubría "la API respondió con fallo", no
  "la API nunca respondió".

### Cambios
- Todas las llamadas `fetch` de `lib/youtube.js` y `lib/twitch.js` llevan
  ahora `signal: AbortSignal.timeout(8000)`. Al superar los 8s, el `fetch`
  lanza y el `try/catch` que ya existía en cada ruta API (`/api/social/*`)
  lo convierte en un 500/503 normal, que el frontend ya sabía interpretar
  como estado de error.

### POSTERIOR
- Una API externa colgada ya no puede dejar el skeleton de carga girando
  indefinidamente: como mucho 8 segundos antes de caer al estado de error
  que ya existía en la UI.
- No se ha podido probar el caso real de "API externa colgada" (no hay
  forma de simularlo sin acceso a inyectar latencia en Twitch/Google) —
  verificado por lectura de código y por el hecho de que el resto del
  manejo de errores ya cubre la ruta de fallo.
- Verificado con `npm run build`.

---

## Ciclo 12 — Bug de layout: menú móvil se solapa con el banner "en directo"

### PREVIA
- Descartado antes de empezar: pasar `Reveal.js`/las animaciones simples de
  Framer Motion a CSS puro para "aligerar el bundle" no aporta nada real —
  Framer Motion ya se carga en todas las páginas de todos modos porque
  `PageTransition.js` y `LiveWidget.js` (montados en `layout.js`) lo usan
  siempre. Quitarlo de `Reveal` añadiría código sin bajar ni un KB del
  bundle compartido. Se descarta explícitamente para no hacer relleno.
- Bug real encontrado en su lugar: en móvil, el panel desplegable del menú
  (`.navlinks`) está anclado con `top:64px` fijo, asumiendo que esa es
  siempre la altura del header. Pero cuando el banner "EN DIRECTO" del
  Ciclo 5/anterior está activo, el header se desplaza a `top:36px` y pasa a
  ocupar hasta ~100px de alto — el menú desplegado seguía apareciendo a
  64px, solapándose visualmente con la parte baja del header mientras hay
  directo y el visitante abre el menú en móvil.

### Cambios
- `body.live-banner-active .navlinks{ top:100px; }` dentro del media query
  móvil, con una transición de `top` a juego con el resto de movimientos
  del header.

### POSTERIOR
- El menú móvil ya no se solapa con el header cuando hay un directo activo
  y el banner está visible — se desplaza igual que el propio header.
- Verificado con `npm run build`. No se ha podido verificar visualmente en
  un dispositivo real con un directo activo simultáneamente (depende de que
  Twitch esté en directo en el momento de la prueba); la corrección se basa
  en el cálculo de alturas del propio CSS, no en una captura visual.

---

## Ciclo 13 — Cabeceras de seguridad básicas ausentes

### PREVIA
- `next.config.js` no fijaba ninguna cabecera de seguridad: sin
  `X-Content-Type-Options`, sin `Referrer-Policy`, sin `X-Frame-Options`,
  sin `Permissions-Policy`. Nada roto de cara al usuario, pero es la
  higiene básica que cualquier auditoría (o el propio Lighthouse/Security
  Headers checker) señalaría de inmediato.

### Cambios
- Añadido un bloque `headers()` en `next.config.js` aplicado a todas las
  rutas: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: SAMEORIGIN`, y `Permissions-Policy` bloqueando
  cámara/micrófono/geolocalización (el sitio no usa ninguno).

### No implementado — decisión pendiente del usuario
- **No he añadido una Content-Security-Policy.** Sería lo siguiente lógico,
  pero una CSP mal calibrada puede romper en producción cosas que aquí sí
  se usan de verdad: la hoja de estilos de Google Fonts, los estilos
  inline que inyecta Framer Motion, y el iframe de embed de Twitch. Definir
  una CSP correcta requiere probarla contra el sitio desplegado de verdad
  (no solo en local) para no arriesgarme a romper el embed en directo sin
  poder verlo. Lo dejo señalado en vez de improvisar una CSP a ciegas.

### POSTERIOR
- El sitio ya envía las cabeceras de seguridad básicas — verificado en
  caliente con `curl -I` contra el servidor de desarrollo, no solo leído en
  el código.
- Verificado con `npm run build`.

---

## Ciclo 14 — Regresión propia: el live-float se podía arrastrar fuera de la pantalla

### PREVIA
- Descartado antes de empezar: auditar el `alt=""` de las imágenes
  (thumbnails, avatar de TikTok) — están todas seguidas de un `<h3>` con el
  mismo texto que describiría la imagen, así que `alt=""` es el patrón
  correcto (evita que el lector de pantalla anuncie el título dos veces),
  no un bug. Se descarta para no inventar trabajo donde ya está bien hecho.
- Bug real encontrado, y es mío: al refactorizar `LiveWidget.js` en el
  Ciclo 5 para soportar el movimiento por teclado, quité los
  `dragConstraints` que limitaban hasta dónde se podía arrastrar el panel
  flotante con el ratón (los llevaba desde que se creó el componente). El
  resultado: se podía arrastrar completamente fuera de la pantalla y
  quedaba inalcanzable con el ratón — solo `Escape` (si el usuario sabía
  que existía esa tecla) permitía recuperarlo. Las flechas de teclado
  tampoco tenían límite, así que también se podían "perder" el panel con
  el teclado.

### Cambios
- Vuelven los límites de arrastre (`dragConstraints`), ahora calculados
  respecto a la posición base del panel (esquina superior derecha) en vez
  de a coordenadas absolutas de pantalla.
- El mismo cálculo de límites se aplica al desplazamiento por teclado
  (`ArrowUp/Down/Left/Right`), así que tampoco se puede sacar el panel de
  la pantalla a base de pulsar flechas.

### POSTERIOR
- El mini-reproductor ya no se puede perder fuera del área visible ni con
  ratón ni con teclado — se puede mover con libertad dentro de un margen de
  8px de cada borde.
- Verificado con `npm run build`. No se ha probado arrastrando físicamente
  en un navegador real dentro de esta sesión — la corrección se basa en
  revisar la lógica de límites, no en una prueba manual de arrastre.

---

## Ciclo 15 — Variable de entorno introducida sin documentar

### PREVIA
- El Ciclo 1 introdujo `NEXT_PUBLIC_SITE_URL` (usada en `layout.js`,
  `sitemap.js` y `robots.js` como primera opción antes de caer a las
  variables automáticas de Vercel), pero nunca se añadió a `.env.example`
  — quien fuera a configurar el proyecto desde cero no tenía forma de saber
  que esa variable existía ni para qué servía.

### Cambios
- Añadida a `.env.example` con un comentario explicando qué hace y cuál es
  el fallback automático si no se define.

### POSTERIOR
- `.env.example` vuelve a reflejar de verdad todas las variables que el
  código usa. No hay build ni comportamiento que verificar aquí más allá de
  que el archivo es texto plano correcto.

---

## Ciclo 16 — El formulario de contacto no tenía ninguna protección anti-spam

### PREVIA
- `POST /api/contacto` insertaba en Supabase cualquier envío sin límite de
  tamaño ni ningún mecanismo anti-bot: ni honeypot, ni rate limiting, ni
  captcha. Un bot simple que descubra el endpoint podría llenar la tabla
  `contact_messages` sin fricción, y un payload enorme en `mensaje` se
  guardaría igualmente.

### Cambios
- Campo honeypot (`empresa`) añadido al formulario: invisible para
  personas (desplazado fuera de pantalla con CSS, no `display:none`, para
  no ser tan trivial de detectar por bots que sí comprueban eso) pero
  presente en el HTML, donde los bots de autorrelleno suelen caer. Si llega
  relleno, la API responde `{ ok: true }` sin insertar nada — no delata el
  mecanismo al bot.
- Límite de tamaño server-side: 200 caracteres para nombre/email, 5000 para
  el mensaje (con `maxLength` a juego en el `<textarea>` del cliente).

### No implementado — decisión pendiente del usuario
- No hay rate limiting (por IP o similar): un bot que ignore el honeypot y
  mande cientos de peticiones seguidas no encontraría ningún límite. Añadir
  eso bien (con estado compartido entre invocaciones serverless) normalmente
  se apoya en Redis/Upstash o en el rate limiting nativo de Vercel — no lo
  he montado porque implica decidir y provisionar infraestructura nueva,
  no es un cambio de código autocontenido como el resto de este ciclo.

### POSTERIOR
- Verificado en caliente (no solo por lectura de código): una petición con
  el campo honeypot relleno devuelve `{"ok":true}` sin tocar la base de
  datos, y una petición con un mensaje de 6000 caracteres devuelve 400.
- Verificado con `npm run build`.

---
