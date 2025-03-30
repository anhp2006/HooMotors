"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ExternalLink, Check, Info, Calendar, MapPin, Gauge, Fuel, Palette, Car } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type CarvanaListingProps = {
  id: string
  title: string
  price: number
  year: number
  mileage: number
  location: string
  image: string
  url: string
  features: string[]
  vin?: string
  exteriorColor?: string
  interiorColor?: string
  transmission?: string
  fuelType?: string
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  additionalInfo?: {
    bodyStyle?: string
    mpg?: string
    engine?: string
    driveTrain?: string
    stock?: string
    deliveryAvailable?: boolean
    homeDeliveryEligible?: boolean
    carfaxOneOwner?: boolean
    noAccidents?: boolean
    warranty?: string
    monthlyPaymentEstimate?: number
  }
}

export function CarvanaListingCard({
  id,
  title,
  price,
  year,
  mileage,
  location,
  image,
  url,
  features,
  vin,
  exteriorColor,
  interiorColor,
  transmission,
  fuelType,
  isFavorite,
  onToggleFavorite,
  additionalInfo,
}: CarvanaListingProps) {
  return (
    <Card className="overflow-hidden rounded-xl bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-red-900/10 transition-all">
      <div className="relative h-56 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <Badge className="absolute top-3 right-3 bg-blue-600 text-white border-0">Carvana</Badge>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 left-3 rounded-full bg-gray-100/90 dark:bg-gray-900/90 ${
            isFavorite ? "text-red-600" : "text-gray-500 dark:text-gray-300"
          }`}
          onClick={() => onToggleFavorite(id)}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </Button>

        {additionalInfo?.monthlyPaymentEstimate && (
          <div className="absolute bottom-3 left-3 bg-blue-600/90 text-white px-3 py-1 rounded-md text-sm font-medium">
            Est. ${additionalInfo.monthlyPaymentEstimate}/mo
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
          <span className="text-lg font-bold text-blue-600">${price.toLocaleString()}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
            <Calendar size={14} />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
            <Gauge size={14} />
            <span>{mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          {fuelType && (
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm">
              <Fuel size={14} />
              <span>{fuelType}</span>
            </div>
          )}
        </div>

        {exteriorColor && (
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-700 dark:text-gray-300">
            <Palette size={14} />
            <span>{exteriorColor}</span>
            {interiorColor && <span className="text-gray-500 dark:text-gray-400">/ {interiorColor} Interior</span>}
          </div>
        )}

        {additionalInfo && (
          <div className="flex flex-wrap gap-2 mb-3">
            {additionalInfo.carfaxOneOwner && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-green-600 border-green-200 dark:border-green-900"
              >
                <Check size={12} /> One Owner
              </Badge>
            )}
            {additionalInfo.noAccidents && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-green-600 border-green-200 dark:border-green-900"
              >
                <Check size={12} /> No Accidents
              </Badge>
            )}
            {additionalInfo.homeDeliveryEligible && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-blue-600 border-blue-200 dark:border-blue-900"
              >
                <Car size={12} /> Home Delivery
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {features.slice(0, 3).map((feature, i) => (
            <Badge
              key={i}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-0"
            >
              {feature}
            </Badge>
          ))}
          {features.length > 3 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0 cursor-pointer">
                    +{features.length - 3} more
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-800 p-3">
                  <div className="flex flex-col gap-1">
                    {features.slice(3).map((feature, i) => (
                      <span key={i} className="text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {additionalInfo?.warranty && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Info size={14} />
            <span>{additionalInfo.warranty}</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View this ${year} ${title} on Carvana`}
            >
              View Details <ExternalLink size={16} className="ml-2" />
            </a>
          </Button>

          <Button
            variant="outline"
            className="rounded-lg border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-950/50"
          >
            Compare
          </Button>
        </div>

        {vin && <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">VIN: {vin}</div>}
      </div>
    </Card>
  )
}

