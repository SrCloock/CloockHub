'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let frame = null;
    let pending = null;

    const apply = () => {
      frame = null;
      if (!pending) return;
      el.style.left = `${pending.x}px`;
      el.style.top = `${pending.y}px`;
    };

    const onMove = (e) => {
      pending = { x: e.clientX, y: e.clientY };
      if (frame === null) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-glow" ref={ref} />;
}
