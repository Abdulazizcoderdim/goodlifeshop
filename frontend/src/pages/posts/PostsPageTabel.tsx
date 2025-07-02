import MyPagination from "@/components/admin-panel/pagination/MyPagination";
import SearchBar from "@/components/SearchBar";
import api from "@/http/axios";
import type { IPosts } from "@/types";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import EditPost from "./EditPost";

interface Props {
  setPagination: (pagination: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  }) => void;
  loading: boolean;
  pagination: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  posts: IPosts[];
  onPageChange: (page: number) => void;
}

const PostsPageTabel = ({
  setPagination,
  loading,
  pagination,
  posts,
  onPageChange,
}: Props) => {
  const [searchPosts, setSearchPosts] = useState<IPosts[]>(posts);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<IPosts | null>(null);

  useEffect(() => {
    setSearchPosts(posts);
  }, [posts]);

  const fetchPostsSearch = async (term: string) => {
    try {
      const res = await api.get(`/posts?search=${term}`);
      setSearchPosts(res.data.content);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Error fetching subCategorys", err);
    }
  };

  const handleEdit = (post: IPosts) => {
    setPostToEdit(post);
    setIsEditModalOpen(true);
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      brand_history: "История бренда",
      usage_and_care: "Использование и уход",
      recipes: "Вдохновляющие рецепты",
    };
    return categoryMap[category] || category;
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
          <h2 className="text-xl font-semibold text-gray-100">Список постов</h2>
          <SearchBar onSearch={fetchPostsSearch} placeholder="Поиск посты" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  #
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Заголовок
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Категория
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {searchPosts.map((post, i) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {i + 1 + (pagination.number - 1) * pagination.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <img
                      loading="lazy"
                      src={post.imageUrl || "https://via.placeholder.com/40"}
                      alt="Product"
                      className="size-10 rounded-full object-cover"
                    />
                    <div className="text-sm text-gray-300">{post.title}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryLabel(post.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    {/* <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button> */}
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

      {isEditModalOpen && postToEdit && (
        <EditPost
          setIsEditModalOpen={setIsEditModalOpen}
          defaultValues={postToEdit as IPosts}
          onSuccess={(page: string) => onPageChange(parseInt(page))}
        />
      )}

      {/* {isModalOpen && (
        <AddNewSubCategory
          setIsModalOpen={setIsModalOpen}
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          onCategoryAdded={(page: string) => onPageChange(parseInt(page))}
        />
      )} */}
    </>
  );
};

export default PostsPageTabel;
