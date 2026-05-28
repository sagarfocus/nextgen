import { NextResponse } from 'next/server';
import { requireUser } from '@server/auth';
import { notConfigured } from '@server/stubs';

export async function POST() {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;
  return notConfigured('Analytics AI chat');
}
