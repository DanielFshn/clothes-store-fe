const baseURL = "https://localhost:7001/api";

//users
export const urlLogin = `${baseURL}/identity/login-user`;

//categories
export const urlGetCategories = `${baseURL}/categories/get-categories`;
export const urlCreateCategory = `${baseURL}/categories/insert-category`;
export const urlEditCategory = `${baseURL}/categories/update-category`;
export const urlGetCategoryById = `${baseURL}/categories/get-category-by-id`;

//sizes
export const urlSizes = `${baseURL}/sizes/get-all-sizes`;
export const urlCreateSize = `${baseURL}/sizes/insert-size`;
export const urlEditSize = `${baseURL}/sizes/update-size`;
export const urlGetSizeById = `${baseURL}/sizes/get-size-by-id`;
//genders
export const urlGetGenders = `${baseURL}/gender/get-genders`;
export const urlEditGender = `${baseURL}/gender/update-gender`;
export const urlCreateGender = `${baseURL}/gender/insert-gender`;
export const urlGetGenderById = `${baseURL}/gender/get-gender-by-id`;

