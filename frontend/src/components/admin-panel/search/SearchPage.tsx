import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { IProduct } from "@/types";
import api from "@/http/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/pages/product/product-card";
import ProductItemLoading from "@/components/loading/ProductItemLoading";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchProducts(pagination.number, sortOrder);
  }, [query, sortOrder]);

  const fetchProducts = async (page = 1, sort?: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await api.get(
        `/products?search=${query}&page=${page}&size=${pagination.size}${
          sort ? `&sortBy=price&sortOrder=${sort}` : ""
        }`
      );
      setProducts(res.data.content);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-container">
      <div className="py-11">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl uppercase font-extrabold mb-4">
            Результаты поиска
          </h1>
          <p className="uppercase text-sm">
            Ваш поисковый запрос:
            <span className="font-bold uppercase"> {query}</span>
          </p>
        </div>
        <header className="border-t border-black border-b py-4 sm:mt-10 mt-5">
          <div className="flex items-center max-w-5xl mx-auto gap-5">
            <div className="uppercase font-bold">
              Товары{" "}
              <span className="font-normal text-gray-600">
                ({pagination.totalElements})
              </span>
            </div>
          </div>
        </header>

        <div className="sm:mt-10 mt-5">
          <div className="flex items-center gap-5">
            <Select
              onValueChange={(value) => {
                setSortOrder(value);
                fetchProducts(pagination.number, value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue className="uppercase" placeholder="Цена:" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="asc" className="uppercase">
                    Цена: по возрастанию
                  </SelectItem>
                  <SelectItem value="desc" className="uppercase">
                    Цена: по убыванию
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="">
              Показывать{" "}
              <span className="font-normal text-gray-600">
                ({products.length})
              </span>
            </p>
          </div>
        </div>
        {loading ? (
          <div className="max-w-60 w-full mt-5">
            <ProductItemLoading />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
