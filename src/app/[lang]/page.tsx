import Sidebar from "@/containers/Sidebar";
import { getDictionary } from "./dictionaries";
import MainContent from "@/containers/MainContent";
import { CanvasUIProvider } from "@/contexts/CanvasUI";
import Modals from "@/components/modals/Modals";

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
  const supportedLangs = ["en-US", "nl"];
  if (!supportedLangs.includes(lang)) {
    // Optionally, you can redirect or show a 404/error page here
    throw new Error(`Unsupported locale: ${lang}`);
  }
  const dictionary = await getDictionary(lang as "en-US" | "nl");
  if (!dictionary) {
    // Handle the case where the dictionary is not found
    throw new Error(`Dictionary not found for locale: ${lang}`);
  }

  if (!dictionary) {
    return <div>Loading...</div>;
  }
  


  return (
    <CanvasUIProvider dictionary={dictionary} language={lang}>
      <div className="relative min-h-screen max-h-screen overflow-y-auto">
        {/* <Header /> */}
        <main className="w-full h-screen pl-20">
          <MainContent />
        </main>
        <Sidebar
        />
      </div>
      <Modals />
    </CanvasUIProvider>
  );
}
