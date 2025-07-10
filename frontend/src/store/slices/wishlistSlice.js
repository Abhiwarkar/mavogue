
import { createSlice } from '@reduxjs/toolkit'

// Utility functions for localStorage
const WISHLIST_KEY = 'ecommerce_wishlist'

const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_KEY)
    return savedWishlist ? JSON.parse(savedWishlist) : []
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error)
    return []
  }
}

const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error)
  }
}

// Initial state
const initialState = {
  items: loadWishlistFromStorage(),
  count: loadWishlistFromStorage().length,
  isLoading: false,
  error: null
}

// Wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Add product to wishlist
    addToWishlist: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item._id === product._id)
      
      if (!existingItem) {
        const newItem = {
          ...product,
          addedAt: new Date().toISOString(),
          id: product._id 
        }
        state.items.push(newItem)
        state.count = state.items.length
        saveWishlistToStorage(state.items)
      }
    },
    
    // Remove product from wishlist
    removeFromWishlist: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item._id !== productId)
      state.count = state.items.length
      saveWishlistToStorage(state.items)
    },
    
    // Toggle product in wishlist 
    toggleWishlist: (state, action) => {
      const product = action.payload
      const existingItemIndex = state.items.findIndex(item => item._id === product._id)
      
      if (existingItemIndex >= 0) {
        // Remove from wishlist
        state.items.splice(existingItemIndex, 1)
      } else {
        // Add to wishlist
        const newItem = {
          ...product,
          addedAt: new Date().toISOString(),
          id: product._id
        }
        state.items.push(newItem)
      }
      
      state.count = state.items.length
      saveWishlistToStorage(state.items)
    },
    
    // Clear entire wishlist
    clearWishlist: (state) => {
      state.items = []
      state.count = 0
      saveWishlistToStorage(state.items)
    },
    
    // Set loading state
    setWishlistLoading: (state, action) => {
      state.isLoading = action.payload
    },
    
    // Set error state
    setWishlistError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

// Export actions
export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  setWishlistLoading,
  setWishlistError
} = wishlistSlice.actions

// Selectors (these help get data from state)
export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistCount = (state) => state.wishlist.count
export const selectWishlistLoading = (state) => state.wishlist.isLoading
export const selectWishlistError = (state) => state.wishlist.error

// Check if product is in wishlist
export const selectIsInWishlist = (productId) => (state) => 
  state.wishlist.items.some(item => item._id === productId)

// Get wishlist item by ID
export const selectWishlistItemById = (productId) => (state) =>
  state.wishlist.items.find(item => item._id === productId)

export default wishlistSlice.reducer