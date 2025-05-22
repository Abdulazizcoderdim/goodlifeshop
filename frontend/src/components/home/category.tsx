import { CategoryData } from "@/constants";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <section className="sm:py-12 py-6 custom-container">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {CategoryData.map((category, index) => (
          <Link
            to={`/category/${category.title.toLowerCase()}`}
            key={index}
            className="flex flex-col gap-3 items-center group transition-transform group"
          >
            <div className="bg-white rounded-md p-4 mb-3 w-full flex items-center justify-center h-[160px]">
              <div className="relative w-full h-full group-hover:scale-105 transition-all duration-200">
                <img
                  src={category.imagLink || "/placeholder.svg"}
                  alt={category.title}
                  className="object-cover max-w-40 w-full"
                />
              </div>
            </div>
            <h3 className="text-center font-bold text-sm md:text-base mt-2">
              {category.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
