import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BottomNav } from "@/components/BottomNav";
import { PageTransition } from "@/components/PageTransition";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "daze",
  description: "for your daily daze.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "daze",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${lora.variable} h-full`}>
      <body className="h-full flex flex-col antialiased">
        <ThemeProvider>
          <PageTransition>{children}</PageTransition>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
