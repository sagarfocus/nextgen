import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { requireUser } from '@server/auth';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

function safeExt(filename: string) {
  const dot = filename.lastIndexOf('.');
  const ext = dot >= 0 ? filename.slice(dot).toLowerCase() : '';
  if (!['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) return '.png';
  return ext;
}

// POST /api/upload/avatar — any logged-in user can replace their own avatar.
// Returns { url, filename } in the same shape as the old Express endpoint.
export async function POST(req: NextRequest) {
  const guard = await requireUser();
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
      return NextResponse.json({ error: 'File too large (max 5 MB)' }, { status: 400 });
    }

    const stamp = Date.now().toString(36);
    const rand = Math.random().toString(36).slice(2, 8);
    const filename = `avatar/${stamp}-${rand}${safeExt(file.name)}`;

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    });

    return NextResponse.json(
      {
        url: blob.url,
        filename,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('Avatar upload error:', err);
    const msg =
      err instanceof Error
        ? err.message
        : 'Upload failed — verify BLOB_READ_WRITE_TOKEN is set in .env.local';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
