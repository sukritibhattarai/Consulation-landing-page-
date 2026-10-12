// Submissions are NOT stored until a real backend (for example Formspree, Google Sheets, a CRM webhook, or an API route) is connected.

import { NEXT_PUBLIC_FORM_ENDPOINT } from "@/lib/config";

export type LeadData = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website: string;
  message: string;
};

export async function submitLead(data: LeadData) {
  if (!NEXT_PUBLIC_FORM_ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  const response = await fetch(NEXT_PUBLIC_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Lead submission failed with status ${response.status}.`);
  }
}
