// src/app/api/apply/route.ts
import { NextResponse } from 'next/server';
import { sendWhatsAppTemplateMessage } from '@/lib/whatsapp';

/**
 * POST handler: Receives form submissions from your frontend (Student Apply or Job Apply)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, phone, name } = body;
    // Expected types: 'student_application' or 'job_application'

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Format phone number for WhatsApp API (Country code + number, no '+' or special chars)
    // Example: "919876543210" for an Indian number
    const formattedPhone = phone.replace(/[^0-9]/g, '');

    if (type === 'student_application') {
      // 1. [PLACEHOLDER] Save the student data to your Database here
      console.log(`Processing student application for ${name}`);

      // 2. Send Congratulations WhatsApp Message
      // Replace 'student_congrats_template' with the actual template name from Meta Dashboard
      await sendWhatsAppTemplateMessage(formattedPhone, 'student_congrats_template');
      
      return NextResponse.json({ success: true, message: "Student application processed and WhatsApp message sent." });
      
    } else if (type === 'job_application') {
      // 1. [PLACEHOLDER] Save the job application data to your Database here
      console.log(`Processing job application for ${name}`);

      // 2. Send Job Application Received Message
      // Replace 'job_application_received' with the actual template name from Meta Dashboard
      await sendWhatsAppTemplateMessage(formattedPhone, 'job_application_received');

      return NextResponse.json({ success: true, message: "Job application processed and WhatsApp message sent." });
    }

    return NextResponse.json({ error: "Invalid application type provided" }, { status: 400 });

  } catch (error) {
    console.error("Application processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
