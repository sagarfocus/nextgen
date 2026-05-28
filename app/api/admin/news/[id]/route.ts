import { NextResponse } from 'next/server';
import { requireAdmin } from '@server/auth';
import { notConfigured } from '@server/stubs';

export async function PATCH() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  return notConfigured('News update');
}

export async function DELETE() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  return notConfigured('News delete');
}
