import { NextResponse } from 'next/server';
import { getUserInfo, isTiktokConfigured } from '../../../../lib/tiktok';

export async function GET(request) {
  const configured = isTiktokConfigured();
  const accessToken = request.cookies.get('tt_access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ connected: false, configured }, { status: 200 });
  }

  try {
    const user = await getUserInfo(accessToken);
    return NextResponse.json({ connected: true, configured, user });
  } catch (e) {
    return NextResponse.json({ connected: false, configured, error: e.message }, { status: 200 });
  }
}
