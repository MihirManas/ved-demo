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

    // Format phone number for Twilio (Must start with 'whatsapp:+' followed by country code)
    // Example: "whatsapp:+919876543210" for an Indian number
    const cleanedNumber = phone.replace(/[^0-9]/g, '');
    const twilioFormattedPhone = `whatsapp:+${cleanedNumber}`;

    if (type === 'student_application') {
      // 1. [PLACEHOLDER] Save the student data to your Database here
      console.log(`Processing student application for ${name}`);

      // 2. Send Congratulations WhatsApp Message
      // Replace with your actual Twilio template Content SID
      await sendWhatsAppTemplateMessage(
        twilioFormattedPhone, 
        'HXb5b62575e6e4ff6129ad7c8efe1f983e', // Example ContentSid from Twilio Dashboard
        JSON.stringify({"1": name, "2": "Student Application"})
      );
      
      return NextResponse.json({ success: true, message: "Student application processed and WhatsApp message sent via Twilio." });
      
    } else if (type === 'job_application') {
      // 1. [PLACEHOLDER] Save the job application data to your Database here
      console.log(`Processing job application for ${name}`);

      // 2. Send Job Application Received Message
      await sendWhatsAppTemplateMessage(
        twilioFormattedPhone, 
        'HXb5b62575e6e4ff6129ad7c8efe1f983e', // Replace with job template ContentSid
        JSON.stringify({"1": name, "2": "Job Application"})
      );

      return NextResponse.json({ success: true, message: "Job application processed and WhatsApp message sent via Twilio." });
    }

    return NextResponse.json({ error: "Invalid application type provided" }, { status: 400 });

  } catch (error) {
    console.error("Application processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
