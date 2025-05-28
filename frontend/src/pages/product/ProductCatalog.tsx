import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ProductItemLoading from "@/components/loading/ProductItemLoading";
import ProductCard from "./product-card";
import type { IProduct } from "@/types";

const filterCategories = [
  { label: "Категория", active: false },
  { label: "Серия", active: false },
  { label: "Бренд", active: false },
  { label: "Цена", active: false },
];

export default function ProductCatalog() {
  const { data, error, isLoading } = useSWR("/products", fetcher);
  const [sortBy, setSortBy] = useState("Сортировка");

  console.log(error);

  return (
    <div className="">
      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">592 результатов</span>

              <div className="relative">
                <Button
                  variant="outline"
                  className="bg-gray-100 border-gray-300 text-gray-700 min-w-[140px] justify-between"
                >
                  {sortBy}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="hidden md:flex items-center gap-2">
                {filterCategories.map((category, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="bg-gray-100 border-gray-300 text-gray-700 gap-2"
            >
              Все фильтры
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <div key={index}>
                  <ProductItemLoading />
                </div>
              ))
            : data.content.map((product: IProduct) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
}
