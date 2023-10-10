import { configureStore } from '@reduxjs/toolkit';
import imageReducer from '../features/images/imageSlice';
import todoReducer from '../features/images/todoSlice'
import priceReducer from "../features/images/priceSlice"

export default configureStore({
  reducer: {
    images: imageReducer,
    todos: todoReducer,
    price:priceReducer
  },
});




