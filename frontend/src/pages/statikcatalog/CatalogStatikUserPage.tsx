import { Link } from "react-router-dom"
import CatalogNames from "../catalog/CatalogNames"
import Brend from "@/components/home/brend"

const CatalogStatikUserPage = () => {

  return (
    <div className="custom-container pb-10">
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
                <p>
                Каталог
                </p>
            </div>
        </div>
            {/* banner */}
        <div className="max-md:pt-5">
          <img src="/catalog.webp" className="w-full mb-10" alt="" />
          <div className="space-y-3 text-center w-full">
            <h1 className="text-2xl font-bold uppercase">Каталог товаров ZWILLING
            </h1>
          <p className="text-sm">Кулинарный мир группы ZWILLING –   это не только кухонные принадлежности превосходного качества, но и ведущие бренды из всех уголков мира: ZWILLING (Германия), STAUB (Франция), MIYABI (Япония), BALLARINI (Италия), каждый из которых по-своему замечателен и славится собственными традициями, при этом всех их объединяет одно: неутолимая страсть к совершенству.
          </p>
          <Brend />
      
          </div>
        </div>
</div>
  )
}

export default CatalogStatikUserPage