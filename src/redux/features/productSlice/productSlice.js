import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Adjust based on your backend

// Async Thunks
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
});

export const addProduct = createAsyncThunk("products/addProduct", async (product, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, product);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

// Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    addProductStatus: "idle",
    addProductError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.addProductStatus = "loading";
        state.addProductError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductStatus = "succeeded";
        state.products.push(action.payload.data);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatus = "failed";
        state.addProductError = action.payload || "Failed to add product";
      });
  },
});

export default productSlice.reducer;
