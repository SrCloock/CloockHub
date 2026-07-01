import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { buildAuthorizeUrl, generatePkcePair, isTiktokConfigured } from '../../../../lib/tiktok';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isTiktokConfigured()) {
    return NextResponse.json({ error: 'TikTok no configurado todavía.' }, { status: 503 });
  }

  const state = crypto.randomBytes(16).toString('hex');
  const { codeVerifier, codeChallenge } = generatePkcePair();
  const authorizeUrl = buildAuthorizeUrl({ state, codeChallenge });

  const res = NextResponse.redirect(authorizeUrl);
  const cookieOpts = { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 600 };
  res.cookies.set('tt_oauth_state', state, cookieOpts);
  res.cookies.set('tt_pkce_verifier', codeVerifier, cookieOpts);
  return res;
}
