'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const HIDDEN = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
const FULL = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setPhase('cover');
    const t = setTimeout(() => setPhase('reveal'), 380);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {children}
      <motion.div
        className="brush-sweep"
        initial={false}
        animate={{ clipPath: phase === 'cover' ? FULL : HIDDEN }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
