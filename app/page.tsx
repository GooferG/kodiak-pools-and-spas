import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Services from "./components/Services";
import WhyKodiak from "./components/WhyKodiak";
import ServiceArea from "./components/ServiceArea";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "PoolCleaningService",
  name: "Acme Pool Co, LLC",
  description:
    "Expert pool service, installation & repair across Peoria and the Phoenix West Valley. Home-warranty specialist. Residential & commercial.",
  telephone: "+1-555-123-4567",
  email: "info@example.com",
  url: "https://example.com",
  image: "https://example.com/logo-placeholder.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Example St, Suite 000",
    addressLocality: "Peoria",
    addressRegion: "AZ",
    postalCode: "85383",
    addressCountry: "US",
  },
  areaServed: [
    "Peoria",
    "Glendale",
    "Surprise",
    "Sun City",
    "Sun City West",
    "El Mirage",
    "Litchfield Park",
    "Goodyear",
    "Avondale",
    "Waddell",
    "Anthem",
    "North Phoenix",
  ].map((name) => ({ "@type": "City", name })),
  founder: { "@type": "Person", name: "Jane Doe" },
  identifier: { "@type": "PropertyValue", propertyID: "ROC", value: "00000000" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <WhyKodiak />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
