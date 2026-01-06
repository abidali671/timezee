import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { ToastContainer } from "react-toastify";

// Site constants
const BASE_URL = "https://timezee-five.vercel.app/";
const DEFAULT_OG_IMAGE = "/opengraph-image.png"; // place in /public

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "SwissTime Luxury Watches Store",

  description: "Online Luxurious watch store featuring premium men’s & women’s watches.",
  keywords: [
    "SwissTime",
    "luxury watches",
    "premium watch store",
    "men’s watches",
    "women’s watches",
    "ecommerce watches",
  ],
  authors: [{ name: "SwissTime" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "SwissTime",
    description: "Luxurious watch store featuring premium men’s & women’s watches.",
    url: BASE_URL,
    siteName: "SwissTime",
    images: [
      {
        url: `${BASE_URL}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "SwissTime Luxury Watches",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwissTime",
    description: "Luxurious watch store featuring premium men’s & women’s watches.",
    images: [`${BASE_URL}${DEFAULT_OG_IMAGE}`],
    site: "@SwissTime",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="SwissTime" />
        <link rel="canonical" href={BASE_URL} />

        {/* JSON-LD Schema for E-commerce Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SwissTime",
              "url": BASE_URL,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${BASE_URL}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />

        {/* Optional: Add Product Schema example for homepage featured products */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "SwissTime",
              "url": BASE_URL,
              "logo": `${BASE_URL}${DEFAULT_OG_IMAGE}`,
              "sameAs": [
                "https://www.facebook.com/SwissTime",
                "https://twitter.com/SwissTime",
                "https://www.instagram.com/SwissTime"
              ],
              "description": "Luxurious watch store featuring premium men’s & women’s watches",
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </Providers>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </body>
    </html>
  );
}
