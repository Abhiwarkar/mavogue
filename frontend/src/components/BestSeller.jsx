import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const bestProduct = products.filter((item) => (item.bestseller));
            setBestSeller(bestProduct.slice(0, 5));
            setIsLoading(false);
        }, 400);
    }, [products])

    return (
        <section className='py-20 bg-gray-50 relative overflow-hidden'>
        
            <div className="absolute top-10 right-10 w-24 h-24 border border-gray-200 rounded-full opacity-30"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-black/5 rounded-full"></div>
            
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                {/*  section header */}
                <div className='text-center mb-16 space-y-8'>
                    {/* crown badge */}
                    <div className='inline-flex items-center gap-3 px-4 py-2 bg-black text-white rounded-full'>
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                        <span className='text-xs font-medium tracking-widest uppercase'>Bestsellers</span>
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                    </div>
                    
                    <div className='space-y-6'>
                        <h2 className='text-5xl lg:text-6xl font-light text-black'>
                            <span className='block prata-regular'>Best </span>
                            <span className='block text-gray-600 font-extralight'>Sellers</span>
                        </h2>
                        
                        <p className='max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed font-light'>
                            Our most loved pieces, chosen by customers worldwide. These are the styles that define trends and elevate every wardrobe.
                        </p>
                    </div>
                    
                    {/* stats */}
                    <div className='flex items-center justify-center gap-12 pt-8'>
                        <div className='text-center group'>
                            <div className='text-3xl font-light text-black group-hover:scale-105 transition-transform duration-300'>
                                50K+
                            </div>
                            <div className='text-xs text-gray-500 uppercase tracking-wider'>Happy Customers</div>
                        </div>
                        <div className='w-px h-12 bg-gray-300'></div>
                        <div className='text-center group'>
                            <div className='text-3xl font-light text-black group-hover:scale-105 transition-transform duration-300'>
                                4.8★
                            </div>
                            <div className='text-xs text-gray-500 uppercase tracking-wider'>Average Rating</div>
                        </div>
                        <div className='w-px h-12 bg-gray-300'></div>
                        <div className='text-center group'>
                            <div className='text-3xl font-light text-black group-hover:scale-105 transition-transform duration-300'>
                                98%
                            </div>
                            <div className='text-xs text-gray-500 uppercase tracking-wider'>Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* Products grid */}
                {isLoading ? (
                    
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8'>
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className='group'>
                                <div className='bg-white rounded-lg overflow-hidden border border-gray-200'>
                                    <div className='aspect-[3/4] bg-gray-100 animate-pulse relative'>
                                        <div className='absolute top-4 left-4 w-12 h-6 bg-gray-200 rounded-full animate-pulse'></div>
                                        <div className='absolute top-4 right-4 w-6 h-6 bg-gray-200 rounded-full animate-pulse'></div>
                                    </div>
                                    <div className='p-5 space-y-3'>
                                        <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
                                        <div className='h-4 bg-gray-200 rounded w-2/3 animate-pulse'></div>
                                        <div className='h-6 bg-gray-200 rounded animate-pulse'></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8'>
                        {bestSeller.map((item, index) => (
                            <div 
                                key={index} 
                                className='relative opacity-0 animate-fadeInUp group'
                                style={{ 
                                    animationDelay: `${index * 150}ms`,
                                    animationFillMode: 'forwards'
                                }}
                            >
                                {/* ranking badge */}
                                <div className='absolute -top-2 -right-2 z-20'>
                                    <div className='w-8 h-8 bg-black text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm'>
                                        <span className='text-xs font-semibold'>#{index + 1}</span>
                                    </div>
                                </div>
                                
                                <ProductItem 
                                    id={item._id} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/*  CTA section */}
                <div className='mt-20'>
                    <div className='text-center bg-white rounded-2xl p-8 lg:p-12 border border-gray-200'>
                        <div className='space-y-6'>
                            <h3 className='text-3xl lg:text-4xl font-light text-black'>
                                Join thousands of satisfied customers
                            </h3>
                            <p className='text-gray-600 text-lg max-w-2xl mx-auto font-light'>
                                Experience the quality and style that makes these our bestselling pieces. 
                                Premium fashion that speaks your language.
                            </p>
                            
                            {/* Single  CTA */}
                            <div className='pt-6'>
                                <div className='group inline-flex items-center gap-3 cursor-pointer'>
                                    <span className='text-black font-medium tracking-wide text-lg'>SHOP BESTSELLERS</span>
                                    <div className='w-12 h-[1px] bg-black group-hover:w-16 transition-all duration-500'></div>
                                    <svg className='w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5l7 7-7 7' />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BestSeller