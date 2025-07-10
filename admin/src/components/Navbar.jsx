import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='bg-white shadow-sm border-b border-gray-100'>
      <div className='flex items-center justify-between py-4 px-6 lg:px-8'>
        
        {/* Logo Section */}
        <div className='flex items-center gap-3'>
          <img className='w-32 h-auto' src={assets.logo} alt="Forever" />
          <div className='hidden sm:block'>
            <span className='text-sm font-medium text-gray-500 uppercase tracking-wider'>Admin Panel</span>
          </div>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          
          {/* Admin Info */}
          <div className='hidden md:flex items-center gap-3'>
            <div className='w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center'>
              <span className='text-white text-sm font-semibold'>A</span>
            </div>
            <div className='text-sm'>
              <p className='font-medium text-gray-900'>Admin</p>
              <p className='text-gray-500'>admin@mavougue.com</p>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={() => setToken('')}
            className='bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 lg:px-6 lg:py-2.5 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md'
          >
            <span className='hidden sm:inline'>Logout</span>
            <svg className='w-4 h-4 sm:hidden' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar