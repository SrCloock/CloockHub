const TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const HELIX_URL = 'https://api.twitch.tv/helix';

let cachedToken = null;
let cachedTokenExpiry = 0;

async function getAppAccessToken() {
  if (cachedToken && Date.now() < cachedTokenExpiry) return cachedToken;

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });

  const res = await fetch(`${TOKEN_URL}?${params.toString()}`, { method: 'POST' });
  if (!res.ok) return null;
  const data = await res.json();

  cachedToken = data.access_token;
  cachedTokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

async function helixFetch(path) {
  const token = await getAppAccessToken();
  const clientId = process.env.TWITCH_CLIENT_ID;
  if (!token || !clientId) return null;

  const res = await fetch(`${HELIX_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': clientId,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getChannelStatus(login) {
  const users = await helixFetch(`/users?login=${login}`);
  const user = users?.data?.[0];
  if (!user) return null;

  const streams = await helixFetch(`/streams?user_id=${user.id}`);
  const liveStream = streams?.data?.[0];

  if (liveStream) {
    return {
      live: true,
      title: liveStream.title,
      thumbnailUrl: liveStream.thumbnail_url.replace('{width}', '440').replace('{height}', '248'),
      viewerCount: liveStream.viewer_count,
      startedAt: liveStream.started_at,
    };
  }

  const videos = await helixFetch(`/videos?user_id=${user.id}&type=archive&first=1`);
  const lastVideo = videos?.data?.[0];

  return {
    live: false,
    lastVideo: lastVideo
      ? {
          title: lastVideo.title,
          url: lastVideo.url,
          thumbnailUrl: lastVideo.thumbnail_url.replace('%{width}', '440').replace('%{height}', '248'),
          publishedAt: lastVideo.published_at,
        }
      : null,
  };
}
