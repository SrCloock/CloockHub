'use client';

import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import SocialSection from './components/SocialSection';

export default function Home() {
  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-inner">
          <motion.svg
            className="shard"
            viewBox="0 0 64 88"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0.8, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <defs>
              <linearGradient id="shardGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f0c987" />
                <stop offset="55%" stopColor="#4fc3d9" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <polygon points="32,2 56,28 44,86 20,86 8,28" fill="url(#shardGrad)" opacity="0.92" />
            <polygon points="32,2 56,28 32,40 8,28" fill="#ffffff" opacity="0.18" />
          </motion.svg>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            SrCloock
          </motion.h1>

          <motion.p
            className="tag"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            // desarrollo, diseño y contenido bajo un mismo sello
          </motion.p>

          <motion.p
            style={{ marginTop: 18, color: 'var(--text-dim)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            Proyectos, apps y un universo propio — placeholder de descripción, cámbiame por tu bio real.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#proyectos" className="btn btn-gold">Ver proyectos</a>
            <a href="#redes" className="btn btn-ghost">Síguenos</a>
          </motion.div>
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
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">// el creador</span>
              <h2>Sobre mí</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-grid">
              <div className="about-portrait">[ tu foto o avatar aquí ]</div>
              <div className="about-text">
                <p>Placeholder: cuéntale a la gente quién eres, qué construyes y por qué. Dos o tres frases bastan — directas, con tu voz.</p>
                <p>Placeholder: menciona tu enfoque (apps, diseño, contenido...) y qué pueden esperar al seguirte.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="proyectos">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">// laboratorio</span>
              <h2>Proyectos & Apps</h2>
            </div>
          </Reveal>
          <div className="grid3">
            {[
              { tag: 'App', title: 'Nombre del proyecto 1' },
              { tag: 'Web', title: 'Nombre del proyecto 2' },
              { tag: 'Tool', title: 'Nombre del proyecto 3' },
            ].map((p, i) => (
              <Reveal delay={i * 0.1} key={p.title}>
                <div className="card">
                  <span className="tagchip">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>Descripción breve placeholder de qué hace esta app o proyecto.</p>
                  <a href="#" className="cta">Ver más →</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="redes" className="alt">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">// transmisión</span>
              <h2>Redes & streaming</h2>
            </div>
          </Reveal>

          <SocialSection />
        </div>
      </section>

      <Footer />
    </>
  );
}
