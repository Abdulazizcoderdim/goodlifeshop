import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/navigation";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image:
      "https://zwilling.ru/upload/uf/0d5/p88md45heq9yy7m21nx5bg3tzan0kupj.webp",
    title: "НАСЛАЖДАЙТЕСЬ НОВОЙ УНИВЕРСАЛЬНОСТЬЮ",
    description:
      "От обжаривания до запекания: со сковородой ZWILLING Joy Plus вам понадобится только одна сковорода на кухне.",
    buttonText: "ПОДРОБНЕЕ",
    buttonLink: "/catalog/ballarini/posuda-3156/ballarini-torre/",
  },
  {
    id: 2,
    image: "/slider2.webp",
    title: "BALLARINI TORRE",
    description: "BALLARINI Torre: воплощение универсальности на вашей кухне!",
    buttonText: "ПОДРОБНЕЕ",
    buttonLink: "/catalog/ballarini/posuda-3156/ballarini-torre/",
  },
  {
    id: 3,
    image: "/slider3.webp",
    title: "Кто-то готовит. Вы создаете.",
    description:
      "Раскройте свой кулинарный творческий потенциал с посудой ZWILLING PURE!",
    buttonText: "ПОДРОБНЕЕ  ",
    buttonLink: "/catalog/zwilling/posuda-3105/zwilling-pure/",
  },
];

export default function Slider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[500px] md:h-[600px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24">
                <div className="max-w-2xl text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-none font-medium">
                    <a href={slide.buttonLink}>{slide.buttonText}</a>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev absolute left-4 top-1/2 z-10 flex sm:!h-10 sm:!w-10 !h-8 !w-8 border border-white -translate-y-1/2 items-center justify-center rounded-full !bg-white/80 !text-gray-800 !shadow-md hover:!bg-white"></button>

      <button className="swiper-button-next absolute right-4 top-1/2 z-10 flex sm:!h-10 sm:!w-10 !h-8 !w-8 border border-white -translate-y-1/2 items-center justify-center rounded-full !bg-white/80 !text-gray-800 !shadow-md hover:!bg-white"></button>

      {/* Custom Pagination */}
      <div className="swiper-pagination absolute bottom-6 left-0 right-0 z-10 flex justify-center space-x-2">
        {/* Pagination bullets will be injected here by Swiper */}
      </div>
    </div>
  );
}
