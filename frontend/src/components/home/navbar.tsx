import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const data = [
  {
    title: "Доставка и оплата",
    path: "/here_to_help/delivery",
  },
  {
    title: "Возврат и обмен ",
    path: "/here_to_help/returns/",
  },
  {
    title: "Гарантия качества",
    path: "/here_to_help/returns",
  },
];

const data2 = [
  {
    title: "Новинки",
    path: "/catalog/novinki_2/",
  },
  {
    title: "Рецепты",
    path: "/culinary-world/vdokhnovlyayushchie-retsepty/",
  },
  {
    title: "Идеи подарков",
    path: "catalog/idei_podarkov_1/",
  },
  {
    title: "Магазины",
    path: "/store/",
  },
];

const navbarData = [
  {
    title: "Бренды",
  },
  {
    title: "Каталог",
  },
  {
    title: "Контакты",
    path: "/here_to_help/kontakty/",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { cart, favorites } = useStore();
  const [searchQuery, setSearchQuery] = useState("");

  const popularCategories = [
    { name: "Посуда", href: "#" },
    { name: "Маникюрные наборы", href: "#" },
    { name: "Сковороды", href: "#" },
    { name: "Кастрюли", href: "#" },
    { name: "Чугунная посуда", href: "#" },
  ];

  return (
    <>
      <div className="bg-[#524E4A] text-white text-xs">
        <div className="flex items-center max-md:justify-center px-4 justify-between gap-3 custom-container py-1">
          <div className="flex items-center gap-2">
            {data.map((item, index) => (
              <Link key={index} to={item.path} className="">
                {item.title}
              </Link>
            ))}
          </div>
          <div className="md:flex hidden items-center gap-5 text-xs uppercase font-bold">
            {data2.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="hover:text-gray-300 transition-all"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <header className="bg-black text-white sticky top-0 z-50">
        <div className="flex justify-between items-center gap-3 custom-container py-3">
          <div className="flex items-center gap-4 w-full">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white cursor-pointer">
                  <Menu size={28} />
                </button>
              </SheetTrigger>
              <SheetContent
                className="bg-black text-white border-black"
                side="left"
              >
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <img
              onClick={() => navigate("/")}
              className="w-32 cursor-pointer h-10 object-contain"
              src="https://zwilling.ru/local/templates/zwilling/images/new-header/ZWILLING-Culinary-World.png"
              alt=""
            />
          </div>
          <div className="flex gap-4 items-center sm:w-full">
            <div className="md:flex hidden items-center gap-4">
              {navbarData.map((item, index) => (
                <Link
                  key={index}
                  to={item.path ? item.path : "#"}
                  className="text-white uppercase cursor-pointer hover:text-gray-300 transition-all text-[16px] font-bold"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <div className="rounded-md sm:bg-[#2E2B29] select-none contain-paint sm:hover:bg-[#524E4A] transition cursor-pointer sm:w-full sm:max-w-56 py-3 sm:px-2 flex items-center gap-2">
                  <Search size={22} />
                  <span className="max-sm:hidden">Поиск...</span>
                </div>
              </SheetTrigger>
              <SheetContent
                className="bg-black md:pt-10 pt-5 text-white border-black min-h-72"
                side="top"
              >
                <div className="custom-container">
                  <h1 className="uppercase text-white text-2xl font-bold">
                    Поиск
                  </h1>
                  <header className="w-full bg-white text-black mt-5">
                    <div className="container mx-auto px-4 py-4 border-b">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Название продукта, артикул, категория или другое"
                          className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Search className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="container mx-auto px-4 py-4">
                      <div className="flex w-fit max-lg:flex-col">
                        <h2 className="text-lg font-bold mr-8 uppercase">
                          Популярные запросы
                        </h2>
                        <nav className="flex w-fit max-lg:flex-col gap-3 md:gap-6">
                          {popularCategories.map((category) => (
                            <a
                              key={category.name}
                              href={category.href}
                              className="hover:text-gray-200"
                            >
                              {category.name}
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </header>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none cursor-pointer">
                  <button className="outline-none cursor-pointer hover:text-gray-400 transition">
                    <UserRound size={24} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-white text-black">
                  <DropdownMenuItem className="uppercase hover:bg-gray-200 cursor-pointer transition">
                    Войти
                  </DropdownMenuItem>
                  <DropdownMenuItem className="uppercase hover:bg-gray-200 cursor-pointer transition">
                    Создать аккаунт
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button className="cursor-pointer relative hover:text-gray-400 transition">
                <Heart size={24} />
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate("/personal/cart")}
                className="cursor-pointer relative hover:text-gray-400 transition"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
