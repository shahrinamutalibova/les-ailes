import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  images: [],
  status: 'idle',
  error: null,
};

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  const response = await axios.get('http://localhost:5000/images');
  return response.data;
});

export const addImage = createAsyncThunk('images/addImage', async (url) => {
  const response = await axios.post('http://localhost:5000/images', { url });
  return response.data;
});

export const deleteImage = createAsyncThunk('images/deleteImage', async (id) => {
  await axios.delete(`http://localhost:5000/images/${id}`);
  return id;
});

export const updateImage = createAsyncThunk('images/updateImage', async ({ id, url }) => {
  const response = await axios.patch(`http://localhost:5000/images/${id}`, { url });
  return response.data;
});

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.images.push(action.payload);
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.images = state.images.filter((image) => image.id !== action.payload);
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        const idx = state.images.findIndex((image) => image.id === action.payload.id);
        state.images[idx] = action.payload;
      });
  },
});

export default imageSlice.reducer;
