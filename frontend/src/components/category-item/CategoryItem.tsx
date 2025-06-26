import type { Subcategory } from "@/types";
import { Link } from "react-router-dom";

interface Props {
  category: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    subcategories: Subcategory[];
    _count: {
      products: number;
      subcategories: number;
    };
  };
  brand?: string | null;
}

const CategoryItem = ({ category, brand = null }: Props) => {
  return (
    <Link
      to={`/catalog/${brand ? brand + "/" : ""}${category.slug}`}
      className="flex flex-col gap-3 items-center group transition-transform group"
    >
      <div className="rounded-md p-4 mb-3 w-full flex items-center justify-center h-[160px]">
        <div className="relative flex justify-center w-full h-full group-hover:scale-105 transition-all duration-200">
          <img
            loading="lazy"
            src={category.imageUrl || "/placeholder.svg"}
            alt={category.name}
            className="object-cover max-w-40 w-full"
          />
        </div>
      </div>
      <h3 className="text-center font-bold text-sm md:text-base mt-2">
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryItem;
