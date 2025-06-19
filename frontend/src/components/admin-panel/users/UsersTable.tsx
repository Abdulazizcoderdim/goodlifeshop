import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import MyPagination from "../pagination/MyPagination";
import type { IUser } from "@/types";
import api from "@/http/axios";
import { toast } from "sonner";
import EditUserForm from "./EditUserForm";
import SearchBar from "@/components/SearchBar";

interface Props {
  handlePageChange: (page: number) => void;
  pagination: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  users: IUser[];
  setPagination: (pagination: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  }) => void;
}

const UsersTable = ({
  handlePageChange,
  pagination,
  users,
  setPagination,
}: Props) => {
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const fetchUsers = async (term: string) => {
    try {
      const res = await api.get(`/users?search=${term}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setFilteredUsers(res.data.content);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить этого пользователя? Это действие не может быть отменено."
    );
    if (!confirmDelete) return;
    // TODO
    try {
      const res = api.delete(`/users/${id}`, {
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
        handlePageChange(pagination.number);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (user: IUser) => {
    setUserToEdit({ ...user });
    setIsEditModalOpen(true);
  };

  const handleSuccess = (updateUser: IUser) => {
    setFilteredUsers(
      filteredUsers.map((user) =>
        user.id === updateUser.id ? { ...user, ...updateUser } : user
      )
    );
  };

  return (
    <>
      <motion.div
        className="bg-gray-800 mb-5 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Пользователи</h2>
          <SearchBar onSearch={fetchUsers} placeholder="Поиск пользователей" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {user?.email.charAt(0) || "?"}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-100">
                          {user.firstName ?? user.email.split("@")[0]}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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
        onPageChange={handlePageChange}
      />

      {isEditModalOpen && userToEdit && (
        <EditUserForm
          setIsEditModalOpen={setIsEditModalOpen}
          defaultValues={userToEdit}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};
export default UsersTable;
