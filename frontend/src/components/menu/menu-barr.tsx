import { SheetHeader } from "../ui/sheet";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  MapPin,
  ShieldQuestion,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

const brend = [
  {
    title: "Zwilling",
    desc: "Качественные изделия, производимые в Германии с 1731 г.",
    icon: "/brend1.webp",
    path: "/catalog/zwilling",
  },
  {
    title: "Staub",
    desc: "Традиционное французское качество",
    icon: "/brend2.webp",
    path: "/catalog/staub",
  },
  {
    title: "Ballarini",
    desc: "Качественная кухонная посуда производства Bella Italia с 1889 г.",
    icon: "/brend3.webp",
    path: "/catalog/ballarini",
  },
];

const fakeKatalog = [
  {
    title: "НОЖИ",
    icon: "/k1.svg",
    path: "/catalog/nozhi",
  },
  {
    title: "ПОСУДА",
    icon: "/k2.webp",
    path: "/catalog/posuda",
  },
  {
    title: "АКСЕССУАРЫ",
    icon: "/k3.webp",
    path: "/catalog/aksessuary",
  },
  {
    title: "МИР КРАСОТЫ",
    icon: "/k3.webp",
    path: "/catalog/mir_krasoty",
  },
  {
    title: "ТЕХНИКА",
    icon: "/k3.webp",
    path: "/catalog/tekhnika",
  },
  {
    title: "ХРАНЕНИЕ",
    icon: "/k3.webp",
    path: "/catalog/fresh-and-save",
  },
];

type SectionType = "brand" | "catalog" | "contact";

interface MenuBarrProps {
  setOpen: (open: boolean) => void;
  currentSection: SectionType | null;
  setCurrentSection: (section: SectionType | null) => void;
}

const MenuBarr = ({
  setOpen,
  currentSection,
  setCurrentSection,
}: MenuBarrProps) => {
  const navigate = useNavigate();
  const handleSectionClick = (section: SectionType) => {
    setCurrentSection(section);
  };

  const handleBackClick = () => {
    setCurrentSection(null);
  };

  const handleClick = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "brand":
        return (
          <div className="space-y-4 sm:mt-4 overflow-y-auto h-96">
            {brend.map((item, index) => (
              <div
                onClick={() => handleClick(item.path)}
                key={index}
                className="flex border-b justify-between w-full border-b-gray-400 cursor-pointer group items-center gap-4 pb-4"
              >
                <div>
                  <p className="text-lg group-hover:text-gray-400 font-normal uppercase">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-300">{item.desc}</p>
                </div>
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-7 h-7 object-contain"
                />
              </div>
            ))}
          </div>
        );
      case "catalog":
        return (
          <div className="space-y-4 sm:mt-4 overflow-y-auto h-96">
            {fakeKatalog.map((item, index) => (
              <div
                onClick={() => handleClick(item.path)}
                key={index}
                className="flex border-b justify-between w-full border-b-gray-400 cursor-pointer group items-center gap-4 pb-4"
              >
                <p className="text-lg group-hover:text-gray-400 font-normal uppercase">
                  {item.title}
                </p>
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-7 h-7 object-contain"
                />
              </div>
            ))}
          </div>
        );
      case "contact":
        return <div>Aloqa ma'lumotlari</div>;
      default:
        return <div>Bo'limni tanlang: Brend, Katalog yoki Aloqa</div>;
    }
  };

  const handleCloseSheet = () => {
    setOpen(false);
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
            <Link
              onClick={handleCloseSheet}
              to={"/here_to_help/kontakty"}
              className="flex cursor-pointer hover:text-gray-400 transition w-full items-center justify-between gap-2"
            >
              <p className="text-2xl font-bold uppercase">Контакты</p>
              <ChevronRight size={24} />
            </Link>

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
