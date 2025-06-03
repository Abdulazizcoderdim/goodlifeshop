import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/navigation";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/pagination";
import type { IProduct } from "@/types";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, addToCart, isFavorite, isInCart } = useStore();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    console.log(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400 text-sm">
        ☆
      </span>
    ));
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    toast.success(
      isFavorite(product.id)
        ? "Товар добавлен в избранное"
        : "Товар удален из избранного"
    );
  };

  const handleAddToCart = () => {
    if (!isInCart(product.id)) {
      addToCart({ ...product, quantity: 1 });
      toast.success("Товар добавлен в корзину");
    } else {
      toast.info("Товар уже в корзине");
    }
  };

  return (
    <Card className="group relative bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <Badge
            variant="outline"
            className="absolute top-3 left-3 z-10 bg-white border-red-500 text-red-500 text-xs px-2 py-1"
          >
            -{product.discountPercentage}%
          </Badge>
        )}

        {/* Favorite Button */}
        <button
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite(product.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }`}
          />
        </button>

        {/* Product Image Slider */}
        <div className="relative aspect-square bg-gray-50">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: `.prev-${product.id}`,
              nextEl: `.next-${product.id}`,
            }}
            className="h-full"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  onClick={() =>
                    navigate(
                      `/catalog/${product.category.slug}/${
                        product.category.subcategories?.[0]?.slug
                          ? product.category.subcategories[0].slug
                          : product.subcategory.slug
                      }/${product.slug}`
                    )
                  }
                  loading="lazy"
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
                className={`prev-${product.id} absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white/80 border hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`next-${product.id} absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white/80 border hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand */}
          <div className="text-xs text-start text-gray-500 uppercase tracking-wide mb-2">
            {product.brand}
          </div>

          {/* Title */}
          <h3
            onClick={() =>
              navigate(
                `/catalog/${product.category.slug}/${
                  product.category.subcategories?.[0]?.slug
                    ? product.category.subcategories[0].slug
                    : product.subcategory.slug
                }/${product.slug}`
              )
            }
            className="text-sm text-start cursor-pointer font-medium text-gray-900 mb-3 line-clamp-2 leading-tight"
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-4">{renderStars(0)}</div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.discountPercentage > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.price)} {product.price}
                </span>
              )}
              <span className="text-sm font-semibold text-gray-900">
                {formatPrice(product.price)} RUB
              </span>
            </div>

            {/* Cart Quantity Badge */}
            <button
              className="relative flex cursor-pointer items-center justify-center w-10 h-10 "
              onClick={handleAddToCart}
              title="Добавить в корзину"
            >
              <ShoppingBag size={20} />
              <span className="plusSymbol absolute top-1 font-bold h-5 w-5 right-0 bg-red-500 rounded-full flex items-center justify-center">
                <Plus className="h-3 w-3 text-white" />
              </span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
