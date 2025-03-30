"use client"

import { useState, useEffect } from "react"
import { CarvanaListingCard } from "@/components/carvana-listing-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"
import { scrapeCarvana } from "@/lib/scrapers/carvana-scraper"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

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
  additionalInfo?: {
    bodyStyle?: string
    mpg?: string
    engine?: string
    driveTrain?: string
    stock?: string
    deliveryAvailable?: boolean
    homeDeliveryEligible?: boolean
    carfaxOneOwner?: boolean
    noAccidents?: boolean
    warranty?: string
    monthlyPaymentEstimate?: number
  }
}

export function CarvanaResults({ query }: { query: string }) {
  const [results, setResults] = useState<CarResult[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("relevance")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  useEffect(() => {
    async function fetchResults() {
      setLoading(true)

      try {
        // Fetch Carvana results
        const carvanaData = await scrapeCarvana(query)

        // Convert to the expected format
        const formattedResults = carvanaData.map((car, index) => ({
          id: `carvana-${index}`,
          title: car.title,
          price: car.price,
          year: car.year,
          mileage: car.mileage,
          location: car.location,
          image: car.imageUrl,
          source: car.source,
          url: car.url,
          features: car.features,
          vin: car.vin,
          exteriorColor: car.exteriorColor,
          interiorColor: car.interiorColor,
          transmission: car.transmission,
          fuelType: car.fuelType,
          dealerName: car.dealerName,
          additionalInfo: (car as any).additionalInfo,
        }))

        setResults(formattedResults)
      } catch (error) {
        console.error("Error fetching Carvana results:", error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchResults()
    }
  }, [query])

  const sortedResults = [...results].sort((a, b) => {
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
        return 0
    }
  })

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="overflow-hidden rounded-xl bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-gray-800"
          >
            <Skeleton className="h-56 w-full" />
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-1/4" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-10 w-1/4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {results.length} Carvana Results for "{query}"
        </h2>

        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-gray-500" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedResults.map((car) => (
          <CarvanaListingCard
            key={car.id}
            id={car.id}
            title={car.title}
            price={car.price}
            year={car.year}
            mileage={car.mileage}
            location={car.location}
            image={car.image}
            url={car.url}
            features={car.features}
            vin={car.vin}
            exteriorColor={car.exteriorColor}
            interiorColor={car.interiorColor}
            transmission={car.transmission}
            fuelType={car.fuelType}
            isFavorite={favorites.includes(car.id)}
            onToggleFavorite={toggleFavorite}
            additionalInfo={car.additionalInfo}
          />
        ))}
      </div>

      {sortedResults.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Listings provided by Carvana. HooMotors is not affiliated with Carvana. All trademarks belong to their
            respective owners.
          </p>
        </div>
      )}
    </div>
  )
}

