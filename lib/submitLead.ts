// Lead data is sent to the server route, which forwards it to the configured email delivery service.

export type LeadData = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website: string;
  message: string;
};

export async function submitLead(data: LeadData) {
  const response = await fetch("/api/submit-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Lead submission failed.");
  }
}
