import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SearchResultsSkeleton() {
  // Create an array of 6 items to render skeleton cards
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <Skeleton className="h-8 w-64 bg-gray-200 dark:bg-gray-800" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <Skeleton className="h-10 w-full sm:w-[300px] bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-10 w-full sm:w-[180px] bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skeletonItems.map((index) => (
          <Card
            key={index}
            className="overflow-hidden rounded-xl bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-gray-800"
          >
            <div className="h-48 overflow-hidden">
              <Skeleton className="h-full w-full bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-3/5 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-5 w-full bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-5 w-full bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-5 w-full bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-5 w-full bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-gray-800" />
              </div>
              <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-800" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

