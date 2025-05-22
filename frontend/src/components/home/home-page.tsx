import Bestseller from "./bestseller";
import Brend from "./brend";
import Category from "./category";
import CategoryProduct from "./category-product";
import NewProducts from "./new-products";
import Sells from "./sells";
import Slider from "./slider";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Slider />
      <Category />
      <CategoryProduct />
      <NewProducts />
      <Brend />
      <Sells />
      <Bestseller />
    </div>
  );
};

export default HomePage;
