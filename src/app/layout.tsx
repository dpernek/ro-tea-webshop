import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  metadataBase: new URL("https://ro-tea-webshop.vercel.app"),
  title: {
    default: "RO-TEA webshop | Tehnička oprema",
    template: "%s | RO-TEA",
  },
  description:
    "Moderna RO-TEA web trgovina za alate, elektro materijal, rasvjetu, vodoinstalacije, opremu za dom i pametnu kuću.",
  openGraph: {
    title: "RO-TEA webshop",
    description:
      "Premium tehnička trgovina s hrvatskim katalogom, košaricom i checkout flowom.",
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
      data-scroll-behavior="smooth"
      lang="hr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
