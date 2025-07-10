import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black'>
      

      {/*  grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className='container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10'>
        {/* Hero Left Side */}
        <div className='space-y-8 text-white'>
          {/*  typography */}
          <div className='space-y-6'>
            <h1 className='text-6xl lg:text-7xl xl:text-8xl font-light leading-tight'>
              <span className='block text-white prata-regular'>Fashion</span>
              <span className='block text-gray-300 font-extralight'>Redefined</span>
            </h1>
            
            <p className='text-lg text-gray-300 max-w-lg leading-relaxed font-light'>
              Curated excellence for those who demand nothing but the finest. 
              Where luxury meets style, crafted for the elite.
            </p>
          </div>
          
          {/*  CTA */}
          <div className='pt-8'>
            <div className='group inline-flex items-center gap-3 cursor-pointer'>
              <span className='text-white font-medium tracking-wide text-lg'>SHOP NOW</span>
              <div className='w-12 h-[1px] bg-white group-hover:w-16 transition-all duration-500'></div>
              <svg className='w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5l7 7-7 7' />
              </svg>
            </div>
          </div>

          {/*  stats */}
          <div className='flex gap-12 pt-12 border-t border-white/10'>
            <div>
              <div className='text-2xl font-light text-white'>50K+</div>
              <div className='text-xs text-gray-400 uppercase tracking-wider'>Elite Members</div>
            </div>
            <div>
              <div className='text-2xl font-light text-white'>4.9★</div>
              <div className='text-xs text-gray-400 uppercase tracking-wider'>Excellence</div>
            </div>
            <div>
              <div className='text-2xl font-light text-white'>100%</div>
              <div className='text-xs text-gray-400 uppercase tracking-wider'>Authentic</div>
            </div>
          </div>
        </div>
        
        {/* Hero Right Side */}
        <div className='relative'>
          <div className='relative group'>
            {/* Subtle glow effect */}
            <div className='absolute -inset-4 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000'></div>
            
            {/* image container */}
            <div className='relative bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10'>
              <img 
                className='w-full h-[600px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.02]' 
                src={assets.hero_img} 
                alt="Premium Fashion Collection" 
              />
              
              {/*  badge  */}
              <div className='absolute top-6 right-6 bg-black/50 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20'>
                <div className='flex items-center gap-2'>
                  <span className='text-white text-sm font-medium'>Premium Collection</span>
                </div>
              </div>
              
              {/* Quality badge*/}
              <div className='absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20'>
                <div className='text-black text-sm'>
                  <div className='font-semibold'>Luxury Quality</div>
                  <div className='text-black/70'>Handpicked Selection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
        <div className='flex flex-col items-center gap-2 text-white/40'>
          <div className='w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent'></div>
          <div className='w-[1px] h-3 bg-white animate-bounce'></div>
        </div>
      </div>
    </div>
  )
}

export default Hero