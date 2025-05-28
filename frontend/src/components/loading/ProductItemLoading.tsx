import { Skeleton } from "@/components/ui/skeleton";

export default function ProductItemLoading() {
  return (
    <div className="group shadow-lg flex flex-col h-full rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="relative">
        <div className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm">
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="absolute top-2 left-2 z-10">
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="relative h-64 w-full flex items-center justify-center p-4 bg-white">
          <Skeleton className="h-56 w-full rounded-md" />
        </div>
      </div>

      <div className="flex-grow p-4 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="flex items-center justify-between p-4 pt-0">
        <Skeleton className="h-6 w-20" />
        <div className="relative w-10 h-10">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
