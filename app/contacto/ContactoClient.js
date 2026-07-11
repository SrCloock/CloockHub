'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function Contacto() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const payload = {
      nombre: form.nombre.value,
      email: form.email.value,
      mensaje: form.mensaje.value,
      empresa: form.empresa.value,
    };

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Header />
      <section className="page-section">
        <div className="ambient" aria-hidden="true">
          <span className="orb orb-teal" style={{ width: 560, height: 560, top: '-10%', right: '-10%' }} />
          <span className="orb orb-violet" style={{ width: 440, height: 440, bottom: '0%', left: '-8%', animationDelay: '-9s' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Línea directa</span>
              <h2>Contacto</h2>
              <p className="section-sub">Colaboraciones, dudas o cualquier otra cosa — te leo.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="form-panel">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre">Nombre</label>
                  <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="tu@email.com" required />
                </div>
                <div>
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea id="mensaje" name="mensaje" placeholder="Escribe aquí..." required maxLength={5000} />
                </div>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="empresa">Empresa</label>
                  <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                  {status !== 'sending' && <span className="btn-arrow" aria-hidden="true">→</span>}
                </button>
                <div role="status" aria-live="polite">
                  {status === 'sent' && (
                    <motion.p
                      className="form-note form-note-ok"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      ✓ Mensaje enviado, ¡gracias! Te responderé en cuanto pueda.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      className="form-note form-note-error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Algo ha fallado al enviar el mensaje. Inténtalo de nuevo en un momento.
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </>
  );
}
