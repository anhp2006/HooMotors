import { SearchForm } from "@/components/search-form"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <SearchForm />
      <Features />
    </div>
  )
}

