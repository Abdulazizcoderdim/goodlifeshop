import api from "@/http/axios";
import type { IPosts } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import PostSkeleton from "@/pages/posts/PostSkeleton";
import ErrorState from "@/pages/posts/ErrorState";
import PostContent from "@/pages/posts/PostContent";

const PostSlug = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IPosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchSlugPost();
    }
  }, [slug]);

  // Update document title when post loads
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Brand History`;
    }
    return () => {
      document.title = "Brand History";
    };
  }, [post]);

  const fetchSlugPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/posts/slug/${slug}`);

      if (!res.data) {
        throw new Error("Post not found");
      }

      setPost(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Пост не найден");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      brand_history: "История бренда",
      usage_and_care: "Использование и уход",
      recipes: "Вдохновляющие рецепты",
    };
    return categoryMap[category] || category;
  };

  const handleRetry = () => {
    fetchSlugPost();
  };

  if (loading) {
    return <PostSkeleton />;
  }

  if (error || !post) {
    return (
      <ErrorState
        title={
          error === "Пост не найден" ? "Пост не найден" : "Ошибка загрузки"
        }
        message={error || "Не удалось загрузить пост"}
        showBackButton={true}
        showHomeButton={true}
      />
    );
  }

  return (
    <div className="custom-container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        {/* <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            to="/brand-history"
            className="hover:text-gray-900 transition-colors"
          >
            История бренда
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate">
            {post.title}
          </span>
        </nav> */}

        {/* Back Button */}
        {/* <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Button>
        </div> */}

        {/* Main Content */}
        <Card className="overflow-hidden">
          <CardHeader className="space-y-4">
            {/* Category Badge */}
            <Badge variant="secondary" className="w-fit">
              {getCategoryLabel(post.category)}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            {/* Date */}
            {post.createdAt && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6 shadow-xs">
            {/* Featured Image */}
            {post.imageUrl && (
              <div className="relative">
                <img
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Post Content */}
            <PostContent content={post.content} />
          </CardContent>
        </Card>

        {/* Retry Button for Errors */}
        {error && (
          <div className="mt-6 text-center">
            <Button onClick={handleRetry} variant="outline">
              Попробовать еще раз
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSlug;
