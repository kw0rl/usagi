import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import LovePopup from "@/components/LovePopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Project Heartbeat 💕",
  description: "Our Digital Love Capsule - A special place just for us",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💕</text></svg>",
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
        className={`${inter.variable} ${caveat.variable} antialiased font-sans overflow-x-hidden`}
      >
        <LovePopup />
        <Navigation />
        <main className="overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
