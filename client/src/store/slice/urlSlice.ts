import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shortenUrl } from '../../services/api';

interface UrlState {
  originalUrl: string;
  shortUrl: string | null;
  statsUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UrlState = {
  originalUrl: '',
  shortUrl: null,
  statsUrl: null,
  loading: false,
  error: null,
};

export const shortenUrlThunk = createAsyncThunk(
  'url/shorten',
  async (originalUrl: string, { rejectWithValue }) => {
    try {
      const response = await shortenUrl(originalUrl);
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
      
      return rejectWithValue(errorMessage);
    }
  }
);

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrlThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shortenUrlThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.shortUrl = action.payload.shareLink;
        state.statsUrl = action.payload.statsLink;
      })
      .addCase(shortenUrlThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = urlSlice.actions;
export default urlSlice.reducer;