import { useState } from "react";
import { SheetHeader } from "../ui/sheet";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  MapPin,
  ShieldQuestion,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const data = [
  {
    title: "Избранное",
    icon: Heart,
    path: "/",
  },
  {
    title: "Личный кабинет",
    icon: User,
    path: "/personal/",
  },
  {
    title: "Обратная связь",
    icon: ShieldQuestion,
    path: "/here_to_help/contact-form/",
  },
  {
    title: "Магазин рядом с домом",
    icon: MapPin,
    path: "#",
  },
];
type SectionType = "brand" | "catalog" | "contact";

const MenuBarr = () => {
  const [currentSection, setCurrentSection] = useState<SectionType | null>(
    null
  );

  // Har bir bo'limni tanlash uchun
  const handleSectionClick = (section: SectionType) => {
    setCurrentSection(section);
  };

  // Ortga qaytish
  const handleBackClick = () => {
    setCurrentSection(null);
  };

  // Har bir bo'limga mos kontentni render qilish
  const renderContent = () => {
    switch (currentSection) {
      case "brand":
        return <div>Brend haqida ma'lumot</div>;
      case "catalog":
        return <div>Katalog haqida ma'lumot</div>;
      case "contact":
        return <div>Aloqa ma'lumotlari</div>;
      default:
        return <div>Bo'limni tanlang: Brend, Katalog yoki Aloqa</div>;
    }
  };

  return (
    <div className="h-full">
      <SheetHeader>
        <img
          onClick={() => setCurrentSection(null)} // Sheetni yopish uchun
          className="sm:w-32 w-20 cursor-pointer h-10 object-contain"
          src="https://zwilling.ru/local/templates/zwilling/images/new-header/ZWILLING-Culinary-World.png"
          alt="Logo"
        />
      </SheetHeader>

      <div className="mt-4 px-3 flex-col flex justify-between h-full">
        {/* Menu bo'limlari */}
        {currentSection === null && (
          <div className="flex flex-col gap-4 w-full items-start">
            <div
              onClick={() => handleSectionClick("brand")}
              className="flex cursor-pointer hover:text-gray-400 transition w-full items-center justify-between gap-2"
            >
              <p className="text-2xl font-bold uppercase">Бренды</p>
              <ChevronRight size={24} />
            </div>
            <div
              onClick={() => handleSectionClick("catalog")}
              className="flex cursor-pointer hover:text-gray-400 transition w-full items-center justify-between gap-2"
            >
              <p className="text-2xl font-bold uppercase">Каталог</p>
              <ChevronRight size={24} />
            </div>
            <div
              onClick={() => handleSectionClick("contact")}
              className="flex cursor-pointer hover:text-gray-400 transition w-full items-center justify-between gap-2"
            >
              <p className="text-2xl font-bold uppercase">Контакты</p>
              <ChevronRight size={24} />
            </div>

            <ul className="mt-5 text-sm space-y-3">
              <li className="uppercase font-medium">
                <Link to={"/catalog/novinki_2"}>новинки</Link>
              </li>
              <li className="uppercase font-medium">
                <Link to={"/culinary-world/vdokhnovlyayushchie-retsepty"}>
                  Вдохновляющие рецепты
                </Link>
              </li>
              <li className="uppercase font-medium">
                <Link to={"/catalog/idei_podarkov_1/"}>идеи подарков</Link>
              </li>
              <li className="uppercase font-medium">
                <Link to={"/culinary-world/o-kompanii/"}>о нас</Link>
              </li>
            </ul>
          </div>
        )}

        {/* Sheet content */}
        {currentSection !== null && (
          <div className="mt-4">
            <button onClick={handleBackClick}>
              <ArrowLeft size={24} />
            </button>
            {renderContent()}
          </div>
        )}

        {/* asd */}
        <div className="pb-28 text-white">
          <ul>
            {data.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Button
            asChild
            variant={"destructive"}
            className="w-full mt-5 uppercase rounded-none"
          >
            <Link to={"/personal/cart/"}>Корзина</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuBarr;
