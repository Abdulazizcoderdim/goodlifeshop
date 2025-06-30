import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BrendNewsCard from "./brend-news-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IPosts } from "@/types";
import api from "@/http/axios";

// const data = [
//   {
//     title: "ОСТРЫЙ, КАК БРИТВА - КАК ЗАТОЧИТЬ НОЖ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/43f/300_210_2/jmgmrqu7wkkilkg72fgcbzweu1oc74mt.webp",
//     link: "/culinary-world/use-care/stay-sharp-how-to-sharpen-your-knives",
//     category: "usage_and_care",
//   },
//   {
//     title: "ИСПОЛЬЗОВАНИЕ И УХОД ЗА ПОСУДОЙ – СОВМЕЩАЙТЕ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/d88/300_210_2/75sbygyve5cqpktsfifvan51w9pa3ibc.webp",
//     link: "/culinary-world/use-care/use-and-care-your-cookware-it-s-a-pleasure",
//     category: "usage_and_care",
//   },
//   {
//     title: "ПРОДЛИТЕ ЖИЗНЬ ВАШЕГО НОЖА",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/8eb/300_210_2/zh2uztqz064j78gjbs8xoizwhy39p0xw.webp",
//     link: "/culinary-world/use-care/a-knife-for-life-use-and-care-your-knives",
//     category: "usage_and_care",
//   },
// ];

export default function UseCare() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 20,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchPosts(pagination.number);
  }, []);

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/posts?page=${page}&size=${pagination.size}&category=usage_and_care`
      );
      setPosts(res.data.content);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(loading);

  return (
    <div className="min-h-screen custom-container bg-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <span>ГЛАВНАЯ</span>
            <span className="mx-2">/</span>
            <Link to="/culinary-world/" className="cursor-pointer">
              МИР КУЛИНАРИИ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 uppercase">
              Использование и уход
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-3xl uppercase font-bold text-gray-900 mb-8">
          Использование и уход
        </h1>

        <div className="flex max-md:flex-col gap-8">
          {/* Left Sidebar */}
          <div className="md:w-80 flex-shrink-0">
            {/* Navigation Menu */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>МИР КУЛИНАРИИ</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        to="/culinary-world/o-kompanii/"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        История бренда
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/culinary-world/use-care"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Использование и уход
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/culinary-world/vdokhnovlyayushchie-retsepty/"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Вдохновляющие рецепты
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Filter Section */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>ФИЛЬТР</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-600">
                    <p>Выбрано: 3</p>
                    <button className="text-blue-600 hover:underline mt-1">
                      Показать
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="flex justify-end mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">ПОКАЗЫВАТЬ ПО:</span>
                <Select defaultValue="3">
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent defaultValue={"3"}>
                    <SelectItem value="3">3</SelectItem>
                    {/* <SelectItem value="24">24</SelectItem> */}
                    {/* <SelectItem value="48">48</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {posts.map((item, i) => (
                <BrendNewsCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
