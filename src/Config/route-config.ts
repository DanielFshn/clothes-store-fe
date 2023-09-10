import IndexCategories from "../Components/Categories/IndexCategories";
import IndexPage from "../Components/Home/IndexPage";
import SignInSide from "../Components/Login/SingInSide";
import EditProduct from "../Components/Products.tsx/EditProduct";
import IndexProducts from "../Components/Products.tsx/IndexProducts";
import RedirectToHomePage from "../Uitls/RedirectToHomePage";
import CreateCategory from "../Components/Categories/CreateCategory";
import EditCategory from "../Components/Categories/EditCategory";
import CreateSize from "../Components/Sizes/CreateSize";
import EditSize from "../Components/Sizes/EditSize";

const routes = [
  //products
  { path: "/products", component: IndexProducts, exact: true },
  { path: "/product/edit/:id", component: EditProduct },

  //categories
  { path: "/categories", component: IndexCategories, exact: true },
  { path: "/category/edit/:id", component: EditCategory },
  { path: "/category/create", component: CreateCategory },

  //sizes
  { path: "/size/create", component: CreateSize },
  { path: "/size/edit/:id", component: EditSize },

  //login
  { path: "/login", component: SignInSide },

  //index
  { path: "/", component: IndexPage, exact: true },
  { path: "*", component: RedirectToHomePage },
];
export default routes;
