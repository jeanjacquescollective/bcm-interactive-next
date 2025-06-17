
import "../globals.css";
import { DndContext } from "@dnd-kit/core";
export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "de" }];
}

export const metadata = {
  title: {
    template: "%s | Business Model Canvas",
    default: "Business Model Canvas",
  },
  description: "Interactive Business Model Canvas with guided questions",
};

import { ReactNode } from "react";
import Modals from "./modals/Modals";

import { ManagedUIProvider } from "@/contexts/ManagedUI";


export default async function RootLayout({
  children,
  modals,
  params,
}: {
  children: ReactNode;
  modals: ReactNode;
  params: Promise<{ lang: "en-US" | "de" }>;
}) {
  const { lang } = await params;

  return (
    <ManagedUIProvider>

      {children}
        <Modals />
    </ManagedUIProvider>

  );
}
