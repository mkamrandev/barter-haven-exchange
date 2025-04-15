
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  userItems: [],
  item: null,
  isLoading: false,
  error: null,
};

// Get all approved items
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/items', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Filter only approved items
      const approvedItems = response.data.items.filter(item => item.is_Approved === 'approved');
      return { ...response.data, items: approvedItems };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error occurred' });
    }
  }
);

// Get user's items
export const fetchUserItems = createAsyncThunk(
  'items/fetchUserItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/User/items', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error occurred' });
    }
  }
);

// Get single item
export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error occurred' });
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearItemsError: (state) => {
      state.error = null;
    },
    clearCurrentItem: (state) => {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all items cases
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Failed to fetch items' };
      })
      
      // Fetch user items cases
      .addCase(fetchUserItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userItems = action.payload.items;
      })
      .addCase(fetchUserItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Failed to fetch user items' };
      })
      
      // Fetch item by id cases
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload.item;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Failed to fetch item' };
      });
  },
});

export const { clearItemsError, clearCurrentItem } = itemsSlice.actions;
export default itemsSlice.reducer;
