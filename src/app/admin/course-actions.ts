"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, courses };
  } catch (error) {
    console.error("Failed to fetch courses", error);
    return { success: false, error: "Failed to fetch courses" };
  }
}

export async function createCourse(data: {
  title: string;
  description: string;
  imagePath?: string | null;
  imageAlt?: string | null;
}) {
  try {
    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        imagePath: data.imagePath,
        imageAlt: data.imageAlt,
      },
    });
    revalidatePath("/admin");
    return { success: true, course };
  } catch (error) {
    console.error("Failed to create course", error);
    return { success: false, error: "Failed to create course" };
  }
}

export async function deleteCourse(id: number) {
  try {
    await prisma.course.delete({
      where: { id },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete course", error);
    return { success: false, error: "Failed to delete course" };
  }
}
