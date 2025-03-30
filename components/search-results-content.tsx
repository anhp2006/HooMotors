"use client"

import { useEffect, useState } from "react"
import { searchCars } from "@/lib/search-actions"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, ArrowUpDown, Info, Calendar, MapPin, Gauge, Fuel, Palette, Car } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CarResult = {
  id: string
  title: string
  price: number
  year: number
  mileage: number
  location: string
  image: string
  source: string
  url: string
  features: string[]
  vin?: string
  exteriorColor?: string
  interiorColor?: string
  transmission?: string
  fuelType?: string
  dealerName?: string
  relevanceScore?: number
  explanation?: string
}

export function SearchResultsContent({ query, searchKey }: { query: string; searchKey: string }) {
  const [results, setResults] = useState<CarResult[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("relevance")
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeSource, setActiveSource] = useState("all")

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  useEffect(() => {
    async function fetchResults() {
      console.log(`Fetching results for "${query}" with key: ${searchKey}`)
      setLoading(true)

      try {
        // Simulate a delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Call the searchCars function and wait for results
        const data = await searchCars(query)

        console.log("Received car data:", data)

        if (Array.isArray(data) && data.length > 0) {
          setResults(data)
        } else {
          console.error("No car results returned or invalid data format", data)
          setResults([])
        }
      } catch (error) {
        console.error("Error fetching results:", error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchResults()
    }
  }, [query, searchKey])

  // Get unique sources for tabs
  const sources = ["all", ...new Set(results.map((car) => car.source))]

  // Filter by source if needed
  const filteredResults = activeSource === "all" ? results : results.filter((car) => car.source === activeSource)

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "year-new":
        return b.year - a.year
      case "mileage-low":
        return a.mileage - b.mileage
      default:
        return (b.relevanceScore || 0) - (a.relevanceScore || 0)
    }
  })

  if (loading) {
    return null // Let the Suspense fallback handle loading state
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {results.length} Results for "{query}"
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <Tabs value={activeSource} onValueChange={setActiveSource} className="w-full sm:w-auto">
            <TabsList className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800">
              {sources.map((source) => (
                <TabsTrigger
                  key={source}
                  value={source}
                  className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
                >
                  {source === "all" ? "All Sources" : source}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown size={16} className="text-gray-500" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200">
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="year-new">Year: Newest First</SelectItem>
                <SelectItem value="mileage-low">Mileage: Lowest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedResults.map((car) => (
          <Card
            key={`${car.id}-${searchKey}`}
            className="overflow-hidden rounded-xl bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-red-900/10 transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={car.image || "/placeholder.svg"} alt={car.title} className="w-full h-full object-cover" />
              <Badge className="absolute top-3 right-3 bg-gray-100/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 border-0">
                {car.source}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-3 left-3 rounded-full bg-gray-100/90 dark:bg-gray-900/90 ${
                  favorites.includes(car.id) ? "text-red-600" : "text-gray-500 dark:text-gray-300"
                }`}
                onClick={() => toggleFavorite(car.id)}
              >
                <Heart size={18} fill={favorites.includes(car.id) ? "currentColor" : "none"} />
              </Button>

              {car.relevanceScore && (
                <div className="absolute bottom-3 right-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          className={`
                          ${
                            car.relevanceScore > 80
                              ? "bg-gray-200 dark:bg-gray-700"
                              : car.relevanceScore > 60
                                ? "bg-gray-200 dark:bg-gray-700"
                                : "bg-gray-200 dark:bg-gray-700"
                          } 
                          text-gray-700 dark:text-gray-200 flex items-center gap-1 border-0
                        `}
                        >
                          <Info size={12} />
                          Match: {car.relevanceScore}%
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-800 p-3 max-w-xs">
                        <p>{car.explanation || "This car matches your search criteria."}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{car.title}</h3>
                <span className="text-lg font-bold text-red-700">${car.price.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
                  <Calendar size={14} />
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
                  <Gauge size={14} />
                  <span>{car.mileage.toLocaleString()} mi</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
                  <MapPin size={14} />
                  <span>{car.location}</span>
                </div>
                {car.fuelType && (
                  <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
                    <Fuel size={14} />
                    <span>{car.fuelType}</span>
                  </div>
                )}
              </div>

              {car.exteriorColor && (
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-700 dark:text-gray-300">
                  <Palette size={14} />
                  <span>{car.exteriorColor}</span>
                  {car.interiorColor && (
                    <span className="text-gray-500 dark:text-gray-400">/ {car.interiorColor} Interior</span>
                  )}
                </div>
              )}

              {car.dealerName && (
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-700 dark:text-gray-300">
                  <Car size={14} />
                  <span>{car.dealerName}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {car.features.slice(0, 3).map((feature, i) => (
                  <Badge
                    key={i}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-0"
                  >
                    {feature}
                  </Badge>
                ))}
                {car.features.length > 3 && (
                  <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0">
                    +{car.features.length - 3} more
                  </Badge>
                )}
              </div>

              <Button
                className="w-full rounded-lg bg-gradient-to-r from-gray-800 to-red-900 hover:from-gray-700 hover:to-red-800 text-white"
                asChild
              >
                <a
                  href={car.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View this ${car.year} ${car.title} on ${car.source}`}
                >
                  View on {car.source} <ExternalLink size={16} className="ml-2" />
                </a>
              </Button>

              {car.vin && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">VIN: {car.vin}</div>
              )}
            </div>
          </Card>
        ))}
      </div>
      {sortedResults.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Listings provided by their respective sources. HooMotors is not affiliated with any of the listing sites.
            All trademarks belong to their respective owners.
          </p>
        </div>
      )}
    </div>
  )
}

