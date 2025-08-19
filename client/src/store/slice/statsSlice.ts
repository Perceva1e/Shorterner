import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStats } from '../../services/api';
import type { UrlStats } from '../../types/types'; 

interface StatsState {
  data: UrlStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchStats = createAsyncThunk(
  'stats/fetch',
  async (shortCode: string, { rejectWithValue }) => {
    try {
      const response = await getStats(shortCode);
      console.log('Fetched stats:', JSON.stringify(response, null, 2));
      return response;
    } catch (error) {
      let errorMessage = 'Error of server';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object') {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage = axiosError.response?.data?.error || errorMessage;
      }
      console.error('Fetch stats error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default statsSlice.reducer;