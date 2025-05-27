import { Link, useLocation } from "react-router-dom"

const fakeCatalogName = [{name: "Ножи", path: '/catalog/nozhi'},{name: "Посуда", path: '/catalog/posuda'},{name: "Аксессуары", path: '/catalog/aksessuary'},{name: "Мир красоты", path: '/catalog/mir_krasoty'},{name: "Техника", path: '/catalog/texnika'},{name: "Хранение", path: '/catalog/fresh-and-save'}]

const CatalogNames = () => {
  const {pathname} = useLocation()
  console.log(pathname)
  return (
    <div className="flex max-md:hidden items-center py-5 gap-5 border-b">
            {fakeCatalogName.map((item, i) => (
                <Link to={item.path} key={i} className={`font-medium cursor-pointer text-sm text-gray-400 ${item.path === pathname && "text-black"} hover:text-black`}>
                    {item.name}
                </Link>
            ))}
        </div>
  )
}

export default CatalogNames