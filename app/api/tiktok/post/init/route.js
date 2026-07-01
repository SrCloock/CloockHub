import { NextResponse } from 'next/server';
import { initVideoPost, planChunks } from '../../../../../lib/tiktok';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const accessToken = request.cookies.get('tt_access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ error: 'No conectado con TikTok.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const { title, privacyLevel, videoSize, disableComment, disableDuet, disableStitch, contentType } = body || {};

  if (!title || !privacyLevel || !videoSize) {
    return NextResponse.json({ error: 'Faltan campos obligatorios (título, privacidad o tamaño del vídeo).' }, { status: 400 });
  }
  if (contentType !== 'organic' && contentType !== 'branded') {
    return NextResponse.json({ error: 'Debes indicar si el contenido es propio o promocional.' }, { status: 400 });
  }
  if (contentType === 'branded' && privacyLevel === 'SELF_ONLY') {
    return NextResponse.json({ error: 'El contenido de marca no se puede publicar como privado. Esto requiere que tu app esté auditada.' }, { status: 400 });
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
      brandOrganicToggle: contentType === 'organic',
      brandContentToggle: contentType === 'branded',
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
