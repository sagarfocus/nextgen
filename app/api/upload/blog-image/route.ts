import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { requireAdmin } from '@server/auth';

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function safeExt(filename: string) {
  const dot = filename.lastIndexOf('.');
  const ext = dot >= 0 ? filename.slice(dot).toLowerCase() : '';
  if (!['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) return '.png';
  return ext;
}

// POST /api/upload/blog-image — admin uploads a blog cover or inline image.
// Returns { url, filename, size, mimeType } so the existing frontend code
// (BlogNew.tsx, BlogEdit.tsx) keeps working unchanged.
export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 });
    }

    const stamp = Date.now().toString(36);
    const rand = Math.random().toString(36).slice(2, 8);
    const filename = `blog/${stamp}-${rand}${safeExt(file.name)}`;

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    });

    return NextResponse.json(
      {
        url: blob.url,
        filename,
        size: file.size,
        mimeType: file.type,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('Blog image upload error:', err);
    const msg =
      err instanceof Error
        ? err.message
        : 'Upload failed — verify BLOB_READ_WRITE_TOKEN is set in .env.local';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
