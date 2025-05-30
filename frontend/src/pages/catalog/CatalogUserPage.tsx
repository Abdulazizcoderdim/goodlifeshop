import { Link, useParams } from "react-router-dom";
import CatalogNames from "./CatalogNames";
import api from "@/http/axios";
import { useEffect, useState } from "react";
import type { IProduct, Subcategory } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/navigation";
// @ts-expect-error: Swiper CSS modules do not provide type declarations
import "swiper/css/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductItemLoading from "@/components/loading/ProductItemLoading";
import ProductCard from "../product/product-card";

interface Categories {
  id: number;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

const CatalogUserPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categorys, setCategorys] = useState<Categories | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    fetchProductsBySlug(pagination.number, sortOrder);
  }, [category, sortOrder]);

  const fetchProductsBySlug = async (page: number, sortOrder?: string) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/categories/${category}?page=${page}&size=${pagination.size}&sortBy=price&sortOrder=${sortOrder}`
      );

      console.log(res);

      setProducts(res.data.content);
      setPagination(res.data.pagination);
      setCategorys(res.data.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderText = () => {
    switch (category) {
      case "nozhi":
        return "Вы подбираете хороший кухонный нож? У нас есть большой выбор различных видов ножей, а также наборы ножей и аксессуары для заточки ножей высокого качества.";
      case "posuda":
        return "Подберите подходящую посуду на любой случай в интернет-магазине ZWILLING. Наши изделия идеально дополнят вашу кухню. Сковороды, кастрюли, кувшины, кокоты и многое другое ждут вас. Откройте их для себя. Приятных покупок!";
      case "aksessuary":
        return "Ни одна кухня не обходится без таких кухонных принадлежностей, как венчики, лопатки или половники. Любите готовить изысканные блюда или просто увлекаетесь кулинарией? Тогда узнайте, какие принадлежности всегда должны быть под рукой.";
      case "mir-krasoty":
        return "С ZWILLING Beauty окунитесь в мир элегантности и точности маникюра, педикюра и ухода за кожей, который передается из поколения в поколение. Наши продукты — ваш ежедневный спутник красоты и ухода, созданные для вас на всю жизнь.";
      case "tehnika":
        return "Инновации заложены в ДНК ZWILLING. С 1731 года нашей целью было разрабатывать передовые продукты в соответствии с самыми высокими стандартами качества и постоянно совершенствовать их. Именно с этой идеей мы создавали каждое устройство ZWILLING Enfinigy с нуля и совершенствовали каждую деталь.";
      case "hranenie":
        return "Просмотрите все товары серии Fresh & Save. Узнайте, как можно дольше сохранять свежесть продуктов, экономя время и деньги и питаясь более здоровой пищей. Вакуумный насос работает с каждым элементом системы, от многоразовых пластиковых пакетов до стеклянных и пластиковых контейнеров.";
      default:
        return "Откройте для себя качество и инновации с продукцией ZWILLING. Мы предлагаем широкий ассортимент товаров для кухни, дома и ухода за собой — от ножей и посуды до аксессуаров, техники и решений для хранения. Найдите то, что сделает ваш повседневный опыт ещё лучше.";
    }
  };

  const renderImg = () => {
    switch (category) {
      case "nozhi":
        return "/noji.png";
      case "posuda":
        return "/n2.png";
      case "aksessuary":
        return "/n3.png";
      case "mir-krasoty":
        return "n4.png";
      case "tehnika":
        return "/n5.png";
      case "hranenie":
        return "/n6.png";
      default:
        return "/slider.webp";
    }
  };

  if (loading) {
    return (
      <div className="text-center h-screen flex justify-center animate-pulse items-center text-lg custom-container py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="custom-container">
      {/* catloglar */}
      <CatalogNames />
      {/* contents */}
      <div className="pt-10 pb-5">
        {/* path url */}
        <div className="flex items-center gap-3">
          <Link to={"/"} className="uppercase">
            Главная
          </Link>
          /
          <Link to={"/catalog"} className="uppercase">
            Каталог
          </Link>
          /<p>{categorys?.name}</p>
        </div>

        <div className="w-full mt-5">
          <img src={renderImg()} className="object-contain" alt="" />
        </div>

        <div className="md:mt-20 mt-10">
          <div className="flex flex-col gap-5 justify-center text-center">
            <h1 className="uppercase text-3xl font-bold">{categorys?.name}</h1>
            <p className="text-sm">{renderText()}</p>

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
                  : categorys?.subcategories.map((item, index: number) => (
                      <SwiperSlide key={index} className="py-4">
                        <Link
                          to={`/catalog/${categorys.slug}/${item.slug}`}
                          className="flex flex-col gap-3 items-center group transition-transform group"
                        >
                          <div className="rounded-md p-4 mb-3 w-full flex items-center justify-center h-[160px]">
                            <div className="relative flex justify-center w-full h-full group-hover:scale-105 transition-all duration-200">
                              <img
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.name}
                                className="object-cover max-w-32 w-full"
                              />
                            </div>
                          </div>
                          <h3 className="text-center font-bold text-sm md:text-base mt-2">
                            {item.name}
                          </h3>
                          <p className="text-center text-xs">
                            {item.description}
                          </p>
                        </Link>
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
        </div>

        <div className="sm:mt-10 mt-5">
          <div className="flex items-center gap-5">
            <Select
              onValueChange={(value) => {
                setSortOrder(value);
                fetchProductsBySlug(pagination.number, value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue className="uppercase" placeholder="Цена:" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    defaultValue={"asc"}
                    value="asc"
                    className="uppercase"
                  >
                    Цена: по возрастанию
                  </SelectItem>
                  <SelectItem value="desc" className="uppercase">
                    Цена: по убыванию
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="">
              Показывать{" "}
              <span className="font-normal text-gray-600">
                ({products.length})
              </span>
            </p>
          </div>
        </div>
        {loading ? (
          <div className="max-w-60 w-full mt-5">
            <ProductItemLoading />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogUserPage;
