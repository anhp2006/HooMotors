"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchHeaderProps {
  query: string
  onSearch: (query: string) => void
}

export function SearchHeader({ query, onSearch }: SearchHeaderProps) {
  const [searchQuery, setSearchQuery] = useState(query)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    console.log(`Search header triggering search for: ${searchQuery}`)
    onSearch(searchQuery)
  }

  return (
    <div className="py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Hoo<span className="text-red-700">Motors</span>
        </a>
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <Input
              type="text"
              placeholder="Search for cars..."
              className="pl-10 bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-gray-800 to-red-900 hover:from-gray-700 hover:to-red-800 text-white"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  )
}

