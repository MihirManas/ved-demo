"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { domainsData } from "@/constants/domainsData";

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "asc" },
    });
    return { success: true, courses };
  } catch (error) {
    console.error("Failed to fetch courses", error);
    return { success: false, error: "Failed to fetch courses" };
  }
}

export async function seedCourses() {
  try {
    const coursesList = Object.values(domainsData);
    
    // Wipe existing courses to ensure a clean slate
    await prisma.course.deleteMany();

    const creates = coursesList.map(course => {
      return prisma.course.create({
        data: {
          slug: course.id,
          title: course.title,
          category: course.category,
          image: `/images/courses/${course.id.replace(/-/g, '_')}.png`,
          dateAdded: course.dateAdded,
          tag: course.tag,
          iconId: course.iconId,
          length: course.length,
          focus: course.focus,
          techs: course.techs,
          modules: course.modules,
          about: course.about,
          whyChoose: course.whyChoose,
          marketGrowth: course.marketGrowth,
          hiring: course.hiring,
          syllabus: course.syllabus,
        }
      });
    });

    await prisma.$transaction(creates);
    
    revalidatePath("/admin");
    revalidatePath("/domains");
    revalidatePath("/");
    
    return { success: true, message: "Successfully seeded 33 courses!" };
  } catch (error) {
    console.error("Failed to seed courses", error);
    return { success: false, error: "Failed to seed courses" };
  }
}

export async function createCourse(data: {
  title: string;
  category: string;
  about: string;
  slug: string;
}) {
  try {
    const course = await prisma.course.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        about: data.about,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/domains");
    revalidatePath("/");
    return { success: true, course };
  } catch (error) {
    console.error("Failed to create course", error);
    return { success: false, error: "Failed to create course" };
  }
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/domains");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete course", error);
    return { success: false, error: "Failed to delete course" };
  }
}

export async function updateCourse(
  id: string,
  data: {
    title: string;
    category: string;
    about: string;
    slug: string;
    image?: string | null;
    tag?: string | null;
  }
) {
  try {
    const course = await prisma.course.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        about: data.about,
        ...(data.image !== undefined && { image: data.image }),
        ...(data.tag !== undefined && { tag: data.tag }),
      },
    });
    revalidatePath("/admin");
    revalidatePath("/domains");
    revalidatePath("/");
    return { success: true, course };
  } catch (error) {
    console.error("Failed to update course", error);
    return { success: false, error: "Failed to update course" };
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug }
    });
    return { success: true, course };
  } catch (error) {
    console.error("Failed to fetch course", error);
    return { success: false, error: "Failed to fetch course" };
  }
}
