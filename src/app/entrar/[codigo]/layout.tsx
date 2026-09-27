import type { Metadata } from "next";

// O que aparece na prévia do link no WhatsApp.
export const metadata: Metadata = {
  title: "Convite para ler a Bíblia junto · Genipse Bible",
  description:
    "Entre no grupo de leitura: vocês leem o mesmo plano e acompanham a meta um do outro todo dia.",
  openGraph: {
    title: "Bora ler a Bíblia junto?",
    description:
      "Entre no grupo de leitura no Genipse Bible e acompanhem a meta um do outro todo dia.",
    images: ["/icon.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
