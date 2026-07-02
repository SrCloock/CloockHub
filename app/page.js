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
        <span className="particle" style={{ width: 4, height: 4, left: '18%', top: '30%', background: 'var(--gold-soft)', boxShadow: '0 0 12px var(--gold-soft)', animationDelay: '0s' }} />
        <span className="particle" style={{ width: 6, height: 6, left: '78%', top: '22%', background: 'var(--hex)', boxShadow: '0 0 14px var(--hex)', animationDelay: '1.5s' }} />
        <span className="particle" style={{ width: 3, height: 3, left: '62%', top: '68%', background: 'var(--magenta)', boxShadow: '0 0 10px var(--magenta)', animationDelay: '3s' }} />
        <span className="particle" style={{ width: 5, height: 5, left: '30%', top: '75%', background: 'var(--shimmer)', boxShadow: '0 0 12px var(--shimmer)', animationDelay: '4.5s' }} />
        <div className="hero-grid">
          <div className="hero-text">
            <motion.span
              className="eyebrow"
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              // en directo cuando toca
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              SrCloock
            </motion.h1>

            <motion.p
              style={{ marginTop: 18, color: 'var(--text-dim)' }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              Streaming y contenido, en directo y bajo demanda.
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#redes" className="btn btn-gold">Ver directo</a>
              <a href="/tienda" className="btn btn-ghost">Ir a la tienda</a>
            </motion.div>
          </div>

          <motion.svg
            className="shard"
            viewBox="0 0 64 88"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0.8, y: -12, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -6 }}
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
              <div className="about-portrait">[ foto ]</div>
              <div className="about-text">
                <p>Bio pendiente — texto definitivo por confirmar.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="redes" className="spotlight">
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
