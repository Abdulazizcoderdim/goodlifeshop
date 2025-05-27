import { useEffect, useState } from "react";
import Bestseller from "./bestseller";
import Brend from "./brend";
import Category from "./category";
import CategoryProduct from "./category-product";
import NewProducts from "./new-products";
import Sells from "./sells";
import Slider from "./slider";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const HomePage = () => {
  const [pagination, setPagination] = useState({
    number: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  console.log(pagination);

  const { data, error, isLoading } = useSWR("/products", fetcher);

  const products = data?.content || [];

  useEffect(() => {
    if (data) {
      setPagination(data.pagination);
    }
  }, [data]);

  if (error) {
    console.error("Failed to fetch posts", error);
  }

  return (
    <div className="flex flex-col">
      <Slider />
      <Category />
      <CategoryProduct />
      <NewProducts loading={isLoading} products={products} />
      <Brend />
      <Sells loading={isLoading} products={products} />
      <Bestseller loading={isLoading} products={products} />
    </div>
  );
};

export default HomePage;
