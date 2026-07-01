import { NextResponse } from 'next/server';
import { initVideoPost, uploadVideoChunk } from '../../../../lib/tiktok';

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

    const init = await initVideoPost(accessToken, {
      title,
      privacyLevel,
      videoSize: buffer.length,
      disableComment,
      disableDuet,
      disableStitch,
    });

    await uploadVideoChunk(init.upload_url, buffer, file.type);

    return NextResponse.json({ publishId: init.publish_id });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
