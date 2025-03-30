"use client"

import type React from "react"

import { useState } from "react"
import { CarvanaResults } from "@/components/carvana-results"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function CarvanaPage() {
  const [query, setQuery] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(query)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Carvana Listings</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Browse our collection of Carvana listings. Find your perfect car with our AI-powered search.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              type="text"
              placeholder="Search Carvana listings (e.g., 'Tesla Model 3' or 'SUV under 30k')"
              className="pl-10 bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200 h-12 rounded-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="h-12 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
            Search
          </Button>
        </form>
      </div>

      {searchQuery ? (
        <CarvanaResults query={searchQuery} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Enter a search term above to see Carvana listings</p>
        </div>
      )}
    </div>
  )
}

