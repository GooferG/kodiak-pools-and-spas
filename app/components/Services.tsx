const SERVICES = [
  {
    num: "01",
    name: "Diagnosis & Repair",
    desc: "We trace the real fault — pump, plumbing, electrical or automation — and fix it right the first time.",
  },
  {
    num: "02",
    name: "Green Pool Clean-ups",
    desc: "Swamp to swimmable. Full chemical recovery, filtration and clean-up to bring a neglected pool back to life.",
  },
  {
    num: "03",
    name: "Weekly Maintenance",
    desc: "Dependable weekly service — balanced water, clean baskets, brushed walls and equipment checked every visit.",
  },
  {
    num: "04",
    name: "Heaters",
    desc: "Gas and heat-pump heater service, repair and installation, so the water's ready whenever you are.",
  },
  {
    num: "05",
    name: "Pumps & Filters",
    desc: "Repair, upgrades and energy-efficient replacements that cut runtime, lower bills and quiet things down.",
  },
  {
    num: "06",
    name: "Cleaners",
    desc: "Automatic cleaner setup, repair and replacement — robotic, suction and pressure-side units.",
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">What we do</span>
            <h2>Full-service pool care, from the pump to the patio.</h2>
          </div>
          <p className="lead">
            Six core services covering everything a residential or commercial pool needs to run
            clean, safe and efficient — year round.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <article className="svc" key={s.num}>
              <span className="mark" />
              <div className="num">{s.num}</div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
