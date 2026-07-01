import { NextResponse } from 'next/server';
import { getChannelStatus } from '../../../../lib/twitch';

export const revalidate = 60;

export async function GET() {
  try {
    const status = await getChannelStatus('srcloock');
    if (!status) return NextResponse.json({ error: 'Twitch no configurado.' }, { status: 503 });
    return NextResponse.json(status);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
