
import { useState, useEffect } from 'react'

/**

 * @param {any} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {any} - The debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set debouncedValue to value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * @param {string} searchTerm - The search term
 * @param {number} delay - The delay in milliseconds
 * @returns {string} - The debounced search term
 */
export const useDebouncedSearch = (searchTerm, delay = 300) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  useEffect(() => {
    // Only debounce if searchTerm is not empty
    if (searchTerm.trim() === '') {
      setDebouncedSearchTerm('')
      return
    }

    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm, delay])

  return debouncedSearchTerm
}

export default useDebounce