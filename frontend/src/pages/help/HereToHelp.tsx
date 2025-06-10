import { helpPages } from "@/constants";
import { Link, Outlet, useLocation } from "react-router-dom";

const HereToHelp = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-gray-custom">
      <div className="custom-container sm:py-16 py-8">
        <h1 className="text-3xl font-bold uppercase pb-5">Помощь</h1>
        <div className="flex max-md:flex-col sm:gap-10 gap-5">
          {/* sidebar */}
          <div className="md:w-1/3">
            <div className="flex flex-col gap-3">
              {helpPages.map((item, i) => {
                return (
                  <Link
                    to={item.path}
                    key={i}
                    className={`text-sm uppercase ${
                      pathname === item.path ? "font-bold" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HereToHelp;
