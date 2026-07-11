'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import GlowCard from '../components/GlowCard';

const PRODUCTS = [
  { title: 'Producto 1', price: '19,99 €', url: null },
  { title: 'Producto 2', price: '24,99 €', url: null },
  { title: 'Producto 3', price: '14,99 €', url: null },
];

export default function Tienda() {
  return (
    <>
      <Header />
      <section className="page-section">
        <div className="ambient" aria-hidden="true">
          <span className="orb orb-teal" style={{ width: 560, height: 560, top: '-12%', left: '-10%' }} />
          <span className="orb orb-violet" style={{ width: 460, height: 460, top: '20%', right: '-8%', animationDelay: '-7s' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Merch oficial</span>
              <h2>Tienda</h2>
              <p className="section-sub">Piezas limitadas de la comunidad. Muy pronto disponibles.</p>
            </div>
          </Reveal>
          <div className="grid3">
            {PRODUCTS.map((p, i) => (
              <Reveal delay={i * 0.1} key={p.title}>
                <GlowCard className="card">
                  <div className="product-visual" aria-hidden="true">
                    <span className="monogram">SR</span>
                  </div>
                  <span className="tagchip">Merch</span>
                  <h3>{p.title}</h3>
                  <p className="price">{p.price}</p>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer" className="cta">Comprar</a>
                  ) : (
                    <span className="cta cta-disabled" aria-disabled="true">Próximamente</span>
                  )}
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
