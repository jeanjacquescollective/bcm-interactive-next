import Link from "next/link";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/containers/Footer";
export default function HomePage() {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen">
      <header className="shadow p-4">
        <h1 className="text-2xl font-bold">Business Model Canvas</h1>
      </header>
      <main className="flex-1 container mx-auto p-4 flex justify-center items-center">
        <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-2xl shadow-2xl p-12 flex flex-col items-center max-w-lg border border-white/30 dark:border-gray-700/30 w-full max-w-md">
          <h1 className="text-5xl font-extrabold mb-6 text-blue-900 dark:text-yellow-300 text-center drop-shadow-lg">
            Business Model Canvas
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-10 text-center">
            Please select your preferred language to start:
          </p>
          <div className="flex gap-8">
            <Link
              href="/nl"
              className="px-8 py-4 rounded-xl bg-blue-600/80 text-white font-semibold text-xl shadow-lg hover:bg-blue-700/90 transition backdrop-blur-sm border border-white/20"
            >
              🇳🇱 Nederlands
            </Link>
            <Link
              href="/en"
              className="px-8 py-4 rounded-xl bg-yellow-400/80 text-gray-900 font-semibold text-xl shadow-lg hover:bg-yellow-500/90 transition backdrop-blur-sm border border-white/20"
            >
              🇬🇧 English
            </Link>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
