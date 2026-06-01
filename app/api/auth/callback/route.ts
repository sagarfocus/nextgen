import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { prisma } from '@server/prisma';
import { hashPassword } from '@server/password';
import { isAdminEmail, normalizeRole, signAuthToken } from '@server/auth';

/**
 * GET /api/auth/callback
 *
 * Google OAuth redirect target. Exchanges the auth code for tokens, decodes
 * the id_token, upserts the matching user row, sets the same `auth_token`
 * httpOnly cookie the email/password flow uses, then returns an HTML page
 * that posts a message back to window.opener and self-closes.
 *
 * Required env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, APP_URL, JWT_SECRET.
 */

const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const COOKIE_NAME = 'auth_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

function htmlResponse(
  messageType: 'OAUTH_AUTH_SUCCESS' | 'OAUTH_AUTH_ERROR',
  payload: Record<string, unknown>,
) {
  const targetOrigin = APP_URL;
  const message = JSON.stringify({ type: messageType, ...payload });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authentication</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f3f4f6; }
          .container { text-align: center; }
          .spinner { border: 4px solid #e5e7eb; border-top: 4px solid #3b82f6; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          p { color: #666; margin: 10px 0; }
          button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-top: 20px; }
          button:hover { background: #2563eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="spinner"></div>
          <p>Connecting your account...</p>
          <p id="status" style="font-size: 14px; color: #999;"></p>
          <button onclick="closeSelf()">Close this window</button>
        </div>
        <script>
          (function () {
            var msg = ${JSON.stringify(message)};
            var parsed = JSON.parse(msg);
            var messageType = ${JSON.stringify(messageType)};
            function updateStatus(m) { var el = document.getElementById('status'); if (el) el.textContent = m; }
            function attemptClose() { try { window.close(); } catch (e) {} }

            if (window.opener) {
              try {
                window.opener.postMessage(parsed, ${JSON.stringify(targetOrigin)});
                updateStatus('Connected! You can close this window...');
                setTimeout(attemptClose, 500);
              } catch (err) {
                updateStatus('Authentication complete. Please close this window.');
                setTimeout(attemptClose, 1000);
              }
            } else {
              // Same-tab fallback when the popup was blocked / opened in same tab.
              try {
                if (messageType === 'OAUTH_AUTH_SUCCESS') {
                  var role = (parsed.user && parsed.user.role) ? parsed.user.role : 'client';
                  var dashboardPath = role === 'admin' ? '/dashboard/admin' : '/dashboard/' + role;
                  updateStatus('Connected! Redirecting...');
                  setTimeout(function () {
                    window.location.replace(${JSON.stringify(targetOrigin)} + dashboardPath);
                  }, 250);
                } else {
                  var err = encodeURIComponent(parsed.error || 'Google login failed');
                  updateStatus('Authentication failed. Redirecting...');
                  setTimeout(function () {
                    window.location.replace(${JSON.stringify(targetOrigin)} + '/login?oauthError=' + err);
                  }, 250);
                }
              } catch (e) {
                updateStatus('Authentication complete. Please close this window.');
                setTimeout(attemptClose, 1000);
              }
            }
          })();
          function closeSelf() { window.close(); }
        </script>
      </body>
    </html>
  `;
}

function htmlError(message: string, status = 400) {
  return new NextResponse(htmlResponse('OAUTH_AUTH_ERROR', { error: message }), {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const oauthError = req.nextUrl.searchParams.get('error');

  if (oauthError) return htmlError(`Google OAuth error: ${oauthError}`, 200);
  if (!code) return htmlError('Missing authorization code', 400);

  // CSRF: state cookie must match the value Google echoed back.
  const returnedState = req.nextUrl.searchParams.get('state');
  const storedState = req.cookies.get('oauth_state')?.value;
  if (!returnedState || !storedState || returnedState !== storedState) {
    return htmlError('Invalid OAuth state. Please try again.', 403);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return htmlError('Google OAuth credentials are not configured', 500);
    }

    const redirectUri = `${APP_URL}/api/auth/callback`;
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = (await tokenRes.json()) as {
      id_token?: string;
      error?: string;
      error_description?: string;
    };
    if (!tokenRes.ok || !tokenData.id_token) {
      throw new Error(
        tokenData.error_description || tokenData.error || 'Failed to exchange OAuth code',
      );
    }

    // Decode the id_token payload — we don't verify the signature here because
    // the token came directly from Google over HTTPS in this same request.
    const payload = JSON.parse(
      Buffer.from(tokenData.id_token.split('.')[1], 'base64').toString(),
    ) as { email?: string; name?: string };

    const email = payload.email;
    const name = payload.name || 'Google User';
    if (!email) throw new Error('Google account email is unavailable');

    const inferredRole = isAdminEmail(email) ? 'admin' : 'client';

    const existing = await prisma.user.findUnique({ where: { email } });
    const user = existing
      ? existing
      : await prisma.user.create({
          data: {
            email,
            name,
            role: inferredRole,
            // Random unusable password — Google users sign in via OAuth, but
            // the column is NOT NULL.
            password: await hashPassword(crypto.randomBytes(32).toString('hex')),
          },
        });

    const role = isAdminEmail(user.email) ? 'admin' : normalizeRole(user.role);
    const token = signAuthToken({ id: user.id, role });

    const response = new NextResponse(
      htmlResponse('OAUTH_AUTH_SUCCESS', {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role,
          avatar: user.avatar || null,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });
    response.cookies.set('oauth_state', '', { maxAge: 0, path: '/' });
    return response;
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return htmlError('Authentication failed', 500);
  }
}
