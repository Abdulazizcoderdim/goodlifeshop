import MyPagination from "@/components/admin-panel/pagination/MyPagination";
import type { Category } from "@/types";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import EditCategoryAdmin from "./EditCategoryAdmin";
import CategoryAddAdmin from "./CategoryAddAdmin";
import api from "@/http/axios";
import { toast } from "sonner";
import SearchBar from "@/components/SearchBar";

interface Props {
  categorys: Category[];
  pagination: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  loading: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setPagination: (pagination: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  }) => void;
}

const CategoryTableAdmin = ({
  categorys,
  pagination,
  onPageChange,
  loading,
  setIsModalOpen,
  isModalOpen,
  setPagination,
}: Props) => {
  const [filteredCategory, setFilteredCategory] = useState(categorys);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  useEffect(() => {
    setFilteredCategory(categorys);
  }, [categorys]);

  const fetchCategorys = async (term: string) => {
    try {
      const res = await api.get(`/categories?search=${term}`);
      setFilteredCategory(res.data.content);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Error fetching categorys", err);
    }
  };

  const handleEdit = (category: Category) => {
    setCategoryToEdit({ ...category });
    setIsEditModalOpen(true);
  };

  const handleSuccess = (updateCategory: Category) => {
    setFilteredCategory(
      filteredCategory.map((category) =>
        category.id === updateCategory.id
          ? { ...category, ...updateCategory }
          : category
      )
    );
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить эту категорию?\n\nПри удалении также будут удалены все связанные подкатегории и продукты. Это действие необратимо."
    );

    if (!confirmDelete) return;

    try {
      const res = api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      toast.promise(res, {
        loading: "Удаление пользователя...",
        success: "Пользователь успешно удален",
        error: "Произошла ошибка при удалении пользователя",
      });

      res.then(() => {
        onPageChange(pagination.number);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full rounded-lg justify-center items-center py-10 my-5 bg-gray-800 ">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="bg-gray-800 mb-5 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">
            Категории продуктов
          </h2>
          <SearchBar onSearch={fetchCategorys} placeholder="Поиск категорий" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Слаг категории
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Подкатегории
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {filteredCategory.map((category, i) => (
                <motion.tr
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {i + 1 + (pagination.number - 1) * pagination.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center text-sm">
                    <img
                      loading="lazy"
                      src={
                        category.imageUrl || "https://via.placeholder.com/40"
                      }
                      alt="Product"
                      className="size-10 rounded-full object-cover"
                    />
                    <div className="text-sm text-gray-300">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                      {category.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.subcategories.length > 0 ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                        {category.subcategories
                          .map((sub) => sub.name)
                          .join(", ")
                          .slice(0, 20)}
                        ...
                      </span>
                    ) : (
                      <p>Нет подкатегорий</p>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <MyPagination
        currentPage={pagination.number}
        totalItems={pagination.totalElements}
        itemsPerPage={pagination.size}
        onPageChange={onPageChange}
      />

      {isEditModalOpen && categoryToEdit && (
        <EditCategoryAdmin
          setIsEditModalOpen={setIsEditModalOpen}
          defaultValues={categoryToEdit}
          onSuccess={handleSuccess}
        />
      )}

      {isModalOpen && (
        <CategoryAddAdmin
          setIsModalOpen={setIsModalOpen}
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          onCategoryAdded={(page: string) => onPageChange(parseInt(page))}
        />
      )}
    </>
  );
};

export default CategoryTableAdmin;
