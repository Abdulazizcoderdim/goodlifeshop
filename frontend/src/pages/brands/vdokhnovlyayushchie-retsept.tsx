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
    title: "УСТРИЦЫ ЛЕЖ-КАП-ФЕРРЕ ПО РЕЦЕПТУ РЕСТОРАНА CHEZ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/f77/300_210_2/s03zf1sq4fwg5i5gkbks9ayceu40a8kf.webp",
    link: "/culinary-world/vdokhnovlyayushchie-retsepty/ustritsy-lezh-kap-ferre-po-retseptu-restorana-chez-boulan/",
  },
  {
    title: "БРЕТОНСКИЙ ГОЛУБОЙ ОМАР В СОУСЕ БИСК",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/e3e/300_210_2/9ai5igtod3bxr1f2z2n912sovcef29vv.webp",
    link: "/culinary-world/vdokhnovlyayushchie-retsepty/bretonskiy-goluboy-omar-v-souse-bisk/",
  },
  {
    title: "НУДИ СО ШПИНАТОМ И ТВОРОГОМ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/8eb/300_210_2/zh2uztqz064j78gjbs8xoizwhy39p0xw.webp",
    link: "/culinary-world/vdokhnovlyayushchie-retsepty/nudi-so-shpinatom-i-tvorogom/",
  },
  {
    title: "НЬОККИ С МОЦАРЕЛЛОЙ И ТОМАТАМИ-КОНФИ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/1e3/300_210_2/y3c7r3f2bbqprtdjw98d51ft04o40v0i.webp",
    link: "/culinary-world/vdokhnovlyayushchie-retsepty/nokki-s-motsarelloy-i-tomatami-konfi/",
  },
  {
    title: "БИФШТЕКС ПО-ФЛОРЕНТИЙСКИ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/574/300_210_2/3b1i2rthwovmzsykok3y9y50mlzoabpy.webp",
    link: "/culinary-world/vdokhnovlyayushchie-retsepty/bifshteks-po-florentiyski/",
  },
  {
    title: "ГОВЯЖЬИ ЩЕКИ С ОВОЩАМИ И СЛАДКИМ КАРТОФЕЛЕМ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/875/300_210_2/w8230hozqvcvc4otzrs3wedu3pouczy4.webp",
    link: "/culinary-world/vdokhnovlyayushchie-retsepty/govyazhi-shcheki-s-ovoshchami-i-sladkim-kartofelem/",
  },
  {
    title: "АРОМАТНЫЙ ХЛЕБ НА ЗАКВАСКЕ",
    imageUrl:
      "https://zwilling.ru/upload/resize_cache/iblock/d33/300_210_2/c8bvcc1ft0h6z0jl4bkv6owqwzi7tsm1.webp",
    link: "/culinary-world/vdokhnovlyayushchie-retsepty/aromatnyy-khleb-na-zakvaske/",
  },
  // {
  //   title: "МОРСКОЙ ОКУНЬ В БУЛЬОНЕ КАЧУККО С РАВИОЛИ ПОД",
  //   imageUrl:
  //     "https://zwilling.ru/upload/resize_cache/iblock/374/300_210_2/vg2eyl1mfzj157g90j2zek22n7hhog3j.webp",
  //   link: "/culinary-world/vdokhnovlyayushchie-retsepty/morskoy-okun-v-bulone-kachukko-s-ravioli-pod-sousom-ruye",
  // },
  // {
  //   title: "БЛИНЧИКИ С ШОКОЛАДОМ И СВЕЖИМИ ФРУКТАМИ",
  //   imageUrl:
  //     "https://zwilling.ru/upload/resize_cache/iblock/542/300_210_2/go8c39wsis5ttn2iz68was1xeumsm7ts.webp",
  //   link: "/culinary-world/vdokhnovlyayushchie-retsepty/blinchiki-s-shokoladom-i-svezhimi-fruktami/",
  // },
  // {
  //   title: "НЕМЕЦКИЕ РУЛЕТЫ ИЗ ГОВЯДИНЫ С ВЕТЧИНОЙ И",
  //   imageUrl:
  //     "https://zwilling.ru/upload/resize_cache/iblock/75d/300_210_2/9djqomv1dwzydj03unqoxqc8mccn2pgg.webp",
  //   link: "/culinary-world/vdokhnovlyayushchie-retsepty/nemetskie-rulety-iz-govyadiny-s-vetchinoy-i-kartofelnymi-kletskami/",
  // },
  // {
  //   title: "БЕЛАЯ РЫБА НА КВАШЕНОЙ КАПУСТЕ С КАРТОФЕЛЬНЫМ",
  //   imageUrl:
  //     "https://zwilling.ru/upload/resize_cache/iblock/9e6/300_210_2/6nllj8gbzvolbszm2kt0e2yzd1phe1e2.webp",
  //   link: "/culinary-world/vdokhnovlyayushchie-retsepty/belaya-ryba-na-kvashenoy-kapuste-s-kartofelnym-pyure-zharenoy-kartoshechkoy-pakhtoy-i-alpiyskoy-molo/",
  // },
  // {
  //   title: "ПЕСТО ИЗ ЩАВЕЛЯ С РИСОМ",
  //   imageUrl:
  //     "https://zwilling.ru/upload/resize_cache/iblock/880/300_210_2/lrg8l4qafjs6whxkl8urbel8beetl138.webp",
  //   link: "/culinary-world/vdokhnovlyayushchie-retsepty/pesto-iz-shchavelya-s-risom/",
  // },
];

export default function VdokhnovlyayushchieRetsept() {
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
            <span className="text-gray-900 uppercase">
              Вдохновляющие рецепты
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-3xl uppercase font-bold text-gray-900 mb-8">
          Вдохновляющие рецепты
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
                    <p>Выбрано: 20</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
