import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suragverse.com"),
  title: "SURAGVERSE — Digital Experiences by Surag M S",
  description:
    "Explore websites, AI projects, applications, and innovative digital experiences created by Surag M S. A universe of ideas, technology, AI, and creativity.",
  keywords: [
    "SURAGVERSE",
    "Surag M S",
    "digital experiences",
    "web development",
    "AI projects",
    "portfolio",
    "Next.js",
    "React",
    "Three.js",
  ],
  authors: [{ name: "Surag M S" }],
  creator: "Surag M S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suragverse.com",
    siteName: "SURAGVERSE",
    title: "SURAGVERSE — Digital Experiences by Surag M S",
    description:
      "Explore websites, AI projects, applications, and innovative digital experiences created by Surag M S.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SURAGVERSE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SURAGVERSE — Digital Experiences by Surag M S",
    description:
      "Explore websites, AI projects, applications, and innovative digital experiences created by Surag M S.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
