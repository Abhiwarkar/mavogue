// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './slices/wishlistSlice'
import searchReducer from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
      
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', 
})

export default store