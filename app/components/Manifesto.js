'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Declaración que se ilumina palabra a palabra conforme avanza el scroll.
// Cada palabra mapea un tramo del progreso a su opacidad — solo opacity, sin layout.
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span className="manifesto-word" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export default function Manifesto({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.45'],
  });

  const words = text.split(' ');

  return (
    <section className="manifesto" ref={ref}>
      <div className="wrap">
        <p className="manifesto-text" aria-label={text}>
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
