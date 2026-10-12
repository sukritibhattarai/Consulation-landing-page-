// FormSubmit's AJAX endpoint is called from the visitor's browser. This avoids
// Cloudflare's server-side relay being rejected while keeping the form on-page.

export type LeadData = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website: string;
  message: string;
};

export async function submitLead(data: LeadData) {
  const response = await fetch(
    "https://formsubmit.co/ajax/bhattaraisukriti71@gmail.com",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        "WhatsApp Number": data.whatsapp,
        "Business Name": data.businessName,
        "Website or Facebook URL": data.website || "Not provided",
        Message: data.message || "Not provided",
        _subject: "New Free Consultation Booking — Sukriti Digital",
        _template: "table",
        _captcha: "false",
        _honey: "",
        _url:
          "https://sukriti-digital-consultation.susanbakerv098.chatgpt.site",
      }),
    },
  );

  const result = (await response.json().catch(() => null)) as
    | { success?: string | boolean; message?: string }
    | null;

  if (
    !response.ok ||
    result?.success === "false" ||
    result?.success === false
  ) {
    throw new Error(result?.message || "Lead submission failed.");
  }
}
