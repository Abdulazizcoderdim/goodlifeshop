import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/navigation";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/pagination";

import ProductItem from "../product-item/product-item";
import type { IProduct } from "@/types";
import ProductItemLoading from "../loading/ProductItemLoading";

const Bestseller = ({
  products,
  loading,
}: {
  products: IProduct[];
  loading: boolean;
}) => {
  const filterBestsellers = () => {
    const filter: IProduct[] = products
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 12);
    return filter;
  };
  return (
    <div className="pb-16 custom-container">
      <h1 className="py-5 lg:text-3xl text-2xl font-medium uppercase text-center">
        Бестселлеры
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
          modules={[Navigation, Pagination]}
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
              slidesPerView: 5,
            },
          }}
          className="product-swiper pb-12"
        >
          {loading
            ? [...Array(5)].map((_, index) => (
                <SwiperSlide key={index} className="py-4">
                  <ProductItemLoading />
                </SwiperSlide>
              ))
            : filterBestsellers().map((product) => (
                <SwiperSlide key={product.id} className="py-4">
                  <ProductItem product={product} />
                </SwiperSlide>
              ))}
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
  );
};

export default Bestseller;
