import Header from "@/components/admin-panel/common/Header";
import PostsPageTabel from "./PostsPageTabel";
import { useEffect, useState } from "react";
import type { IPosts } from "@/types";
import api from "@/http/axios";

const PostsPage = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchPosts(pagination.number);
  }, []);

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/posts?page=${page}&size=${pagination.size}`);
      setPosts(res.data.content);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchPosts(page);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Посты" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        {/* <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Всего подкатегория"
            icon={Zap}
            value={21}
            color="#6366F1"
          />
          <StatCard
            name="Новые подкатегория"
            icon={Users}
            value={12}
            color="#8B5CF6"
          />
        </motion.div> */}

        <PostsPageTabel
          posts={posts}
          pagination={pagination}
          loading={loading}
          setPagination={setPagination}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default PostsPage;
