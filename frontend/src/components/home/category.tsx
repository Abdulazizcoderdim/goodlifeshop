import CategoryItem from "../category-item/CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/navigation";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/pagination";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { Subcategory } from "@/types";
import { Skeleton } from "../ui/skeleton";

interface CategoryType {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  subcategories: Subcategory[];
  _count: {
    products: number;
    subcategories: number;
  };
}

const Category = ({ brand = null }: { brand: string | null }) => {
  const { data, error, isLoading } = useSWR("/categories", fetcher);
  console.log(data);
  console.log(error);

  return (
    <section className="sm:py-12 py-6 custom-container">
      <div className="swiper-container relative">
        {/* Custom navigation buttons outside Swiper for better visibility */}
        <div className="swiper-nav-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10">
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
            100: {
              slidesPerView: 2,
            },
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
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={index} className="py-4">
                  <Skeleton className="h-40 w-full" />
                </SwiperSlide>
              ))
            : data?.content.map((category: CategoryType, index: number) => (
                <SwiperSlide key={index} className="py-4">
                  <CategoryItem
                    brand={brand}
                    category={category as CategoryType}
                  />
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Custom pagination */}
        <div className="swiper-custom-pagination flex justify-center mt-6"></div>

        <div className="swiper-nav-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10">
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
    </section>
  );
};

export default Category;
