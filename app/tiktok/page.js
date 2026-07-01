'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

const STATUS_LABELS = {
  PROCESSING_UPLOAD: 'Subiendo vídeo…',
  PROCESSING_DOWNLOAD: 'TikTok está procesando el vídeo…',
  PUBLISH_COMPLETE: '¡Publicado!',
  FAILED: 'La publicación ha fallado.',
};

export default function TikTokPage() {
  const [me, setMe] = useState(null);
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [banner, setBanner] = useState(null);

  const [title, setTitle] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState('');
  const [disableComment, setDisableComment] = useState(false);
  const [disableDuet, setDisableDuet] = useState(false);
  const [disableStitch, setDisableStitch] = useState(false);
  const [file, setFile] = useState(null);
  const [publishStatus, setPublishStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('connected')) setBanner({ type: 'ok', text: 'Cuenta de TikTok conectada correctamente.' });
    if (params.get('error')) setBanner({ type: 'error', text: `No se pudo conectar: ${params.get('error')}` });
    window.history.replaceState({}, '', '/tiktok');
  }, []);

  useEffect(() => {
    fetch('/api/tiktok/me')
      .then((r) => r.json())
      .then((data) => {
        setMe(data);
        if (data.connected) {
          fetch('/api/tiktok/creator-info')
            .then((r) => r.json().then((info) => ({ ok: r.ok, info })))
            .then(({ ok, info }) => {
              if (!ok) {
                setBanner({ type: 'error', text: `No se pudo cargar creator-info: ${info.error}` });
                return;
              }
              setCreatorInfo(info);
              if (info.privacy_level_options?.length) setPrivacyLevel(info.privacy_level_options[0]);
            });
          fetch('/api/tiktok/videos')
            .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
            .then(({ ok, data }) => {
              if (!ok) {
                setBanner({ type: 'error', text: `No se pudieron cargar los vídeos: ${data.error}` });
                return;
              }
              setVideos(data.videos || []);
            });
        }
      });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/tiktok/logout', { method: 'POST' });
    setMe({ connected: false });
    setCreatorInfo(null);
    setVideos([]);
  };

  const pollStatus = (publishId) => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/tiktok/post/status?publish_id=${publishId}`);
      const data = await res.json();
      if (data.status) {
        setPublishStatus(data.status);
        if (data.status === 'PUBLISH_COMPLETE' || data.status === 'FAILED') {
          clearInterval(interval);
          setSubmitting(false);
        }
      }
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !privacyLevel) return;
    setSubmitting(true);
    setPublishStatus('PROCESSING_UPLOAD');

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('privacyLevel', privacyLevel);
    formData.append('disableComment', String(disableComment));
    formData.append('disableDuet', String(disableDuet));
    formData.append('disableStitch', String(disableStitch));

    const res = await fetch('/api/tiktok/post', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) {
      setBanner({ type: 'error', text: data.error || 'Error al publicar.' });
      setSubmitting(false);
      return;
    }
    pollStatus(data.publishId);
  };

  return (
    <>
      <Header />
      <section className="page-section">
        <div className="wrap legal">
          <div className="section-head" style={{ textAlign: 'center' }}>
            <span className="eyebrow">// integración</span>
            <h2>TikTok</h2>
          </div>

          {banner && <p className={`form-note ${banner.type === 'error' ? 'form-note-error' : ''}`}>{banner.text}</p>}

          {!me && <p>Cargando…</p>}

          {me && !me.connected && (
            <Reveal>
              <div className="card" style={{ textAlign: 'center' }}>
                <h3>Conecta tu cuenta de TikTok</h3>
                <p>Inicia sesión para ver tu perfil, tus vídeos y publicar contenido nuevo.</p>
                <a href="/api/tiktok/login" className="btn btn-gold">Conectar con TikTok</a>
                {me.error && <p className="form-note form-note-error" style={{ marginTop: 16 }}>Error: {me.error}</p>}
              </div>
            </Reveal>
          )}

          {me && me.connected && (
            <>
              <Reveal>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {me.user?.avatar_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={me.user.avatar_url} alt="" width={56} height={56} style={{ borderRadius: '50%' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>{me.user?.display_name}</h3>
                  </div>
                  <button className="btn btn-ghost" onClick={handleLogout} type="button">Desconectar</button>
                </div>
              </Reveal>

              {videos.length > 0 && (
                <Reveal delay={0.1}>
                  <h3 style={{ marginTop: 32 }}>Tus últimos vídeos</h3>
                  <div className="grid3">
                    {videos.map((v) => (
                      <a href={v.share_url} target="_blank" rel="noreferrer" className="card" key={v.id}>
                        <p>{v.title || 'Sin título'}</p>
                      </a>
                    ))}
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.15}>
                <h3 style={{ marginTop: 32 }}>Publicar un vídeo nuevo</h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="video">Vídeo (mp4)</label>
                    <input id="video" type="file" accept="video/mp4,video/quicktime" onChange={(e) => setFile(e.target.files[0])} required />
                  </div>
                  <div>
                    <label htmlFor="title">Título</label>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  {creatorInfo?.privacy_level_options && (
                    <div>
                      <label htmlFor="privacy">Privacidad</label>
                      <select id="privacy" value={privacyLevel} onChange={(e) => setPrivacyLevel(e.target.value)}>
                        {creatorInfo.privacy_level_options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="checkbox" checked={disableComment} onChange={(e) => setDisableComment(e.target.checked)} />
                    Desactivar comentarios
                  </label>
                  <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="checkbox" checked={disableDuet} onChange={(e) => setDisableDuet(e.target.checked)} />
                    Desactivar dúo
                  </label>
                  <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="checkbox" checked={disableStitch} onChange={(e) => setDisableStitch(e.target.checked)} />
                    Desactivar stitch
                  </label>
                  <button type="submit" className="btn btn-gold" style={{ border: 'none' }} disabled={submitting}>
                    {submitting ? 'Publicando…' : 'Publicar en TikTok'}
                  </button>
                  {publishStatus && <p className="form-note">{STATUS_LABELS[publishStatus] || publishStatus}</p>}
                </form>
              </Reveal>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
