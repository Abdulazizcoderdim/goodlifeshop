import Header from "@/components/admin-panel/common/Header";
import StatCard from "@/components/admin-panel/common/StatCard";
import CategoryDistributionChart from "@/components/admin-panel/overview/CategoryDistributionChart";
import ProductsTable from "@/components/admin-panel/products/ProductsTable";
import SalesTrendChart from "@/components/admin-panel/products/SalesTrendChart";
import api from "@/http/axios";
import type { IProduct } from "@/types";
import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Products"
            icon={Package}
            value={1234}
            color="#6366F1"
          />
          <StatCard
            name="Top Selling"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Low Stock"
            icon={AlertTriangle}
            value={23}
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={"$543,210"}
            color="#EF4444"
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
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};
export default ProductsPage;
