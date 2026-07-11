'use client';

import { useEffect, useRef } from 'react';

// Luz ambiental que sigue al puntero con interpolación suave.
// Usa transform (compositor) en lugar de left/top para no forzar layout.
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const el = ref.current;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let frame = null;

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - x) > 0.3 || Math.abs(targetY - y) > 0.3) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = null;
      }
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}
