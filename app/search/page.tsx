"use client"

import { useState, Suspense } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchHeader } from "@/components/search-header"
import { SearchFilters } from "@/components/search-filters"
import { SearchResultsContent } from "@/components/search-results-content"
import { SearchResultsSkeleton } from "@/components/search-results-skeleton"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useSearchParams, useRouter } from "next/navigation"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const timestamp = searchParams.get("t") || "0"

  const [showFilters, setShowFilters] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Always show filters on desktop, respect toggle on mobile
  const filtersVisible = isDesktop || showFilters

  // Function to perform a new search
  const performNewSearch = (newQuery: string) => {
    if (!newQuery.trim()) return
    const newTimestamp = Date.now().toString()
    console.log(`Performing new search for: ${newQuery} with timestamp: ${newTimestamp}`)
    router.push(`/search?q=${encodeURIComponent(newQuery)}&t=${newTimestamp}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <SearchHeader query={query} onSearch={performNewSearch} />

      <div className="lg:hidden flex justify-between items-center mt-4 mb-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Results for "{query}"</h2>
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} className="mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
        {filtersVisible && (
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>
        )}
        <div className={filtersVisible ? "lg:col-span-3" : "lg:col-span-4"}>
          <Suspense key={`${query}-${timestamp}`} fallback={<SearchResultsSkeleton />}>
            <SearchResultsContent query={query} searchKey={timestamp} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

