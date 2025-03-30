"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, ArrowUpDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
}

export function SearchResults({ results }: { results: CarResult[] }) {
  const [sortBy, setSortBy] = useState("relevance")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

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

  return (
    <div className="mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{results.length} Results</h2>
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-gray-400" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="year-new">Year: Newest First</SelectItem>
              <SelectItem value="mileage-low">Mileage: Lowest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedResults.map((car) => (
          <Card
            key={car.id}
            className="overflow-hidden rounded-xl bg-gray-800/70 border-gray-700 transition-all hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={car.image || "/placeholder.svg"} alt={car.title} className="w-full h-full object-cover" />
              <Badge className="absolute top-3 right-3 bg-gray-900/80 text-white">{car.source}</Badge>
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-3 left-3 rounded-full bg-gray-900/80 ${
                  favorites.includes(car.id) ? "text-red-500" : "text-gray-300"
                }`}
                onClick={() => toggleFavorite(car.id)}
              >
                <Heart size={18} fill={favorites.includes(car.id) ? "currentColor" : "none"} />
              </Button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-white">{car.title}</h3>
                <span className="text-lg font-bold text-indigo-400">${car.price.toLocaleString()}</span>
              </div>
              <div className="flex gap-3 mb-3">
                <Badge variant="outline" className="text-gray-300 border-gray-600">
                  {car.year}
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-600">
                  {car.mileage.toLocaleString()} mi
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-600">
                  {car.location}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {car.features.slice(0, 3).map((feature, i) => (
                  <Badge key={i} className="bg-gray-700 text-gray-300 hover:bg-gray-600">
                    {feature}
                  </Badge>
                ))}
                {car.features.length > 3 && (
                  <Badge className="bg-gray-700 text-gray-300">+{car.features.length - 3} more</Badge>
                )}
              </div>
              <Button
                className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                asChild
              >
                <a href={car.url} target="_blank" rel="noopener noreferrer">
                  View Details <ExternalLink size={16} className="ml-2" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

