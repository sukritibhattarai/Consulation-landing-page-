"use client";

import { FormEvent, useState } from "react";
import { type LeadData, submitLead } from "@/lib/submitLead";

type FieldName = keyof LeadData;
type Errors = Partial<Record<FieldName | "form", string>>;

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
  label: string;
  placeholder: string;
  type: string;
  autoComplete?: string;
  optional?: boolean;
}> = [
  { name: "fullName", label: "Full Name", placeholder: "Your full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Active Email", placeholder: "you@example.com", type: "email", autoComplete: "email" },
  { name: "whatsapp", label: "WhatsApp Number", placeholder: "+977 98XXXXXXXX", type: "tel", autoComplete: "tel" },
  { name: "businessName", label: "Business Name", placeholder: "Your business name", type: "text", autoComplete: "organization" },
  { name: "website", label: "Website or Facebook URL", placeholder: "yourwebsite.com or facebook.com/yourpage", type: "url", autoComplete: "url", optional: true },
];

export function CTAForm() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(name: FieldName, value: string) {
    setData((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value), form: undefined }));
    }
  }

  function handleBlur(name: FieldName) {
    setErrors((current) => ({ ...current, [name]: validateField(name, data[name]) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors: Errors = {};
    (Object.keys(data) as FieldName[]).forEach((name) => {
      const error = validateField(name, data[name]);
      if (error) nextErrors[name] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    try {
      await submitLead(data);
      window.location.assign("/thank-you");
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  }

  return (
    <section id="book" className="relative scroll-mt-4 bg-soft-lavender py-20 sm:py-28" aria-labelledby="book-title">
      <div aria-hidden="true" className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-violet/10 blur-3xl" />
      <div className="section-wrap relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Book the Call</span>
          <h2 id="book-title" className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-main-text sm:text-5xl">One-to-One Consultation</h2>
          <p className="mt-4 text-lg font-semibold text-muted-text">Customized Strategy for Your Business</p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="soft-card mx-auto mt-12 max-w-3xl p-5 sm:p-9 lg:p-11">
          <div className="grid gap-x-5 gap-y-6 md:grid-cols-2">
            {fields.map((field) => {
              const errorId = `${field.name}-error`;
              const hasError = Boolean(errors[field.name]);
              return (
                <div key={field.name} className={field.name === "website" ? "md:col-span-2" : ""}>
                  <label htmlFor={field.name} className="mb-2 block text-sm font-extrabold text-main-text">
                    {field.label}{field.optional ? " (optional)" : ""}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    value={data[field.name]}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    onBlur={() => handleBlur(field.name)}
                    placeholder={field.placeholder}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? errorId : undefined}
                    className="min-h-12 w-full rounded-xl border border-light-border bg-white px-4 text-base text-main-text shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-light-lavender focus:border-primary-violet"
                  />
                  {hasError && <p id={errorId} className="mt-2 text-sm font-semibold text-red-700">{errors[field.name]}</p>}
                </div>
              );
            })}

            <div className="md:col-span-2">
              <label htmlFor="message" className="mb-2 block text-sm font-extrabold text-main-text">Anything You Want to Say (optional)</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={data.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Tell us anything that would help us understand your business"
                className="w-full resize-y rounded-xl border border-light-border bg-white px-4 py-3 text-base text-main-text shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-light-lavender focus:border-primary-violet"
              />
            </div>
          </div>

          {errors.form && <p role="alert" className="mt-5 text-center text-sm font-semibold text-red-700">{errors.form}</p>}
          <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="primary-button mt-7 w-full px-8 disabled:cursor-not-allowed disabled:opacity-65">
            {isSubmitting ? "Booking…" : "Book Free Consultation"}
          </button>
          <p className="mt-4 text-center text-sm font-semibold text-muted-text">We respect your privacy. No spam.</p>
        </form>
      </div>
    </section>
  );
}
