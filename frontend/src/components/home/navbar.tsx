import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import LoginModal from "../auth/login-modal";
import RegisterModal from "../auth/register-modal";
import { useAuthStore } from "@/hooks/useAuthStore";
import {
  data,
  data2,
  menuItems,
  navbarData,
  popularCategories,
} from "@/constants";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import MenuBarr from "../menu/menu-barr";

type SectionType = "brand" | "catalog" | "contact";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart, favorites } = useStore();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuth, loading, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionType | null>(
    null
  );

  useEffect(() => {
    if (openLogin || openRegister) {
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.pointerEvents = "auto";
    }
  }, [openLogin, openRegister]);

  const handleLogout = () => {
    logout();
    toast.success("Вы вышли из аккаунта");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleOPenBar = (tab: string) => {
    if (tab === "contact") {
      return;
    }
    setCurrentSection(tab as SectionType);
    setOpen(true);
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";
  };

  return (
    <>
      <div className="bg-[#524E4A] text-white text-xs">
        <div className="flex items-center max-md:justify-center px-4 justify-between gap-3 custom-container py-1">
          <div className="flex items-center max-sm:text-[10px] gap-2">
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
          <div className="flex items-center sm:gap-4 gap-2 w-full">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  onClick={() => setOpen(true)}
                  className="text-white cursor-pointer"
                >
                  <Menu size={28} className="max-sm:h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                className="bg-black w-full text-white border-black"
                side="left"
              >
                <MenuBarr
                  currentSection={currentSection}
                  setCurrentSection={setCurrentSection}
                  setOpen={setOpen}
                />
              </SheetContent>
            </Sheet>
            <img
              loading="lazy"
              onClick={() => navigate("/")}
              className="sm:w-32 w-20 cursor-pointer h-10 object-contain"
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
                  onClick={() => handleOPenBar(item.tab)}
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
                      <form onSubmit={handleSearch} className="relative">
                        <input
                          name="search"
                          type="text"
                          placeholder="Название продукта, артикул, категория или другое"
                          className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <Search className="h-5 w-5 text-white" />
                        </button>
                      </form>
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
                              className="hover:text-gray-700"
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
                  <button className="outline-none mt-2 cursor-pointer hover:text-gray-400 transition">
                    <UserRound size={24} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-white text-black">
                  {loading ? (
                    [...Array(2)].map((_, index) => (
                      <Skeleton className="h-8 w-full mt-2" key={index} />
                    ))
                  ) : isAuth ? (
                    menuItems.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={
                          index === 3 ? handleLogout : () => navigate(item.path)
                        }
                        className="uppercase hover:bg-gray-200 cursor-pointer transition"
                      >
                        {item.title}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <>
                      <DropdownMenuItem
                        onClick={() => setOpenLogin(true)}
                        className="uppercase hover:bg-gray-200 cursor-pointer transition"
                      >
                        Войти
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenRegister(true)}
                        className="uppercase hover:bg-gray-200 cursor-pointer transition"
                      >
                        Создать аккаунт
                      </DropdownMenuItem>
                    </>
                  )}
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
      <LoginModal
        setOpenRegister={setOpenRegister}
        open={openLogin}
        onOpenChange={setOpenLogin}
      />
      <RegisterModal
        open={openRegister}
        onOpenChange={setOpenRegister}
        setOpenLogin={setOpenLogin}
      />
    </>
  );
};

export default Navbar;
