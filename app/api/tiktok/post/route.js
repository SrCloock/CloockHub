import { NextResponse } from 'next/server';
import { initVideoPost, uploadVideoChunks, planChunks } from '../../../../lib/tiktok';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request) {
  const accessToken = request.cookies.get('tt_access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ error: 'No conectado con TikTok.' }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get('video');
  const title = form.get('title')?.toString().trim();
  const privacyLevel = form.get('privacyLevel')?.toString();
  const disableComment = form.get('disableComment') === 'true';
  const disableDuet = form.get('disableDuet') === 'true';
  const disableStitch = form.get('disableStitch') === 'true';

  if (!file || !title || !privacyLevel) {
    return NextResponse.json({ error: 'Faltan campos obligatorios (vídeo, título o privacidad).' }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { chunkSize, totalChunkCount } = planChunks(buffer.length);

    const init = await initVideoPost(accessToken, {
      title,
      privacyLevel,
      videoSize: buffer.length,
      chunkSize,
      totalChunkCount,
      disableComment,
      disableDuet,
      disableStitch,
    });

    await uploadVideoChunks(init.upload_url, buffer, file.type, chunkSize, totalChunkCount);

    return NextResponse.json({ publishId: init.publish_id });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
