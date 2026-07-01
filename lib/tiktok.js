import crypto from 'crypto';

const AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/';
const TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';
const USER_INFO_URL = 'https://open.tiktokapis.com/v2/user/info/';
const VIDEO_LIST_URL = 'https://open.tiktokapis.com/v2/video/list/';
const CREATOR_INFO_URL = 'https://open.tiktokapis.com/v2/post/publish/creator_info/query/';
const POST_INIT_URL = 'https://open.tiktokapis.com/v2/post/publish/video/init/';
const POST_STATUS_URL = 'https://open.tiktokapis.com/v2/post/publish/status/fetch/';

export const SCOPES = 'user.info.basic,video.list,video.publish';

function getEnv() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  if (!clientKey || !clientSecret || !redirectUri) return null;
  return { clientKey, clientSecret, redirectUri };
}

export function generatePkcePair() {
  const codeVerifier = crypto.randomBytes(32).toString('hex');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');
  return { codeVerifier, codeChallenge };
}

export function buildAuthorizeUrl({ state, codeChallenge }) {
  const env = getEnv();
  if (!env) return null;

  const params = new URLSearchParams({
    client_key: env.clientKey,
    response_type: 'code',
    scope: SCOPES,
    redirect_uri: env.redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });
  return `${AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken({ code, codeVerifier }) {
  const env = getEnv();
  if (!env) throw new Error('TikTok no configurado');

  const body = new URLSearchParams({
    client_key: env.clientKey,
    client_secret: env.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: env.redirectUri,
    code_verifier: codeVerifier,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error_description || 'Error al intercambiar el código');
  return data;
}

export async function refreshAccessToken(refreshToken) {
  const env = getEnv();
  if (!env) throw new Error('TikTok no configurado');

  const body = new URLSearchParams({
    client_key: env.clientKey,
    client_secret: env.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error_description || 'Error al refrescar el token');
  return data;
}

export async function getUserInfo(accessToken) {
  const fields = 'open_id,union_id,avatar_url,display_name';
  const res = await fetch(`${USER_INFO_URL}?fields=${fields}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok || data.error?.code !== 'ok') throw new Error(data.error?.message || 'Error al obtener el perfil');
  return data.data.user;
}

export async function listVideos(accessToken, cursor) {
  const fields = 'id,title,cover_image_url,share_url,create_time';
  const res = await fetch(`${VIDEO_LIST_URL}?fields=${fields}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ max_count: 12, cursor: cursor || 0 }),
  });
  const data = await res.json();
  if (!res.ok || data.error?.code !== 'ok') throw new Error(data.error?.message || 'Error al listar vídeos');
  return data.data;
}

export async function queryCreatorInfo(accessToken) {
  const res = await fetch(CREATOR_INFO_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok || data.error?.code !== 'ok') throw new Error(data.error?.message || 'Error al consultar creator info');
  return data.data;
}

export async function initVideoPost(accessToken, { title, privacyLevel, videoSize, disableComment, disableDuet, disableStitch }) {
  const res = await fetch(POST_INIT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_info: {
        title,
        privacy_level: privacyLevel,
        disable_comment: !!disableComment,
        disable_duet: !!disableDuet,
        disable_stitch: !!disableStitch,
      },
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: videoSize,
        chunk_size: videoSize,
        total_chunk_count: 1,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok || data.error?.code !== 'ok') throw new Error(data.error?.message || 'Error al iniciar la publicación');
  return data.data;
}

export async function uploadVideoChunk(uploadUrl, videoBuffer, mimeType) {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': mimeType || 'video/mp4',
      'Content-Length': String(videoBuffer.length),
      'Content-Range': `bytes 0-${videoBuffer.length - 1}/${videoBuffer.length}`,
    },
    body: videoBuffer,
  });
  if (!res.ok) throw new Error('Error al subir el vídeo a TikTok');
}

export async function checkPublishStatus(accessToken, publishId) {
  const res = await fetch(POST_STATUS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publish_id: publishId }),
  });
  const data = await res.json();
  if (!res.ok || data.error?.code !== 'ok') throw new Error(data.error?.message || 'Error al consultar el estado');
  return data.data;
}

export function isTiktokConfigured() {
  return getEnv() !== null;
}
