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

const data = [
  {
    title: "BALLARINI - ИННОВАЦИИ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/b7f/300_210_2/ew0pe1xtjdmc0n7uzb6m11nh1py1c3d9.webp",
    link: "/culinary-world/o-kompanii/ballarini-innovation",
  },
  {
    title: "BALLARINI - ПРОИЗВОДСТВО",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/a56/300_210_2/bhxna32mst3wryizzzgwywdxfx3sydgh.webp",
    link: "/culinary-world/o-kompanii/ballarini-production",
  },
  {
    title: "BALLARINI - НАШИ ЦЕЛИ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/7e7/300_210_2/t71flryobfo2j5qofleohkr8605u850x.webp",
    link: "/culinary-world/o-kompanii/ballarini-purpose",
  },
  {
    title: "BALLARINI - НАСЛЕДИЕ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/899/300_210_2/8fj9su5rbxjbichx79e1irdkpgvuif3y.webp",
    link: "/culinary-world/o-kompanii/ballarini-heritage",
  },
  {
    title: "STAUB - МИРОВОЙ БРЕНД",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/b33/300_210_2/eypbur51moy0v17psj6ga9upuw051v29.webp",
    link: "/culinary-world/o-kompanii/staub-world",
  },
  {
    title: "STAUB - ЧУГУННЫЕ КОКОТЫ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/ea7/300_210_2/fkpvf3ongjq3liyhkf4jv713aqzkmmlt.webp",
    link: "/culinary-world/o-kompanii/staub-cocotte",
  },
  {
    title: "STAUB - АССОРТИМЕНТ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/8ae/300_210_2/mcwbv028hcjs2q2hvylk5lcwp830jkog.webp",
    link: "/culinary-world/o-kompanii/staub-assortement",
  },
  {
    title: "STAUB - СДЕЛАНО ВО ФРАНЦИИ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/426/300_210_2/i8k76rsk60epbkuxpjfw9k03dg382sic.webp",
    link: "/culinary-world/o-kompanii/staub-made-in-france",
  },
  {
    title: "ZWILLING ENFINIGY",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/f3f/300_210_2/8jhk3tru09w6e05r2j3ay3hdc9xb02hc.webp",
    link: "/culinary-world/o-kompanii/zwilling-enfinigy",
  },
  {
    title: "ZWILLING FRESH&SAVE",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/f3f/300_210_2/8jhk3tru09w6e05r2j3ay3hdc9xb02hc.webp",
    link: "/culinary-world/o-kompanii/zwilling-fresh-save",
  },
  {
    title: "ZWILLING - КАЧЕСТВО",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/dc2/300_210_2/cv6nnl0bei46qbyyh36icw015w4srz9c.webp",
    link: "/culinary-world/o-kompanii/zwilling-quality",
  },
];

export default function BrandHistory() {
  return (
    <div className="min-h-screen custom-container bg-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <span>ГЛАВНАЯ</span>
            <span className="mx-2">/</span>
            <span>МИР КУЛИНАРИИ</span>
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
                    <p>Выбрано: 11</p>
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
                <Select defaultValue="12">
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent defaultValue={"12"}>
                    <SelectItem value="12">12</SelectItem>
                    {/* <SelectItem value="24">24</SelectItem> */}
                    {/* <SelectItem value="48">48</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {data.map((item, i) => (
                <BrendNewsCard key={i} item={item} />
              ))}
              {/* Innovation Card */}
              {/* <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="https://zwilling.ru/upload/resize_cache/iblock/b7f/300_210_2/ew0pe1xtjdmc0n7uzb6m11nh1py1c3d9.webp"
                    alt="BALLARINI Innovation"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    BALLARINI - ИННОВАЦИИ
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div> */}

              {/* Production Card */}
              {/* <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="https://zwilling.ru/upload/resize_cache/iblock/a56/300_210_2/bhxna32mst3wryizzzgwywdxfx3sydgh.webp"
                    alt="BALLARINI Production"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    BALLARINI - ПРОИЗВОДСТВО
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div> */}

              {/* Goals Card */}
              {/* <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="https://zwilling.ru/upload/resize_cache/iblock/7e7/300_210_2/t71flryobfo2j5qofleohkr8605u850x.webp"
                    alt="BALLARINI Goals"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    BALLARINI - НАШИ ЦЕЛИ
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
