import { Link, useParams } from "react-router-dom";
import CatalogNames from "../catalog/CatalogNames";
import { useEffect, useState } from "react";
import type { IProduct, Subcategory } from "@/types";
import api from "@/http/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductItemLoading from "@/components/loading/ProductItemLoading";
import ProductCard from "../product/product-card";

interface Categories {
  id: number;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

const SubcategoryUserPage = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categorys, setCategorys] = useState<Categories | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    fetchProductsBySlug(pagination.number, sortOrder);
  }, [category, sortOrder]);

  const fetchProductsBySlug = async (page: number, sortOrder?: string) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/categories/${category}?page=${page}&size=${pagination.size}&sortBy=price&sortOrder=${sortOrder}`
      );

      console.log(res);

      setProducts(res.data.content);
      setPagination(res.data.pagination);
      setCategorys(res.data.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterName = () => {
    if (categorys) {
      return categorys.subcategories.find((item) => item.slug === subcategory);
    }
  };

  if (loading) {
    return (
      <div className="text-center h-screen flex justify-center animate-pulse items-center text-lg custom-container py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="custom-container">
      {/* catloglar */}
      <CatalogNames />
      {/* contents */}
      <div className="pt-10 pb-5 max-md:hidden">
        {/* path url */}
        <div className="flex items-center gap-3">
          <Link to={"/"} className="uppercase">
            Главная
          </Link>
          /
          <Link to={"/catalog"} className="uppercase">
            Каталог
          </Link>
          /
          <Link to={`/catalog/${categorys?.slug}`} className="uppercase">
            {categorys?.name}
          </Link>
          /<p className="uppercase">{filterName()?.name}</p>
        </div>
      </div>

      {/* contents */}
      <div className="mt-10">
        <div className="flex flex-col gap-5 justify-center text-center">
          <h1 className="uppercase text-3xl font-bold">{filterName()?.name}</h1>
          <p className="text-sm">{filterName()?.description}</p>
        </div>
      </div>

      <div className="sm:mt-10 mt-5">
        <div className="flex items-center gap-5">
          <Select
            onValueChange={(value) => {
              setSortOrder(value);
              fetchProductsBySlug(pagination.number, value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue className="uppercase" placeholder="Цена:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  defaultValue={"asc"}
                  value="asc"
                  className="uppercase"
                >
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 mb-5">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcategoryUserPage;
