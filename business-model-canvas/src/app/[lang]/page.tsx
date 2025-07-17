import Sidebar from "@/containers/Sidebar";
import { getDictionary } from "./dictionaries";
import MainContent from "@/containers/MainContent";

export const metadata = {
  title: "Business Model Canvas",
  description: "Interactive Business Model Canvas with guided questions",
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const supportedLangs = ["en", "nl"];
  if (!supportedLangs.includes(lang)) {
    // Optionally, you can redirect or show a 404/error page here
    throw new Error(`Unsupported locale: ${lang}`);
  }
  const dictionary = await getDictionary(lang as "en" | "nl");
  return (
    <div className="relative min-h-screen max-h-screen overflow-y-auto">
      {/* <Header /> */}
      <main className="w-full h-screen pl-20">
        <MainContent />
      </main>
      <Sidebar
        manageCanvasesText={dictionary.header.manageCanvasesText}
        helpText={dictionary.header.helpText}
      />
    </div>
  );
}
