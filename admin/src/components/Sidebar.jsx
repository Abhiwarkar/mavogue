import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  
  const navItems = [
    {
      path: '/add',
      label: 'Add Items',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
    },
    {
      path: '/list', 
      label: 'List Items',
      icon: 'M4 6h16M4 10h16M4 14h16M4 18h16'
    },
    {
      path: '/orders',
      label: 'Orders', 
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    }
  ]

  return (
    <div className='w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm'>
      <div className='p-6'>
        
        {/* Navigation Menu */}
        <nav className='space-y-2'>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <svg 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                    fill='none' 
                    stroke='currentColor' 
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className='font-medium text-sm'>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        
      </div>
    </div>
  )
}

export default Sidebar