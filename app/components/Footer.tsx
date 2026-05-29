export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kodiak-logo.png" alt="Kodiak Pools and Spas" />
          <div className="wm">KODIAK POOLS &amp; SPAS</div>
          <div className="tag">Craftsmanship is back</div>
          <p>
            Expert pool service, installation &amp; repair for Peoria and the Phoenix West Valley.
            Kodiak Pools and Spas, LLC.
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
              <a href="tel:6023994037">602.399.4037</a>
            </li>
            <li>
              <a href="mailto:KodiakPoolsandSpas@gmail.com">KodiakPoolsandSpas@gmail.com</a>
            </li>
            <li>8194 W Deer Valley Rd, Ste 106</li>
            <li>Peoria, AZ 85383</li>
            <li>ROC #309965</li>
          </ul>
        </div>
        <div className="legal">
          <span>© 2026 Kodiak Pools and Spas, LLC. All rights reserved.</span>
          <span>Residential · Commercial · Home-Warranty Specialist</span>
        </div>
      </div>
    </footer>
  );
}
