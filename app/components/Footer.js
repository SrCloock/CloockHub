import Link from 'next/link';
import { SOCIALS } from '../../lib/socials';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <svg className="crack footer-crack" viewBox="0 0 1080 46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,23 L300,23 L340,8 L380,38 L440,23 L1080,23" stroke="url(#footerCrackGrad)" strokeWidth="2" fill="none" opacity="0.6" />
        <defs>
          <linearGradient id="footerCrackGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c9a876" />
            <stop offset="50%" stopColor="#2ec4b6" />
            <stop offset="100%" stopColor="#d63384" />
          </linearGradient>
        </defs>
      </svg>

      <div className="wrap footer-inner">
        <span className="logo footer-logo">
          SR<span>CLOOCK</span>
        </span>

        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="glitch-hover">
              {s.name}
            </a>
          ))}
        </div>

        <p className="footer-copy">© {year} SrCloock — todos los derechos reservados.</p>

        <div className="footer-links">
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
        </div>
      </div>
    </footer>
  );
}
