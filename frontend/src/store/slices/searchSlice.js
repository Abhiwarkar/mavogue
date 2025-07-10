
import { createSlice } from '@reduxjs/toolkit'

// Search history utilities
const SEARCH_HISTORY_KEY = 'ecommerce_search_history'
const MAX_SEARCH_HISTORY = 10

const loadSearchHistory = () => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Error loading search history:', error)
    return []
  }
}

const saveSearchHistory = (history) => {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history))
  } catch (error) {
    console.error('Error saving search history:', error)
  }
}

// Initial state
const initialState = {
  query: '',
  suggestions: [],
  searchHistory: loadSearchHistory(),
  filters: {
    category: '',
    subCategory: '',
    priceRange: [0, 1000],
    sortBy: 'relevant',
    inStock: false
  },
  isSearching: false,
  searchResults: [],
  totalResults: 0,
  searchPerformed: false
}

// Search slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Set search query
    setSearchQuery: (state, action) => {
      state.query = action.payload
      state.searchPerformed = false
    },
    
    // Set search suggestions 
    setSearchSuggestions: (state, action) => {
      state.suggestions = action.payload
    },
    
    // Perform search
    performSearch: (state, action) => {
      const { query, results, total } = action.payload
      
      state.searchResults = results
      state.totalResults = total
      state.searchPerformed = true
      state.isSearching = false
      
      // Add to search history if query is not empty
      if (query.trim() && !state.searchHistory.includes(query.trim())) {
        state.searchHistory.unshift(query.trim())
        
        
        if (state.searchHistory.length > MAX_SEARCH_HISTORY) {
          state.searchHistory = state.searchHistory.slice(0, MAX_SEARCH_HISTORY)
        }
        
        saveSearchHistory(state.searchHistory)
      }
    },
    
    // Set search loading state
    setSearchLoading: (state, action) => {
      state.isSearching = action.payload
    },
    
    // Update filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    // Reset filters
    resetFilters: (state) => {
      state.filters = {
        category: '',
        subCategory: '',
        priceRange: [0, 1000],
        sortBy: 'relevant',
        inStock: false
      }
    },
    
    // Clear search
    clearSearch: (state) => {
      state.query = ''
      state.searchResults = []
      state.totalResults = 0
      state.searchPerformed = false
      state.suggestions = []
    },
    
    // Remove item from search history
    removeFromSearchHistory: (state, action) => {
      const queryToRemove = action.payload
      state.searchHistory = state.searchHistory.filter(item => item !== queryToRemove)
      saveSearchHistory(state.searchHistory)
    },
    
    // Clear search history
    clearSearchHistory: (state) => {
      state.searchHistory = []
      saveSearchHistory(state.searchHistory)
    },
    
    // Set search from history
    setSearchFromHistory: (state, action) => {
      state.query = action.payload
    }
  }
})

// Export actions
export const {
  setSearchQuery,
  setSearchSuggestions,
  performSearch,
  setSearchLoading,
  updateFilters,
  resetFilters,
  clearSearch,
  removeFromSearchHistory,
  clearSearchHistory,
  setSearchFromHistory
} = searchSlice.actions

// Selectors
export const selectSearchQuery = (state) => state.search.query
export const selectSearchSuggestions = (state) => state.search.suggestions
export const selectSearchHistory = (state) => state.search.searchHistory
export const selectSearchResults = (state) => state.search.searchResults
export const selectTotalResults = (state) => state.search.totalResults
export const selectSearchFilters = (state) => state.search.filters
export const selectIsSearching = (state) => state.search.isSearching
export const selectSearchPerformed = (state) => state.search.searchPerformed

// Complex selectors
export const selectFilteredAndSortedResults = (state) => {
  const { searchResults, filters } = state.search
  let filtered = [...searchResults]
  
  // Apply filters
  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category)
  }
  
  if (filters.subCategory) {
    filtered = filtered.filter(product => product.subCategory === filters.subCategory)
  }
  
  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock !== false)
  }
  
  // Apply price range
  filtered = filtered.filter(product => 
    product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
  )
  
  // Apply sorting
  switch (filters.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    default: // 'relevant'
      break
  }
  
  return filtered
}

export default searchSlice.reducer