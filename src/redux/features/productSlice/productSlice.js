import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://inventory-server-oroz.onrender.com" || "http://localhost:5000";


// Fetch products 
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, size, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products?page=${page}&size=${size}&search=${search}`);
      console.log(response)
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);



// Add new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  } 
);


// Redux Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    pagination: {
      currentPage: 1,
      pageSize: 1,
      totalItems: 0,
      totalPages: 0,
    },
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
        console.log("API Response:", action.payload);
        state.status = "succeeded";
        state.products = action.payload.products; 
        state.pagination = action.payload.meta; 
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
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatus = "failed";
        state.addProductError = action.payload || "Failed to add product";
      });
  },
});

export default productSlice.reducer;
