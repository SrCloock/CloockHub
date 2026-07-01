import { NextResponse } from 'next/server';
import { initVideoPost, planChunks } from '../../../../../lib/tiktok';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const accessToken = request.cookies.get('tt_access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ error: 'No conectado con TikTok.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const { title, privacyLevel, videoSize, disableComment, disableDuet, disableStitch } = body || {};

  if (!title || !privacyLevel || !videoSize) {
    return NextResponse.json({ error: 'Faltan campos obligatorios (título, privacidad o tamaño del vídeo).' }, { status: 400 });
  }

  try {
    const { chunkSize, totalChunkCount } = planChunks(videoSize);
    const init = await initVideoPost(accessToken, {
      title,
      privacyLevel,
      videoSize,
      chunkSize,
      totalChunkCount,
      disableComment,
      disableDuet,
      disableStitch,
    });

    return NextResponse.json({
      publishId: init.publish_id,
      uploadUrl: init.upload_url,
      chunkSize,
      totalChunkCount,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
