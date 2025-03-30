import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-gray-600 dark:text-gray-300"
            >
              <path d="M12 2a8 8 0 0 0-8 8v1h16V10a8 8 0 0 0-8-8z" />
              <path d="M4 10v6a8 8 0 0 0 16 0v-6" />
              <path d="M12 6a2 2 0 0 0-2 2v1h4V8a2 2 0 0 0-2-2z" />
              <path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M10 16a2 2 0 1 0 4 0" />
            </svg>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">HooMotors</span>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
            © {currentYear} HooMotors. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

