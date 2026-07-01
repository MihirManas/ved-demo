"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteContent(id: string) {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { id },
    });
    return { success: true, content };
  } catch (error) {
    console.error("Failed to fetch site content", error);
    return { success: false, error: "Failed to fetch site content" };
  }
}

export async function getAllSiteContent() {
  try {
    const contents = await prisma.siteContent.findMany({
      orderBy: { id: "asc" },
    });
    return { success: true, contents };
  } catch (error) {
    console.error("Failed to fetch all site content", error);
    return { success: false, error: "Failed to fetch all site content" };
  }
}

export async function upsertSiteContent(data: {
  id: string;
  value: string;
  type: "TEXT" | "IMAGE";
}) {
  try {
    const content = await prisma.siteContent.upsert({
      where: { id: data.id },
      update: {
        value: data.value,
        type: data.type,
      },
      create: {
        id: data.id,
        value: data.value,
        type: data.type,
      },
    });
    // Revalidate the entire site so updates show everywhere
    revalidatePath("/", "layout");
    return { success: true, content };
  } catch (error) {
    console.error("Failed to upsert site content", error);
    return { success: false, error: "Failed to update content" };
  }
}
