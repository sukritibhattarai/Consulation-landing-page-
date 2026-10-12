import { VIMEO_URL, WHATSAPP_NUMBER } from "@/lib/config";

const steps = [
  "Watch the short video below.",
  "Message us on WhatsApp to ask about your next steps.",
  "Join your free 30-minute consultation and get your custom plan in PDF format.",
];

function getVimeoEmbedUrl(url: string) {
  if (!url) return "";
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : "";
}

export function ThankYou() {
  const vimeoEmbedUrl = getVimeoEmbedUrl(VIMEO_URL);
  const whatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
  const message = "Hi, I just submitted the form for the Free Digital Marketing Consultation. I’d like to know the next steps.";

  if (process.env.NODE_ENV === "development") {
    if (!vimeoEmbedUrl) console.warn("VIMEO_URL is empty or invalid; the video is hidden.");
    if (!whatsappNumber) console.warn("WHATSAPP_NUMBER is empty; the WhatsApp button is hidden.");
  }

  return (
    <section className="relative px-4 pb-20 pt-14 text-white sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-[clamp(2.25rem,7vw,4.7rem)] font-extrabold leading-[1.04] tracking-[-0.05em]">
          Congratulations! You&apos;ve taken the <span className="gradient-text">first step.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-dark sm:text-lg">You&apos;re one step closer to a marketing plan made for your business.</p>

        <ol className="mt-10 grid gap-4 text-left">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-violet font-extrabold text-white">{index + 1}</span>
              <span className="font-semibold leading-6 text-white">{step}</span>
            </li>
          ))}
        </ol>

        {vimeoEmbedUrl && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-purple-950/40">
            <div className="aspect-video">
              <iframe src={vimeoEmbedUrl} title="Sukriti Digital consultation next steps" className="h-full w-full" allow="fullscreen; picture-in-picture" allowFullScreen />
            </div>
          </div>
        )}

        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-whatsapp px-7 font-extrabold text-white shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6 fill-current">
              <path d="M16 3a12.8 12.8 0 0 0-11 19.4L3.4 29l6.8-1.5A12.9 12.9 0 1 0 16 3Zm0 23.4c-2 0-4-.6-5.7-1.6l-.4-.2-4 .9 1-3.9-.3-.4A10.5 10.5 0 1 1 16 26.4Zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-2-.9-3.4-1.8-4.7-4-.4-.7.4-.6 1.1-2.1.1-.2 0-.4 0-.6l-1-2.5c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 2.2 1 3.1 1.1 4.2.9.7-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.2-.4-.3-.7-.5Z" />
            </svg>
            Message Us on WhatsApp
          </a>
        )}
      </div>
    </section>
  );
}
