import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Lora } from "next/font/google";
import "./globals.css";
import { BibleProvider } from "@/lib/store";
import { TopNav } from "@/components/TopNav";
import { MobileNav } from "@/components/MobileNav";
import { ServiceWorker } from "@/components/ServiceWorker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  title: "Lumen — a Bíblia do seu jeito",
  description:
    "Leia, marque e comente a Bíblia num catálogo feito para durar o dia inteiro.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Lumen" },
};

export const viewport: Viewport = {
  themeColor: "#08080b",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        <BibleProvider>
          <TopNav />
          <main className="min-h-dvh pb-24 md:pb-10">{children}</main>
          <MobileNav />
          <ServiceWorker />
        </BibleProvider>
      </body>
    </html>
  );
}
