import { NextResponse } from 'next/server';
import { getUserInfo } from '../../../../lib/tiktok';

export async function GET(request) {
  const accessToken = request.cookies.get('tt_access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ connected: false }, { status: 200 });
  }

  try {
    const user = await getUserInfo(accessToken);
    return NextResponse.json({ connected: true, user });
  } catch (e) {
    return NextResponse.json({ connected: false, error: e.message }, { status: 200 });
  }
}
