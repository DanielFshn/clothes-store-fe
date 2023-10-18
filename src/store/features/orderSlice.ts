import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductCart } from "./productSlice";
import axios from "axios";


export interface Order {
    id: string;
    userId: string;
    totalAmount: number;
    products: ProductCart[];
  }
  
  interface OrderState {
    orders: Order[];
  }
  
  const initialState: OrderState = {
    orders: [],
  };
  
  export const saveOrderAsync = createAsyncThunk(
    "order/saveOrder",
    async (order: Order, { rejectWithValue }) => {
      try {
        const response = await axios.post("/api/orders", order);
        return response.data; // Assuming the API returns the saved order data
      } catch (error : any) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
      addOrder: (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
      },
      removeOrder: (state, action: PayloadAction<string>) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      },
      // Add other order-related actions as needed
    },
  });
  
  export default OrderSlice.reducer;
export const { addOrder, removeOrder } = OrderSlice.actions;