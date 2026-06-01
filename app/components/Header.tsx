export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand-lockup" href="#top" aria-label="Acme Pool Co home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-placeholder.png" alt="Acme Pool Co logo" />
          <span className="wm">
            ACME<small>Pool Co</small>
          </span>
        </a>
        <nav className="main-nav">
          <a href="#services">Services</a>
          <a href="#why">Why Acme</a>
          <a href="#area">Service Area</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-cta">
          <a className="header-phone" href="tel:5551234567">
            (555) 123-4567<span>Call or text Jane</span>
          </a>
          <a className="btn btn-primary" href="#contact">
            Request a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
