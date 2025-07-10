

import { useSelector, useDispatch } from 'react-redux'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext' 
import { 
  selectWishlistItems, 
  selectWishlistCount,
  removeFromWishlist,
  clearWishlist 
} from '../store/slices/wishlistSlice'
import Title from '../components/Title'

const Wishlist = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)
  const wishlistCount = useSelector(selectWishlistCount)

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId, productName) => {
    dispatch(removeFromWishlist(productId))
    toast.success(`${productName} removed from wishlist!`)
  }
   const { currency } = useContext(ShopContext)

  // Handle clear wishlist
  const handleClearWishlist = () => {
    if (wishlistItems.length > 0) {
      dispatch(clearWishlist())
      toast.success('Wishlist cleared!')
    }
  }

  // Empty wishlist state
  if (wishlistCount === 0) {
    return (
      <div className='min-h-screen pt-14'>
        <div className='text-center py-20'>
          <div className='mb-8'>
            <svg className='w-24 h-24 mx-auto text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
            </svg>
          </div>
          <h2 className='text-3xl font-light text-gray-900 mb-4'>Your Wishlist is Empty</h2>
          <p className='text-gray-600 mb-8 max-w-md mx-auto'>
            Start adding products you love to your wishlist and they'll appear here.
          </p>
          <Link 
            to='/collection'
            className='inline-flex items-center gap-3 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200'
          >
            <span>Continue Shopping</span>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='border-t pt-14 min-h-screen'>
      {/* Page Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <Title text1={'MY'} text2={'WISHLIST'} />
            <p className='text-gray-600 mt-2'>{wishlistCount} item{wishlistCount !== 1 ? 's' : ''} in your wishlist</p>
          </div>
          
          {/* Clear Wishlist Button */}
          {wishlistCount > 0 && (
            <button
              onClick={handleClearWishlist}
              className='text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200'
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Wishlist Items Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {wishlistItems.map((item) => (
          <div key={item._id} className='group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
            
            {/* Product Image */}
            <div className='relative aspect-[3/4] overflow-hidden bg-gray-50'>
              <Link to={`/product/${item._id}`}>
                <img 
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  src={item.image?.[0] || 'https://via.placeholder.com/400x500?text=Product'}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x500/f3f4f6/9ca3af?text=Product';
                  }}
                />
              </Link>
              
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromWishlist(item._id, item.name)}
                className='absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm'
              >
                <svg className='w-4 h-4 text-gray-600 hover:text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>

              {/* Price Badge */}
               <div className='absolute top-3 left-3 bg-black text-white px-2 py-1 rounded-full text-sm font-medium'>
    {currency}{item.price}
  </div>
            </div>

            {/* Product Info */}
            <div className='p-4 space-y-3'>
              <Link to={`/product/${item._id}`}>
                <h3 className='font-medium text-gray-900 hover:text-black transition-colors duration-200 line-clamp-2'>
                  {item.name}
                </h3>
              </Link>
              
              {/* Price and Category */}
              <div className='flex items-center justify-between'>
                <div>
                 <div className='text-lg font-semibold text-black'>{currency}{item.price}</div>
                  <div className='text-sm text-gray-500'>{item.category} • {item.subCategory}</div>
                </div>
              </div>
              
              {/* date */}
              <div className='text-xs text-gray-400'>
                Added {new Date(item.addedAt).toLocaleDateString()}
              </div>
              
              {/* Action Buttons */}
              <div className='flex gap-2 pt-2'>
                <Link 
                  to={`/product/${item._id}`}
                  className='flex-1 bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium'
                >
                  View Product
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id, item.name)}
                  className='px-4 py-2 border border-gray-300 rounded-lg hover:border-red-300 hover:text-red-600 transition-colors duration-200 text-sm'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className='text-center mt-12 py-8 border-t border-gray-200'>
        <h3 className='text-xl font-medium text-gray-900 mb-4'>Continue Shopping</h3>
        <p className='text-gray-600 mb-6'>Discover more products you might love</p>
        <Link 
          to='/collection'
          className='inline-flex items-center gap-3 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200'
        >
          <span>Browse All Products</span>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Wishlist