import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/navigation";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/pagination";
import type { IProduct } from "@/types";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400 text-sm">
        ☆
      </span>
    ));
  };

  return (
    <Card className="group relative bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <Badge
            variant="outline"
            className="absolute top-3 left-3 z-10 bg-white border-red-500 text-red-500 text-xs px-2 py-1"
          >
            -{product.discount}%
          </Badge>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-10 h-8 w-8 bg-white/80 hover:bg-white"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </Button>

        {/* Product Image Slider */}
        <div className="relative aspect-square bg-gray-50">
          <Swiper
            modules={[Navigation]}
            onSwiper={setSwiper}
            navigation={{
              prevEl: `.prev-${product.id}`,
              nextEl: `.next-${product.id}`,
            }}
            className="h-full"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - изображение ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          {product.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className={`prev-${product.id} absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`next-${product.id} absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand */}
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
            {product.brand}
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-tight">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {renderStars(product.rating)}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.discount > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)} {product.currency}
                </span>
              )}
              <span className="text-sm font-semibold text-gray-900">
                {formatPrice(product.currentPrice)} {product.currency}
              </span>
            </div>

            {/* Cart Quantity Badge */}
            {product.cartQuantity > 0 && (
              <div className="relative">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {product.cartQuantity}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
