export function Hero() {
  return (
    <section className="relative px-4 pb-20 pt-16 text-center text-white sm:pb-28 sm:pt-24 lg:pb-32">
      <div className="reveal mx-auto max-w-5xl">
        <h1 className="text-[clamp(2.4rem,7.5vw,5.8rem)] font-extrabold leading-[0.99] tracking-[-0.055em]">
          Get a <span className="gradient-text">Custom Digital Marketing Plan</span>{" "}
          for Your Business. Free.
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-7 text-white sm:text-lg sm:leading-8">
          One 1-hour call with me. You leave with a plan in PDF format that you can start using right away. Yours to keep, even if we never work together.
        </p>
        <div className="mx-auto mt-6 max-w-2xl space-y-1 text-sm leading-6 text-muted-dark sm:text-base sm:leading-7">
          <p>This is a free one-to-one consultation for small and medium business owners.</p>
          <p>You&apos;re working hard, but sales are not coming in as they should.</p>
          <p>We&apos;ll look at your business and build a marketing plan made for you.</p>
        </div>
        <a className="primary-button mt-9 px-8" href="#book">
          Book Free Consultation
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
            <path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
