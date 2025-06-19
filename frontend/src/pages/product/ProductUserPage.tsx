import api from "@/http/axios";
import type { IProduct } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Plus, Minus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/pagination";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "swiper/modules";

const ProductUserPage = () => {
  const { subcategory, productSlug } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<string | null | undefined>(
    null
  );
  const { toggleFavorite, isFavorite, isInCart, addToCart } = useStore();

  const handleToggleFavorite = () => {
    toggleFavorite(product as IProduct);
    toast.success(
      isFavorite(product?.id ?? "")
        ? "Товар добавлен в избранное"
        : "Товар удален из избранного"
    );
  };

  useEffect(() => {
    fetchProductSlug();
  }, [productSlug]);

  const fetchProductSlug = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/slug/${productSlug}`);

      if (!res.data) {
        throw new Error("Product not found");
      }
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center h-screen flex justify-center animate-pulse items-center text-lg custom-container py-10">
        Loading...
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product && !isInCart(product.id)) {
      addToCart({ ...product, quantity: 1 });
      navigate("/personal/cart");
      toast.success("Товар добавлен в корзину");
    } else {
      toast.info("Товар уже в корзине");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  // Mapping keys to desired labels
  const keyMap: Record<string, string> = {
    productWeight: "Вес",
    productHeight: "Высота изделия",
    productLength: "Длина изделия",
    productWidth: "Ширина изделия",
    packageHeight: "Высота (указовки)",
    packageLength: "Длина (указовки)",
    packageWidth: "Ширина (указовки)",
    productVolume: "Объем",
  };

  // Optional units
  const units: Record<string, string> = {
    productWeight: "кг",
    productHeight: "см",
    productLength: "см",
    productWidth: "см",
    packageHeight: "см",
    packageLength: "см",
    packageWidth: "см",
    productVolume: "м³",
  };

  // Final filtered + mapped object
  const formatted = Object.entries(product?.dimensions ?? {}).reduce(
    (acc, [key, value]) => {
      if (value !== 0 && keyMap[key]) {
        const unit = units[key] || "";
        acc[keyMap[key]] =
          typeof value === "number" ? `${value} ${unit}`.trim() : value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const selectedVariant = product?.variants.find(
    (variant) => variant.id === selectedColor
  );

  const imagesProduct = selectedVariant?.images || product?.images;

  return (
    <div className="">
      <div className="pt-10 pb-5 custom-container max-md:hidden">
        {/* path url */}
        <div className="flex items-center gap-3">
          <Link to={"/"} className="uppercase">
            Главная
          </Link>
          /
          <Link to={"/catalog"} className="uppercase">
            Каталог
          </Link>
          /
          <Link
            to={`/catalog/${product?.category?.slug}`}
            className="uppercase"
          >
            {product?.category?.name}
          </Link>
          /
          <Link
            className="uppercase"
            to={`/catalog/${product?.category?.slug}/${subcategory}`}
          >
            {product?.category.subcategories[0].name}
          </Link>
          /<p className="uppercase">{product?.title}</p>
        </div>
      </div>

      {/* contents */}
      <div className="grid custom-container grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{ clickable: true }}
            className="w-full aspect-square rounded-lg overflow-hidden"
          >
            {imagesProduct?.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  loading="lazy"
                  src={image || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          {imagesProduct && imagesProduct?.length > 1 && (
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          {imagesProduct && imagesProduct?.length > 1 && (
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-3">
          {/* Brand and Logo */}
          <div className="flex items-center justify-between">
            <div className="text-sm uppercase text-gray-600 tracking-wider">
              {product?.brand}
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl uppercase lg:text-3xl font-bold text-gray-900 leading-tight">
            {product?.title}
          </h1>

          {/* Article Number */}
          <div className="text-sm text-gray-600">
            Артикул: <span className="font-medium">{product?.article}</span>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              {product?.variants &&
                product?.variants.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color?.id)}
                    className={`w-12 h-12 rounded border-2 ${
                      selectedColor === color.id
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.color }}
                  />
                ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-300 rounded-none">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={() => {
                  handleAddToCart();
                  navigate("/personal/cart");
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-5 rounded-none px-8 text-sm"
              >
                В КОРЗИНУ
              </Button>
            </div>
            {/* Price */}
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(product?.price || 0)} РУБ
            </div>
          </div>

          {/* Additional Info */}
          <div className="sm:text-sm text-xs text-gray-600 space-y-1 pt-5 border-t">
            <div className="space-x-2">
              <span>В НАЛИЧИИ</span>
              <span className="underline cursor-pointer">
                В РОЗНИЧНОМ МАГАЗИНЕ
              </span>
              <span>|</span>
              <span>ГАРАНТИЯ КАЧЕСТВА</span>
              <span>|</span>
              <span>ДОСТАВКА ПО РФ</span>
            </div>
          </div>

          {/* Wishlist */}
          <div className="flex justify-end">
            <button
              className="p-2 bg-white rounded-md"
              onClick={handleToggleFavorite}
              aria-label={
                isFavorite(product?.id ?? "")
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isFavorite(product?.id ?? "")
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="description"
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="flex items-center justify-between py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium text-gray-900">
                    ОПИСАНИЕ
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">
                  <p>{product?.description}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="characteristics"
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="flex items-center justify-between py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium text-gray-900">
                    ХАРАКТЕРИСТИКИ
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">
                  <div className="space-y-2">
                    <div className={`flex bg-[#F2F0EE]`}>
                      <div className="w-1/2 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                        Артикул:
                      </div>
                      <div className="w-1/2 px-4 py-3 text-sm text-gray-900">
                        {product?.article}
                      </div>
                    </div>
                    <div className={`flex bg-white`}>
                      <div className="w-1/2 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                        Бренд:
                      </div>
                      <div className="w-1/2 px-4 py-3 text-sm text-gray-900">
                        {product?.brand}
                      </div>
                    </div>
                    <div className={`flex bg-[#F2F0EE]`}>
                      <div className="w-1/2 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                        Серия:
                      </div>
                      <div className="w-1/2 px-4 py-3 text-sm text-gray-900">
                        {product?.series}
                      </div>
                    </div>
                    <div className={`flex bg-white`}>
                      <div className="w-1/2 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                        Страна происхождения:
                      </div>
                      <div className="w-1/2 px-4 py-3 text-sm text-gray-900">
                        {product?.originCountry}
                      </div>
                    </div>
                    {product?.color && (
                      <div className={`flex bg-white `}>
                        <div className="w-1/2 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                          Цвет:
                        </div>
                        <div className="w-1/2 px-4 py-3 text-sm text-gray-900">
                          {product?.color}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mt-5 border-t">
                    {Object.entries(product?.characteristics || {}).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className={`flex ${
                            index % 2 === 0 ? "bg-[#F2F0EE]" : "bg-white"
                          }`}
                        >
                          <div className="w-1/2 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                            {key}
                          </div>
                          <div className="w-1/2 px-4 py-3 text-sm text-gray-900">
                            {value as string}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <div className="space-y-2 mt-10">
                    <h1 className="text-lg uppercase font-medium pb-3 text-gray-900">
                      Размеры
                    </h1>
                    {Object.entries(formatted || {}).map(
                      ([key, value], index) =>
                        value && (
                          <div
                            key={index}
                            className={`flex ${
                              index % 2 === 0 ? "bg-[#F2F0EE]" : "bg-white"
                            }`}
                          >
                            <div className="w-1/2 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                              {key}
                            </div>
                            <div className="w-1/2 px-4 py-3 text-sm text-gray-900">
                              {value as number | boolean | string}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="bg-gray mt-5">
        <div className=" custom-container">
          <h1 className="w-full text-center py-8 uppercase sm:text-2xl text-lg font-bold">
            Похожие товары
          </h1>
          <div className="swiper-container relative">
            {/* Custom navigation buttons outside Swiper for better visibility */}
            <div className="swiper-nav-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex">
              <button className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            </div>

            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: ".swiper-nav-prev",
                nextEl: ".swiper-nav-next",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-custom-pagination",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 6,
                },
              }}
              className="product-swiper pb-12"
            >
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <SwiperSlide key={index} className="py-4">
                      <Skeleton className="h-40 w-full" />
                    </SwiperSlide>
                  ))
                : product?.category?.subcategories.map(
                    (item, index: number) => (
                      <SwiperSlide
                        key={index}
                        className="py-4 px-2 bg-white rounded-md min-h-96"
                      >
                        <Link
                          to={`/catalog/${product?.category?.slug}/${item.slug}`}
                          className="flex flex-col gap-3 items-center group transition-transform group"
                        >
                          <div className="rounded-md h-full p-4 mb-3 w-full flex items-center justify-center">
                            <div className="relative flex justify-center w-full h-full group-hover:scale-105 transition-all duration-200">
                              <img
                                loading="lazy"
                                src={item?.imageUrl || "/placeholder.svg"}
                                alt={item?.name}
                                className="object-cover max-w-32 w-full"
                              />
                            </div>
                          </div>
                          <h3 className="text-center font-bold text-sm md:text-base mt-2">
                            {item?.name}
                          </h3>
                          <p className="text-center text-xs">
                            {item?.description}
                          </p>
                        </Link>
                      </SwiperSlide>
                    )
                  )}
            </Swiper>

            {/* Custom pagination */}
            <div className="swiper-custom-pagination flex justify-center mt-6"></div>

            <div className="swiper-nav-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex">
              <button className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUserPage;
