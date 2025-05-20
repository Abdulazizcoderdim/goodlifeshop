import Bestseller from "./bestseller";
import Brend from "./brend";
import Category from "./category";
import NewProducts from "./new-products";
import Sells from "./sells";
import Slider from "./slider";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Slider />
      <Category />
      <NewProducts />
      <Brend />
      <Sells />
      <Bestseller />
    </div>
  );
};

export default HomePage;
