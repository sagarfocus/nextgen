import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@server/auth';
import { notConfigured } from '@server/stubs';

const GMB_SERVICE = 'Google OAuth / GMB / GA4 / Search Console / Google Ads';

type Ctx = { params: Promise<{ path?: string[] }> };

async function handler(_req: NextRequest, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { path = [] } = await ctx.params;
  const sub = path.join('/');

  // /admin/gmb/config-check returns the configured flag (false here) so the
  // dashboard's UI can render its "Connect Google" state instead of a toast.
  if (sub === 'config-check') {
    return NextResponse.json({ configured: false });
  }

  return notConfigured(GMB_SERVICE);
}

export const GET = handler;
export const POST = handler;
