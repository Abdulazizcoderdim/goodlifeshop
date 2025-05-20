import { Link } from "react-router-dom";

const CategoryData = [
  {
    imagLink: "/noji.webp",
    title: "НОЖИ",
  },
  {
    imagLink: "/posuda.webp",
    title: "ПОСУДА",
  },
  {
    imagLink: "/akses.webp",
    title: "АКСЕССУАРЫ",
  },
  {
    imagLink: "/mir.webp",
    title: "МИР КРАСОТЫ",
  },
  {
    imagLink: "/xran.webp",
    title: "ХРАНЕНИЕ",
  },
  {
    imagLink: "/tex.webp",
    title: "ТЕХНИКА",
  },
];

const CategoryData2 = [
  {
    image: "/z1.webp",
    name: "ZWILLING Sorrento",
    buttonText: "ПОДРОБНЕЕ",
  },
  {
    image: "/a2.webp",
    name: "КЕРАМИЧЕСКИЕ ФОРМЫ STAUB",
    buttonText: "ПОДРОБНЕЕ",
  },
  {
    image: "/z3.webp",
    name: "ZWILLING PROFESSIONAL S",
    buttonText: "ПОДРОБНЕЕ",
  },
];

const Category = () => {
  return (
    <section className="py-12 custom-container">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        {CategoryData2.map((product, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
          >
            {/* Image container with overlay */}
            <div className="relative h-[400px] w-full rounded-lg">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover rounded-lg group-hover:scale-105 transition-all duration-300"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/35 h-32 self-end"></div>
            </div>

            {/* Content positioned at bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8">
              <h3 className="text-white text-xl font-medium mb-4">
                {product.name}
              </h3>
              <button className="bg-white text-black px-8 py-2 text-sm font-bold rounded-md hover:bg-gray-100 transition-colors">
                {product.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
