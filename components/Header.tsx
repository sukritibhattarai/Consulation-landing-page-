import Image from "next/image";
import { BRAND_NAME, LOGO_SRC } from "@/lib/config";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-brand-black" aria-label="Sukriti Digital header">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-20">
        {LOGO_SRC ? (
          <Image
            src={LOGO_SRC}
            alt={BRAND_NAME}
            width={2048}
            height={800}
            priority
            className="h-auto max-h-10 w-[min(47vw,11.5rem)] object-contain drop-shadow-[0_0_18px_rgba(139,92,246,0.16)] sm:max-h-12 sm:w-[12.5rem]"
          />
        ) : (
          <span className="text-xl font-extrabold tracking-[0.12em] text-white">{BRAND_NAME}</span>
        )}
        <a href="#book" className="header-cta">
          <span className="hidden sm:inline">Book Free Call</span>
          <span className="sm:hidden">Book Call</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
            <path d="M4 10h12m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </header>
  );
}
