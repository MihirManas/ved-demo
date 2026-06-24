// Google Sheets submission service via Apps Script Webhook

// IMPORTANT: Replace this URL with your deployed Google Apps Script Web App URL
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwtBNsOJg9Kxw-bpYTJmdvcS45lvmVutm63OgneA9MllJ7I2Djuc04Qy9jnvCvieSlV/exec';

export const submitApplication = async (formData, leadScore) => {
  const payload = {
    ...formData,
    languages: formData.languages, // Already an array; Apps Script will join
    leadScore
  };

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain' // text/plain avoids CORS preflight with Apps Script
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const result = await response.json();

  if (result.status !== 'success') {
    throw new Error(result.message || 'Submission failed');
  }

  return result;
};

export const submitCallback = async ({ firstName, lastName, email, phone, domain }) => {
  const payload = {
    fullName: `${firstName} ${lastName}`.trim(),
    email,
    phone,
    qualification: '',
    duration: '',
    academicStatus: '',
    department: '',
    languages: '',
    domain: domain || '',
    program: '',
    careerGoals: '',
    leadScore: 'Callback Request'
  };

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const result = await response.json();

  if (result.status !== 'success') {
    throw new Error(result.message || 'Submission failed');
  }

  return result;
};
