import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProductCart {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  genderName: string;
  sizeName: string;
  quantity: number;
  total: number;
}

interface ProductCartState {
  productsCart: ProductCart[];
}

const initialState: ProductCartState = {
  productsCart: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        categoryName: string;
        genderName: string;
        sizeName: string;
      }>
    ) => {
      const existingProduct = state.productsCart.find((product) => product.id === action.payload.id);
      if(existingProduct){
        existingProduct.quantity += 1;
        existingProduct.total += action.payload.price;
      }else{
      state.productsCart.push({
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        price: action.payload.price,
        imageUrl: action.payload.imageUrl,
        categoryName: action.payload.categoryName,
        genderName: action.payload.genderName,
        sizeName: action.payload.sizeName,
        quantity: 1,
        total : action.payload.price
      });
    }
    },
    removeProductFromCart: (
      state,
      action: PayloadAction<string> // Payload is the product ID
    ) => {
      state.productsCart = state.productsCart.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ productId: string; newQuantity: number }>
    ) => {
      const { productId, newQuantity } = action.payload;
      const product = state.productsCart.find((p) => p.id === productId);

      if (product) {
        product.quantity = newQuantity;
        product.total = product.price * newQuantity;
      }
    },
    clearCart: (state) =>{
      state.productsCart = [];
    }
  },
});



export default ProductSlice.reducer;
export const { addProductToCart } = ProductSlice.actions;
export const { removeProductFromCart } = ProductSlice.actions;
export const { updateProductQuantity } = ProductSlice.actions;
export const {clearCart} = ProductSlice.actions;
