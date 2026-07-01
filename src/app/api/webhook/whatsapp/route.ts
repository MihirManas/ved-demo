// src/app/api/webhook/whatsapp/route.ts
import { NextResponse } from 'next/server';
import { sendWhatsAppTextMessage } from '@/lib/whatsapp';

// This is a custom string you define in Meta Developer Portal when setting up the Webhook
const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '';

/**
 * GET handler: Used by Meta to verify your Webhook URL during setup.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse('Forbidden', { status: 403 });
  }
}

/**
 * POST handler: Receives incoming messages from WhatsApp users.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verify this is a WhatsApp event
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          // Check if there is an incoming message
          if (change.value && change.value.messages && change.value.messages[0]) {
            const message = change.value.messages[0];
            const senderPhone = message.from; // Phone number of the user (who sent the query)
            
            if (message.type === 'text') {
              const messageText = message.text.body;
              console.log(`Received support query from ${senderPhone}: ${messageText}`);

              // --- LOGIC TO ROUTE TO SUPPORT TEAM ---
              
              // 1. Send an auto-reply back to the user acknowledging receipt
              await sendWhatsAppTextMessage(
                senderPhone,
                "Thanks for reaching out! Our support team has received your message and will get back to you shortly."
              );
              
              // 2. Forward the query to the support team
              // Replace 'YOUR_SUPPORT_PHONE_NUMBER' in your .env with the designated support WhatsApp number
              const supportTeamPhone = process.env.SUPPORT_TEAM_PHONE_NUMBER;
              if (supportTeamPhone) {
                await sendWhatsAppTextMessage(
                  supportTeamPhone, 
                  `🚨 *New Support Query*\n\n*From:* +${senderPhone}\n*Message:* ${messageText}\n\n_Reply directly to their number to assist them._`
                );
              }

              // Note: For a more advanced setup, you could save this query to a Database 
              // or push it to a Slack channel using a Slack Webhook.
            }
          }
        }
      }
      return new NextResponse('EVENT_RECEIVED', { status: 200 });
    } else {
      return new NextResponse('Not Found', { status: 404 });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
