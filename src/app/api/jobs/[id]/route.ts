import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getHRPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    console.log("PATCH request body:", body);
    const { password, title, description, location, type, salary, requiresGithub, isActive } = body;

    // Verify master password
    const correctPassword = await getHRPassword(prisma);
    if (password !== correctPassword) {
      console.log("Unauthorized PATCH");
      return NextResponse.json({ error: "Unauthorized: Invalid master password" }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (location !== undefined) updateData.location = location;
    if (type !== undefined) updateData.type = type;
    if (salary !== undefined) updateData.salary = salary;
    if (requiresGithub !== undefined) updateData.requiresGithub = !!requiresGithub;
    if (isActive !== undefined) updateData.isActive = !!isActive;

    console.log("PATCH updateData:", updateData);

    const updatedJob = await prisma.job.update({
      where: { id },
      data: updateData,
    });

    console.log("PATCH success:", updatedJob.id);
    return NextResponse.json({ success: true, job: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    console.log("DELETE password param:", password);

    // Verify master password
    const correctPassword = await getHRPassword(prisma);
    if (password !== correctPassword) {
      console.log("Unauthorized DELETE");
      return NextResponse.json({ error: "Unauthorized: Invalid master password" }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    console.log("DELETE job ID:", id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const deletedApps = await prisma.application.deleteMany({
      where: { jobId: id },
    });
    console.log("DELETE deleted applications:", deletedApps.count);

    const deletedJob = await prisma.job.delete({
      where: { id },
    });
    console.log("DELETE success:", deletedJob.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
