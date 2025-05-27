import { Link } from "react-router-dom"

interface Props{
    category:{
        imagLink: string
        title: string
    }
}

const CategoryItem = ({category}: Props) => {
  return (
             <Link
            to={`/catalog/${category.title.toLowerCase()}`}
            className="flex flex-col gap-3 items-center group transition-transform group"
          >
            <div className="rounded-md p-4 mb-3 w-full flex items-center justify-center h-[160px]">
              <div className="relative flex justify-center w-full h-full group-hover:scale-105 transition-all duration-200">
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
  )
}

export default CategoryItem