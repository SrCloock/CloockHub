'use client';

import { useState } from 'react';
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
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">// línea directa</span>
              <h2>Contacto</h2>
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
                  <textarea id="mensaje" name="mensaje" placeholder="Escribe aquí..." required />
                </div>
                <button type="submit" className="btn btn-gold" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                </button>
                {status === 'sent' && <p className="form-note">Mensaje enviado, ¡gracias! Te responderé en cuanto pueda.</p>}
                {status === 'error' && <p className="form-note">Algo ha fallado al enviar el mensaje. Inténtalo de nuevo en un momento.</p>}
              </form>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </>
  );
}
