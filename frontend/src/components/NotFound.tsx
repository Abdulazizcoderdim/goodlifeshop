import { Ban, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Category from "./home/category";
import Sells from "./home/sells";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
      <div className="max-w-md w-full mx-auto text-center space-y-10">
        {/* Header with icon */}
        <div className="flex items-center justify-center gap-4">
          <div className="rounded-full border-2 border-gray-800 p-2">
            <Ban className="h-8 w-8 text-gray-800" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            СТРАНИЦА НЕ НАЙДЕНА
          </h1>
        </div>

        {/* Search bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Попробуйте найти информацию еще раз"
            className="w-full border border-gray-300 py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Main page button */}
        <Link
          to="/"
          className="inline-block bg-red-600 text-white font-medium py-3 px-8 hover:bg-red-700 transition-colors"
        >
          ПЕРЕЙТИ НА ГЛАВНУЮ
        </Link>

        {/* Help text */}
        <p className="text-gray-700 mt-8">
          Если вы не можете найти то, что вы ищете, позвольте нашим менеджерам
          помочь вам
        </p>

        {/* Contact information */}
        <div className="space-y-2 text-gray-700">
          <p>8 (800) 600-47-36</p>
          <p>8 (495) 724-85-98</p>
          <p>shop@zwilling.ru</p>
          <p>ПН-ПТ: 10:00 - 18:00</p>
        </div>
      </div>
      <Category />
      <Sells />
    </div>
  );
}
