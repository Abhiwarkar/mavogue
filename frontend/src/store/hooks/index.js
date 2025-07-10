
import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

// Custom hooks for wishlist functionality
export const useWishlist = () => {
  const dispatch = useAppDispatch()
  
  const items = useAppSelector(state => state.wishlist.items)
  const count = useAppSelector(state => state.wishlist.count)
  const isLoading = useAppSelector(state => state.wishlist.isLoading)
  const error = useAppSelector(state => state.wishlist.error)
  
  return {
    items,
    count,
    isLoading,
    error,
    dispatch
  }
}

// Custom hook to check if item is in wishlist
export const useIsInWishlist = (productId) => {
  return useAppSelector(state => 
    state.wishlist.items.some(item => item._id === productId)
  )
}

// Custom hooks for search functionality
export const useSearch = () => {
  const dispatch = useAppDispatch()
  
  const query = useAppSelector(state => state.search.query)
  const suggestions = useAppSelector(state => state.search.suggestions)
  const searchHistory = useAppSelector(state => state.search.searchHistory)
  const searchResults = useAppSelector(state => state.search.searchResults)
  const totalResults = useAppSelector(state => state.search.totalResults)
  const filters = useAppSelector(state => state.search.filters)
  const isSearching = useAppSelector(state => state.search.isSearching)
  const searchPerformed = useAppSelector(state => state.search.searchPerformed)
  
  return {
    query,
    suggestions,
    searchHistory,
    searchResults,
    totalResults,
    filters,
    isSearching,
    searchPerformed,
    dispatch
  }
}

// Custom hook for filtered search results
export const useFilteredSearchResults = () => {
  return useAppSelector(state => {
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
  })
}