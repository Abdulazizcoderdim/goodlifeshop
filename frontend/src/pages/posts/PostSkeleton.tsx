import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PostSkeleton = () => {
  return (
    <div className="custom-container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Card>
          <CardHeader className="space-y-4">
            {/* Category badge skeleton */}
            <Skeleton className="h-6 w-32" />

            {/* Title skeleton */}
            <Skeleton className="h-8 w-3/4" />

            {/* Date skeleton */}
            <Skeleton className="h-4 w-48" />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Image skeleton */}
            <Skeleton className="h-64 w-full rounded-lg" />

            {/* Content skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostSkeleton;
