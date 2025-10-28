import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chrome Translation API Demo | AI-Powered Universal Translator",
  description:
    "Experience Chrome's built-in Translation API with live multilingual product reviews. Translate reviews on-demand using Chrome 138+'s on-device AI language detection and translation capabilities.",
  keywords: [
    "Chrome Translation API",
    "Language Detection API",
    "Chrome AI",
    "On-device Translation",
    "Web AI",
    "Browser API",
    "Gemini Nano",
  ],
  authors: [{ name: "Dave Bitter" }],
  openGraph: {
    title: "Chrome Translation API Demo",
    description:
      "Live demo showcasing Chrome's built-in Translation and Language Detection APIs with multilingual product reviews.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chrome Translation API Demo",
    description:
      "Experience Chrome's built-in on-device AI translation with live multilingual reviews.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
