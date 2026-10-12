import type { LeadData } from "@/lib/submitLead";

const requiredFields: Array<keyof LeadData> = [
  "fullName",
  "email",
  "whatsapp",
  "businessName",
];

function isLeadData(value: unknown): value is LeadData {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return requiredFields.every(
    (field) => typeof data[field] === "string" && data[field].trim().length > 0,
  );
}

export async function POST(request: Request) {
  const recipient = process.env.LEAD_RECIPIENT_EMAIL?.trim();
  if (!recipient) {
    return Response.json(
      { error: "Form delivery is not configured." },
      { status: 503 },
    );
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }

  if (!isLeadData(data)) {
    return Response.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const lead = data as LeadData;
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: lead.fullName,
          email: lead.email,
          "WhatsApp Number": lead.whatsapp,
          "Business Name": lead.businessName,
          "Website or Facebook URL": lead.website || "Not provided",
          Message: lead.message || "Not provided",
          _subject: "New Free Consultation Booking — Sukriti Digital",
          _template: "table",
          _captcha: "false",
          _honey: "",
          _url: "https://sukriti-digital-consultation.susanbakerv098.chatgpt.site",
        }),
      },
    );

    const result = (await response.json().catch(() => null)) as
      | { success?: string | boolean }
      | null;

    if (!response.ok || result?.success === "false" || result?.success === false) {
      return Response.json(
        { error: "Email delivery failed. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Email delivery is temporarily unavailable." },
      { status: 502 },
    );
  }
}
