// src/app/api/webhook/whatsapp/route.ts
import { NextResponse } from 'next/server';
import { sendWhatsAppTextMessage } from '@/lib/whatsapp';

/**
 * POST handler: Receives incoming messages from Twilio.
 * Twilio sends webhook data as URL-encoded form data.
 */
export async function POST(request: Request) {
  try {
    // Parse the incoming form data from Twilio
    const formData = await request.formData();
    
    // Twilio formats the phone number as 'whatsapp:+1234567890'
    const senderPhone = formData.get('From') as string; 
    const messageText = formData.get('Body') as string;
    
    if (!senderPhone || !messageText) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    console.log(`Received support query from ${senderPhone}: ${messageText}`);

    // --- LOGIC TO ROUTE TO SUPPORT TEAM ---
    
    // 1. Send an auto-reply back to the user acknowledging receipt
    await sendWhatsAppTextMessage(
      senderPhone,
      "Thanks for reaching out! Our support team has received your message and will get back to you shortly."
    );
    
    // 2. Forward the query to the support team
    // The SUPPORT_TEAM_PHONE_NUMBER must also be formatted as 'whatsapp:+...' in your .env
    const supportTeamPhone = process.env.SUPPORT_TEAM_PHONE_NUMBER;
    if (supportTeamPhone) {
      await sendWhatsAppTextMessage(
        supportTeamPhone, 
        `🚨 *New Support Query*\n\n*From:* ${senderPhone.replace('whatsapp:', '')}\n*Message:* ${messageText}`
      );
    }

    // Twilio expects an XML response (TwiML). Returning empty TwiML tells Twilio the webhook succeeded.
    return new NextResponse('<Response></Response>', { 
      status: 200, 
      headers: { 'Content-Type': 'text/xml' } 
    });
    
  } catch (error) {
    console.error('Twilio Webhook error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
