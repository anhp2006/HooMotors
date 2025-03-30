import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Globe, Zap, Shield } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Brain className="h-12 w-12 text-gray-500 dark:text-gray-400" />,
      title: "AI-Powered Search",
      description: "Our AI understands natural language queries to find exactly what you're looking for.",
    },
    {
      icon: <Globe className="h-12 w-12 text-gray-500 dark:text-gray-400" />,
      title: "Multi-Source Aggregation",
      description: "We search across multiple platforms to find the best deals from around the web.",
    },
    {
      icon: <Zap className="h-12 w-12 text-gray-500 dark:text-gray-400" />,
      title: "Real-Time Results",
      description: "Get instant results with the most up-to-date listings from all major car marketplaces.",
    },
    {
      icon: <Shield className="h-12 w-12 text-gray-500 dark:text-gray-400" />,
      title: "Deal Analysis",
      description: "Our system automatically identifies good deals based on market data and vehicle history.",
    },
  ]

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-red-900/10 transition-all"
          >
            <CardHeader className="pb-2">
              <div className="mb-4">{feature.icon}</div>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-100">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

