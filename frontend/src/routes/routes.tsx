import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import HomePage from "../components/home/home-page";
import NotFound from "../components/NotFound";
import CartPage from "@/components/cart/cart-page";
// import Terms from "@/pages/help/Terms";
// import Agreement from "@/pages/help/Agreement";
// import Politika from "@/pages/help/Politika";
// import PersonalAgree from "@/pages/help/PersonalAgree";
// import Policies from "@/pages/help/Policies";
// import Returns from "@/pages/help/Returns";
// import Delivery from "@/pages/help/Delivery";
import Kontakty from "@/pages/help/Kontakty";
// import ContactForm from "@/pages/help/ContactForm";
// import Sout from "@/pages/help/Sout";
import HereToHelp from "@/pages/help/HereToHelp";
import Personal from "@/pages/personal/Personal";
import Orders from "@/pages/personal/Orders";
import Private from "@/pages/personal/Private";
import HistoryOrder from "@/pages/personal/HistoryOrder";
import Subscribe from "@/pages/personal/Subscribe";
import Store from "@/pages/store/store";
import LayoutAdmin from "@/layout/layout-admin";
import ProductsPage from "@/pages/admin-panel/ProductsPage";
import UsersPage from "@/pages/admin-panel/UsersPage";
import SalesPage from "@/pages/admin-panel/SalesPage";
import OrdersPage from "@/pages/admin-panel/OrdersPage";
import AnalyticsPage from "@/pages/admin-panel/AnalyticsPage";
import OverviewPage from "@/pages/admin-panel/OverviewPage";
import ProductUserPage from "@/pages/product/ProductUserPage";
import CatalogUserPage from "@/pages/catalog/CatalogUserPage";
import CatalogStatikUserPage from "@/pages/statikcatalog/CatalogStatikUserPage";
import SubcategoryUserPage from "@/pages/subcategory/SubcategoryUserPage";
import EditProductForm from "@/components/admin-panel/edit-product/EditProductForm";
import NewProductAdd from "@/components/admin-panel/add-product/NewProductAdd";
import CategoryAdmin from "@/pages/categoryadmin/CategoryAdmin";
import SubcategoryPageAdmin from "@/pages/admin-panel/subcategory/SubcategoryPageAdmin";
import { SearchPage } from "@/components/admin-panel/search/SearchPage";
import BrandZwilling from "@/pages/brands/BrandZwilling";
import BrandStaub from "@/pages/brands/BrandStaub";
import BrandBallarini from "@/pages/brands/BrandBallarini";
import OrderMake from "@/pages/order/OrderMake";
import BrandHistory from "@/pages/brands/BrandHistory";
import UseCare from "@/pages/brands/use-care";
import VdokhnovlyayushchieRetsept from "@/pages/brands/vdokhnovlyayushchie-retsept";
import CulinarWorld from "@/pages/brands/CulinarWorld";
import Returns from "@/pages/help/Returns";
import BrandZwillingCategory from "@/pages/zwilling/BrandZwillingCategory";
import BrandZwillingSubCategory from "@/pages/zwilling/BrandZwillingSubCategory";
import BrandStaubCategory from "@/pages/staub/BrandStaubCategory";
import BrandStaubSubCategory from "@/pages/staub/BrandStaubSubCategory";
import BrandBallariniCategory from "@/pages/ballarini/BrandBallariniCategory";
import BrandBallariniSubCategory from "@/pages/ballarini/BrandBallariniSubCategory";
import PostsPage from "@/pages/posts/PostsPage";
import PostSlug from "@/pages/brands/slugs/PostSlug";
import NewPostForm from "@/pages/posts/NewPostForm";

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
        path: "search",
        element: <SearchPage />,
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
        path: "/personal/order/make",
        element: <OrderMake />,
      },
      {
        path: "/culinary-world/o-kompanii",
        element: <BrandHistory />,
      },
      {
        path: "/culinary-world/o-kompanii/:slug",
        element: <PostSlug />,
      },
      {
        path: "culinary-world",
        element: <CulinarWorld />,
      },
      {
        path: "/culinary-world/use-care",
        element: <UseCare />,
      },
      {
        path: "/culinary-world/use-care/:slug",
        element: <PostSlug />,
      },
      {
        path: "/culinary-world/vdokhnovlyayushchie-retsepty",
        element: <VdokhnovlyayushchieRetsept />,
      },
      {
        path: "/culinary-world/vdokhnovlyayushchie-retsepty/:slug",
        element: <PostSlug />,
      },
      {
        path: "here_to_help",
        element: <HereToHelp />,
        children: [
          {
            path: "terms-and-conditions",
            element: <Kontakty />,
          },
          {
            path: "user-agreement",
            element: <Kontakty />,
          },
          {
            path: "politika",
            element: <Kontakty />,
          },
          {
            path: "personal-agree",
            element: <Kontakty />,
          },
          {
            path: "policies",
            element: <Kontakty />,
          },
          {
            path: "returns",
            element: <Returns />,
          },
          {
            path: "delivery",
            element: <Kontakty />,
          },
          {
            path: "kontakty",
            element: <Kontakty />,
          },
          {
            path: "contact-form",
            element: <Kontakty />,
          },
          {
            path: "sout",
            element: <Kontakty />,
          },
        ],
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "catalog/:category/:subcategory/:productSlug",
        element: <ProductUserPage />,
      },
      {
        path: "catalog/:category/:subcategory",
        element: <SubcategoryUserPage />,
      },
      {
        path: "catalog/:category",
        element: <CatalogUserPage />,
      },
      {
        path: "catalog",
        element: <CatalogStatikUserPage />,
      },
      {
        path: "catalog/zwilling/:category/:subcategory",
        element: <BrandZwillingSubCategory />,
      },
      {
        path: "catalog/zwilling/:category",
        element: <BrandZwillingCategory />,
      },
      {
        path: "catalog/zwilling",
        element: <BrandZwilling />,
      },
      {
        path: "catalog/staub/:category/:subcategory",
        element: <BrandStaubSubCategory />,
      },
      {
        path: "catalog/staub/:category",
        element: <BrandStaubCategory />,
      },
      {
        path: "catalog/staub",
        element: <BrandStaub />,
      },
      {
        path: "catalog/ballarini/:category/:subcategory",
        element: <BrandBallariniSubCategory />,
      },
      {
        path: "catalog/ballarini/:category",
        element: <BrandBallariniCategory />,
      },
      {
        path: "catalog/ballarini",
        element: <BrandBallarini />,
      },
    ],
  },
  {
    path: "/admin-panel",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "sales",
        element: <SalesPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "products/edit/:id",
        element: <EditProductForm />,
      },
      {
        path: "products/new",
        element: <NewProductAdd />,
      },
      {
        path: "category",
        element: <CategoryAdmin />,
      },
      {
        path: "subcategory",
        element: <SubcategoryPageAdmin />,
      },
      {
        path: "posts",
        element: <PostsPage />,
      },
      {
        path: "posts/new",
        element: <NewPostForm />,
      },
    ],
  },
]);
