// src/lib/whatsapp.ts

const WHATSAPP_API_VERSION = 'v19.0'; // Meta Graph API version
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || '';

/**
 * Sends a pre-approved template message.
 * Use this for sending "Congratulations" or "Application Received" messages.
 */
export async function sendWhatsAppTemplateMessage(
  toPhoneNumber: string,
  templateName: string,
  languageCode: string = 'en'
) {
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
    console.warn("WhatsApp credentials are not configured. Message not sent.");
    return;
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: toPhoneNumber,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode
      }
      // If your template has variables (like {{1}} for Name), you would pass a 'components' array here.
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send WhatsApp message:", JSON.stringify(errorData, null, 2));
      throw new Error("Failed to send WhatsApp template message");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in sendWhatsAppTemplateMessage:", error);
    throw error;
  }
}

/**
 * Sends a free-form text message.
 * Use this for replying to user support queries within the 24-hour customer service window.
 */
export async function sendWhatsAppTextMessage(
  toPhoneNumber: string,
  text: string
) {
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
    console.warn("WhatsApp credentials are not configured. Message not sent.");
    return;
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toPhoneNumber,
    type: "text",
    text: {
      preview_url: false,
      body: text
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send WhatsApp text message:", JSON.stringify(errorData, null, 2));
      throw new Error("Failed to send WhatsApp text message");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in sendWhatsAppTextMessage:", error);
    throw error;
  }
}
