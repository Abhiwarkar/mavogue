import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestseller(false)
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

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

  return (
    <div className='max-w-4xl mx-auto p-6'>
      
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Add New Product</h1>
        <p className='text-gray-500'>Fill in the product details below</p>
      </div>

      <form onSubmit={onSubmitHandler} className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8'>
        
        {/* Image Upload Section */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-4'>Upload Images</label>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[
              { image: image1, setImage: setImage1, id: 'image1' },
              { image: image2, setImage: setImage2, id: 'image2' },
              { image: image3, setImage: setImage3, id: 'image3' },
              { image: image4, setImage: setImage4, id: 'image4' }
            ].map((item, index) => (
              <label key={index} htmlFor={item.id} className='cursor-pointer group'>
                <div className='aspect-square border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors duration-200 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100'>
                  {!item.image ? (
                    <div className='text-center'>
                      <svg className='w-8 h-8 text-gray-400 mx-auto mb-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
                      </svg>
                      <p className='text-xs text-gray-500'>Upload</p>
                    </div>
                  ) : (
                    <img 
                      className='w-full h-full object-cover rounded-md' 
                      src={URL.createObjectURL(item.image)} 
                      alt={`Product ${index + 1}`} 
                    />
                  )}
                </div>
                <input 
                  onChange={(e) => item.setImage(e.target.files[0])} 
                  type="file" 
                  id={item.id} 
                  hidden 
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-2'>Product Name</label>
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200'
            type="text" 
            placeholder='Enter product name' 
            required 
          />
        </div>

        {/* Product Description */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-2'>Product Description</label>
          <textarea 
            onChange={(e) => setDescription(e.target.value)} 
            value={description}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 min-h-[120px] resize-none'
            placeholder='Write product description here...' 
            required 
          />
        </div>

        {/* Category, Subcategory, Price Row */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          
          {/* Category */}
          <div>
            <label className='block text-sm font-semibold text-gray-900 mb-2'>Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              value={category}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-white'
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className='block text-sm font-semibold text-gray-900 mb-2'>Sub Category</label>
            <select 
              onChange={(e) => setSubCategory(e.target.value)} 
              value={subCategory}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-white'
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className='block text-sm font-semibold text-gray-900 mb-2'>Price (₹)</label>
            <input 
              onChange={(e) => setPrice(e.target.value)} 
              value={price}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200'
              type="number" 
              placeholder='25' 
              min="0"
              step="0.01"
              required 
            />
          </div>
        </div>

        {/* Product Sizes */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-4'>Available Sizes</label>
          <div className='flex flex-wrap gap-3'>
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => 
                  prev.includes(size) 
                    ? prev.filter(item => item !== size)
                    : [...prev, size]
                )}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  sizes.includes(size)
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className='flex items-center gap-3'>
          <input 
            onChange={(e) => setBestseller(e.target.checked)} 
            checked={bestseller}
            type="checkbox" 
            id="bestseller"
            className='w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2'
          />
          <label htmlFor="bestseller" className='text-sm font-medium text-gray-900 cursor-pointer'>
            Add to bestsellers
          </label>
        </div>

        {/* Submit Button */}
        <div className='pt-4 border-t border-gray-100'>
          <button 
            type="submit"
            disabled={isLoading}
            className='w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white py-3 px-8 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {isLoading ? (
              <>
                <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Adding Product...
              </>
            ) : (
              <>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add