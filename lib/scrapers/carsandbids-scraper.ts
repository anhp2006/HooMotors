import type { ScrapedCar } from "../web-scraper"
import puppeteer from "puppeteer"

/**
 * CarsAndBids scraper implementation
 * Uses Puppeteer to scrape car listings from CarsAndBids
 */
export async function scrapeCarsAndBids(query: string): Promise<ScrapedCar[]> {
  console.log(`Searching CarsAndBids for: ${query}`)

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()

    // Set a user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')

    // Navigate to CarsAndBids search page
    const searchUrl = `https://carsandbids.com/search?q=${encodeURIComponent(query)}`
    await page.goto(searchUrl, { waitUntil: "networkidle0" })

    // Wait for the results to load with a more generic selector
    await page.waitForSelector('.auction-card', { timeout: 15000 })

    // Extract car listings
    const cars = await page.evaluate(() => {
      const listings: ScrapedCar[] = []
      const cards = document.querySelectorAll('.auction-card')

      cards.forEach((card) => {
        try {
          const title = card.querySelector('.auction-title')?.textContent?.trim() || ""
          const priceText = card.querySelector('.current-bid')?.textContent?.trim() || ""
          const price = parseInt(priceText.replace(/[^0-9]/g, "")) || 0
          const year = parseInt(title.split(" ")[0]) || 0
          const mileageText = card.querySelector('.mileage')?.textContent?.trim() || ""
          const mileage = parseInt(mileageText.replace(/[^0-9]/g, "")) || 0
          const location = card.querySelector('.location')?.textContent?.trim() || ""
          const imageUrl = card.querySelector('img')?.src || ""
          const url = card.querySelector('a')?.href || ""
          const features = Array.from(card.querySelectorAll('.features span')).map(f => f.textContent?.trim() || "")

          if (title && price > 0) {
            listings.push({
              title,
              price,
              year,
              mileage,
              location,
              imageUrl,
              source: "CarsAndBids",
              url,
              features
            })
          }
        } catch (error) {
          console.error("Error processing a listing:", error)
        }
      })

      return listings
    })

    await browser.close()
    return cars
  } catch (error) {
    console.error("Error scraping CarsAndBids:", error)
    return []
  }
} 