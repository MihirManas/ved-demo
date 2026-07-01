import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Format the data exactly as your Google Apps Script expects it
    const payloadForAppScript = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      collegeName: data.collegeName,
      crNumber: data.crNumber,
      qualification: data.qualification,
      duration: data.duration,
      academicStatus: data.academicStatus,
      department: data.department,
      languages: data.languages,
      domain: `${data.domainCategory} - ${data.domainCourse}`, // Combined for your Apps Script
      program: data.program,
      careerGoals: data.careerGoals,
      leadScore: ""
    };

    // IMPORTANT: Replace this with your actual Google Apps Script Web App URL
    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyydDVDMMYEyR6caxqvPpER_-RZW_EJ6ZMlvuxsxDssr1zOM1VLOlKH37rkoUWpz4go/exec";

    if (GOOGLE_APPS_SCRIPT_URL !== "YOUR_WEBHOOK_URL_HERE") {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadForAppScript)
      });

      if (!response.ok) {
        throw new Error("Failed to push to Google Sheets Apps Script");
      }
      
      const scriptResponse = await response.json();
      console.log("Apps Script Response:", scriptResponse);
    } else {
      // Simulating a successful backend processing delay if no URL is provided yet
      console.log("No Webhook URL provided. Simulating success with payload:", payloadForAppScript);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead successfully routed to Google Apps Script."
    }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process application" }, { status: 500 });
  }
}
