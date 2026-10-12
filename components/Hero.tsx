export function Hero() {
  return (
    <section className="relative px-4 pb-20 pt-12 text-main-text sm:pb-28 sm:pt-20 lg:pb-32">
      <div className="section-wrap grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <div className="reveal text-center lg:text-left">
          <span className="section-kicker">Free 30-minute growth clarity call</span>
          <h1 className="mt-6 text-[clamp(2.65rem,6.5vw,5.55rem)] font-extrabold leading-[0.98] tracking-[-0.06em]">
            Your marketing should create <span className="gradient-text">customers—not confusion.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-bold leading-8 text-main-text sm:text-2xl sm:leading-9">
            Let&apos;s uncover what is slowing your online growth and turn it into a focused action plan for your business.
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-text sm:text-lg">
            In one practical conversation, we&apos;ll look at your offer, visibility and customer journey—then identify the few next steps most likely to move your business forward.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <a className="primary-button px-8" href="#book">
              Book My Free Consultation
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                <path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="inline-flex min-h-14 items-center text-sm font-bold text-muted-text">No pressure • No generic advice</span>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-extrabold text-main-text lg:justify-start">
            {['30 focused minutes', '1-to-1 guidance', 'A clear next-step plan'].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-accent shadow-[0_0_0_4px_rgba(34,211,238,.12)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual reveal" aria-label="Preview of your growth clarity session">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="consultation-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-accent">Your clarity session</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-white">From scattered ideas to a focused plan.</h2>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-xl font-extrabold text-white">30</span>
            </div>

            <div className="mt-8 grid gap-3">
              {[
                ['01', 'Offer', 'Is your value clear to the right customer?'],
                ['02', 'Visibility', 'Are the right people finding and noticing you?'],
                ['03', 'Conversion', 'What stops interest from becoming action?'],
              ].map(([number, title, description]) => (
                <div key={title} className="session-row">
                  <span className="text-xs font-extrabold text-light-lavender">{number}</span>
                  <div>
                    <p className="font-extrabold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-5 text-muted-dark">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-5 text-main-text shadow-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary-violet">You leave with</p>
              <p className="mt-2 text-lg font-extrabold">A practical priority roadmap made for your business.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
