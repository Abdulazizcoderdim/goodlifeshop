import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/fetcher";
import type { Category } from "@/types";
import { Link, useLocation } from "react-router-dom";
import useSWR from "swr";

const CatalogNames = () => {
  const { pathname } = useLocation();

  const { data, isLoading, error } = useSWR("/categories", fetcher);
  console.log(error);

  return (
    <div className="flex max-md:hidden items-center py-5 gap-5 border-b">
      {isLoading ? (
        <Skeleton className="h-4 w-1/2" />
      ) : (
        data?.content?.map((item: Category, i: number) => (
          <Link
            to={`/catalog/${item.slug}`}
            key={i}
            className={`font-medium cursor-pointer text-sm text-gray-400 ${
              item.slug === pathname && "text-black"
            } hover:text-black`}
          >
            {item.name}
          </Link>
        ))
      )}
    </div>
  );
};

export default CatalogNames;
