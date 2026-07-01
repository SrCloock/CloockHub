import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>© {year} SrCloock — todos los derechos reservados.</p>
      <div className="footer-links">
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/terminos">Términos</Link>
      </div>
    </footer>
  );
}
