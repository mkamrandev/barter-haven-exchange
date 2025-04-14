
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
  role: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Item {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  location: string;
  price_estimate: string;
  images: string;
  status: string;
  is_Approved: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  user: User;
  category: Category;
}

interface ItemsState {
  items: Item[];
  userItems: Item[];
  item: Item | null;
  isLoading: boolean;
  error: any;
}

const initialState: ItemsState = {
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
      
      if (response.data.status === 'OK') {
        const items = response.data.items;
        // Filter out the current user's items and only show approved items from other users
        const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;
        const otherUsersItems = items.filter(item => 
          item.user_id !== currentUserId && 
          item.is_Approved === 'approved'
        );
        return otherUsersItems;
      }
      return rejectWithValue('Failed to fetch items');
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch items');
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
      
      if (response.data.status === 'OK') {
        const items = response.data.items;
        // Filter only current user's items
        const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;
        const userItems = items.filter(item => item.user_id === currentUserId);
        return userItems;
      }
      return rejectWithValue('Failed to fetch user items');
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user items');
    }
  }
);

// Get single item
export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.status === 'OK') {
        return response.data.item;
      }
      return rejectWithValue('Failed to fetch item');
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch item');
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
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch user items cases
      .addCase(fetchUserItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userItems = action.payload;
      })
      .addCase(fetchUserItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch item by id cases
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearItemsError, clearCurrentItem } = itemsSlice.actions;
export default itemsSlice.reducer;
