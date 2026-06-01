import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-watermark"
        src="/logo-placeholder.png"
        alt=""
        aria-hidden="true"
      />
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow">Pools · Spas · Peoria, Arizona</span>
          <h1 className="display">
            Craftsmanship
            <br />
            is <span className="line2">back.</span>
          </h1>
          <p className="definition">
            <b>Expert pool service, installation &amp; repair</b> for the West
            Valley — done by hand, diagnosed honestly, and built to last.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Request a Quote
            </a>
            <a className="btn btn-ghost" href="tel:5551234567">
              Call (555) 123-4567
            </a>
          </div>
          <div className="hero-trust">
            <span>ROC #00000000</span>
            <span>Licensed &amp; Bonded</span>
            <span>Home-Warranty Specialist</span>
            <span>Residential &amp; Commercial</span>
          </div>
        </div>
        <div className="hero-media">
          <div className="hero-badge">
            <b>20+</b>
            <small>Years of craft</small>
          </div>
          <div className="hero-frame">
            <Image
              src="/imgs/pool-image.jpeg"
              alt="Freshly serviced backyard pool by Acme Pool Co"
              fill
              sizes="(max-width: 920px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
