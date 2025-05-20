import ProductItem from "../product-item/product-item";

const dataProduct = [
  {
    id: 1,
    name: "ZWILLING",
    description: "МАНИКЮРНЫЙ НАБОР 3 ПР. ЧЕРНЫЙ ZWILLING BEAUTY PREMIUM",
    price: 19140.0,
    image: "/p1.webp",
    isNew: true,
    isFavorite: false,
  },
  {
    id: 2,
    name: "ZWILLING",
    description: "МАНИКЮРНЫЙ НАБОР 5 ПР. ЧЕРНЫЙ ZWILLING BEAUTY PREMIU",
    price: 34740.0,
    image: "/p2.webp",
    isNew: true,
    isFavorite: false,
  },
  {
    id: 3,
    name: "ZWILLING",
    description: "МАНИКЮРНЫЙ НАБОР 12 ПР. ЧЕРНЫЙ ZWILLING BEAUTY PREMIUM",
    price: 85740.0,
    image: "/p3.webp",
    isNew: true,
    isFavorite: false,
  },
];

const Sells = () => {
  return (
    <div className="py-16 custom-container">
      <div className="flex flex-col gap-3 md:px-10  justify-center text-center w-full">
        <h1 className="text-3xl font-medium text-black uppercase">
          топ продаж
        </h1>
        <p className="text-sm text-black font-medium">
          Благодаря своему неподвластному времени минималистичному дизайну,
          техника ZWILLING прекрасно сочетается с остальным кухонным
          оборудованием и впечатляет своей надежностью, удобством в
          использовании и продуманностью деталей.
        </p>
      </div>
      <div className="flex mt-5 max-lg:flex-col gap-5 justify-between w-full">
        <div className="lg:w-1/2 flex max-md:flex-col gap-3">
          {dataProduct.map((item, i) => (
            <div key={i}>
              <ProductItem product={item} />
            </div>
          ))}
        </div>
        <div className="relative lg:w-1/2 w-full h-full">
          <img
            src="/bg.webp"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <button className="absolute cursor-pointer hover:bg-black/80 transition bottom-5 left-1/2 -translate-x-1/2 bg-black px-5 py-3 text-white rounded-md uppercase font-bold">
            перейти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sells;
