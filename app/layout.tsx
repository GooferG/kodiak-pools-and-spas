import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Pinyon_Script } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "./components/ParticlesBackground";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const text = Hanken_Grotesk({
  variable: "--font-text",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const script = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SITE_URL = "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Acme Pool Co — Expert Pool Service, Peoria AZ",
  description:
    "Acme Pool Co, LLC — expert pool service, installation & repair across Peoria and the West Valley. Home-warranty specialist. Residential & commercial. ROC #00000000.",
  keywords: [
    "pool service Peoria AZ",
    "pool repair West Valley",
    "green pool clean-up",
    "home warranty pool specialist",
    "weekly pool maintenance",
    "pool heater repair",
  ],
  openGraph: {
    title: "Acme Pool Co — Expert Pool Service, Peoria AZ",
    description:
      "Expert pool service, installation & repair for Peoria and the Phoenix West Valley. Home-warranty specialist. ROC #00000000.",
    url: SITE_URL,
    siteName: "Acme Pool Co",
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${text.variable} ${script.variable}`}
    >
      <body>
        <ParticlesBackground />
        {children}
      </body>
    </html>
  );
}
