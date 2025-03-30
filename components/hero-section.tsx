import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="py-20 text-center">
      <Badge className="mb-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-800 dark:hover:to-gray-700 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
        AI-Powered
      </Badge>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Welcome to <span className="text-red-700">HooMotors</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Our AI searches across multiple platforms to find the best used car deals matching your exact needs.
      </p>
    </section>
  )
}

