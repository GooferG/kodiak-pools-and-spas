export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-placeholder.png" alt="Acme Pool Co" />
          <div className="wm">ACME POOL CO</div>
          <div className="tag">Craftsmanship is back</div>
          <p>
            Expert pool service, installation &amp; repair for Peoria and the Phoenix West Valley.
            Acme Pool Co, LLC.
          </p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li>
              <a href="#services">Diagnosis &amp; Repair</a>
            </li>
            <li>
              <a href="#services">Green Pool Clean-ups</a>
            </li>
            <li>
              <a href="#services">Weekly Maintenance</a>
            </li>
            <li>
              <a href="#services">Heaters · Pumps · Filters</a>
            </li>
            <li>
              <a href="#services">Automatic Cleaners</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="tel:5551234567">(555) 123-4567</a>
            </li>
            <li>
              <a href="mailto:info@example.com">info@example.com</a>
            </li>
            <li>123 Example St, Ste 000</li>
            <li>Peoria, AZ 85383</li>
            <li>ROC #00000000</li>
          </ul>
        </div>
        <div className="legal">
          <span>© 2026 Acme Pool Co, LLC. All rights reserved.</span>
          <span>Residential · Commercial · Home-Warranty Specialist</span>
        </div>
      </div>
    </footer>
  );
}
