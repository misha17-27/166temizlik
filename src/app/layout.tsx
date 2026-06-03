import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { getWordPressSettings, type WordPressSettings } from "@/lib/wordpress";
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

const fallbackMetadata = {
  title: "Pesekar temizlik sirketi, serfeli ve keyfiyyetli xidmetler - 166temizlik",
  description:
    "166 Təmizlik Xidməti - ev, ofis, fasad, pəncərə, yumşaq mebel və korporativ təmizlik xidmətləri.",
};

function imageUrl(value: WordPressSettings["favicon"]) {
  return typeof value === "string" ? value : value?.url || "";
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWordPressSettings("az").catch(() => null);
  const favicon = imageUrl(settings?.favicon) || "https://166temizlik.az/wp-content/uploads/2022/12/fav.png";

  return {
    ...fallbackMetadata,
    icons: {
      icon: [
        { url: favicon, sizes: "32x32" },
        { url: favicon, sizes: "192x192" },
      ],
      apple: [{ url: favicon }],
    },
  };
}

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
