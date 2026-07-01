"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMentors() {
  try {
    const mentors = await prisma.mentor.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, mentors };
  } catch (error) {
    console.error("Failed to fetch mentors", error);
    return { success: false, error: "Failed to fetch mentors" };
  }
}

export async function createMentor(data: {
  name: string;
  designation: string;
  bio: string;
  imagePath?: string | null;
  imageAlt?: string | null;
}) {
  try {
    const mentor = await prisma.mentor.create({
      data: {
        name: data.name,
        designation: data.designation,
        bio: data.bio,
        imagePath: data.imagePath,
        imageAlt: data.imageAlt,
      },
    });
    revalidatePath("/admin");
    return { success: true, mentor };
  } catch (error) {
    console.error("Failed to create mentor", error);
    return { success: false, error: "Failed to create mentor" };
  }
}

export async function deleteMentor(id: number) {
  try {
    await prisma.mentor.delete({
      where: { id },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete mentor", error);
    return { success: false, error: "Failed to delete mentor" };
  }
}
