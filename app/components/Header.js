'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#redes', label: 'Redes' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/tiktok', label: 'TikTok' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const resolveHref = (href) => {
    if (href.startsWith('#')) return isHome ? href : `/${href}`;
    return href;
  };

  return (
    <header>
      <nav>
        <Link href="/" className="logo" onClick={() => setNavOpen(false)}>
          SR<span>CLOOCK</span>
        </Link>
        <button className="navtoggle" aria-label="Abrir menú" onClick={() => setNavOpen(!navOpen)}>☰</button>
        <div className={`navlinks ${navOpen ? 'open' : ''}`}>
          {LINKS.map((link) => (
            <Link key={link.label} href={resolveHref(link.href)} onClick={() => setNavOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
