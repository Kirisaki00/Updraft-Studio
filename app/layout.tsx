import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Updraft — Creative Agency",
  description:
    "Updraft is a premium creative agency specializing in videography, photography, web design, brand identity, and motion graphics. We transform visions into unforgettable experiences.",
  keywords: [
    "creative agency",
    "videography",
    "photography",
    "web design",
    "brand identity",
    "motion graphics",
    "Updraft",
  ],
  authors: [{ name: "Updraft" }],
  creator: "Updraft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://updraft.agency",
    title: "Updraft — Creative Agency",
    description:
      "Premium creative agency specializing in videography, photography, web design, and brand identity.",
    siteName: "Updraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Updraft — Creative Agency",
    description:
      "Premium creative agency specializing in videography, photography, web design, and brand identity.",
    creator: "@updraft",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: "Updraft",
              description: "Premium creative agency",
              url: "https://updraft.agency",
              "@id": "https://updraft.agency",
              sameAs: ["https://instagram.com/updraft"],
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
