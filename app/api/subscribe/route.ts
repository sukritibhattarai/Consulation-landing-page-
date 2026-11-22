import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupPayload = {
  fullName?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  businessName?: unknown;
  website?: unknown;
  message?: unknown;
  confirm_email_address?: unknown;
};

function text(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const token = process.env.MAILERLITE_API_TOKEN?.trim();
  const groupId = process.env.MAILERLITE_GROUP_ID?.trim();

  if (!token || !groupId) {
    return NextResponse.json(
      { error: "Email automation is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  let payload: SignupPayload;
  try {
    payload = (await request.json()) as SignupPayload;
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  // Honeypot: bots that fill this hidden field are ignored without contacting MailerLite.
  if (text(payload.confirm_email_address)) {
    return NextResponse.json({ ok: true });
  }

  const email = text(payload.email, 320).toLowerCase();
  const fullName = text(payload.fullName, 120);
  const whatsapp = text(payload.whatsapp, 40);
  const businessName = text(payload.businessName, 160);
  const website = text(payload.website, 500);
  const message = text(payload.message, 2000);

  if (!email || !EMAIL_PATTERN.test(email) || !fullName || !whatsapp || !businessName) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  try {
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fields: {
          name: fullName,
          phone: whatsapp,
          company: businessName,
          website,
          message,
        },
        groups: [groupId],
        // The form collects explicit consultation consent, so new leads can
        // enter the automation immediately instead of waiting for a second
        // confirmation email.
        status: "active",
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "We could not save your details. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Email service is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
