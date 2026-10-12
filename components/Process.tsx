const steps = [
  { title: "Fill out the form", description: "Tell us about your business and what you’re struggling with." },
  { title: "Join the one-to-one call", description: "We spend 30 minutes on your business and find what’s not working." },
  { title: "Get your custom plan", description: "You receive a customised marketing plan in PDF format to start using right away." },
];

export function Process() {
  return (
    <section className="border-y border-light-border bg-white py-20 text-main-text sm:py-28" aria-labelledby="process-title">
      <div className="section-wrap">
        <div className="text-center"><h2 id="process-title" className="text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">Consultation Process</h2></div>
        <ol className="process-list relative mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-3xl border border-light-border bg-soft-lavender p-7 shadow-[0_16px_48px_rgba(76,29,149,0.06)] sm:p-8">
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-deep-purple via-primary-violet to-light-lavender text-xl font-extrabold text-white shadow-xl shadow-purple-900/30">{index + 1}</span>
              <h3 className="mt-7 text-xl font-extrabold">{step.title}</h3>
              <p className="mt-3 leading-7 text-muted-text">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
