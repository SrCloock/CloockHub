'use client';

import { useState } from 'react';

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <header>
        <nav>
          <div className="logo">SR<span>CLOOCK</span></div>
          <button className="navtoggle" aria-label="Abrir menú" onClick={() => setNavOpen(!navOpen)}>☰</button>
          <div className={`navlinks ${navOpen ? 'open' : ''}`}>
            <a href="#sobre-mi" onClick={() => setNavOpen(false)}>Sobre mí</a>
            <a href="#proyectos" onClick={() => setNavOpen(false)}>Proyectos</a>
            <a href="#tienda" onClick={() => setNavOpen(false)}>Tienda</a>
            <a href="#redes" onClick={() => setNavOpen(false)}>Redes</a>
            <a href="#contacto" onClick={() => setNavOpen(false)}>Contacto</a>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <svg className="shard" viewBox="0 0 64 88" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="shardGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f0c987" />
                <stop offset="55%" stopColor="#4fc3d9" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <polygon points="32,2 56,28 44,86 20,86 8,28" fill="url(#shardGrad)" opacity="0.92" />
            <polygon points="32,2 56,28 32,40 8,28" fill="#ffffff" opacity="0.18" />
          </svg>
          <h1>SrCloock</h1>
          <p className="tag">// donde Piltover se encuentra con Zaun</p>
          <p style={{ marginTop: 18, color: 'var(--text-dim)' }}>
            Proyectos, apps y un universo propio — placeholder de descripción, cámbiame por tu bio real.
          </p>
          <div className="hero-cta">
            <a href="#proyectos" className="btn btn-gold">Ver proyectos</a>
            <a href="#redes" className="btn btn-ghost">Síguenos</a>
          </div>
        </div>
      </section>

      <svg className="crack" viewBox="0 0 1080 46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="crackGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4a24c" />
            <stop offset="50%" stopColor="#4fc3d9" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path d="M0,23 L260,23 L300,8 L340,38 L400,23 L1080,23" stroke="url(#crackGrad)" strokeWidth="2" fill="none" opacity="0.7" />
      </svg>

      <section id="sobre-mi" className="alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">// el creador</span>
            <h2>Sobre mí</h2>
          </div>
          <div className="about-grid">
            <div className="about-portrait">[ tu foto o avatar aquí ]</div>
            <div className="about-text">
              <p>Placeholder: cuéntale a la gente quién eres, qué construyes y por qué. Dos o tres frases bastan — directas, con tu voz.</p>
              <p>Placeholder: menciona tu enfoque (apps, diseño, contenido...) y qué pueden esperar al seguirte.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="proyectos">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">// hextech lab</span>
            <h2>Proyectos & Apps</h2>
          </div>
          <div className="grid3">
            {[
              { tag: 'App', title: 'Nombre del proyecto 1' },
              { tag: 'Web', title: 'Nombre del proyecto 2' },
              { tag: 'Tool', title: 'Nombre del proyecto 3' },
            ].map((p) => (
              <div className="card" key={p.title}>
                <span className="tagchip">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>Descripción breve placeholder de qué hace esta app o proyecto.</p>
                <a href="#" className="cta">Ver más →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tienda" className="alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">// arsenal</span>
            <h2>Tienda</h2>
          </div>
          <div className="grid3">
            {[
              { title: 'Producto 1', price: '19,99 €' },
              { title: 'Producto 2', price: '24,99 €' },
              { title: 'Producto 3', price: '14,99 €' },
            ].map((p) => (
              <div className="card" key={p.title}>
                <span className="tagchip">Merch</span>
                <h3>{p.title}</h3>
                <p className="price">{p.price}</p>
                <a href="#" className="cta">Comprar →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="redes">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">// transmisión</span>
            <h2>Redes sociales</h2>
          </div>
          <div className="social-grid">
            {[
              { name: 'X / Twitter', handle: '@srcloock' },
              { name: 'Instagram', handle: '@srcloock' },
              { name: 'YouTube', handle: '/srcloock' },
              { name: 'Twitch', handle: '/srcloock' },
              { name: 'TikTok', handle: '@srcloock' },
              { name: 'Discord', handle: 'Únete' },
            ].map((s) => (
              <a href="#" className="social-item" key={s.name}>
                {s.name}
                <span className="platform">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">// línea directa</span>
            <h2>Contacto</h2>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" type="text" placeholder="Tu nombre" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="tu@email.com" />
            </div>
            <div>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" placeholder="Escribe aquí..." />
            </div>
            <button type="submit" className="btn btn-gold" style={{ border: 'none' }}>Enviar mensaje</button>
            <p className="form-note">Este formulario aún no envía nada — se conecta a una API route propia o a Formspree más adelante.</p>
          </form>
        </div>
      </section>

      <footer>
        © {year} SrCloock — todos los derechos reservados.
      </footer>
    </>
  );
}
