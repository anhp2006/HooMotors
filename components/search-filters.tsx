"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([5000, 50000])
  const [yearRange, setYearRange] = useState([2010, 2024])
  const [maxMileage, setMaxMileage] = useState(100000)

  return (
    <Card className="p-4 bg-white/80 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-xl sticky top-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Filters</h2>

      <Accordion type="multiple" defaultValue={["price", "year", "mileage", "features"]}>
        <AccordionItem value="price" className="border-gray-200 dark:border-gray-800">
          <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={0}
                max={100000}
                step={1000}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center gap-2">
                <Input
                  value={`$${priceRange[0].toLocaleString()}`}
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                  readOnly
                />
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <Input
                  value={`$${priceRange[1].toLocaleString()}`}
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                  readOnly
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="year" className="border-gray-200 dark:border-gray-800">
          <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Year
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={yearRange} min={1990} max={2024} step={1} onValueChange={setYearRange} className="my-6" />
              <div className="flex items-center gap-2">
                <Input
                  value={yearRange[0]}
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                  readOnly
                />
                <span className="text-gray-600 dark:text-gray-400">to</span>
                <Input
                  value={yearRange[1]}
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                  readOnly
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mileage" className="border-gray-200 dark:border-gray-800">
          <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Mileage
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={[maxMileage]}
                min={0}
                max={200000}
                step={5000}
                onValueChange={(value) => setMaxMileage(value[0])}
                className="my-6"
              />
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Up to</span>
                <Input
                  value={`${maxMileage.toLocaleString()} miles`}
                  className="bg-white/80 dark:bg-gray-900/80 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200"
                  readOnly
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features" className="border-gray-200 dark:border-gray-800">
          <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Features
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {[
                "Leather Seats",
                "Sunroof",
                "Navigation",
                "Bluetooth",
                "Backup Camera",
                "Heated Seats",
                "Third Row",
                "AWD/4WD",
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox id={feature.toLowerCase().replace(/\s/g, "-")} />
                  <Label
                    htmlFor={feature.toLowerCase().replace(/\s/g, "-")}
                    className="text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full mt-6 rounded-lg bg-gradient-to-r from-gray-800 to-red-900 hover:from-gray-700 hover:to-red-800 text-white">
        Apply Filters
      </Button>
    </Card>
  )
}

