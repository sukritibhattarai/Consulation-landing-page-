export function Hero() {
  return (
    <section className="relative px-4 pb-20 pt-16 text-center text-main-text sm:pb-28 sm:pt-24 lg:pb-32">
      <div className="reveal mx-auto max-w-5xl">
        <h1 className="text-[clamp(2.4rem,7.5vw,5.8rem)] font-extrabold leading-[0.99] tracking-[-0.055em]">
          Turn Your Hard Work Into a <span className="gradient-text">Clear Digital Growth Plan.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg font-bold leading-8 text-main-text sm:text-2xl sm:leading-9">
          Stop guessing what to post or where to spend. Get clear, practical next steps shaped around your business.
        </p>
        <div className="mx-auto mt-6 max-w-2xl space-y-1 text-sm leading-6 text-muted-text sm:text-base sm:leading-7">
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
