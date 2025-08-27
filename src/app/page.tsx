import Link from "next/link";
import "./globals.css";
import Footer from "@/containers/Footer";

export default function HomePage() {
  // No params available on the root page, so no language check needed here

  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow p-4">
        <h1 className="text-2xl font-bold">Business Model Canvas</h1>
      </header>
      <main className="flex-1 container mx-auto p-6 flex justify-center items-center">
        <div className="backdrop-blur-2xl bg-white/50 dark:bg-gray-900/50 rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-lg border border-white/30 dark:border-gray-700/30">

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-blue-900 dark:text-yellow-300 text-center drop-shadow-md">
            Business Model Canvas
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-200 mb-10 text-center leading-relaxed">
            Please select your preferred language to start:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <Link
              href="/nl"
              className="px-6 py-4 rounded-2xl bg-blue-600/90 text-white font-semibold text-lg text-center shadow-md hover:bg-blue-700 transition border border-white/20"
            >
              🇳🇱 Nederlands
            </Link>
            <Link
              href="/en-US"
              className="px-6 py-4 rounded-2xl bg-yellow-400/90 text-gray-900 font-semibold text-lg text-center shadow-md hover:bg-yellow-500 transition border border-white/20"
            >
              🇬🇧 English
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
