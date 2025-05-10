import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">PitchHub</h1>
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm px-4 py-2"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Share Your Startup Ideas with the World
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            PitchHub is a platform where entrepreneurs can submit their startup ideas with pitch videos, and connect with potential investors and collaborators.
          </p>

          <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-6 w-full sm:w-auto"
            >
              Get Started
            </Link>
            <Link
              href="/browse"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6 w-full sm:w-auto"
            >
              Browse Ideas
            </Link>
          </div>
        </div>
      </main>

      <footer className="p-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-gray-200 dark:border-gray-800">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} PitchHub. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
            About
          </Link>
          <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}
