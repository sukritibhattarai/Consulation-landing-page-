import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sukriti-digital-consultation.susanbakerv098.chatgpt.site"),
  title: "Free 1-Hour AI Marketing Consultation | Sukriti Digital",
  description:
    "Book a free one-to-one consultation for your business and get a custom digital marketing plan in PDF format.",
  openGraph: {
    title: "Free 1-Hour AI Marketing Consultation | Sukriti Digital",
    description:
      "Book a free one-to-one consultation for your business and get a custom digital marketing plan in PDF format.",
    type: "website",
    locale: "en_US",
    // Add a dedicated 1200x630 Open Graph image here before launch.
  },
  twitter: {
    card: "summary",
    title: "Free 1-Hour AI Marketing Consultation | Sukriti Digital",
    description:
      "Book a free one-to-one consultation for your business and get a custom digital marketing plan in PDF format.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
