// Tiny fetch wrapper. In dev, Vite proxies /api -> backend (vite.config.ts).
// In prod, deploy frontend + backend on the same domain (or set an absolute base).
const BASE = '';

type FetchOptions = RequestInit & { json?: unknown };

export async function apiFetch<T = unknown>(path: string, opts: FetchOptions = {}): Promise<T> {
  const { json, headers, ...rest } = opts;
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: {
      ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(headers || {}),
    },
    body: json !== undefined ? JSON.stringify(json) : (rest.body as BodyInit | undefined),
    ...rest,
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error((data && (data as any).error) || `Request failed (${res.status})`);
  return data;
}
