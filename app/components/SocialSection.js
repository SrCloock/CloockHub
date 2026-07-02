'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import { SOCIALS } from '../../lib/socials';

const TWITCH_URL = 'https://www.twitch.tv/srcloock';
const YOUTUBE_URL = 'https://www.youtube.com/@SrCloockZ';

function isToday(dateString) {
  if (!dateString) return false;
  const d = new Date(dateString);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

export default function SocialSection() {
  const [twitch, setTwitch] = useState({ status: 'loading' });
  const [youtube, setYoutube] = useState({ status: 'loading' });

  useEffect(() => {
    fetch('/api/social/twitch')
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => setTwitch(ok ? { status: 'ok', ...data } : { status: 'error' }))
      .catch(() => setTwitch({ status: 'error' }));

    fetch('/api/social/youtube')
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => setYoutube(ok ? { status: 'ok', ...data } : { status: 'error' }))
      .catch(() => setYoutube({ status: 'error' }));
  }, []);

  return (
    <>
      <Reveal delay={0.05}>
        <div className="stream-card">
          {twitch.status === 'ok' && twitch.live && (
            <>
              <span className="tagchip live-badge">● En directo ahora</span>
              {twitch.thumbnailUrl && (
                <div className="stream-thumb-wrap">
                  <Image src={twitch.thumbnailUrl} alt="" fill sizes="(max-width: 640px) 100vw, 400px" className="stream-thumb" />
                </div>
              )}
              <h3>{twitch.title}</h3>
              <p>{twitch.viewerCount} espectadores ahora en Twitch.</p>
              <a href={TWITCH_URL} target="_blank" rel="noreferrer" className="cta">Ver directo →</a>
            </>
          )}
          {twitch.status === 'ok' && !twitch.live && twitch.lastVideo && (
            <>
              <span className="tagchip">Último directo</span>
              {twitch.lastVideo.thumbnailUrl && (
                <div className="stream-thumb-wrap">
                  <Image src={twitch.lastVideo.thumbnailUrl} alt="" fill sizes="(max-width: 640px) 100vw, 400px" className="stream-thumb" />
                </div>
              )}
              <h3>{twitch.lastVideo.title}</h3>
              <a href={twitch.lastVideo.url} target="_blank" rel="noreferrer" className="cta">Ver VOD →</a>
            </>
          )}
          {twitch.status === 'ok' && !twitch.live && !twitch.lastVideo && (
            <>
              <span className="tagchip">Twitch</span>
              <h3>Ahora mismo no hay directos recientes</h3>
              <a href={TWITCH_URL} target="_blank" rel="noreferrer" className="cta">Ir al canal →</a>
            </>
          )}
          {twitch.status === 'loading' && (
            <>
              <div className="skeleton skeleton-thumb" />
              <div className="skeleton skeleton-line w-70" />
              <div className="skeleton skeleton-line w-40" />
            </>
          )}
          {twitch.status === 'error' && (
            <>
              <span className="tagchip">Twitch</span>
              <h3>SrCloock en Twitch</h3>
              <a href={TWITCH_URL} target="_blank" rel="noreferrer" className="cta">Ir al canal →</a>
            </>
          )}
        </div>
      </Reveal>

      {youtube.status === 'loading' && (
        <div className="grid3" style={{ marginBottom: 40 }}>
          {[0, 1, 2].map((i) => (
            <div className="card" key={i} style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <div className="skeleton video-thumb-wrap" />
              <div className="skeleton skeleton-line w-70" style={{ marginTop: 16 }} />
              <div className="skeleton skeleton-line w-40" />
            </div>
          ))}
        </div>
      )}

      {youtube.status === 'ok' && youtube.videos?.length > 0 && (
        <Reveal delay={0.1}>
          <div className="grid3" style={{ marginBottom: 40 }}>
            {youtube.videos.slice(0, 3).map((v) => (
              <a href={v.url} target="_blank" rel="noreferrer" className="card" key={v.id}>
                {isToday(v.publishedAt) && <span className="tagchip new-badge">● Último vídeo</span>}
                {v.thumbnailUrl && (
                  <div className="video-thumb-wrap">
                    <Image src={v.thumbnailUrl} alt="" fill sizes="(max-width: 880px) 100vw, 340px" className="video-thumb" />
                  </div>
                )}
                <h3>{v.title}</h3>
                <span className="cta">Ver en YouTube →</span>
              </a>
            ))}
          </div>
        </Reveal>
      )}

      <div className="social-grid">
        {SOCIALS.map((s, i) => (
          <Reveal delay={i * 0.06} key={s.name}>
            <a href={s.url} target="_blank" rel="noreferrer" className="social-item glitch-hover">
              {s.name}
              <span className="platform">{s.handle}</span>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="hero-cta" style={{ marginTop: 32 }}>
        <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">Ver canal de YouTube</a>
      </div>
    </>
  );
}
