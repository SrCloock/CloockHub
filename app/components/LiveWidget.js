'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

const TWITCH_LOGIN = 'srcloock';
const TWITCH_URL = `https://www.twitch.tv/${TWITCH_LOGIN}`;

export default function LiveWidget() {
  const [live, setLive] = useState(false);
  const [floating, setFloating] = useState(false);
  const [closed, setClosed] = useState(false);
  const [hostname, setHostname] = useState('');
  const dragControls = useDragControls();

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

  if (!live || closed) return null;

  const embedSrc = hostname
    ? `https://player.twitch.tv/?channel=${TWITCH_LOGIN}&parent=${hostname}&autoplay=true&muted=true`
    : null;

  return (
    <AnimatePresence>
      {!floating && (
        <motion.a
          key="live-banner"
          href={TWITCH_URL}
          target="_blank"
          rel="noreferrer"
          className="live-banner glitch-hover"
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
          drag
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={{ top: 8, left: 8, right: window.innerWidth - 316, bottom: window.innerHeight - 210 }}
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="live-float-head" onPointerDown={(e) => dragControls.start(e)}>
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
            frameBorder="0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
