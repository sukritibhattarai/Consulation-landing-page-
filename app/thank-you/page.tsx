import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ThankYou } from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Thank You | Sukriti Digital",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="hero-shell min-h-screen overflow-hidden">
      <Header />
      <ThankYou />
    </main>
  );
}
