import Header from "@/components/admin-panel/common/Header";
import StatCard from "@/components/admin-panel/common/StatCard";
import ProductsTable from "@/components/admin-panel/products/ProductsTable";
import api from "@/http/axios";
import type { IProduct } from "@/types";
import { motion } from "framer-motion";
import { Package, Plus, Settings, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchProducts(pagination.number);
  }, []);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/products?page=${page}&size=${pagination.size}`
      );

      setProducts(res.data.content);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  const filterTodayAddProduct = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return products.filter(
      (product) =>
        new Date(product.createdAt).getDate() === day &&
        new Date(product.createdAt).getMonth() + 1 === month &&
        new Date(product.createdAt).getFullYear() === year
    ).length;
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Products"
            icon={Package}
            value={pagination.totalElements}
            color="#6366F1"
          />
          <StatCard
            name="New Products"
            icon={TrendingUp}
            value={filterTodayAddProduct()}
            color="#10B981"
          />
          <StatCard
            name="Settings"
            icon={Settings}
            value={
              <button
                onClick={() => navigate("/admin-panel/products/new")}
                className="bg-purple-500 text-sm hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                <Plus className="inline-block mr-2" size={16} />
                Добавить новый продукт
              </button>
            }
            color="#159000"
          />
        </motion.div>

        <ProductsTable
          handlePageChange={handlePageChange}
          pagination={pagination}
          products={products}
          loading={loading}
        />

        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          {/* <SalesTrendChart />
          <CategoryDistributionChart /> */}
        </div>
      </main>
    </div>
  );
};
export default ProductsPage;
