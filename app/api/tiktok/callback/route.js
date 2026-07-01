import { NextResponse } from 'next/server';
import { exchangeCodeForToken } from '../../../../lib/tiktok';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  const cookieState = request.cookies.get('tt_oauth_state')?.value;
  const codeVerifier = request.cookies.get('tt_pkce_verifier')?.value;

  const redirectTo = (path) => {
    const res = NextResponse.redirect(new URL(path, request.url));
    res.cookies.delete('tt_oauth_state');
    res.cookies.delete('tt_pkce_verifier');
    return res;
  };

  if (error) return redirectTo(`/tiktok?error=${encodeURIComponent(error)}`);
  if (!code || !state || state !== cookieState || !codeVerifier) {
    return redirectTo('/tiktok?error=invalid_state');
  }

  try {
    const token = await exchangeCodeForToken({ code, codeVerifier });
    const res = redirectTo('/tiktok?connected=1');
    const cookieOpts = { httpOnly: true, secure: true, sameSite: 'lax', path: '/' };
    res.cookies.set('tt_access_token', token.access_token, { ...cookieOpts, maxAge: token.expires_in });
    res.cookies.set('tt_refresh_token', token.refresh_token, { ...cookieOpts, maxAge: token.refresh_expires_in });
    res.cookies.set('tt_open_id', token.open_id, { ...cookieOpts, maxAge: token.refresh_expires_in });
    return res;
  } catch {
    return redirectTo('/tiktok?error=token_exchange_failed');
  }
}
