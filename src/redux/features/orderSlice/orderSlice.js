import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message); 
  }
});


export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async ({ search } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders?search=${search}`);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );  
    }
  }
);

   

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],        
    isLoading: false,  
    error: null,       
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Order 
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
