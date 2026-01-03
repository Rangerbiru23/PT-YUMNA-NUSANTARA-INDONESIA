import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT YUMNA NUSANTARA INDONESIA | Konveksi Pakaian Jadi Berkualitas",
  description: "PT YUMNA NUSANTARA INDONESIA adalah perusahaan konveksi terpercaya di Bekasi yang memproduksi pakaian jadi berkualitas tinggi dari tekstil untuk berbagai kebutuhan industri garmen.",
  keywords: ["konveksi", "pakaian jadi", "garmen", "tekstil", "produksi pakaian", "seragam", "kaos", "kemeja", "jaket", "bekasi", "yumna", "PT YUMNA NUSANTARA INDONESIA"],
  authors: [{ name: "PT YUMNA NUSANTARA INDONESIA" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "PT YUMNA NUSANTARA INDONESIA | Konveksi Pakaian Jadi",
    description: "Perusahaan konveksi terpercaya yang memproduksi pakaian jadi berkualitas tinggi dari tekstil untuk berbagai kebutuhan industri garmen.",
    url: "https://yumnanusantara.com",
    siteName: "PT YUMNA NUSANTARA INDONESIA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT YUMNA NUSANTARA INDONESIA | Konveksi Pakaian Jadi",
    description: "Perusahaan konveksi terpercaya yang memproduksi pakaian jadi berkualitas tinggi dari tekstil untuk berbagai kebutuhan industri garmen.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="facebook-domain-verification" content="sf174lmdh9a9d9wff2vf0f71ysurxp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
