import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      
      if (response.data.success) {
        setToken(response.data.token)
        toast.success('Login successful!')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        
        {/* Login Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          
          {/* Header */}
          <div className='text-center mb-8'>
            <img src={assets.logo} alt="Forever" className='w-24 h-auto mx-auto mb-4' />
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>Admin Panel</h1>
            <p className='text-gray-500 text-sm'>Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className='space-y-6'>
            
            {/* Email Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 pl-11'
                  type="email" 
                  
                  required 
                />
                <svg className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 pl-11'
                  type="password" 
                  placeholder='Enter your password' 
                  required 
                />
                <svg className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                </svg>
              </div>
            </div>

            {/* Login Button */}
            <button 
              className='w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center'>
            <p className='text-xs text-gray-500'>
              © 2025 Forever. All rights reserved.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className='text-center mt-6'>
          <p className='text-sm text-gray-500'>
            Need help? Contact{' '}
            <a href='mailto:support@forever.com' className='text-gray-900 hover:underline'>
              support@mavougue.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login