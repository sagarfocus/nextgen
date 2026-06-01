import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@server/auth';
import { generateAndSaveNews } from '@server/ai-news';

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { topic, autoPublish } = (await req.json().catch(() => ({}))) as {
      topic?: string;
      autoPublish?: boolean;
    };
    const result = await generateAndSaveNews({
      topic: typeof topic === 'string' ? topic : undefined,
      autoPublish: !!autoPublish,
      withScore: true,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error('/api/ai/generate-news-oneshot error:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Generation failed' },
      { status: 500 },
    );
  }
}
