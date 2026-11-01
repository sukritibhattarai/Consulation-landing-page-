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
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json().catch(() => null)) as
    | { error?: string; ok?: boolean }
    | null;

  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || "Lead submission failed.");
  }
}
