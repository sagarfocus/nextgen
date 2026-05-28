import { NextResponse } from 'next/server';
import { requireUser } from '@server/auth';

export async function GET() {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;
  return NextResponse.json(guard.user);
}
