import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "RagnaSys — Ragnarok: The New World Companion",
  description:
    "Companion tools for Ragnarok: The New World: class database, MVP timers, build calculator, and class guides.",
  manifest: "/manifest.json",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">
        <Nav />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 animate-rise">{children}</main>
        <footer className="border-t border-gold-deep/15 py-5 text-center text-xs text-foreground/55">
          <p>
            RagnaSys is a fan-made companion tool. Not affiliated with Gravity. Data is
            community-sourced and may be inaccurate — verify in-game.
          </p>
        </footer>
        <Script id="sw-register" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}`}
        </Script>
      </body>
    </html>
  );
}
