import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchList = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto p-6'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='animate-pulse space-y-4'>
            <div className='h-8 bg-gray-200 rounded w-1/4'></div>
            <div className='space-y-3'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='flex items-center space-x-4'>
                  <div className='w-16 h-16 bg-gray-200 rounded-lg'></div>
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto p-6'>
      
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>All Products</h1>
        <p className='text-gray-500'>Manage your product inventory</p>
      </div>

      {/* Products Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
        
        {/* Table Header */}
        <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
          <div className='grid grid-cols-12 gap-4 items-center text-sm font-semibold text-gray-700'>
            <div className='col-span-1'>Image</div>
            <div className='col-span-4'>Name</div>
            <div className='col-span-2'>Category</div>
            <div className='col-span-2'>Price</div>
            <div className='col-span-2'>Status</div>
            <div className='col-span-1'>Action</div>
          </div>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-100'>
          {list.length === 0 ? (
            <div className='px-6 py-12 text-center'>
              <svg className='w-12 h-12 text-gray-400 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-2-2m0 0L6 2M5 21l14-14' />
              </svg>
              <h3 className='text-lg font-medium text-gray-900 mb-1'>No products found</h3>
              <p className='text-gray-500'>Add your first product to get started</p>
            </div>
          ) : (
            list.map((item, index) => (
              <div key={index} className='px-6 py-4 hover:bg-gray-50 transition-colors duration-150'>
                <div className='grid grid-cols-12 gap-4 items-center'>
                  
                  {/* Product Image */}
                  <div className='col-span-1'>
                    <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-100'>
                      <img 
                        className='w-full h-full object-cover' 
                        src={item.image[0]} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=No+Image'
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className='col-span-4'>
                    <h3 className='font-medium text-gray-900 truncate'>{item.name}</h3>
                    <p className='text-sm text-gray-500 truncate'>{item.description.slice(0, 60)}...</p>
                  </div>

                  {/* Category */}
                  <div className='col-span-2'>
                    <div className='space-y-1'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                        {item.category}
                      </span>
                      <div className='text-xs text-gray-500'>{item.subCategory}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='col-span-2'>
                    <div className='text-lg font-semibold text-gray-900'>
                      {currency}{item.price}
                    </div>
                    {item.bestseller && (
                      <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800'>
                        ⭐ Bestseller
                      </span>
                    )}
                  </div>

                  {/* Status */}
                  <div className='col-span-2'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                      <div className='w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5'></div>
                      Active
                    </span>
                    <div className='text-xs text-gray-500 mt-1'>
                      Sizes: {item.sizes.join(', ')}
                    </div>
                  </div>

                  {/* Action */}
                  <div className='col-span-1'>
                    <button
                      onClick={() => removeProduct(item._id)}
                      className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200'
                      title='Delete product'
                    >
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Table Footer */}
        {list.length > 0 && (
          <div className='bg-gray-50 px-6 py-3 border-t border-gray-200'>
            <div className='flex items-center justify-between text-sm text-gray-600'>
              <span>Showing {list.length} products</span>
              <button 
                onClick={fetchList}
                className='inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List