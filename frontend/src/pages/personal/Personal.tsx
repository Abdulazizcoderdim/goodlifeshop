import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { personalData } from "@/constants";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const data = [
  {
    title: "Текущие заказы",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="49"
        height="51"
        viewBox="0 0 49 51"
        fill="none"
      >
        <path
          d="M20.5 49L1 36.5V16M20.5 49L48 36.5V15M20.5 49V28.5M48 15L20.5 28.5M48 15H35L22 5.61111M48 15L30.5 3L17 2L22 5.61111M20.5 28.5L1 16M20.5 28.5L26.5 17L15 9.22973M1 16L8 4.5L15 9.22973M15 9.22973L22 5.61111"
          stroke="#27221D"
          stroke-width="2"
        ></path>
      </svg>
    ),
    path: "/personal/orders",
  },
  {
    title: "Личные данные",
    icon: (
      <svg
        width="33"
        height="39"
        viewBox="0 0 33 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="16.2539"
          cy="11.5"
          r="10.5"
          stroke="black"
          stroke-width="2"
        ></circle>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30.3284 39C27.8705 33.6864 22.4923 30 16.2531 30C10.0139 30 4.63564 33.6864 2.17773 39H0C2.58043 32.5535 8.88499 28 16.2531 28C23.6212 28 29.9258 32.5535 32.5062 39H30.3284Z"
          fill="black"
        ></path>
      </svg>
    ),
    path: "/personal/private",
  },
  {
    title: "История заказов",
    icon: (
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.5 43C33.8218 43 43 33.8218 43 22.5C43 11.1782 33.8218 2 22.5 2C18.3739 2 14.5326 3.21897 11.3164 5.31643L15 9H6V0L9.8739 3.8739C13.474 1.42877 17.8201 0 22.5 0C34.9264 0 45 10.0736 45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 22.3329 0.00182154 22.1662 0.00544583 22H2.00598C2.002 22.1662 2 22.3329 2 22.5C2 33.8218 11.1782 43 22.5 43Z"
          fill="black"
        ></path>
      </svg>
    ),
    path: "/personal/orders/history",
  },
  {
    title: "Корзина",
    icon: (
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="19" y="5" width="26" height="2" fill="#27221D"></rect>
        <circle
          cx="6.5"
          cy="6.5"
          r="5.5"
          stroke="black"
          stroke-width="2"
        ></circle>
        <rect x="19" y="21" width="26" height="2" fill="#27221D"></rect>
        <circle
          cx="6.5"
          cy="22.5"
          r="5.5"
          stroke="black"
          stroke-width="2"
        ></circle>
        <rect x="19" y="37" width="26" height="2" fill="#27221D"></rect>
        <circle
          cx="6.5"
          cy="38.5"
          r="5.5"
          stroke="black"
          stroke-width="2"
        ></circle>
      </svg>
    ),
    path: "/personal/cart",
  },
  {
    title: "Подписки",
    icon: (
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="19" y="5" width="26" height="2" fill="#27221D"></rect>
        <circle
          cx="6.5"
          cy="6.5"
          r="5.5"
          stroke="black"
          stroke-width="2"
        ></circle>
        <rect x="19" y="21" width="26" height="2" fill="#27221D"></rect>
        <circle
          cx="6.5"
          cy="22.5"
          r="5.5"
          stroke="black"
          stroke-width="2"
        ></circle>
        <rect x="19" y="37" width="26" height="2" fill="#27221D"></rect>
        <circle
          cx="6.5"
          cy="38.5"
          r="5.5"
          stroke="black"
          stroke-width="2"
        ></circle>
      </svg>
    ),
    path: "/personal/subscribe",
  },
  // {
  //   title: "Наши магазины",
  //   icon: (
  //     <svg
  //       width="46"
  //       height="41"
  //       viewBox="0 0 46 41"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         fill-rule="evenodd"
  //         clip-rule="evenodd"
  //         d="M6.71094 2.5H0V0.5H7.5H8.28906L8.47258 1.26743L10.5608 10H44.5H45.7602L45.4738 11.2272L41.9738 26.2272L41.7935 27H41H13H12.1923L12.0224 26.2104L8.79652 11.2215L6.71094 2.5ZM11.0099 12L13.8077 25H40.2065L43.2398 12H11.0099ZM35.5 39C37.433 39 39 37.433 39 35.5C39 33.567 37.433 32 35.5 32C33.567 32 32 33.567 32 35.5C32 37.433 33.567 39 35.5 39ZM35.5 41C38.5376 41 41 38.5376 41 35.5C41 32.4624 38.5376 30 35.5 30C32.4624 30 30 32.4624 30 35.5C30 38.5376 32.4624 41 35.5 41ZM21 35.5C21 37.433 19.433 39 17.5 39C15.567 39 14 37.433 14 35.5C14 33.567 15.567 32 17.5 32C19.433 32 21 33.567 21 35.5ZM23 35.5C23 38.5376 20.5376 41 17.5 41C14.4624 41 12 38.5376 12 35.5C12 32.4624 14.4624 30 17.5 30C20.5376 30 23 32.4624 23 35.5Z"
  //         fill="#27221D"
  //       ></path>
  //     </svg>
  //   ),
  // },
];

const Personal = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-gray h-full">
      <div className="sm:py-10 py-5 custom-container">
        <div className="flex max-md:flex-col gap-5">
          {/* md-show */}
          <div className="md:hidden block">
            <Select>
              <SelectTrigger className="w-full bg-white rounded-none">
                <SelectValue placeholder="Мой кабинет" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-none">
                <div className="flex flex-col">
                  {personalData.map((item, i) => {
                    return (
                      <Link
                        key={i}
                        className="text-gray-500 px-2 py-2 hover:bg-gray-100 uppercase text-sm"
                        to={item.path}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/3 max-md:hidden flex flex-col gap-5">
            <Link className="font-bold uppercase text-sm" to={"/personal"}>
              Мой кабинет
            </Link>
            <div className="mt-3 flex flex-col gap-5">
              {personalData.map((item, i) => {
                return (
                  <Link
                    className={`uppercase text-sm ${
                      pathname === item.path
                        ? "font-bold text-black"
                        : "text-gray-500"
                    }`}
                    key={i}
                    to={item.path}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>

          {pathname === "/personal" && (
            <div className="flex flex-col w-full">
              {data.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => navigate(item.path)}
                    className="bg-white px-14 cursor-pointer hover:bg-gray-100 transition py-8 border-b border-b-[#efecea]"
                  >
                    <div className="flex items-center md:gap-10 gap-5">
                      <span>{item.icon}</span>
                      <span className="uppercase font-bold">{item.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Personal;
