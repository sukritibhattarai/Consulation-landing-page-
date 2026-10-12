const problems = [
  "You post regularly, but nothing is happening.",
  "You have followers, but sales are not coming in.",
  "You boost posts, but can’t tell what they bring back.",
  "Customers ask the price, then go quiet.",
  "You don’t know what to post.",
  "You don’t have time for marketing on top of running your business.",
];

export function Problem() {
  return (
    <section className="bg-soft-lavender py-20 sm:py-28" aria-labelledby="problem-title">
      <div className="section-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">The real challenge</span>
          <h2 id="problem-title" className="mt-5 text-3xl font-extrabold tracking-[-0.035em] text-main-text sm:text-5xl">You are doing the work—but growth still feels unpredictable.</h2>
          <p className="mt-5 text-lg leading-8 text-muted-text">When marketing activities are disconnected, more effort often creates more noise instead of more customers.</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {problems.map((problem) => (
            <li key={problem} className="soft-card flex items-start gap-4 p-5 sm:p-6">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-violet/10 text-primary-violet">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                  <path d="m5 10 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-semibold leading-7 text-main-text">{problem}</span>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xl font-extrabold text-deep-purple sm:text-2xl">The goal is not to do everything. It is to know what to fix first.</p>
      </div>
    </section>
  );
}
