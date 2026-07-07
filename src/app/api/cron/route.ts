import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import twilio from 'twilio';

const prisma = new PrismaClient();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

// BATCH_SIZE is the number of messages to send per day
const BATCH_SIZE = 500;

export async function GET(request: Request) {
  try {
    // Vercel Cron sends an authorization header. Verify it to secure the endpoint.
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!client) {
      return NextResponse.json({ success: false, message: 'Twilio credentials missing' }, { status: 500 });
    }

    const supportNumber = process.env.SUPPORT_TEAM_PHONE_NUMBER; // Must be formatted as whatsapp:+1234567890

    // Determine batch size based on how many have already been processed (Warm-up strategy)
    const processedCount = await prisma.campaignLead.count({
      where: { status: { not: 'PENDING' } }
    });

    let BATCH_SIZE = 50;
    if (processedCount >= 300) {
      BATCH_SIZE = 200; // 4th day and beyond
    } else if (processedCount >= 150) {
      BATCH_SIZE = 150; // 3rd day
    } else if (processedCount >= 50) {
      BATCH_SIZE = 100; // 2nd day
    }

    // 1. Fetch the next batch of pending leads
    const leads = await prisma.campaignLead.findMany({
      where: { status: 'PENDING' },
      take: BATCH_SIZE,
      orderBy: { id: 'asc' }
    });

    if (leads.length === 0) {
      return NextResponse.json({ success: true, message: 'No more pending leads' }, { status: 200 });
    }

    let sentCount = 0;
    let failedCount = 0;
    const templateSid = process.env.TWILIO_TEMPLATE_SID; 

    // 2. Loop through leads and send the template message
    for (const lead of leads) {
      try {
        await client.messages.create({
          contentSid: templateSid,
          from: process.env.TWILIO_WHATSAPP_NUMBER,
          to: `whatsapp:+${lead.phone}`,
          contentVariables: JSON.stringify({})
        });

        // Update database status to SENT
        await prisma.campaignLead.update({
          where: { id: lead.id },
          data: { status: 'SENT', lastContactedAt: new Date() }
        });

        sentCount++;
        
        // Notify Support Team of Success
        if (supportNumber) {
          await client.messages.create({
            body: `✅ *Success:* Message sent to +${lead.phone}.`,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: supportNumber
          });
        }

        // Small delay to prevent hitting Twilio's burst rate limits
        await new Promise(resolve => setTimeout(resolve, 50)); 
      } catch (err: any) {
        console.error(`Failed to send to ${lead.phone}:`, err.message);
        failedCount++;
        
        // Notify Support Team of Failure
        if (supportNumber) {
          await client.messages.create({
            body: `❌ *Failed:* Could not send to +${lead.phone}.\n*Reason:* ${err.message}`,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: supportNumber
          });
        }
      }
    }

    // Optional: Send a summary to the support team
    if (supportNumber) {
        await client.messages.create({
            body: `📊 *Daily Batch Complete*\nTarget: ${BATCH_SIZE}\nSent: ${sentCount}\nFailed: ${failedCount}`,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: supportNumber
        });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully processed batch. Target: ${BATCH_SIZE}, Sent: ${sentCount}, Failed: ${failedCount}` 
    }, { status: 200 });


  } catch (error: any) {
    console.error('Cron error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
