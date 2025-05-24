import { useEffect, useState } from "react";
import Bestseller from "./bestseller";
import Brend from "./brend";
import Category from "./category";
import CategoryProduct from "./category-product";
import NewProducts from "./new-products";
import Sells from "./sells";
import Slider from "./slider";
import type { IProduct } from "@/types";
import { getProducts } from "@/services/products.service";

const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);

  console.log(pagination);

  useEffect(() => {
    fetchProductes();
  }, []);

  const fetchProductes = async () => {
    try {
      setLoading(true);
      const res = await getProducts();

      setProducts(res.content);
      setPagination(res.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Slider />
      <Category />
      <CategoryProduct />
      <NewProducts loading={loading} products={products} />
      <Brend />
      <Sells loading={loading} products={products} />
      <Bestseller loading={loading} products={products} />
    </div>
  );
};

export default HomePage;
