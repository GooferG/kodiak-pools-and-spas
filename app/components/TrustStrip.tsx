const ITEMS = [
  { k: "ROC #00000000", v: "Licensed Contractor" },
  { k: "Warranty Claims", v: "Home-Warranty Specialist" },
  { k: "Res. & Comm.", v: "Residential & Commercial" },
  { k: "Diagnose → Done", v: "Fixed Right the First Time" },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="wrap">
        {ITEMS.map((item) => (
          <div className="trust-item" key={item.k}>
            <div className="k">{item.k}</div>
            <div className="v">{item.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
