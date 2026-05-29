export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand-lockup" href="#top" aria-label="Kodiak Pools and Spas home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kodiak-logo.png" alt="Kodiak Pools and Spas bear shield logo" />
          <span className="wm">
            KODIAK<small>Pools &amp; Spas</small>
          </span>
        </a>
        <nav className="main-nav">
          <a href="#services">Services</a>
          <a href="#why">Why Kodiak</a>
          <a href="#area">Service Area</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-cta">
          <a className="header-phone" href="tel:6023994037">
            602.399.4037<span>Call or text Todd</span>
          </a>
          <a className="btn btn-primary" href="#contact">
            Request a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
