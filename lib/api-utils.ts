/**
 * Utility functions for making API requests safely
 */

/**
 * Make a fetch request with proper error handling and timeout
 */
export async function safeFetch(url: string, options: RequestInit = {}, timeoutMs = 10000) {
  // Create an abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HooMotors/1.0; +https://hoomotors.com/bot)",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`)
    }

    return response
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Request to ${url} timed out after ${timeoutMs}ms`)
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Check if a website allows scraping based on robots.txt
 */
export async function isScrapingAllowed(domain: string, userAgent = "*", path = "/") {
  try {
    const response = await safeFetch(`https://${domain}/robots.txt`)
    const robotsTxt = await response.text()

    // Simple robots.txt parser
    const lines = robotsTxt.split("\n")
    let currentUserAgent = "*"
    let disallowedPaths: string[] = []

    for (const line of lines) {
      const trimmedLine = line.trim().toLowerCase()

      if (trimmedLine.startsWith("user-agent:")) {
        currentUserAgent = trimmedLine.substring("user-agent:".length).trim()
        if (currentUserAgent === userAgent) {
          disallowedPaths = []
        }
      } else if (trimmedLine.startsWith("disallow:") && (currentUserAgent === userAgent || currentUserAgent === "*")) {
        const disallowedPath = trimmedLine.substring("disallow:".length).trim()
        disallowedPaths.push(disallowedPath)
      }
    }

    // Check if the path is allowed
    for (const disallowedPath of disallowedPaths) {
      if (path.startsWith(disallowedPath)) {
        return false
      }
    }

    return true
  } catch (error) {
    console.error(`Error checking robots.txt for ${domain}:`, error)
    // If we can't check robots.txt, assume scraping is not allowed
    return false
  }
}

/**
 * Add proper delay between requests to avoid overloading servers
 */
export async function respectfulDelay(domain: string) {
  // Store last request time per domain
  const lastRequestTime = new Map<string, number>()

  const now = Date.now()
  const last = lastRequestTime.get(domain) || 0
  const elapsed = now - last

  // Minimum delay between requests (ms)
  const minDelay = 2000

  if (elapsed < minDelay) {
    const delay = minDelay - elapsed
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  lastRequestTime.set(domain, Date.now())
}

