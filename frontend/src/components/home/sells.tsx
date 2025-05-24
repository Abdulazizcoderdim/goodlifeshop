import type { IProduct } from "@/types";
import ProductItem from "../product-item/product-item";
import ProductItemLoading from "../loading/ProductItemLoading";

const Sells = ({
  products,
  loading,
}: {
  products: IProduct[];
  loading: boolean;
}) => {
  const filterProducts = () => {
    const filter: IProduct[] = products
      .filter((product) => product.category === "electronics")
      .slice(0, 3);
    return filter;
  };

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
          {loading ? (
            <ProductItemLoading />
          ) : (
            filterProducts().map((item, i) => (
              <div key={i}>
                <ProductItem product={item} />
              </div>
            ))
          )}
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
