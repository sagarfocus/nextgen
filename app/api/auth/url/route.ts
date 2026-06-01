import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

/**
 * GET /api/auth/url
 *
 * Generates the Google OAuth authorization URL for the "Continue with Google"
 * popup flow. Returns { url } that the client opens in a popup window. A
 * short-lived httpOnly cookie carries a CSRF `state` value the callback route
 * validates.
 *
 * Required env: GOOGLE_CLIENT_ID, APP_URL (used to build redirect_uri).
 */

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function GET() {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json({ error: 'Google OAuth is not configured' }, { status: 500 });
    }

    const state = crypto.randomBytes(32).toString('hex');
    const redirectUri = `${APP_URL}/api/auth/callback`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
      state,
    });

    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    const response = NextResponse.json({ url });
    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600,
      path: '/',
    });
    return response;
  } catch (err) {
    console.error('Auth URL error:', err);
    return NextResponse.json({ error: 'Failed to get auth URL' }, { status: 500 });
  }
}
