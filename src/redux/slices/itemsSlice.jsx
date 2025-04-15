
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  userItems: [],
  otherUsersItems: [],
  item: null,
  isLoading: false,
  error: null,
};

// Get all items
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (_, { rejectWithValue, getState }) => {
    try {
      console.log('Fetching all items...');
      const response = await axios.get('http://127.0.0.1:8000/api/items', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('Items API response:', response.data);
      
      const userId = getState().auth.user?.id;
      const allItems = response.data.items || [];
      
      console.log('User ID:', userId);
      console.log('All items count:', allItems.length);
      
      // Filter items based on user and approval status
      const userItems = allItems.filter(item => item.user_id === userId);
      const otherUsersItems = allItems.filter(item => 
        item.user_id !== userId && item.is_Approved === 'approved'
      );
      
      console.log('User items count:', userItems.length);
      console.log('Other users items count:', otherUsersItems.length);
      
      return {
        userItems,
        otherUsersItems,
        allItems
      };
    } catch (error) {
      console.error('Error fetching items:', error);
      return rejectWithValue(error.response?.data || { message: 'Network error occurred' });
    }
  }
);

// Get user's items
export const fetchUserItems = createAsyncThunk(
  'items/fetchUserItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/items', {
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
        state.items = action.payload.allItems;
        state.userItems = action.payload.userItems;
        state.otherUsersItems = action.payload.otherUsersItems;
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
        state.userItems = action.payload.items || [];
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
