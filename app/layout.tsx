import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
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
    "HITL multi-agent orchestration, from the field. Notes from inside the regulated stack by Aaron Pangburn.",
  metadataBase: new URL("https://apangburn.net"),
  openGraph: {
    title: "aaron pangburn",
    description: "HITL multi-agent orchestration, from the field.",
    url: "https://apangburn.net",
    siteName: "aaron pangburn",
    type: "website",
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
      <body className="min-h-screen bg-bg text-fg-2 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
