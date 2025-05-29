import { Link } from "react-router-dom";
import CatalogNames from "../catalog/CatalogNames";
import Brend from "@/components/home/brend";
import Category from "@/components/home/category";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import ProductItemLoading from "@/components/loading/ProductItemLoading";
import type { Category as ICategory, IProduct } from "@/types";
import ProductCard from "../product/product-card";
import api from "@/http/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";

type PriceRange = {
  label: string;
  min: number;
  max: number;
};

const priceRanges: PriceRange[] = [
  { label: "До 10 000 (379)", min: 0, max: 10000 },
  { label: "От 10 000 до 20 000 (177)", min: 10000, max: 20000 },
  { label: "От 20 000 до 95 500 (129)", min: 20000, max: 95500 },
];

const CatalogStatikUserPage = () => {
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleChange = (index: number) => {
    setSelectedIndex(index);
    const range = priceRanges[index];
    console.log(range.min, range.max);
  };

  useEffect(() => {
    fetchProducts(pagination.number, sortOrder);
  }, [sortOrder]);

  const fetchProducts = async (page = 1, sort?: string) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/products?page=${page}&size=${pagination.size}&sortBy=price&sortOrder=${sort}`
      );
      setProducts(res.data.content);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  const { data, isLoading, error } = useSWR("/categories", fetcher);

  if (error) {
    console.error("Category error:", error);
  }

  return (
    <div className="custom-container pb-10">
      {/* catloglar */}
      <CatalogNames />
      {/* contents */}
      <div className="pt-10 pb-5 max-md:hidden">
        {/* path url */}
        <div className="flex items-center gap-3">
          <Link to={"/"} className="uppercase">
            Главная
          </Link>
          /<p className="uppercase">Каталог</p>
        </div>
      </div>
      {/* banner */}
      <div className="max-md:pt-5">
        <img src="/catalog.webp" className="w-full mb-10" alt="" />
        <div className="space-y-3 text-center w-full">
          <h1 className="text-2xl font-bold uppercase">
            Каталог товаров ZWILLING
          </h1>
          <p className="text-sm">
            Кулинарный мир группы ZWILLING – это не только кухонные
            принадлежности превосходного качества, но и ведущие бренды из всех
            уголков мира: ZWILLING (Германия), STAUB (Франция), MIYABI (Япония),
            BALLARINI (Италия), каждый из которых по-своему замечателен и
            славится собственными традициями, при этом всех их объединяет одно:
            неутолимая страсть к совершенству.
          </p>
          <Category />
          <Brend />

          <div>
            {/* filere */}
            <div className="bg-white py-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm">
                      {pagination.totalElements} результатов
                    </span>
                    <Select
                      onValueChange={(value) => {
                        setSortOrder(value);
                        fetchProducts(pagination.number, value);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          className="uppercase"
                          placeholder="Цена:"
                        />
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

                    <div className="hidden md:flex items-center gap-2">
                      <Sheet
                        onOpenChange={setOpenSearchBar}
                        open={openSearchBar}
                      >
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                          >
                            Категория
                          </Button>
                        </SheetTrigger>
                        {/* category */}
                        <SheetContent className="">
                          <div className="pt-10 px-4">
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full"
                            >
                              <AccordionItem value="item-1">
                                <AccordionTrigger>Категории</AccordionTrigger>
                                <AccordionContent>
                                  <ul>
                                    {isLoading ? (
                                      <Skeleton className="h-4 w-1/2" />
                                    ) : (
                                      data?.content.map((item: ICategory) => (
                                        <li key={item.id} className="py-2">
                                          <Link
                                            className="uppercase hover:text-gray-400 text-sm"
                                            to={`/catalog/${item.slug}`}
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                              {/* <AccordionItem value="item-2">
                                <AccordionTrigger>Серия</AccordionTrigger>
                                <AccordionContent>
                                  <ul>
                                    {isLoadingSeries ? (
                                      <Skeleton className="h-4 w-1/2" />
                                    ) : (
                                      series?.map(
                                        (item: ISeries, i: number) => (
                                          <li key={i} className="py-2">
                                            {item.series}({item.count})
                                          </li>
                                        )
                                      )
                                    )}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-3">
                                <AccordionTrigger>Бренд</AccordionTrigger>
                                <AccordionContent>Бренд</AccordionContent>
                              </AccordionItem> */}
                              <AccordionItem value="item-4">
                                <AccordionTrigger>Цена</AccordionTrigger>
                                <AccordionContent>
                                  {priceRanges.map((range, index) => (
                                    <label
                                      key={index}
                                      className="flex items-center gap-2 mb-2"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedIndex === index}
                                        onChange={() => handleChange(index)}
                                      />
                                      {range.label}
                                    </label>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>

                            <div className="sm:mt-10 mt-5 flex items-center gap-5">
                              <Button
                                variant={"destructive"}
                                className="uppercase rounded-none"
                              >
                                результаты ({pagination.totalElements})
                              </Button>
                              <Button
                                onClick={() => window.location.reload()}
                                variant={"outline"}
                                className="uppercase rounded-none"
                              >
                                очистить
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>

                      {/* <Button
                        variant="outline"
                        className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                      >
                        Серия
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                      >
                        Бренд
                      </Button> */}
                      <Button
                        onClick={() => setOpenSearchBar(true)}
                        variant="outline"
                        className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                      >
                        Цена
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={() => setOpenSearchBar(true)}
                    variant="outline"
                    className="bg-gray-100 border-gray-300 text-gray-700 gap-2"
                  >
                    Все фильтры
                    <Menu className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading
                ? [...Array(4)].map((_, index) => (
                    <div key={index}>
                      <ProductItemLoading />
                    </div>
                  ))
                : products.map((product: IProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
          </div>

          {/* <ProductCatalog /> */}
        </div>
      </div>
    </div>
  );
};

export default CatalogStatikUserPage;
