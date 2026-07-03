import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAdminPassword, getHRPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, password } = body;

    if (!role || !password) {
      return NextResponse.json({ error: "Missing role or password" }, { status: 400 });
    }

    let isValid = false;

    if (role === 'admin') {
      const correctPass = await getAdminPassword(prisma);
      isValid = password === correctPass;
    } else if (role === 'hr') {
      const correctPass = await getHRPassword(prisma);
      isValid = password === correctPass;
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (isValid) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
