'use client';

import { useCallback } from 'react';

// Superficie con luz puntual que sigue al cursor (variables --mx/--my leídas en CSS).
// Escritura directa de custom properties: barata, sin re-render de React.
export default function GlowCard({ as: Tag = 'div', className = '', children, ...props }) {
  const onPointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <Tag className={`glow-card ${className}`} onPointerMove={onPointerMove} {...props}>
      {children}
    </Tag>
  );
}
