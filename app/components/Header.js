'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrollProgress from './ScrollProgress';

const LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#redes', label: 'Streaming' },
  { href: '/tienda', label: 'Tienda' },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const navRef = useRef(null);

  const resolveHref = (href) => {
    if (href.startsWith('#')) return isHome ? href : `/${href}`;
    return href;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <>
      <ScrollProgress />
      <header className={scrolled ? 'scrolled' : ''}>
        <nav ref={navRef}>
          <Link href="/" className="logo" onClick={() => setNavOpen(false)}>
            <span className="logo-dot" aria-hidden="true" />
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
            {LINKS.map((link) => {
              const isActive = !link.href.startsWith('#') && pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={resolveHref(link.href)}
                  className={isActive ? 'active' : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contacto"
              className="nav-cta"
              aria-current={pathname === '/contacto' ? 'page' : undefined}
              onClick={() => setNavOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
