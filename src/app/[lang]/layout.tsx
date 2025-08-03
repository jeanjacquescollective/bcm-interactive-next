
import "../globals.css";
export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "nl" }];
}

export const metadata = {
  title: {
    template: "%s | Business Model Canvas",
    default: "Business Model Canvas",
  },
  description: "Interactive Business Model Canvas with guided questions",
};

import { ReactNode } from "react";

import { ManagedUIProvider } from "@/contexts/ManagedUI";
import { CanvasDataProvider } from "@/contexts/CanvasData";


export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const { lang } = await params;

  return (
      <ManagedUIProvider>
        <CanvasDataProvider>
          {children}
        </CanvasDataProvider>
      </ManagedUIProvider>
  );
}

