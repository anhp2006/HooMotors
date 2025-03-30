"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function SearchForm() {
  const [query, setQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Navigate to search results page with the query and a timestamp to force a fresh search
    const timestamp = Date.now()
    router.push(`/search?q=${encodeURIComponent(query)}&t=${timestamp}`)
  }

  return (
    <Card className="p-6 rounded-xl bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-xl">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              type="text"
              placeholder="Describe your perfect car (e.g., 'reliable SUV under $20k with low mileage')"
              className="pl-10 bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200 h-12 rounded-lg focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-6 rounded-lg bg-gradient-to-r from-gray-800 to-red-900 hover:from-gray-700 hover:to-red-800 text-white"
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-12 rounded-lg border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Sliders size={18} />
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Price Range</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                />
                <Input
                  placeholder="Max"
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Year</label>
              <div className="flex gap-2">
                <Input
                  placeholder="From"
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                />
                <Input
                  placeholder="To"
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Mileage (max)</label>
              <Input
                placeholder="Max mileage"
                className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <div
                className="flex justify-between items-center cursor-pointer mb-1"
                onClick={() => {
                  const drivetrainEl = document.getElementById("drivetrain-options")
                  if (drivetrainEl) {
                    drivetrainEl.classList.toggle("hidden")
                  }
                }}
              >
                <label className="text-sm text-gray-600 dark:text-gray-400 block">Drivetrain</label>
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
                  className="text-gray-500"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div
                id="drivetrain-options"
                className="hidden bg-white/80 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-800 rounded-md p-2 space-y-2"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="awd"
                    className="mr-2 h-4 w-4 rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-red-700"
                  />
                  <label htmlFor="awd" className="text-sm text-gray-700 dark:text-gray-300">
                    AWD (All-Wheel Drive)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fwd"
                    className="mr-2 h-4 w-4 rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-red-700"
                  />
                  <label htmlFor="fwd" className="text-sm text-gray-700 dark:text-gray-300">
                    FWD (Front-Wheel Drive)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rwd"
                    className="mr-2 h-4 w-4 rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-red-700"
                  />
                  <label htmlFor="rwd" className="text-sm text-gray-700 dark:text-gray-300">
                    RWD (Rear-Wheel Drive)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="4wd"
                    className="mr-2 h-4 w-4 rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-red-700"
                  />
                  <label htmlFor="4wd" className="text-sm text-gray-700 dark:text-gray-300">
                    4WD (Four-Wheel Drive)
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </Card>
  )
}

