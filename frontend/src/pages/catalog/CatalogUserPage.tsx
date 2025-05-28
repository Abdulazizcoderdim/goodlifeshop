import { Link, useParams } from "react-router-dom";
import CatalogNames from "./CatalogNames";

const CatalogUserPage = () => {
  const { category } = useParams();

  return (
    <div className="custom-container">
      {/* catloglar */}
      <CatalogNames />
      {/* contents */}
      <div className="pt-10 pb-5 max-md:hidden">
        {/* path url */}
        <div className="flex items-center gap-3">
          <Link to={"/"}>Главная</Link>/<Link to={"/catalog"}>Каталог</Link>/
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
};

export default CatalogUserPage;
