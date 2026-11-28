import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sukriti-digital-consultation.susanbakerv098.chatgpt.site"),
  title: "Free 30-Minute Digital Marketing Consultation | Sukriti Digital",
  description:
    "Book a free one-to-one consultation for your business and get a custom digital marketing plan in PDF format.",
  openGraph: {
    title: "Free 30-Minute Digital Marketing Consultation | Sukriti Digital",
    description:
      "Book a free one-to-one consultation for your business and get a custom digital marketing plan in PDF format.",
    type: "website",
    locale: "en_US",
    // Add a dedicated 1200x630 Open Graph image here before launch.
  },
  twitter: {
    card: "summary",
    title: "Free 30-Minute Digital Marketing Consultation | Sukriti Digital",
    description:
      "Book a free one-to-one consultation for your business and get a custom digital marketing plan in PDF format.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F3FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        {children}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1159969596403385');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1159969596403385&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
