import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
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

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success('Order status updated successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'bg-blue-100 text-blue-800'
      case 'Packing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Out for delivery':
        return 'bg-orange-100 text-orange-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto p-6'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='animate-pulse space-y-4'>
            <div className='h-8 bg-gray-200 rounded w-1/4'></div>
            <div className='space-y-4'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='border border-gray-200 rounded-lg p-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-16 h-16 bg-gray-200 rounded-lg'></div>
                    <div className='flex-1 space-y-2'>
                      <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                      <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                      <div className='h-3 bg-gray-200 rounded w-1/3'></div>
                    </div>
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
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Orders Management</h1>
        <p className='text-gray-500'>Track and manage all customer orders</p>
      </div>

      {/* Orders List */}
      <div className='space-y-6'>
        {orders.length === 0 ? (
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center'>
            <svg className='w-16 h-16 text-gray-400 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
            </svg>
            <h3 className='text-lg font-medium text-gray-900 mb-1'>No orders found</h3>
            <p className='text-gray-500'>Orders will appear here when customers make purchases</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200'>
              
              {/* Order Header */}
              <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center'>
                      <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>Order #{order._id.slice(-8)}</h3>
                      <p className='text-sm text-gray-500'>{new Date(order.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-4'>
                    <div className='text-right'>
                      <div className='text-lg font-semibold text-gray-900'>{currency}{order.amount}</div>
                      <div className='text-sm text-gray-500'>{order.items.length} item{order.items.length > 1 ? 's' : ''}</div>
                    </div>
                    
                    {/* Status Selector */}
                    <select 
                      onChange={(event) => statusHandler(event, order._id)} 
                      value={order.status}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border-0 cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className='p-6'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                  
                  {/* Customer Info */}
                  <div className='space-y-3'>
                    <h4 className='font-medium text-gray-900 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                      </svg>
                      Customer Details
                    </h4>
                    <div className='text-sm text-gray-600 space-y-1'>
                      <p className='font-medium'>{order.address.firstName} {order.address.lastName}</p>
                      <p>{order.address.email}</p>
                      <p>{order.address.phone}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className='space-y-3'>
                    <h4 className='font-medium text-gray-900 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                      Shipping Address
                    </h4>
                    <div className='text-sm text-gray-600 space-y-1'>
                      <p>{order.address.street}</p>
                      <p>{order.address.city}, {order.address.state}</p>
                      <p>{order.address.zipcode}, {order.address.country}</p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className='space-y-3'>
                    <h4 className='font-medium text-gray-900 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                      </svg>
                      Payment Details
                    </h4>
                    <div className='text-sm text-gray-600 space-y-1'>
                      <p>Method: <span className='font-medium'>{order.paymentMethod}</span></p>
                      <p>Status: <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                        {order.payment ? 'Paid' : 'Pending'}
                      </span></p>
                      <p>Total: <span className='font-semibold text-gray-900'>{currency}{order.amount}</span></p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <h4 className='font-medium text-gray-900 mb-4 flex items-center gap-2'>
                    <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                    </svg>
                    Order Items ({order.items.length})
                  </h4>
                  
                  <div className='space-y-3'>
                    {order.items.map((item, idx) => (
                      <div key={idx} className='flex items-center gap-4 p-3 bg-gray-50 rounded-lg'>
                        <div className='w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-200'>
                          <img 
                            className='w-full h-full object-cover' 
                            src={item.image[0]} 
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=No+Image'
                            }}
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-gray-900 truncate'>{item.name}</p>
                          <p className='text-sm text-gray-500'>
                            Size: {item.size} • Qty: {item.quantity} • {currency}{item.price} each
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold text-gray-900'>{currency}{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {orders.length > 0 && (
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg border border-gray-200 p-4'>
            <div className='text-2xl font-bold text-gray-900'>{orders.length}</div>
            <div className='text-sm text-gray-500'>Total Orders</div>
          </div>
          <div className='bg-white rounded-lg border border-gray-200 p-4'>
            <div className='text-2xl font-bold text-green-600'>
              {orders.filter(order => order.status === 'Delivered').length}
            </div>
            <div className='text-sm text-gray-500'>Delivered</div>
          </div>
          <div className='bg-white rounded-lg border border-gray-200 p-4'>
            <div className='text-2xl font-bold text-orange-600'>
              {orders.filter(order => order.status === 'Out for delivery').length}
            </div>
            <div className='text-sm text-gray-500'>Out for Delivery</div>
          </div>
          <div className='bg-white rounded-lg border border-gray-200 p-4'>
            <div className='text-2xl font-bold text-blue-600'>
              {currency}{orders.reduce((sum, order) => sum + order.amount, 0)}
            </div>
            <div className='text-sm text-gray-500'>Total Revenue</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders