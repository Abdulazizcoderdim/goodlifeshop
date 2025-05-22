import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import HomePage from "../components/home/home-page";
import NotFound from "../components/NotFound";
import CartPage from "@/components/cart/cart-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/personal/cart",
        element: <CartPage />,
      },
    ],
  },
]);
