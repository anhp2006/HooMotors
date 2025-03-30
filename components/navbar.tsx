import Link from "next/link"
import { Search, Info, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-gray-800 dark:text-gray-100"
            >
              <path d="M12 2a8 8 0 0 0-8 8v1h16V10a8 8 0 0 0-8-8z" />
              <path d="M4 10v6a8 8 0 0 0 16 0v-6" />
              <path d="M12 6a2 2 0 0 0-2 2v1h4V8a2 2 0 0 0-2-2z" />
              <path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M10 16a2 2 0 1 0 4 0" />
            </svg>
            <Link href="/" className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Hoo<span className="text-red-700">Motors</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Search
            </Link>
            <Link
              href="/carvana"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Carvana
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              How It Works
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              asChild
            >
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <Info className="h-5 w-5" />
              <span className="sr-only">About</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

