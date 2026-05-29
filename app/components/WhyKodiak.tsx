const DIFFERENTIATORS = [
  "Trusted by home-warranty & insurance providers",
  "Clear, documented diagnosis on every claim",
  "Licensed AZ contractor — ROC #309965",
  "Residential & commercial properties",
];

export default function WhyKodiak() {
  return (
    <section className="why section" id="why">
      <div className="wrap">
        <div>
          <div className="dict">
            <div className="word">crafts·man·ship</div>
            <div className="pos">noun · /ˈkraf(t)smənˌSHip/</div>
            <div className="def">
              &ldquo;a person who is highly skilled in their craft or trade.&rdquo;
            </div>
          </div>
          <p className="body">
            That definition is printed on the back of every Kodiak card for a reason. Todd Crane
            built this company on doing the work properly — diagnosing the real problem, using the
            right parts, and standing behind the result. No upsells, no guesswork.
          </p>
        </div>
        <div className="why-card">
          <span className="eyebrow">The Kodiak difference</span>
          <h3>Home-Warranty Specialist</h3>
          <p>
            Kodiak is the contractor home-warranty and insurance companies call when a pool claim
            needs an honest diagnosis and a clean fix. Todd handles the inspection, the paperwork
            and the repair — start to finish.
          </p>
          <ul>
            {DIFFERENTIATORS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
