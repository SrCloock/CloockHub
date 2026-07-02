'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#redes', label: 'Streaming' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const navRef = useRef(null);

  const resolveHref = (href) => {
    if (href.startsWith('#')) return isHome ? href : `/${href}`;
    return href;
  };

  useEffect(() => {
    if (!navOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setNavOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onClickOutside);
    };
  }, [navOpen]);

  return (
    <header>
      <nav ref={navRef}>
        <Link href="/" className="logo" onClick={() => setNavOpen(false)}>
          SR<span>CLOOCK</span>
        </Link>
        <button
          className="navtoggle"
          aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={navOpen}
          aria-controls="site-nav"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? '✕' : '☰'}
        </button>
        <div id="site-nav" className={`navlinks ${navOpen ? 'open' : ''}`}>
          {LINKS.map((link) => (
            <Link key={link.label} className="glitch-hover" href={resolveHref(link.href)} onClick={() => setNavOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
