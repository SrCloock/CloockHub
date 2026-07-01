import { NextResponse } from 'next/server';
import { checkPublishStatus } from '../../../../../lib/tiktok';

export async function GET(request) {
  const accessToken = request.cookies.get('tt_access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ error: 'No conectado con TikTok.' }, { status: 401 });
  }

  const publishId = new URL(request.url).searchParams.get('publish_id');
  if (!publishId) {
    return NextResponse.json({ error: 'Falta publish_id.' }, { status: 400 });
  }

  try {
    const data = await checkPublishStatus(accessToken, publishId);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
