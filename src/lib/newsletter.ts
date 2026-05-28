// Shared client helper for newsletter sign-up.
// Called by Footer.tsx, BlogNewsletter.tsx, NewsletterCard.tsx — POSTs to
// /api/newsletter (proxied to the backend in dev via vite.config.ts).
//
// Returns a discriminated result so each form can show its own success / error UI.

export type SubscribeResult =
  | { ok: true; status: 'created' | 'reactivated' | 'already-subscribed'; message: string }
  | { ok: false; message: string };

export async function subscribeNewsletter(email: string, source: string): Promise<SubscribeResult> {
  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), source }),
    });
    const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
    if (!res.ok) {
      return { ok: false, message: data.error || 'Subscription failed. Please try again.' };
    }
    const msg = (data.message || '').toLowerCase();
    const status: 'created' | 'reactivated' | 'already-subscribed' = res.status === 201
      ? 'created'
      : msg.includes('reactivated')
        ? 'reactivated'
        : 'already-subscribed';
    return { ok: true, status, message: data.message || 'Subscribed' };
  } catch {
    return { ok: false, message: 'Network error. Please try again.' };
  }
}
