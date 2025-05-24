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
import { useEffect, useState } from "react";
import type { IProduct } from "@/types";
import { getProducts } from "@/services/products.service";

const NewProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
  });

  console.log(pagination);

  useEffect(() => {
    fetchProductes();
  }, []);

  const fetchProductes = async () => {
    try {
      const res = await getProducts();

      setProducts(res.content);
      setPagination(res.pagination);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <div className="custom-container">
        <h2 className="text-3xl font-bold sm:mb-8 mb-4 text-center">Новинки</h2>

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
            {products.map((product) => (
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

        <div className="w-full py-10 flex justify-center">
          <button className="px-10 py-3 cursor-pointer bg-black text-sm font-bold text-white">
            ВСЕ НОВИНКИ
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
