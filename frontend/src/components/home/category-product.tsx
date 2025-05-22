import { CategoryData2 } from "@/constants";

const CategoryProduct = () => {
  return (
    <section className="sm:pb-12 pb-6 custom-container">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-20">
        {CategoryData2.map((product, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
          >
            {/* Image container with overlay */}
            <div className="relative rounded-lg">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full rounded-lg group-hover:scale-105 transition-all duration-300"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/35 h-32 self-end"></div>
            </div>

            {/* Content positioned at bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8">
              <h3 className="text-white lg:text-xl md:text-lg sm:text-base text-sm font-medium mb-4">
                {product.name}
              </h3>
              <button className="bg-white text-black sm:px-8 px-4 py-2 sm:text-sm text-sm font-bold rounded-md hover:bg-gray-100 transition-colors">
                {product.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProduct;
