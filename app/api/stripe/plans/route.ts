import { NextResponse } from 'next/server';

const PLAN_MAP: Record<string, { name: string; amount: number }> = {
  silver: { name: 'Starter Care', amount: 5000 },
  gold: { name: 'Growth Pro', amount: 10000 },
  premium: { name: 'Scale Elite', amount: 0 },
  platinum: { name: 'Scale Elite', amount: 0 },
};

export async function GET() {
  return NextResponse.json(
    Object.entries(PLAN_MAP).map(([id, val]) => ({ id, name: val.name, amount: val.amount })),
  );
}
