'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import SocialSection from './components/SocialSection';
import Manifesto from './components/Manifesto';

const EASE = [0.22, 1, 0.36, 1];

const intro = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const introItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export default function HomeClient() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Narrativa de scroll: el hero se aleja y apaga suavemente al avanzar.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -90]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      <Header />

      <section className="hero" ref={heroRef}>
        <div className="ambient" aria-hidden="true">
          <span className="orb orb-teal" style={{ width: 640, height: 640, top: '-18%', left: '-12%' }} />
          <span className="orb orb-violet" style={{ width: 560, height: 560, bottom: '-22%', right: '-10%', animationDelay: '-6s' }} />
          <span className="orb orb-amber" style={{ width: 380, height: 380, top: '8%', right: '18%', animationDelay: '-11s' }} />
        </div>

        <motion.div className="hero-grid" style={{ opacity: heroOpacity }}>
          <motion.div className="hero-text" style={{ y: textY }} variants={intro} initial="hidden" animate="show">
            <motion.span className="hero-badge" variants={introItem}>
              <span className="pulse-dot" aria-hidden="true" />
              En directo cuando toca
            </motion.span>

            <motion.h1 variants={introItem}>
              Streaming y contenido,
              <br />
              <span className="accent-word">a su hora.</span>
            </motion.h1>

            <motion.p className="tag" variants={introItem}>
              Directos en Twitch, vídeos en YouTube y clips donde haga falta.
              Una sola base para todo lo que hace SrCloock.
            </motion.p>

            <motion.div className="hero-cta" variants={introItem}>
              <a href="#redes" className="btn btn-primary">
                Ver directo <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href="/tienda" className="btn btn-ghost">Ir a la tienda</a>
            </motion.div>

            <motion.div className="hero-meta" variants={introItem}>
              <div className="meta-item">
                <span className="meta-value">Twitch</span>
                <span className="meta-label">Directos</span>
              </div>
              <div className="meta-item">
                <span className="meta-value">YouTube</span>
                <span className="meta-label">Vídeos</span>
              </div>
              <div className="meta-item">
                <span className="meta-value">TikTok</span>
                <span className="meta-label">Clips</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            style={{ y: visualY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            aria-hidden="true"
          >
            <div className="orbit orbit-1"><span className="sat sat-teal" /></div>
            <div className="orbit orbit-2"><span className="sat sat-violet" /></div>
            <div className="orbit orbit-3"><span className="sat sat-amber" /></div>
            <div className="hero-core" />
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          aria-hidden="true"
        >
          Scroll
          <span className="line" />
        </motion.div>
      </section>

      <Manifesto text="Menos ruido y más directo. Contenido con identidad propia, hecho a fuego lento para la comunidad." />

      <section id="sobre-mi" className="alt">
        <div className="ambient" aria-hidden="true">
          <span className="orb orb-violet" style={{ width: 480, height: 480, top: '-10%', right: '-8%' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">01 · El creador</span>
              <h2>Sobre mí</h2>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="about-grid">
              <div className="about-portrait">
                <span className="portrait-mark" aria-hidden="true">SR</span>
                <span className="portrait-note">foto próximamente</span>
              </div>
              <div className="about-text">
                <p>Bio pendiente — texto definitivo por confirmar.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider" aria-hidden="true" />

      <section id="redes" className="spotlight">
        <div className="ambient" aria-hidden="true">
          <span className="orb orb-teal" style={{ width: 700, height: 700, top: '-16%', left: '50%', marginLeft: -350 }} />
          <span className="orb orb-violet" style={{ width: 460, height: 460, bottom: '-14%', left: '-8%', animationDelay: '-8s' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">02 · Transmisión</span>
              <h2>Redes &amp; streaming</h2>
              <p className="section-sub">Lo último en directo y bajo demanda, en un solo sitio.</p>
            </div>
          </Reveal>

          <SocialSection />
        </div>
      </section>

      <Footer />
    </>
  );
}
