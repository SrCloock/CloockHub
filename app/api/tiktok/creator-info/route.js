import { NextResponse } from 'next/server';
import { queryCreatorInfo } from '../../../../lib/tiktok';

export async function GET(request) {
  const accessToken = request.cookies.get('tt_access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ error: 'No conectado con TikTok.' }, { status: 401 });
  }

  try {
    const data = await queryCreatorInfo(accessToken);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
