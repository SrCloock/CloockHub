import { NextResponse } from 'next/server';
import { getLatestVideos } from '../../../../lib/youtube';

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getLatestVideos('@SrCloockZ', 6);
    if (!data) return NextResponse.json({ error: 'YouTube no configurado.' }, { status: 503 });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
