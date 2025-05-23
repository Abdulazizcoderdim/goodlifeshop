import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import HomePage from "../components/home/home-page";
import NotFound from "../components/NotFound";
import CartPage from "@/components/cart/cart-page";
import Terms from "@/pages/help/Terms";
import Agreement from "@/pages/help/Agreement";
import Politika from "@/pages/help/Politika";
import PersonalAgree from "@/pages/help/PersonalAgree";
import Policies from "@/pages/help/Policies";
import Returns from "@/pages/help/Returns";
import Delivery from "@/pages/help/Delivery";
import Kontakty from "@/pages/help/Kontakty";
import ContactForm from "@/pages/help/ContactForm";
import Sout from "@/pages/help/Sout";
import HereToHelp from "@/pages/help/HereToHelp";
import Personal from "@/pages/personal/Personal";
import Orders from "@/pages/personal/Orders";
import Private from "@/pages/personal/Private";
import HistoryOrder from "@/pages/personal/HistoryOrder";
import Subscribe from "@/pages/personal/Subscribe";
import Store from "@/pages/store/store";

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
        path: "personal/cart",
        element: <CartPage />,
      },
      {
        path: "/personal",
        element: <Personal />,
        children: [
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "private",
            element: <Private />,
          },
          {
            path: "orders/history",
            element: <HistoryOrder />,
          },
          {
            path: "subscribe",
            element: <Subscribe />,
          },
        ],
      },
      {
        path: "here_to_help",
        element: <HereToHelp />,
        children: [
          {
            path: "terms-and-conditions",
            element: <Terms />,
          },
          {
            path: "user-agreement",
            element: <Agreement />,
          },
          {
            path: "politika",
            element: <Politika />,
          },
          {
            path: "personal-agree",
            element: <PersonalAgree />,
          },
          {
            path: "policies",
            element: <Policies />,
          },
          {
            path: "returns",
            element: <Returns />,
          },
          {
            path: "delivery",
            element: <Delivery />,
          },
          {
            path: "kontakty",
            element: <Kontakty />,
          },
          {
            path: "contact-form",
            element: <ContactForm />,
          },
          {
            path: "sout",
            element: <Sout />,
          },
        ],
      },
      {
        path: "store",
        element: <Store />,
      },
    ],
  },
]);
