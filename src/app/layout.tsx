import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEVPHOENIX | Building Intelligent Digital Ecosystems",
  description: "We combine cutting-edge technology with future-ready education to help businesses scale, automate and succeed in the digital era — while empowering the next generation of innovators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${sora.variable} bg-[#050505] text-white antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
