import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "aaron pangburn",
  description:
    "HITL multi-agent orchestration, from the field — Aaron Pangburn's engineering blog",
  metadataBase: new URL("https://apangburn.net"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "aaron pangburn",
    description: "HITL multi-agent orchestration, from the field",
    url: "https://apangburn.net",
    siteName: "aaron pangburn",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "aaron pangburn",
    description: "HITL multi-agent orchestration, from the field",
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
      className={`${plexSans.variable} ${plexMono.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-bg text-fg-2 font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
