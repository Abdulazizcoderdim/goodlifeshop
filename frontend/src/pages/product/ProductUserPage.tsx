import { Link, useParams } from "react-router-dom";
import CatalogNames from "../catalog/CatalogNames";



const ProductUserPage = () => {
  const { category, subcategory, productSlug } = useParams();

  return (
    <div className="custom-container">
    {/* catloglar */}
    <CatalogNames/>
     {/* contents */}
     <div className="pt-10 pb-5 max-md:hidden">
         {/* path url */}
         <div className="flex items-center gap-3">
             <Link to={'/'}>
             Главная
             </Link>
           /
           <Link to={'/catalog'}>
           Каталог
             </Link>/
             <Link to={`/catalog/${category}`}>
                {category}
             </Link>
             /
             <Link to={`/catalog/${category}/${subcategory}`}>{subcategory}</Link>
             /
             <p>{productSlug}</p>
         </div>
     </div>
</div>
  )
}

export default ProductUserPage