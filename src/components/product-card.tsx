import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import type { Product } from "@/types/product.type"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group w-full max-w-sm rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="w-full h-64 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold line-clamp-1">{product.title}</h3>
          <Badge variant="outline" className="text-xs capitalize">
            {product.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          <span className="flex items-center text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0 grid grid-cols-[9fr_1fr] gap-10">
        <Button className="w-full" size={'lg'}>Add to Cart</Button>
        <Button className="w-full" variant={'outline'}><Heart /></Button>
      </CardFooter> 
    </Card>
  )
}
