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
import { Button } from "@/components/ui/button";

interface Categories {
  id: number;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

const BrandBallariniSubCategory = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categorys, setCategorys] = useState<Categories | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 50,
    totalElements: 0,
    totalPages: 0,
  });
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    if (subcategory) {
      fetchProductsBySlug(pagination.number, sortOrder);
    }
  }, [subcategory, sortOrder, category]);

  const fetchProductsBySlug = async (
    page: number,
    sortOrder = "asc",
    append = false
  ) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/subcategories/slug/${subcategory}?page=${page}&size=${pagination.size}&sortBy=price&sortOrder=${sortOrder}`
      );

      const fetchedProducts =
        res.data.content.filter((item: IProduct) =>
          item.brand.toLocaleLowerCase().includes("ballarini")
        ) || [];

      // Agar append true bo‘lsa, mavjud mahsulotlar ro‘yxatiga qo‘shib boradi
      setProducts((prev) =>
        append ? [...prev, ...fetchedProducts] : fetchedProducts
      );

      // Pagination holatini yangilash
      setPagination(res.data.pagination || pagination);

      // Kategoriyani o‘rnatish
      setCategorys(fetchedProducts[0]?.category || null);
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const firstProduct = products[0];
  const subcategoryInfo = firstProduct?.subcategory;

  console.log(products);

  return (
    <div className="custom-container">
      <CatalogNames brand="ballarini" />

      <div className="pt-10 pb-5 max-md:hidden">
        <div className="flex items-center gap-3">
          <Link to="/" className="uppercase">
            Главная
          </Link>{" "}
          /
          <Link to="/catalog" className="uppercase">
            Каталог
          </Link>{" "}
          /
          <Link to="/catalog/ballarini" className="uppercase">
            Ballarini
          </Link>{" "}
          /
          {categorys && (
            <>
              <Link
                to={`/catalog/ballarini/${categorys.slug}`}
                className="uppercase"
              >
                {categorys.name}
              </Link>{" "}
              /
            </>
          )}
          <p className="uppercase">{subcategoryInfo?.name || "..."}</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex flex-col gap-5 justify-center text-center">
          <h1 className="uppercase text-3xl font-bold">
            {subcategoryInfo?.name || "Подкатегория"}
          </h1>
          <p className="text-sm">{subcategoryInfo?.description || ""}</p>
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
                <SelectItem value="asc" className="uppercase">
                  Цена: по возрастанию
                </SelectItem>
                <SelectItem value="desc" className="uppercase">
                  Цена: по убыванию
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p>
            Показывать{" "}
            <span className="font-normal text-gray-600">
              ({products.length})
            </span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 mb-5">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index}>
              <ProductItemLoading />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 mb-5">
          {products
            // .filter((item) =>
            //   item.brand.toLocaleLowerCase().includes("zwilling")
            // )
            .map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="flex justify-center py-5">
          <Button
            className="rounded-none"
            disabled={loading || pagination.number >= pagination.totalPages}
            onClick={() =>
              fetchProductsBySlug(pagination.number + 1, sortOrder, true)
            }
          >
            {loading ? "Загрузка..." : "Загрузить еще"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BrandBallariniSubCategory;
