import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://ally-saleh.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ally Saleh | Poet, Author & Public Leader",
  description:
    "Ally Saleh — Zanzibari politician, lawyer, journalist, poet, and author. Exploring the intersection of leadership, literature, and public service.",
  keywords: [
    "Ally Saleh",
    "Zanzibar",
    "poet",
    "author",
    "politician",
    "lawyer",
    "journalist",
    "public leader",
    "Chwaka House",
  ],
  openGraph: {
    title: "Ally Saleh | Poet, Author & Public Leader",
    description:
      "Words that move. Leadership that serves. Zanzibar's voice in poetry, politics, and public service.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ally Saleh",
    images: [
      {
        url: "/Open_Graph_Image.png",
        width: 1200,
        height: 630,
        alt: "Ally Saleh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ally Saleh | Poet, Author & Public Leader",
    description:
      "Words that move. Leadership that serves. Zanzibar's voice in poetry, politics, and public service.",
    images: ["/Open_Graph_Image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-deep-charcoal text-soft-white font-body antialiased">
        {children}
      </body>
    </html>
  );
}
