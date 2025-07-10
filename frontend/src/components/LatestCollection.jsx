import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setLatestProducts(products.slice(0, 10));
            setIsLoading(false);
        }, 300);
    }, [products])

    return (
        <section className='py-20 bg-white relative overflow-hidden'>
            {/*  background elements */}
            <div className="absolute top-0 right-0 w-px h-32 bg-gray-200"></div>
            <div className="absolute bottom-0 left-0 w-32 h-px bg-gray-200"></div>
            
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
                {/* section header */}
                <div className='text-center mb-16 space-y-8'>
                    {/*  badge */}
                    <div className='inline-flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-full'>
                        <div className='w-1 h-1 bg-black rounded-full'></div>
                        <span className='text-xs font-medium tracking-widest text-gray-600 uppercase'>New Arrivals</span>
                        <div className='w-1 h-1 bg-black rounded-full'></div>
                    </div>
                    
                    {/* typography */}
                    <div className='space-y-4'>
                        <h2 className='text-5xl lg:text-6xl font-light text-black'>
                            <span className='block prata-regular'>Latest </span>
                            <span className='block text-gray-600 font-extralight'>Collections</span>
                        </h2>
                        
                        <p className='max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed font-light'>
                            Discover our carefully curated selection of the finest fashion pieces, 
                            handpicked for the modern wardrobe.
                        </p>
                    </div>

                    {/*  stats */}
                    <div className='flex items-center justify-center gap-12 pt-8'>
                        <div className='text-center'>
                            <div className='text-2xl font-light text-black'>{products.length}+</div>
                            <div className='text-xs text-gray-500 uppercase tracking-wider'>Products</div>
                        </div>
                        <div className='w-px h-8 bg-gray-200'></div>
                        <div className='text-center'>
                            <div className='text-2xl font-light text-black'>100%</div>
                            <div className='text-xs text-gray-500 uppercase tracking-wider'>Authentic</div>
                        </div>
                        <div className='w-px h-8 bg-gray-200'></div>
                        <div className='text-center'>
                            <div className='text-2xl font-light text-black'>24/7</div>
                            <div className='text-xs text-gray-500 uppercase tracking-wider'>Support</div>
                        </div>
                    </div>
                </div>

                {/* Products grid */}
                {isLoading ? (
                    
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8'>
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className='group'>
                                <div className='bg-white rounded-lg overflow-hidden border border-gray-100'>
                                    <div className='aspect-[3/4] bg-gray-100 animate-pulse'></div>
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
                        {latestProducts.map((item, index) => (
                            <div 
                                key={index} 
                                className='opacity-0 animate-fadeInUp'
                                style={{ 
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: 'forwards'
                                }}
                            >
                                <ProductItem 
                                    id={item._id} 
                                    image={item.image} 
                                    name={item.name} 
                                    price={item.price} 
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default LatestCollection