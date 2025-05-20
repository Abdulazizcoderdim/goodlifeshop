import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/navigation";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/pagination";

interface BrandItem {
  id: number;
  name: string;
  logo: string;
  image: string;
  description: string;
  buttonText: string;
}

const brendData: BrandItem[] = [
  {
    id: 1,
    name: "ZWILLING",
    logo: "/images/zwilling-logo.png",
    image: "/b1.webp",
    description:
      "Лучшие кухонные ножи, посуда и аксессуары для приготовления любимых блюд – готовьте так, как Вам нравится.",
    buttonText: "ZWILLING",
  },
  {
    id: 2,
    name: "STAUB",
    logo: "/images/staub-logo.png",
    image: "/b2.webp",
    description:
      "Сделайте каждое Ваше блюдо превосходным в культовой чугунной посуде из Франции.",
    buttonText: "STAUB",
  },
  {
    id: 3,
    name: "BALLARINI",
    logo: "/images/ballarini-logo.png",
    image: "/b3.webp",
    description: "BALLARINI – семейный стиль с 1889 года. Сделано в Италии",
    buttonText: "BALLARINI",
  },
];

const Brend = () => {
  return (
    <section className="py-16 custom-container">
      <h2 className="text-3xl font-bold text-center mb-12">БРЕНДЫ</h2>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
        {brendData.map((brand) => (
          <div key={brand.id} className="relative overflow-hidden group">
            <div className="relative min-h-72 w-full">
              <img
                src={brand.image || "/placeholder.svg?height=320&width=400"}
                alt={brand.name}
                className="object-cover"
              />
            </div>

            <div className="p-6 text-center">
              <p className="text-sm mb-3 font-medium">{brand.description}</p>
              <button className="border border-gray-300 px-8 py-3 min-w-[200px] hover:bg-gray-100 transition-colors">
                {brand.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Swiper */}
      <div className="md:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="brand-swiper"
        >
          {brendData.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="relative overflow-hidden">
                <div className="relative h-64 w-full flex justify-center">
                  <img
                    src={brand.image || "/placeholder.svg?height=256&width=400"}
                    alt={brand.name}
                    className="object-cover max-w-96 w-full"
                  />
                </div>

                <div className="p-6 text-center">
                  <p className="text-sm mb-6">{brand.description}</p>
                  <button className="border border-gray-300 px-8 py-3 min-w-[200px] hover:bg-gray-100 transition-colors">
                    {brand.buttonText}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brend;
