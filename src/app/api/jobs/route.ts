import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
export const dynamic = 'force-dynamic';
import { getHRPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    const correctPassword = await getHRPassword(prisma);
    const isHR = password === correctPassword;

    const jobs = await prisma.job.findMany({
      where: isHR ? undefined : { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, location, type, salary, password, requiresGithub } = body;

    // Verify master password
    const correctPassword = await getHRPassword(prisma);
    if (password !== correctPassword) {
      return NextResponse.json({ error: "Unauthorized: Invalid master password" }, { status: 401 });
    }

    if (!title || !description || !location || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        type,
        salary,
        requiresGithub: !!requiresGithub,
      },
    });

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
