'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue } from 'framer-motion';

const TWITCH_LOGIN = 'srcloock';
const TWITCH_URL = `https://www.twitch.tv/${TWITCH_LOGIN}`;
const NUDGE = 24;

export default function LiveWidget() {
  const [live, setLive] = useState(false);
  const [floating, setFloating] = useState(false);
  const [closed, setClosed] = useState(false);
  const [hostname, setHostname] = useState('');
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setHostname(window.location.hostname);
    let cancelled = false;
    fetch('/api/social/twitch')
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setLive(data?.live ? data : false); })
      .catch(() => { if (!cancelled) setLive(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('live-banner-active', !!live && !floating);
    return () => document.body.classList.remove('live-banner-active');
  }, [live, floating]);

  useEffect(() => {
    if (!live) return undefined;
    const onScroll = () => setFloating(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [live]);

  useEffect(() => {
    if (!floating) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setClosed(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [floating]);

  if (!live || closed) return null;

  const embedSrc = hostname
    ? `https://player.twitch.tv/?channel=${TWITCH_LOGIN}&parent=${hostname}&autoplay=true&muted=true`
    : null;

  const bounds = {
    left: -(window.innerWidth - 300 - 8),
    right: 8,
    top: -(80 - 8),
    bottom: window.innerHeight - 210 - 80,
  };
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const handleKeyDown = (e) => {
    const deltas = {
      ArrowUp: [0, -NUDGE],
      ArrowDown: [0, NUDGE],
      ArrowLeft: [-NUDGE, 0],
      ArrowRight: [NUDGE, 0],
    };
    const delta = deltas[e.key];
    if (!delta) return;
    e.preventDefault();
    x.set(clamp(x.get() + delta[0], bounds.left, bounds.right));
    y.set(clamp(y.get() + delta[1], bounds.top, bounds.bottom));
  };

  return (
    <AnimatePresence>
      {!floating && (
        <motion.a
          key="live-banner"
          href={TWITCH_URL}
          target="_blank"
          rel="noreferrer"
          className="live-banner"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="live-dot" />
          EN DIRECTO — {live.title}
        </motion.a>
      )}

      {floating && embedSrc && (
        <motion.div
          key="live-float"
          className="live-float"
          role="dialog"
          aria-label={`Reproductor de directo minimizado — ${live.title}`}
          style={{ x, y }}
          drag
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={bounds}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="live-float-head"
            role="button"
            tabIndex={0}
            aria-label="Arrastra o usa las flechas del teclado para mover el reproductor"
            onPointerDown={(e) => dragControls.start(e)}
            onKeyDown={handleKeyDown}
          >
            <span className="live-dot" />
            <a href={TWITCH_URL} target="_blank" rel="noreferrer" className="live-float-title">
              {live.title}
            </a>
            <button
              type="button"
              className="live-float-close"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setClosed(true)}
              aria-label="Cerrar reproductor"
            >
              ×
            </button>
          </div>
          <iframe
            className="live-float-frame"
            src={embedSrc}
            title="SrCloock en directo — Twitch"
            allowFullScreen
            loading="lazy"
            frameBorder="0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
