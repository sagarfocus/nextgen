import { NextResponse } from 'next/server';
import { requireAdmin } from '@server/auth';
import { notConfigured } from '@server/stubs';

export async function POST() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  return notConfigured('Site crawler / RAG');
}
