import { Plus, Settings, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/admin-panel/common/StatCard";
import CategoryTableAdmin from "./CategoryTableAdmin";
import { useEffect, useState } from "react";
import api from "@/http/axios";
import type { Category } from "@/types";
import Header from "@/components/admin-panel/common/Header";

const CategoryAdmin = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategorys(pagination.number);
  }, []);

  const fetchCategorys = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/categories?page=${page}&size=${pagination.size}`
      );
      setCategorys(res.data.content);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log("Failed to fetch categorys", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchCategorys(page);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Category" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Всего категорий"
            icon={Zap}
            value={pagination.totalElements}
            color="#6366F1"
          />
          <StatCard
            name="Новые категории"
            icon={Users}
            value={pagination.totalElements}
            color="#8B5CF6"
          />
          <StatCard
            name="Настройки"
            icon={Settings}
            value={
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-500 text-xs hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                <Plus className="inline-block mr-2" size={16} />
                Добавить новый категорию
              </button>
            }
            color="#159000"
          />
        </motion.div>

        <CategoryTableAdmin
          setPagination={setPagination}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          loading={loading}
          categorys={categorys}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default CategoryAdmin;
