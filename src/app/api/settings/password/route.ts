import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAdminPassword, getHRPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { role, currentPassword, newPassword } = body;

    if (!role || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let isValid = false;
    let contentId = '';

    if (role === 'admin') {
      const correctPass = await getAdminPassword(prisma);
      isValid = currentPassword === correctPass;
      contentId = 'admin_password';
    } else if (role === 'hr') {
      const correctPass = await getHRPassword(prisma);
      isValid = currentPassword === correctPass;
      contentId = 'hr_password';
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid current password" }, { status: 401 });
    }

    // Upsert the password into SiteContent
    await prisma.siteContent.upsert({
      where: { id: contentId },
      update: { value: newPassword, type: 'TEXT' },
      create: { id: contentId, value: newPassword, type: 'TEXT' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
