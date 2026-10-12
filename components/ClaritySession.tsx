const focusAreas = [
  {
    number: "01",
    title: "Your message",
    description:
      "We check whether your ideal customer can quickly understand what you offer, who it is for and why it matters.",
  },
  {
    number: "02",
    title: "Your customer journey",
    description:
      "We look at the path from first impression to enquiry and find where attention or trust may be getting lost.",
  },
  {
    number: "03",
    title: "Your next best move",
    description:
      "We prioritise realistic actions for your time, budget and current stage—so you know what to do first.",
  },
];

export function ClaritySession() {
  return (
    <section className="clarity-section py-20 sm:py-28" aria-labelledby="clarity-title">
      <div className="section-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:gap-20">
        <div className="lg:sticky lg:top-8">
          <span className="section-kicker section-kicker-dark">A better kind of consultation</span>
          <h2 id="clarity-title" className="mt-6 text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl">
            Not more information. <span className="text-light-lavender">Better decisions.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted-dark">
            You do not need another list of random marketing tips. You need to see what is blocking growth, what deserves attention now and what can wait.
          </p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-7">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-cyan-accent">The result</p>
            <p className="mt-3 text-xl font-extrabold leading-8 text-white">
              You finish the call with a clearer direction—not a bigger to-do list.
            </p>
          </div>
        </div>

        <ol className="grid gap-4">
          {focusAreas.map((item) => (
            <li key={item.number} className="clarity-row">
              <span className="text-sm font-extrabold tracking-[0.14em] text-light-lavender">{item.number}</span>
              <div>
                <h3 className="text-xl font-extrabold text-white sm:text-2xl">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted-dark">{item.description}</p>
              </div>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-none stroke-cyan-accent" strokeWidth="1.8">
                <path d="M5 12h14m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
