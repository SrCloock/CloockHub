import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: '404 — SrCloock',
};

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="hero" style={{ minHeight: '80svh' }}>
        <div className="ambient" aria-hidden="true">
          <span className="orb orb-violet" style={{ width: 560, height: 560, top: '-14%', right: '-10%' }} />
          <span className="orb orb-teal" style={{ width: 480, height: 480, bottom: '-16%', left: '-8%' }} />
        </div>
        <div className="hero-inner-404">
          <p className="code-404" aria-hidden="true">404</p>
          <h1>Esta órbita está vacía</h1>
          <p className="tag">La página que buscas no existe o se movió a otra parte.</p>
          <div className="hero-cta" style={{ justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary">
              Volver al inicio <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
