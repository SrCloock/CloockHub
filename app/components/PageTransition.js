'use client';

import { motion, MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      {/* Solo opacity: un transform aquí convertiría al wrapper en containing block
          de los elementos fixed (header, progreso) y los desplazaría al animar. */}
      <motion.main
        id="contenido"
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
    </MotionConfig>
  );
}
