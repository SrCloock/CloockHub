'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

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
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">// arsenal</span>
              <h2>Tienda</h2>
            </div>
          </Reveal>
          <div className="grid3">
            {PRODUCTS.map((p, i) => (
              <Reveal delay={i * 0.1} key={p.title}>
                <div className="card">
                  <span className="tagchip">Merch</span>
                  <h3>{p.title}</h3>
                  <p className="price">{p.price}</p>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer" className="cta">Comprar →</a>
                  ) : (
                    <span className="cta cta-disabled" aria-disabled="true">Próximamente</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
