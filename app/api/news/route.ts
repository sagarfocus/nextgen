import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';

/**
 * Public news endpoints.
 *
 *   GET /api/news          → list all published articles (slim payload)
 *   GET /api/news?slug=x   → single article by slug (full payload)
 *
 * Admin create/update/delete live under /api/admin/news.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug')?.trim();

    if (slug) {
      const article = await prisma.newsArticle.findUnique({ where: { slug } });
      if (!article || !article.publishedAt) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      const res = NextResponse.json(article);
      res.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
      return res;
    }

    const articles = await prisma.newsArticle.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        coverImageAlt: true,
        publisher: true,
        source: true,
        sourceUrl: true,
        sourceDate: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
    const res = NextResponse.json(articles);
    res.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=300');
    return res;
  } catch (err) {
    console.error('GET /api/news error:', err);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
