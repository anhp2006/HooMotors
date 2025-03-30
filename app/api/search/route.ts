import { NextResponse } from "next/server"
import { searchCarsFromWeb } from "@/lib/web-scraper"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const results = await searchCarsFromWeb(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching cars:", error)
    return NextResponse.json({ error: "Failed to search cars" }, { status: 500 })
  }
} 