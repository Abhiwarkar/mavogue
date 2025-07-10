import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toggleWishlist, selectIsInWishlist } from '../store/slices/wishlistSlice'

const ProductItem = ({ id, image, name, price }) => {
    
    const { currency, addToCart } = useContext(ShopContext);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    // Redux for wishlist
    const dispatch = useDispatch()
    const isInWishlist = useSelector(selectIsInWishlist(id))

    const handleAddToCart = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        
    
        addToCart(id, "M");
        
        // Show success toast
        toast.success(`${name} added to cart successfully!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };
    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        
        console.log('Wishlist button clicked!', { id, name, isInWishlist });
        
        const product = { 
            _id: id, 
            name, 
            price, 
            image, 
            category: "Fashion", 
            subCategory: "Clothing" 
        }
        
        dispatch(toggleWishlist(product))
    
        if (isInWishlist) {
            toast.info(`${name} removed from wishlist`)
        } else {
            toast.success(`${name} added to wishlist!`)
        }
    }

    return (
        <div className='group block relative'>
            {/* Product Card */}
            <div className='bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 border border-gray-100 hover:border-gray-200'>
                
                {/* image container */}
                <div className='relative overflow-hidden bg-gray-50 aspect-[3/4]'>
                    {/* Loading state */}
                    {!imageLoaded && (
                        <div className='absolute inset-0 bg-gray-200 animate-pulse'></div>
                    )}
                    
                    {/* Product image */}
                    <Link 
                        to={`/product/${id}`}
                        onClick={() => scrollTo(0, 0)}
                        className='block w-full h-full'
                    >
                        <img 
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                                imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            src={image[0]} 
                            alt={name}
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x500/f3f4f6/9ca3af?text=Product';
                            }}
                        />
                    </Link>
                    
                    {/* Wishlist button*/}
                    <button
                        onClick={handleWishlistToggle}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
                            isInWishlist 
                                ? 'bg-red-500 text-white shadow-lg hover:bg-red-600' 
                                : 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 shadow-md'
                        }`}
                        style={{ pointerEvents: 'auto' }} 
                    >
                        <svg 
                            className='w-4 h-4' 
                            fill={isInWishlist ? 'currentColor' : 'none'} 
                            stroke='currentColor' 
                            viewBox='0 0 24 24'
                        >
                            <path 
                                strokeLinecap='round' 
                                strokeLinejoin='round' 
                                strokeWidth={2} 
                                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' 
                            />
                        </svg>
                    </button>
                    
                    {/* Add to Cart Button  */}
                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto'>
                        <button 
                            onClick={handleAddToCart}
                            className='bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0 pointer-events-auto'
                        >
                            Add to Cart
                        </button>
                    </div>
                    
                    {/*  price badge */}
                    <div className='absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-sm font-medium'>
                        {currency}{price}
                    </div>
                </div>
                
                {/*product info*/}
                <Link 
                    to={`/product/${id}`}
                    onClick={() => scrollTo(0, 0)}
                    className='block p-5 space-y-3'
                >
                    {/* Product name */}
                    <h3 className='text-gray-900 font-medium text-base leading-tight line-clamp-2 group-hover:text-black transition-colors duration-300'>
                        {name}
                    </h3>
                    
                    {/* rating */}
                    <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full ${i < 4 ? 'bg-black' : 'bg-gray-200'}`}></div>
                        ))}
                        <span className='text-sm text-gray-500 ml-2'>(4.0)</span>
                    </div>
                    
                    {/* price display */}
                    <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                            <div className='text-xl font-semibold text-black'>
                                {currency}{price}
                            </div>
                            <div className='text-sm text-gray-400 line-through'>
                                {currency}{Math.floor(price * 1.2)}
                            </div>
                        </div>
                        
                        {/* add button */}
                        <button 
                            onClick={handleAddToCart}
                            className='w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 z-10'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                            </svg>
                        </button>
                    </div>
                    
                    {/*  features */}
                    <div className='flex gap-2 pt-2'>
                        <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium'>
                            Free Shipping
                        </span>
                        <span className='px-2 py-1 bg-green-50 text-green-700 text-xs rounded font-medium'>
                            In Stock
                        </span>
                        {isInWishlist && (
                            <span className='px-2 py-1 bg-red-50 text-red-700 text-xs rounded font-medium'>
                                ❤️ Wishlist
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProductItem