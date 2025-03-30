export const dynamic = "force-dynamic"
export const revalidate = 0

export async function searchCars(query: string) {
  try {
    // Add a console log to verify the search is being performed
    console.log(`Performing new search for: "${query}" at ${new Date().toISOString()}`)

    // Call the API route to perform the search
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    
    if (!response.ok) {
      throw new Error(`Search failed with status: ${response.status}`)
    }

    const results = await response.json()
    console.log(`Search found ${results?.length || 0} results`)
    return results
  } catch (error) {
    console.error("Error searching cars:", error)
    return [] // Return empty array if there's an error
  }
}

