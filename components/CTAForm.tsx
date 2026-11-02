"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const FLODESK_FORM_ID = "6ae777c21311bb2571190649";
const FLODESK_FORM_URL = `https://form.flodesk.com/forms/${FLODESK_FORM_ID}/submit`;
const FLODESK_CONFIG =
  "eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJtZXNzYWdlIiwibWVzc2FnZSI6IiIsInJlZGlyZWN0VXJsIjoiIn0sImNvaSI6dHJ1ZSwic2hvd0ZvclJldHVyblZpc2l0b3JzIjp0cnVlLCJub3RpZmljYXRpb24iOnRydWUsImdkcHIiOnsiYWNjZXB0c01hcmtldGluZyI6ZmFsc2UsInByaXZhY3lQb2xpY3kiOnsiZW5hYmxlZCI6ZmFsc2UsIm1hbmRhdG9yeSI6ZmFsc2V9fSwidHJhY2tpbmdDb25maWciOnsibWV0YVBpeGVsSWQiOiIiLCJjb29raWVCYW5uZXJFbmFibGVkIjpmYWxzZSwiZ29vZ2xlQW5hbHl0aWNzSWQiOiIifX0=";

type LeadData = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website: string;
  message: string;
};

type FieldName = keyof LeadData;
type Errors = Partial<Record<FieldName, string>>;
type FlodeskCommand = [string, Record<string, unknown>];
type FlodeskFunction = ((...args: FlodeskCommand) => void) & { q?: FlodeskCommand[] };

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: FlodeskFunction;
  }
}

const initialData: LeadData = {
  fullName: "",
  email: "",
  whatsapp: "",
  businessName: "",
  website: "",
  message: "",
};

function validateField(name: FieldName, value: string) {
  const trimmed = value.trim();
  if (["fullName", "email", "whatsapp", "businessName"].includes(name) && !trimmed) {
    return "This field is required.";
  }
  if (name === "email" && trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email address.";
  }
  if (name === "whatsapp" && trimmed) {
    if (!/^\+?[0-9\s()-]+$/.test(trimmed) || trimmed.replace(/\D/g, "").length < 7) {
      return "Enter a valid WhatsApp number with at least 7 digits.";
    }
  }
  if (name === "website" && trimmed) {
    try {
      new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    } catch {
      return "Enter a valid website or Facebook URL.";
    }
  }
  return "";
}

const fields: Array<{
  name: FieldName;
  flodeskName?: string;
  label: string;
  placeholder: string;
  type: string;
  autoComplete?: string;
  optional?: boolean;
}> = [
  { name: "fullName", flodeskName: "firstName", label: "Full Name", placeholder: "Your full name", type: "text", autoComplete: "name" },
  { name: "email", flodeskName: "email", label: "Active Email", placeholder: "you@example.com", type: "email", autoComplete: "email" },
  { name: "whatsapp", label: "WhatsApp Number", placeholder: "+977 98XXXXXXXX", type: "tel", autoComplete: "tel" },
  { name: "businessName", flodeskName: "fields.businessName", label: "Business Name", placeholder: "Your business name", type: "text", autoComplete: "organization" },
  { name: "website", flodeskName: "fields.websiteOrFacebookLink", label: "Website or Facebook URL", placeholder: "yourwebsite.com or facebook.com/yourpage", type: "url", autoComplete: "url", optional: true },
];

function ensureFlodeskScript() {
  window.FlodeskObject = "fd";

  if (!window.fd) {
    const queue: FlodeskFunction = (...args) => {
      queue.q = queue.q || [];
      queue.q.push(args);
    };
    window.fd = queue;
  }

  if (!document.querySelector('script[data-flodesk-universal="module"]')) {
    const moduleScript = document.createElement("script");
    moduleScript.async = true;
    moduleScript.type = "module";
    moduleScript.src = "https://assets.flodesk.com/universal.mjs";
    moduleScript.dataset.flodeskUniversal = "module";
    document.head.appendChild(moduleScript);

    const legacyScript = document.createElement("script");
    legacyScript.async = true;
    legacyScript.noModule = true;
    legacyScript.src = "https://assets.flodesk.com/universal.js";
    legacyScript.dataset.flodeskUniversal = "legacy";
    document.head.appendChild(legacyScript);
  }
}

export function CTAForm() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    ensureFlodeskScript();
    window.fd?.("form:handle", { formId: FLODESK_FORM_ID, rootEl: root });

    const observer = new MutationObserver(() => {
      const form = root.querySelector("form");

      // Flodesk marks success only after it has accepted the subscriber,
      // including completion of its verification challenge when required.
      if (root.dataset.ffStage === "success" || form?.classList.contains("fd-has-success")) {
        window.location.assign("/thank-you");
        return;
      }

      if (form?.classList.contains("fd-has-error") || form?.classList.contains("fd-has-captcha")) {
        setIsSubmitting(false);
      }
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-ff-stage"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  function updateField(name: FieldName, value: string) {
    setData((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(name: FieldName) {
    setErrors((current) => ({ ...current, [name]: validateField(name, data[name]) }));
  }

  function validateBeforeFlodesk(event: FormEvent<HTMLFormElement>) {
    const nextErrors: Errors = {};
    (Object.keys(data) as FieldName[]).forEach((name) => {
      const error = validateField(name, data[name]);
      if (error) nextErrors[name] = error;
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setIsSubmitting(true);
  }

  const notes = [
    `WhatsApp: ${data.whatsapp.trim()}`,
    data.message.trim() ? `Message: ${data.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <section id="book" className="booking-section relative scroll-mt-4 py-20 sm:py-28" aria-labelledby="book-title">
      <div aria-hidden="true" className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-violet/15 blur-3xl" />
      <div className="section-wrap relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Your next clear step</span>
          <h2 id="book-title" className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-main-text sm:text-5xl">Let&apos;s find the growth opportunity you are missing.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-text">Share a few details so your free consultation can focus on the questions and opportunities that matter most to your business.</p>
        </div>

        <div
          ref={rootRef}
          className={`ff-${FLODESK_FORM_ID}`}
          data-ff-el="root"
          data-ff-version="3"
          data-ff-type="inline"
          data-ff-name="inlineNoImage"
          data-ff-stage="default"
        >
          <div data-ff-el="config" data-ff-config={FLODESK_CONFIG} hidden />
          <form
            action={FLODESK_FORM_URL}
            method="post"
            data-ff-el="form"
            onSubmitCapture={validateBeforeFlodesk}
            className="form-card mx-auto mt-12 max-w-3xl p-5 sm:p-9 lg:p-11"
          >
            <div className="fd-form-content" data-ff-el="content">
              <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-primary-violet/10 bg-soft-lavender px-4 py-4 text-sm font-extrabold text-deep-purple">
                <span>✓ Free 30-minute call</span>
                <span>✓ Tailored guidance</span>
                <span>✓ Practical next steps</span>
              </div>
              <div className="grid gap-x-5 gap-y-6 md:grid-cols-2" data-ff-el="fields">
                {fields.map((field) => {
                  const errorId = `${field.name}-error`;
                  const hasError = Boolean(errors[field.name]);
                  return (
                    <div key={field.name} className={`fd-form-group ${field.name === "website" ? "md:col-span-2" : ""}`}>
                      <label htmlFor={field.name} className="mb-2 block text-sm font-extrabold text-main-text">
                        {field.label}{field.optional ? " (optional)" : ""}
                      </label>
                      <input
                        id={field.name}
                        name={field.flodeskName}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        required={!field.optional}
                        value={data[field.name]}
                        onChange={(event) => updateField(field.name, event.target.value)}
                        onBlur={() => handleBlur(field.name)}
                        placeholder={field.placeholder}
                        aria-invalid={hasError}
                        aria-describedby={hasError ? errorId : undefined}
                        className="fd-form-control min-h-12 w-full rounded-xl border border-light-border bg-white px-4 text-base text-main-text shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-light-lavender focus:border-primary-violet"
                      />
                      {hasError && <p id={errorId} className="mt-2 text-sm font-semibold text-red-700">{errors[field.name]}</p>}
                    </div>
                  );
                })}

                <div className="fd-form-group md:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-extrabold text-main-text">Anything You Want to Say (optional)</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={data.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Tell us anything that would help us understand your business"
                    className="w-full resize-y rounded-xl border border-light-border bg-white px-4 py-3 text-base text-main-text shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-light-lavender focus:border-primary-violet"
                  />
                </div>

                <input type="hidden" name="fields.anythingYouWantToSay" value={notes} />
                <input type="text" name="confirm_email_address" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              </div>

              <div data-ff-el="footer">
                <button type="submit" data-ff-el="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="primary-button mt-7 w-full px-8 disabled:cursor-not-allowed disabled:opacity-65">
                  {isSubmitting ? "Booking…" : "Book Free Consultation"}
                </button>
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-muted-text">We respect your privacy. No spam.</p>
              <div data-ff-el="error" className="fd-form-error mt-5 text-center text-sm font-semibold text-red-700" role="alert" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
