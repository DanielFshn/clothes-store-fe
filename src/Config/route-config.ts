import IndexCategories from "../Components/Categories/IndexCategories";
import IndexPage from "../Components/Home/IndexPage";
import EditProduct from "../Components/Products/EditProduct";
import IndexProducts from "../Components/Products/IndexProducts";
import RedirectToHomePage from "../Uitls/RedirectToHomePage";
import CreateCategory from "../Components/Categories/CreateCategory";
import EditCategory from "../Components/Categories/EditCategory";
import CreateSize from "../Components/Sizes/CreateSize";
import EditSize from "../Components/Sizes/EditSize";
import IndexGenders from "../Components/Genders/IndexGenders";
import EditGender from "../Components/Genders/EditGender";
import CreateGender from "../Components/Genders/CreateGender";
import IndexSizes from "../Components/Sizes/IndexSizes";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Page404 from "../Components/Errors/Page404";
import CreateProduct from "../Components/Products/CreateProduct";
import ProductDetails from "../Components/Products/ProductDetails";
import ResetPassowrd from "../Auth/ResetPassword/ResetPassword";
import ForgotPassowrd from "../Auth/EmailSender/ForgotPassword";
import ResetPasswordWithToken from "../Auth/ConfirmResetPassword/ResetPasswordWithToken";
import ListCart from "../Components/Cart/ListCart";
import Thankyou from "../Components/Payment/Thankyou";
import CheckoutCard from "../Components/Payment/CheckoutCard";
import PaymentForm from "../Components/Payment/PaymentForm";
const routes = [
  //products
  { path: "/products", component: IndexProducts },
  { path: "/product/edit/:id", component: EditProduct },
  { path: "/product/create", component: CreateProduct },
  { path: "/product/details", component: ProductDetails },
  { path: "/product/edit", component: EditProduct },

  //cart
  { path: "/cart", component: ListCart },

  //categories
  { path: "/categories", component: IndexCategories , isAdmin: true},
  { path: "/category/edit/:id", component: EditCategory },
  { path: "/category/create", component: CreateCategory },

  //sizes
  { path: "/sizes", component: IndexSizes },
  { path: "/size/create", component: CreateSize },
  { path: "/size/edit/:id", component: EditSize },

  //genders
  { path: "/genders", component: IndexGenders },
  { path: "/gender/edit/:id", component: EditGender },
  { path: "/gender/create", component: CreateGender },

  //login
  { path: "/login", component: Login },

  //register
  { path: "/register", component: Register },

  //change password
  {path: '/changePassword', component: ResetPassowrd},

  //resetPass
  {path: '/resetPassword' , component: ResetPasswordWithToken},

  //errors
  { path: "/pageNotFound", component: Page404 },

  //send email for forgot password
  {path: "/sendEmail", component: ForgotPassowrd},

  //stripe payment
  {path: "/thankyou", component: Thankyou},
  {path: "/checkout" ,component: PaymentForm},

  //index
  { path: "/", component: IndexPage, exact: true },
  { path: "*", component: RedirectToHomePage },
];
export default routes;
