import { NextResponse } from 'next/server';
import { requireAdmin } from '@server/auth';
import { notConfigured } from '@server/stubs';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  // Matches the original Express stub: returns empty list so the AdminNewsList
  // page can mount without a "not configured" toast.
  return NextResponse.json({ news: [] });
}

export async function POST() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  return notConfigured('News create');
}
