import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Pesekar temizlik sirketi, serfeli ve keyfiyyetli xidmetler - 166temizlik",
  description:
    "166 Təmizlik Xidməti - ev, ofis, fasad, pəncərə, yumşaq mebel və korporativ təmizlik xidmətləri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
