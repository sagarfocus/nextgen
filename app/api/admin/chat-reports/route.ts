import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const sessions = await prisma.chatSession.findMany({
      orderBy: { lastMessageAt: 'desc' },
      take: 100,
      include: {
        messages: { orderBy: { createdAt: 'asc' }, take: 30 },
      },
    });
    return NextResponse.json(
      sessions.map((s) => ({
        id: s.id,
        sessionKey: s.sessionKey,
        visitorId: s.visitorId,
        language: s.language,
        startedAt: s.startedAt,
        lastMessageAt: s.lastMessageAt,
        summary: s.summary,
        report: s.report,
        totalMessages: s.messages.length,
        messages: s.messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          createdAt: m.createdAt,
        })),
      })),
    );
  } catch (err) {
    console.error('Admin chat reports error:', err);
    return NextResponse.json([]);
  }
}
