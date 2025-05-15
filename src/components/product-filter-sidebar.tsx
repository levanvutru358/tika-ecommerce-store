/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import type { Product } from "@/types/product.type"

type Props = {
  allProducts: Product[]
  onFilterChange: (filters: {
    categories: string[]
    minRating: number
    priceRange: number[]
  }) => void
}

export const ProductFilterSidebar = ({ allProducts, onFilterChange }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 200])

  const uniqueCategories = [...new Set(allProducts.map(p => p.category))]

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      minRating,
      priceRange,
    })
  }, [selectedCategories, minRating, priceRange])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="space-y-6 p-4 border rounded-xl bg-background shadow-sm sticky top-4">
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        {uniqueCategories.map(category => (
          <div key={category} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
            <Label htmlFor={category} className="capitalize text-sm">
              {category}
            </Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          max={200}
          step={10}
          min={0}
          onValueChange={(val) => setPriceRange(val)}
        />
        <div className="text-sm mt-1 text-muted-foreground">
          ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Minimum Rating</h3>
        <Slider
          defaultValue={[minRating]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={(val) => setMinRating(val[0])}
        />
        <div className="text-sm mt-1 text-muted-foreground">{minRating} ⭐</div>
      </div>

      <Button variant="outline" size="sm" onClick={() => {
        setSelectedCategories([])
        setMinRating(0)
        setPriceRange([0, 200])
      }}>
        Reset Filters
      </Button>
    </div>
  )
}
