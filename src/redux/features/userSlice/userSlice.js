import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://inventory-server-oroz.onrender.com" || "http://localhost:5000";

// **Register User**
export const addUser = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// **Fetch Current User**
export const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/currentUser`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// **Fetch All Users**
export const fetchAllUsers = createAsyncThunk("user/fetchAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,        
    allUsers: [],     
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload; 
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default userSlice.reducer;
