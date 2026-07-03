// src/lib/whatsapp.ts
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// Ensure this starts with 'whatsapp:+' (e.g., 'whatsapp:+14155238886')
const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; 

// Initialize the Twilio Client
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

/**
 * Sends a template message via Twilio using Content API.
 * This exactly matches the Node.js code from the Twilio dashboard.
 */
export async function sendWhatsAppTemplateMessage(
  toPhoneNumber: string,
  contentSid: string,
  contentVariables: string = '{}'
) {
  if (!client || !fromWhatsAppNumber) {
    console.warn("Twilio credentials missing in .env. Message not sent.");
    return;
  }

  // Auto-format Indian numbers: If exactly 10 digits, prepend +91
  let formattedPhone = toPhoneNumber.replace(/[^0-9]/g, '');
  if (formattedPhone.length === 10) {
    formattedPhone = `91${formattedPhone}`;
  }
  const twilioFormattedPhone = `whatsapp:+${formattedPhone}`;

  try {
    const message = await client.messages.create({
      from: fromWhatsAppNumber,
      contentSid: contentSid,
      contentVariables: contentVariables,
      to: twilioFormattedPhone
    });
    
    console.log("Message sent via Twilio:", message.sid);
    return message;
  } catch (error) {
    console.error("Twilio sending error:", error);
    throw error;
  }
}

/**
 * Sends a free-form text message via Twilio.
 * Use this for replying to user support queries.
 */
export async function sendWhatsAppTextMessage(
  toPhoneNumber: string,
  text: string
) {
  if (!client || !fromWhatsAppNumber) {
    console.warn("Twilio credentials missing in .env. Message not sent.");
    return;
  }

  try {
    const message = await client.messages.create({
      body: text,
      from: fromWhatsAppNumber,
      to: toPhoneNumber
    });
    
    console.log("Message sent via Twilio:", message.sid);
    return message;
  } catch (error) {
    console.error("Twilio Text sending error:", error);
    throw error;
  }
}
