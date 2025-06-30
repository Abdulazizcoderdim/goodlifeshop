import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  CalendarCheck,
  Menu,
  ShoppingBag,
  SquaresSubtract,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Обзор",
    icon: BarChart2,
    color: "#6366f1",
    href: "/admin-panel/",
  },
  {
    name: "Продукты",
    icon: ShoppingBag,
    color: "#8B5CF6",
    href: "/admin-panel/products",
  },
  {
    name: "Пользователи",
    icon: Users,
    color: "#EC4899",
    href: "/admin-panel/users",
  },
  {
    name: "Категория",
    icon: CalendarCheck,
    color: "#10B981",
    href: "/admin-panel/category",
  },
  {
    name: "Подкатегория",
    icon: SquaresSubtract,
    color: "#19D981",
    href: "/admin-panel/subcategory",
  },
  {
    name: "Посты",
    icon: CalendarCheck,
    color: "#10B981",
    href: "/admin-panel/posts",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = useLocation().pathname;

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = item.href === pathname;
            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className={`flex ${
                    isActive ? "bg-gray-700" : ""
                  } items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2`}
                >
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: "20px" }}
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
