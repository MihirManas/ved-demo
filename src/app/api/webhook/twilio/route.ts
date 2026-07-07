import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import twilio from 'twilio';

const prisma = new PrismaClient();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const from = formData.get('From') as string; // format: whatsapp:+1234567890
    const body = formData.get('Body') as string; // The button payload (YES/NO)
    const buttonPayload = formData.get('ButtonPayload') as string;
    
    // Sometimes the payload comes in 'ButtonPayload', sometimes in 'Body' depending on the exact Twilio setup
    const responseText = (buttonPayload || body || '').toUpperCase().trim();
    const phoneNumber = from ? from.replace('whatsapp:', '').replace('+', '') : '';

    if (!phoneNumber) {
      return NextResponse.json({ success: false, message: 'No phone number found' }, { status: 400 });
    }

    if (responseText === 'YES') {
      // 1. Send the Google Form link
      if (client) {
        await client.messages.create({
          body: "Awesome! Here is the link to apply for the internship: https://forms.gle/Pkdjurt6eeKEPNDP9 \n\nLet us know if you need any help!",
          from: process.env.TWILIO_WHATSAPP_NUMBER,
          to: from // send back to the whatsapp number
        });
      }

      // 2. Update database
      await prisma.campaignLead.update({
        where: { phone: phoneNumber },
        data: { status: 'REPLIED_YES', updatedAt: new Date() }
      }).catch(() => console.log('Lead not found in DB'));

    } else if (responseText === 'NO') {
      // 1. Update database to stop messaging them
      await prisma.campaignLead.update({
        where: { phone: phoneNumber },
        data: { status: 'REPLIED_NO', updatedAt: new Date() }
      }).catch(() => console.log('Lead not found in DB'));
    }

    // Twilio requires a 200 OK response with TwiML, even if empty
    return new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
