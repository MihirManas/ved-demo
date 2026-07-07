import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
export const dynamic = 'force-dynamic';
import { getHRPassword } from '@/lib/auth';
import { sendWhatsAppTemplateMessage, sendWhatsAppTextMessage } from '@/lib/whatsapp';

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

    // Twilio WhatsApp Integration for Job Applications
    try {
      await sendWhatsAppTemplateMessage(
        phone, 
        'HXbf8d814c7886f34e926c21a2504355fe', // Actual Job ContentSID
        JSON.stringify({"1": name, "2": job.title})
      );

      // Alert the Support Team with the applicant's phone number
      const supportTeamPhone = process.env.SUPPORT_TEAM_PHONE_NUMBER;
      if (supportTeamPhone) {
        await sendWhatsAppTextMessage(
          supportTeamPhone,
          `💼 *New Job Application*\n\n*Name:* ${name}\n*Role:* ${job.title}\n*Phone:* ${phone}\n*Portfolio:* ${portfolioUrl || 'N/A'}`
        );
      }
    } catch (err) {
      console.error("Non-fatal: Twilio job alert failed to send", err);
    }

    // Sync to Google Sheet via Apps Script Webhook
    try {
      const webhookUrl = process.env.GOOGLE_SCRIPT_WEBAPP_URL;
      if (webhookUrl) {
        // Send data in the background (no await) to avoid blocking the user
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Apps Script handles text/plain better sometimes to avoid CORS preflight, but server-to-server doesn't have CORS. We'll stick to application/json
          body: JSON.stringify({
            jobTitle: `${job.title} (ID: ${job.id})`,
            data: {
              Name: name,
              Email: email,
              Phone: phone,
              Address: address,
              ResumeLink: resumeLink,
              LinkedIn: linkedinUrl || 'N/A',
              GitHub: githubUrl || 'N/A',
              Date: new Date().toISOString()
            }
          })
        }).catch(err => console.error("Non-fatal fetch error:", err));
      } else {
        console.warn("GOOGLE_SCRIPT_WEBAPP_URL is not set, skipping Google Sheet sync.");
      }
    } catch (err) {
      console.error("Non-fatal: Failed to sync with Google Sheet", err);
    }

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

    const correctPassword = await getHRPassword(prisma);
    if (password !== correctPassword) {
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
