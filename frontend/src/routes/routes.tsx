import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import HomePage from "../components/home/home-page";
import NotFound from "../components/NotFound";
import CartPage from "@/components/cart/cart-page";
import HereToHelp from "@/pages/HereToHelp";
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
    ],
  },
]);
