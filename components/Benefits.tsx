const benefits = [
  "Know what’s holding your sales back",
  "Get a plan made for your business, not a generic template",
  "Know what to post, where to spend, and what to fix first",
  "Get steps you can start using right away",
  "Leave with clarity, not more confusion",
];

function BenefitIcon({ index }: { index: number }) {
  const paths = [
    <path key="target" d="M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 12l8-8m-2 0h2v2" />,
    <path key="plan" d="M7 3h8l4 4v14H7V3Zm8 0v5h4M10 12h6M10 16h6" />,
    <path key="route" d="M5 5h5a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h11M5 2v6M2 5h6m11 9v6m-3-3h6" />,
    <path key="bolt" d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
    <path key="clarity" d="M8.5 17h7M9 21h6m3-11a6 6 0 1 0-10.2 4.3C8.6 15.1 9 16 9 17h6c0-1 .4-1.9 1.2-2.7A5.9 5.9 0 0 0 18 10Z" />,
  ];
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</svg>;
}

export function Benefits() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="benefits-title">
      <div className="section-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="benefits-title" className="text-3xl font-extrabold tracking-[-0.04em] text-main-text sm:text-5xl">How You Benefit From This Consultation</h2>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {benefits.map((benefit, index) => (
            <li key={benefit} className={`soft-card group p-6 transition-transform duration-200 hover:-translate-y-1 ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-deep-purple to-bright-purple text-white shadow-lg shadow-purple-500/20"><BenefitIcon index={index} /></span>
              <p className="mt-5 text-lg font-extrabold leading-7 text-main-text">{benefit}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
