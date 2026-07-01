'use client';

import { useEffect, useState } from 'react';
import Reveal from './Reveal';

const SOCIALS = [
  { name: 'Twitch', handle: '/srcloock', url: 'https://www.twitch.tv/srcloock' },
  { name: 'X / Twitter', handle: '@SrCloock', url: 'https://x.com/SrCloock' },
  { name: 'YouTube', handle: '@SrCloockZ', url: 'https://www.youtube.com/@SrCloockZ' },
  { name: 'TikTok', handle: '@srcloock', url: 'https://www.tiktok.com/@srcloock' },
  { name: 'Instagram', handle: '@sr.cloock', url: 'https://www.instagram.com/sr.cloock/' },
];

const TWITCH_URL = 'https://www.twitch.tv/srcloock';
const YOUTUBE_URL = 'https://www.youtube.com/@SrCloockZ';

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
                // eslint-disable-next-line @next/next/no-img-element
                <img src={twitch.thumbnailUrl} alt="" className="stream-thumb" />
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
                // eslint-disable-next-line @next/next/no-img-element
                <img src={twitch.lastVideo.thumbnailUrl} alt="" className="stream-thumb" />
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
          {(twitch.status === 'loading' || twitch.status === 'error') && (
            <>
              <span className="tagchip">Twitch</span>
              <h3>{twitch.status === 'loading' ? 'Comprobando directo…' : 'SrCloock en Twitch'}</h3>
              <a href={TWITCH_URL} target="_blank" rel="noreferrer" className="cta">Ir al canal →</a>
            </>
          )}
        </div>
      </Reveal>

      {youtube.status === 'ok' && youtube.videos?.length > 0 && (
        <Reveal delay={0.1}>
          <div className="grid3" style={{ marginBottom: 40 }}>
            {youtube.videos.slice(0, 3).map((v) => (
              <a href={v.url} target="_blank" rel="noreferrer" className="card" key={v.id}>
                {v.thumbnailUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnailUrl} alt="" className="video-thumb" />
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
            <a href={s.url} target="_blank" rel="noreferrer" className="social-item">
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
