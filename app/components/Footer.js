import Link from 'next/link';
import { SOCIALS } from '../../lib/socials';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap footer-inner">
        <span className="logo footer-logo">
          SR<span>CLOOCK</span>
        </span>

        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
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
