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
//     title: "BALLARINI - ИННОВАЦИИ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/b7f/300_210_2/ew0pe1xtjdmc0n7uzb6m11nh1py1c3d9.webp",
//     link: "/culinary-world/o-kompanii/ballarini-innovation",
//     category: "brand_history",
//   },
//   {
//     title: "BALLARINI - ПРОИЗВОДСТВО",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/a56/300_210_2/bhxna32mst3wryizzzgwywdxfx3sydgh.webp",
//     link: "/culinary-world/o-kompanii/ballarini-production",
//     category: "brand_history",
//   },
//   {
//     title: "BALLARINI - НАШИ ЦЕЛИ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/7e7/300_210_2/t71flryobfo2j5qofleohkr8605u850x.webp",
//     link: "/culinary-world/o-kompanii/ballarini-purpose",
//     category: "brand_history",
//   },
//   {
//     title: "BALLARINI - НАСЛЕДИЕ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/899/300_210_2/8fj9su5rbxjbichx79e1irdkpgvuif3y.webp",
//     link: "/culinary-world/o-kompanii/ballarini-heritage",
//     category: "brand_history",
//   },
//   {
//     title: "STAUB - МИРОВОЙ БРЕНД",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/b33/300_210_2/eypbur51moy0v17psj6ga9upuw051v29.webp",
//     link: "/culinary-world/o-kompanii/staub-world",
//     category: "brand_history",
//   },
//   {
//     title: "STAUB - ЧУГУННЫЕ КОКОТЫ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/ea7/300_210_2/fkpvf3ongjq3liyhkf4jv713aqzkmmlt.webp",
//     link: "/culinary-world/o-kompanii/staub-cocotte",
//     category: "brand_history",
//   },
//   {
//     title: "STAUB - АССОРТИМЕНТ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/8ae/300_210_2/mcwbv028hcjs2q2hvylk5lcwp830jkog.webp",
//     link: "/culinary-world/o-kompanii/staub-assortement",
//     category: "brand_history",
//   },
//   {
//     title: "STAUB - СДЕЛАНО ВО ФРАНЦИИ",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/426/300_210_2/i8k76rsk60epbkuxpjfw9k03dg382sic.webp",
//     link: "/culinary-world/o-kompanii/staub-made-in-france",
//     category: "brand_history",
//   },
//   {
//     title: "ZWILLING ENFINIGY",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/f3f/300_210_2/8jhk3tru09w6e05r2j3ay3hdc9xb02hc.webp",
//     link: "/culinary-world/o-kompanii/zwilling-enfinigy",
//     category: "brand_history",
//   },
//   {
//     title: "ZWILLING FRESH&SAVE",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/f3f/300_210_2/8jhk3tru09w6e05r2j3ay3hdc9xb02hc.webp",
//     link: "/culinary-world/o-kompanii/zwilling-fresh-save",
//     category: "brand_history",
//   },
//   {
//     title: "ZWILLING - КАЧЕСТВО",
//     imageUrl:
//       "https://zwilling.ru/upload/resize_cache/iblock/dc2/300_210_2/cv6nnl0bei46qbyyh36icw015w4srz9c.webp",
//     link: "/culinary-world/o-kompanii/zwilling-quality",
//     category: "brand_history",
//   },
// ];

export default function BrandHistory() {
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
        `/posts?page=${page}&size=${pagination.size}&category=brand_history`
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
            <span className="text-gray-900">ИСТОРИЯ БРЕНДА</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          ИСТОРИЯ БРЕНДА
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
                    <p>Выбрано: {pagination.totalElements}</p>
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
                <Select defaultValue="10">
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent defaultValue={"10"}>
                    <SelectItem value="10">
                      {pagination.totalElements}
                    </SelectItem>
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
