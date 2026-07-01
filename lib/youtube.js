const API_URL = 'https://www.googleapis.com/youtube/v3';

export async function getLatestVideos(handle, maxResults = 6) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  const channelRes = await fetch(
    `${API_URL}/channels?part=contentDetails&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`
  );
  if (!channelRes.ok) return null;
  const channelData = await channelRes.json();
  const channel = channelData.items?.[0];
  if (!channel) return null;

  const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

  const videosRes = await fetch(
    `${API_URL}/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${uploadsPlaylistId}&key=${apiKey}`
  );
  if (!videosRes.ok) return null;
  const videosData = await videosRes.json();

  const videos = (videosData.items || []).map((item) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
    publishedAt: item.snippet.publishedAt,
    url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
  }));

  return { videos };
}
