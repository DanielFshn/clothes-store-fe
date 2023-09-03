import CreateCategory from "../Components/Categories/CreateCategory";
import IndexCategories from "../Components/Categories/IndexCategories";
import SignInSide from "../Components/Login/SingInSide";
import IndexProducts from "../Components/Products.tsx/IndexProducts";

const routes = [
  { path: "/products", component: IndexProducts, exact: true },
  { path: "/login", component: SignInSide },
  { path: "/categories", component: IndexCategories },
  { path: "/category/create", component: CreateCategory },
];
export default routes;
