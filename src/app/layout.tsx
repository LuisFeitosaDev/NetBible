import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Lora, Literata, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { BibleProvider } from "@/lib/store";
import { TopNav } from "@/components/TopNav";
import { MobileNav } from "@/components/MobileNav";
import { ServiceWorker } from "@/components/ServiceWorker";
import { Boot } from "@/components/Boot";
import { AvisosDoGrupo } from "@/components/AvisosDoGrupo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
// Fontes opcionais do leitor: sem preload, só baixam para quem escolher.
const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
  preload: false,
});
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  // Base para as URLs absolutas da prévia de link (WhatsApp, Instagram).
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://net-bible.vercel.app",
  ),
  title: "Genipse Bible",
  description:
    "Leia, marque e comente a Bíblia, e estude em grupo com quem você quiser.",
  manifest: "/manifest.webmanifest",
  // Todos gerados por `npm run marca` a partir de "Logo Nova.jpeg".
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Genipse Bible",
    description: "Leia, marque e acompanhe a Bíblia junto com quem você quiser.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
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
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} ${lora.variable} ${literata.variable} ${atkinson.variable}`}
    >
      <body className="font-sans antialiased">
        <BibleProvider>
          <TopNav />
          <main className="min-h-dvh pb-24 md:pb-10">{children}</main>
          <MobileNav />
          <ServiceWorker />
          <Boot />
          <AvisosDoGrupo />
        </BibleProvider>
      </body>
    </html>
  );
}
