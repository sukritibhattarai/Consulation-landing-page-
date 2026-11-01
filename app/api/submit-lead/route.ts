import type { LeadData } from "@/lib/submitLead";

const FLODESK_FORM_URL =
  "https://form.flodesk.com/forms/6ae777c21311bb2571190649/submit";

const requiredFields: Array<keyof LeadData> = [
  "fullName",
  "email",
  "whatsapp",
  "businessName",
];

const allFields: Array<keyof LeadData> = [
  ...requiredFields,
  "website",
  "message",
];

function isLeadData(value: unknown): value is LeadData {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return (
    allFields.every((field) => typeof data[field] === "string") &&
    requiredFields.every((field) => (data[field] as string).trim().length > 0)
  );
}

export async function POST(request: Request) {
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
  const fullName = lead.fullName.trim();
  const firstName = fullName.split(/\s+/)[0];
  const notes = [
    `Full name: ${fullName}`,
    `WhatsApp: ${lead.whatsapp.trim()}`,
    lead.message.trim() ? `Message: ${lead.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  // These field names come from Sukriti's Flodesk form embed. Submitting to
  // this form adds the contact to the form's connected segment, which lets the
  // active Flodesk workflow start without changing the site's existing layout.
  const flodeskData = {
    email: lead.email.trim(),
    firstName,
    "fields.businessName": lead.businessName.trim(),
    "fields.websiteOrFacebookLink": lead.website.trim(),
    "fields.anythingYouWantToSay": notes,
    confirm_email_address: "",
  };

  try {
    const response = await fetch(FLODESK_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(flodeskData),
      redirect: "follow",
    });

    if (!response.ok) {
      return Response.json(
        { error: "Flodesk could not accept the form. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Flodesk is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
