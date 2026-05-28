import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email: rawEmail, source } = (await req.json().catch(() => ({}))) as {
      email?: string;
      source?: string;
    };
    if (typeof rawEmail !== 'string' || !rawEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    const email = rawEmail.trim().toLowerCase().slice(0, 254);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      if (existing.active) {
        return NextResponse.json({ message: 'Already subscribed' });
      }
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { active: true },
      });
      return NextResponse.json({ message: 'Subscription reactivated' });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        source: typeof source === 'string' ? source.slice(0, 60) : 'footer',
      },
    });

    return NextResponse.json({ message: 'Successfully subscribed', subscriber }, { status: 201 });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
