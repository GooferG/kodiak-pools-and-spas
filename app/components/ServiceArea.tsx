const CITIES = [
  'Peoria',
  'Glendale',
  'Surprise',
  'Sun City',
  'Sun City West',
  'El Mirage',
  'Litchfield Park',
  'Goodyear',
  'Avondale',
  'Waddell',
  'Anthem',
  'North Phoenix',
];

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const MAP_QUERY = encodeURIComponent(
  '123 Example St, Suite 000, Peoria, AZ 85383'
);

export default function ServiceArea() {
  return (
    <section className="area section" id="area">
      <div className="wrap">
        <div className="area-map">
          {MAPS_KEY ? (
            <iframe
              title="Acme Pool Co service area — Peoria, Arizona"
              src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${MAP_QUERY}&zoom=10`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="placeholder">
              / Drop a service-area map of the West Valley
            </div>
          )}
        </div>
        <div>
          <span className="eyebrow">Where we work</span>
          <h2
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '14px 0 6px' }}
          >
            Peoria &amp; the Phoenix West Valley.
          </h2>
          <ul className="cities">
            {CITIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="based">
            Based at <b>123 Example St, Suite 000, Peoria, AZ 85383.</b>{' '}
            Serving the West Valley and greater Phoenix metro. Outside the list?
            Call — we&apos;ll let you know.
          </p>
        </div>
      </div>
    </section>
  );
}
