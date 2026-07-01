import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('tt_access_token');
  res.cookies.delete('tt_refresh_token');
  res.cookies.delete('tt_open_id');
  return res;
}
