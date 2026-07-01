import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, name, email, phone, address, resumeLink, linkedinUrl, githubUrl } = body;

    if (!jobId || !name || !email || !phone || !address || !resumeLink) {
      return NextResponse.json({ error: "Missing mandatory fields" }, { status: 400 });
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.requiresGithub && !githubUrl) {
      return NextResponse.json({ error: "GitHub URL is required for this role" }, { status: 400 });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        phone,
        address,
        resumeLink,
        linkedinUrl,
        githubUrl,
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== process.env.HR_MASTER_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized: Invalid master password" }, { status: 401 });
    }

    const applications = await prisma.application.findMany({
      include: {
        job: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
