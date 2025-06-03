import { Heart, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { IProduct } from "../../types";
import { useStore } from "../../store/useStore";
import isNew from "@/lib/IsNew";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  product: IProduct;
  isNewProduct?: boolean;
}

export default function ProductItem({
  product,
  isNewProduct = false,
}: ProductProps) {
  const { toggleFavorite, addToCart, isFavorite, isInCart } = useStore();
  const navigate = useNavigate();

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  return (
    <div className="group shadow-lg flex flex-col h-full rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="relative">
        <button
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          onClick={handleToggleFavorite}
          aria-label={
            isFavorite(product.id)
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite(product.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }`}
          />
        </button>
        {isNewProduct && isNew(product.createdAt) && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-red-50 border border-red-500 text-red-500 rounded-full">
              НОВИНКА
            </span>
          </div>
        )}
        <div className="relative cursor-pointer h-64 w-full flex items-center justify-center p-4 bg-white">
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
            src={product.images?.[0] ?? "/placeholder.svg?height=256&width=256"}
            alt={"Product"}
            className="object-contain h-full max-h-56 w-auto transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="flex-grow p-4 cursor-pointer">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
          {product.brand}
        </h3>
        <p
          onClick={() =>
            navigate(
              `/catalog/${product.category.slug}/${
                product.category.subcategories?.[0]?.slug
                  ? product.category.subcategories[0].slug
                  : product.subcategory.slug
              }/${product.slug}`
            )
          }
          className="text-sm text-gray-600 mt-1 line-clamp-2"
        >
          {product.title}
        </p>
      </div>
      <div className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(product.price)} ₽
        </span>
        <button
          className="relative flex cursor-pointer items-center justify-center w-10 h-10"
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
  );
}
