import Image from "next/image";
import { BRAND_NAME, LOGO_SRC } from "@/lib/config";

export function Header() {
  return (
    <header className="border-b border-white/10" aria-label="Sukriti Digital header">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-center px-4 sm:h-20">
        {LOGO_SRC ? (
          <Image
            src={LOGO_SRC}
            alt={BRAND_NAME}
            width={2048}
            height={800}
            priority
            className="h-auto w-[min(52vw,14rem)] object-contain drop-shadow-[0_0_18px_rgba(139,92,246,0.16)]"
          />
        ) : (
          <span className="text-xl font-extrabold tracking-[0.12em] text-white">{BRAND_NAME}</span>
        )}
      </div>
    </header>
  );
}
