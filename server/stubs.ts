import { NextResponse } from 'next/server';

// Helper for routes that exist so the UI doesn't 404, but aren't actually wired
// up to a real service. Returns a JSON 503 with a clear message describing
// what would need to be configured to enable the route.
export function notConfigured(service: string) {
  return NextResponse.json(
    {
      error: `${service} is not configured in this environment. Wire the relevant env vars and replace this stub.`,
      service,
    },
    { status: 503 },
  );
}
