const baseURL = "https://localhost:7001/api";

//users
export const urlLogin = `${baseURL}/identity/login-user`;
export const urlRegister = `${baseURL}/identity/register-user`;
export const urlChangePassword = `${baseURL}/identity/change-password`;
export const urlSendResetEmail = `${baseURL}/identity/forgot-password`;
export const urlResetPassword = `${baseURL}/identity/reset-password`;

//categories
export const urlGetCategories = `${baseURL}/categories/get-categories`;
export const urlCreateCategory = `${baseURL}/categories/insert-category`;
export const urlEditCategory = `${baseURL}/categories/update-category`;
export const urlGetCategoryById = `${baseURL}/categories/get-category-by-id`;
export const urlDeleteCategory = `${baseURL}/categories/delete-category`;


//sizes
export const urlSizes = `${baseURL}/sizes/get-all-sizes`;
export const urlCreateSize = `${baseURL}/sizes/insert-size`;
export const urlEditSize = `${baseURL}/sizes/update-size`;
export const urlGetSizeById = `${baseURL}/sizes/get-size-by-id`;
export const urlDeleteSize = `${baseURL}/sizes/delete-size`;
//genders
export const urlGetGenders = `${baseURL}/gender/get-genders`;
export const urlEditGender = `${baseURL}/gender/update-gender`;
export const urlCreateGender = `${baseURL}/gender/insert-gender`;
export const urlGetGenderById = `${baseURL}/gender/get-gender-by-id`;
export const urlDeleteGender  = `${baseURL}/gender/delete-gender`;

//products
export const urlProducts = `${baseURL}/Product/get-all-products`;
export const urlCreateProduct = `${baseURL}/Product/create-product`;
export const urlEditProduct = `${baseURL}/Product/update-product`;
export const urlDeleteProduct = `${baseURL}/Product/delete-product`;
export const urlGetProductById = `${baseURL}/Product/get-by-id`;
//product ratings
export const urlCreateProductRating = `${baseURL}/product-ratings/create-rating-product`;
export const urlUpdateProductRating = `${baseURL}/product-ratings/product-rating-edit`;

//files
export const urlSaveImage = `${baseURL}/File`;

//stripe
export const urlPayment = `${baseURL}/Stripe/create-payment-intent`;