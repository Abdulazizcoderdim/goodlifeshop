import type { IProduct } from "@/types";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import MyPagination from "../pagination/MyPagination";
import { useNavigate } from "react-router-dom";
import api from "@/http/axios";
import { toast } from "sonner";

interface PropsProductsTable {
  pagination: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  loading: boolean;
  products: IProduct[];
  handlePageChange: (page: number) => void;
}

const ProductsTable = ({
  pagination,
  loading,
  products,
  handlePageChange,
}: PropsProductsTable) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.category.name.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.category?.name.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const handleEditClick = (productId: string) => {
    navigate("/admin-panel/products/edit/" + productId);
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить этот продукт? Это действие не может быть отменено."
    );
    if (!confirmDelete) return;

    const toastId = toast.loading("Удаление товара...");

    try {
      const res = await api.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Товар успешно удален", {
          id: toastId,
        });
        handlePageChange(pagination.number);
      } else {
        toast.error("Ошибка при удалении", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при удалении товара", { id: toastId });
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
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">
            Список продуктов{" "}
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  In Stock
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product: IProduct) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    <img
                      loading="lazy"
                      src={
                        product.images?.[0] || "https://via.placeholder.com/40"
                      }
                      alt="Product"
                      className="size-10 rounded-full object-cover"
                    />
                    {product.title}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.category?.name || "—"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.price.toFixed(2)} ₽
                  </td>

                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.variants?.[0]?.inStock ? "Yes" : "No"}
                  </td> */}

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => handleEditClick(product.id)}
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <MyPagination
        currentPage={pagination.number}
        totalItems={pagination.totalElements}
        itemsPerPage={pagination.size}
        onPageChange={handlePageChange}
      />

      {/* {isEditModalOpen && productEdit && (
        <EditProductForm
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          defaultValues={productEdit}
          onSuccess={handleSuccessEdit}
        />
      )} */}
    </>
  );
};
export default ProductsTable;
