import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Lora } from "next/font/google";
import "./globals.css";
import { BibleProvider } from "@/lib/store";
import { TopNav } from "@/components/TopNav";
import { MobileNav } from "@/components/MobileNav";
import { ServiceWorker } from "@/components/ServiceWorker";
import { Boot } from "@/components/Boot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  title: "Genipse Bible",
  description:
    "Leia, marque e comente a Bíblia, e estude em grupo com quem você quiser.",
  manifest: "/manifest.webmanifest",
  // Aba do navegador usa a marca monocromática: o G branco em fundo preto
  // continua legível a 16px, onde o degradê dourado vira uma mancha.
  // O ícone de app (home screen, PWA) segue dourado, no manifest.
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Genipse Bible",
  },
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
          <Boot />
        </BibleProvider>
      </body>
    </html>
  );
}
