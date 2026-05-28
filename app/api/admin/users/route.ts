import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { hashPassword } from '@server/password';
import { requireAdmin } from '@server/auth';
import { USER_SELECT } from '@server/admin-helpers';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const [users, assignments] = await Promise.all([
      prisma.user.findMany({
        orderBy: [{ role: 'asc' }, { name: 'asc' }],
        select: USER_SELECT,
      }),
      prisma.clientClinic.findMany({
        select: { userId: true, clinicId: true, serviceCategories: true },
      }),
    ]);
    return NextResponse.json({ users, assignments });
  } catch (err) {
    console.error('Error fetching admin users:', err);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { name, email, password, role } = (await req.json().catch(() => ({}))) as Record<
      string,
      string | undefined
    >;
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 },
      );
    }
    const userRole = role === 'admin' ? 'admin' : 'client';

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 },
      );

    const user = await prisma.user.create({
      data: { name, email, password: await hashPassword(password), role: userRole },
      select: USER_SELECT,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error('Error creating user:', err);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { id, name, email, role, password, membershipRole } = (await req
      .json()
      .catch(() => ({}))) as Record<string, string | undefined>;
    if (!id) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const data: Record<string, unknown> = {};

    if (typeof name === 'string') {
      const trimmed = name.trim();
      if (!trimmed) return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 });
      data.name = trimmed;
    }

    if (typeof email === 'string') {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail)
        return NextResponse.json({ error: 'Email cannot be empty' }, { status: 400 });
      if (normalizedEmail !== existing.email) {
        const emailTaken = await prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (emailTaken)
          return NextResponse.json(
            { error: 'A user with this email already exists' },
            { status: 409 },
          );
      }
      data.email = normalizedEmail;
    }

    if (typeof role === 'string') {
      if (role !== 'client' && role !== 'admin') {
        return NextResponse.json(
          { error: 'Invalid role. Use client or admin' },
          { status: 400 },
        );
      }
      data.role = role;
    }

    if (typeof membershipRole === 'string') {
      const m = membershipRole.trim().toLowerCase();
      if (!['free', 'starter-care', 'growth-pro', 'scale-elite'].includes(m)) {
        return NextResponse.json({ error: 'Invalid membership role' }, { status: 400 });
      }
      if (m === 'free') {
        data.plan = null;
        data.planId = null;
        data.subscriptionStatus = null;
      } else if (m === 'starter-care') {
        data.plan = 'Starter Care';
        data.planId = 'silver';
        data.subscriptionStatus = 'active';
      } else if (m === 'growth-pro') {
        data.plan = 'Growth Pro';
        data.planId = 'gold';
        data.subscriptionStatus = 'active';
      } else if (m === 'scale-elite') {
        data.plan = 'Scale Elite';
        data.planId = 'premium';
        data.subscriptionStatus = 'active';
      }
    }

    if (typeof password === 'string' && password.trim()) {
      data.password = await hashPassword(password);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided for update' },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({ where: { id }, data, select: USER_SELECT });
    return NextResponse.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const id = req.nextUrl.searchParams.get('id')?.trim();
    if (!id) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    if (id === guard.user.id)
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 },
      );

    await prisma.clientClinic.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
