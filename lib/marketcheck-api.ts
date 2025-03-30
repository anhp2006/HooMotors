import type { ScrapedCar } from "./web-scraper"

const MARKETCHECK_API_KEY = process.env.MARKETCHECK_API_KEY
const MARKETCHECK_BASE_URL = "https://api.marketcheck.com/v2"

// Sample car listings for development
const SAMPLE_LISTINGS: ScrapedCar[] = [
  {
    title: "2020 Toyota Camry",
    price: 24999,
    year: 2020,
    mileage: 45000,
    location: "Los Angeles, CA",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/camry",
    features: [
      "Exterior: Pearl White",
      "Interior: Black",
      "Transmission: Automatic",
      "Fuel: Gasoline",
      "Body Style: Sedan",
      "Safety Features",
      "Navigation System"
    ],
    vin: "4T1B11HK5KU123456",
    exteriorColor: "Pearl White",
    interiorColor: "Black",
    transmission: "Automatic",
    fuelType: "Gasoline",
    dealerName: "Toyota of Los Angeles"
  },
  {
    title: "2021 Honda Civic",
    price: 22999,
    year: 2021,
    mileage: 35000,
    location: "San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/civic",
    features: [
      "Exterior: Modern Steel Metallic",
      "Interior: Gray",
      "Transmission: Manual",
      "Fuel: Gasoline",
      "Body Style: Sedan",
      "Honda Sensing",
      "Sport Package"
    ],
    vin: "2HGES16575H123456",
    exteriorColor: "Modern Steel Metallic",
    interiorColor: "Gray",
    transmission: "Manual",
    fuelType: "Gasoline",
    dealerName: "Honda of San Francisco"
  },
  {
    title: "2022 Nissan Altima",
    price: 25999,
    year: 2022,
    mileage: 25000,
    location: "Seattle, WA",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40fbeaf96ddb?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/altima",
    features: [
      "Exterior: Deep Blue Pearl",
      "Interior: Light Gray",
      "Transmission: Automatic",
      "Fuel: Gasoline",
      "Body Style: Sedan",
      "Nissan Safety Shield",
      "Premium Audio"
    ],
    vin: "1N4BL4BV2KC123456",
    exteriorColor: "Deep Blue Pearl",
    interiorColor: "Light Gray",
    transmission: "Automatic",
    fuelType: "Gasoline",
    dealerName: "Nissan of Seattle"
  },
  {
    title: "2021 Toyota RAV4",
    price: 27999,
    year: 2021,
    mileage: 30000,
    location: "Chicago, IL",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/rav4",
    features: [
      "Exterior: Magnetic Gray",
      "Interior: Black",
      "Transmission: Automatic",
      "Fuel: Hybrid",
      "Body Style: SUV",
      "Toyota Safety Sense",
      "AWD"
    ],
    vin: "JTMBK3BA50H123456",
    exteriorColor: "Magnetic Gray",
    interiorColor: "Black",
    transmission: "Automatic",
    fuelType: "Hybrid",
    dealerName: "Toyota of Chicago"
  },
  {
    title: "2020 Honda CR-V",
    price: 26999,
    year: 2020,
    mileage: 40000,
    location: "Boston, MA",
    imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/crv",
    features: [
      "Exterior: Crystal Black Pearl",
      "Interior: Ivory",
      "Transmission: Automatic",
      "Fuel: Gasoline",
      "Body Style: SUV",
      "Honda Sensing",
      "AWD"
    ],
    vin: "5J6RW2H85LA123456",
    exteriorColor: "Crystal Black Pearl",
    interiorColor: "Ivory",
    transmission: "Automatic",
    fuelType: "Gasoline",
    dealerName: "Honda of Boston"
  },
  {
    title: "2022 Nissan Rogue",
    price: 28999,
    year: 2022,
    mileage: 20000,
    location: "Miami, FL",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40fbeaf96ddb?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/rogue",
    features: [
      "Exterior: Pearl White",
      "Interior: Black",
      "Transmission: Automatic",
      "Fuel: Gasoline",
      "Body Style: SUV",
      "Nissan Safety Shield",
      "AWD"
    ],
    vin: "5N1AT2MT7NC123456",
    exteriorColor: "Pearl White",
    interiorColor: "Black",
    transmission: "Automatic",
    fuelType: "Gasoline",
    dealerName: "Nissan of Miami"
  },
  {
    title: "2021 Toyota Highlander",
    price: 34999,
    year: 2021,
    mileage: 25000,
    location: "Dallas, TX",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/highlander",
    features: [
      "Exterior: Celestial Silver",
      "Interior: Black",
      "Transmission: Automatic",
      "Fuel: Hybrid",
      "Body Style: SUV",
      "Toyota Safety Sense",
      "3rd Row Seating"
    ],
    vin: "JTJBK1BA502H123456",
    exteriorColor: "Celestial Silver",
    interiorColor: "Black",
    transmission: "Automatic",
    fuelType: "Hybrid",
    dealerName: "Toyota of Dallas"
  },
  {
    title: "2020 Honda Accord",
    price: 23999,
    year: 2020,
    mileage: 45000,
    location: "Phoenix, AZ",
    imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/accord",
    features: [
      "Exterior: Lunar Silver Metallic",
      "Interior: Black",
      "Transmission: Automatic",
      "Fuel: Gasoline",
      "Body Style: Sedan",
      "Honda Sensing",
      "Premium Audio"
    ],
    vin: "1HGCM82633A123456",
    exteriorColor: "Lunar Silver Metallic",
    interiorColor: "Black",
    transmission: "Automatic",
    fuelType: "Gasoline",
    dealerName: "Honda of Phoenix"
  },
  {
    title: "2022 Nissan Maxima",
    price: 31999,
    year: 2022,
    mileage: 15000,
    location: "Houston, TX",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40fbeaf96ddb?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/maxima",
    features: [
      "Exterior: Super Black",
      "Interior: Light Gray",
      "Transmission: Automatic",
      "Fuel: Gasoline",
      "Body Style: Sedan",
      "Nissan Safety Shield",
      "Sport Package"
    ],
    vin: "1N4AA6AP7CC123456",
    exteriorColor: "Super Black",
    interiorColor: "Light Gray",
    transmission: "Automatic",
    fuelType: "Gasoline",
    dealerName: "Nissan of Houston"
  },
  {
    title: "2021 Toyota Corolla",
    price: 19999,
    year: 2021,
    mileage: 35000,
    location: "Denver, CO",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=60",
    source: "Marketcheck",
    url: "https://example.com/corolla",
    features: [
      "Exterior: Classic Silver Metallic",
      "Interior: Black",
      "Transmission: Automatic",
      "Fuel: Gasoline",
      "Body Style: Sedan",
      "Toyota Safety Sense",
      "Navigation System"
    ],
    vin: "5TDZA23C11S123456",
    exteriorColor: "Classic Silver Metallic",
    interiorColor: "Black",
    transmission: "Automatic",
    fuelType: "Gasoline",
    dealerName: "Toyota of Denver"
  }
]

export async function searchCars(query: string): Promise<ScrapedCar[]> {
  if (!MARKETCHECK_API_KEY) {
    console.log("Using sample data for development")
    return SAMPLE_LISTINGS
  }

  try {
    const response = await fetch(
      `${MARKETCHECK_BASE_URL}/search?api_key=${MARKETCHECK_API_KEY}&query=${encodeURIComponent(query)}`,
      {
        headers: {
          "Accept": "application/json",
        },
      }
    )

    if (!response.ok) {
      console.log("Marketcheck API error, using sample data")
      return SAMPLE_LISTINGS
    }

    const data = await response.json()
    
    return data.listings.map((listing: any) => ({
      title: `${listing.year} ${listing.make} ${listing.model}`,
      price: listing.price || 0,
      year: listing.year || 0,
      mileage: listing.mileage || 0,
      location: listing.dealer?.city ? `${listing.dealer.city}, ${listing.dealer.state}` : "Location unknown",
      imageUrl: listing.media?.photo_links?.[0] || "",
      source: "Marketcheck",
      url: listing.vdp_url || "",
      features: [
        ...(listing.exterior_color ? [`Exterior: ${listing.exterior_color}`] : []),
        ...(listing.interior_color ? [`Interior: ${listing.interior_color}`] : []),
        ...(listing.transmission ? [`Transmission: ${listing.transmission}`] : []),
        ...(listing.fuel_type ? [`Fuel: ${listing.fuel_type}`] : []),
        ...(listing.body_style ? [`Body Style: ${listing.body_style}`] : []),
      ],
      vin: listing.vin,
      exteriorColor: listing.exterior_color,
      interiorColor: listing.interior_color,
      transmission: listing.transmission,
      fuelType: listing.fuel_type,
      dealerName: listing.dealer?.name,
    }))
  } catch (error) {
    console.error("Error fetching from Marketcheck:", error)
    console.log("Using sample data due to error")
    return SAMPLE_LISTINGS
  }
} 