import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      
      {/* Hero Section  */}
      <div className='relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden'>
      
        <div className='absolute top-20 right-20 w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-30'></div>
        <div className='absolute bottom-20 left-20 w-32 h-32 bg-gray-300 rounded-full blur-2xl opacity-20'></div>
        
        <div className='relative z-10 container mx-auto px-4 text-center'>
          <div className='mb-8 hover:scale-105 transition-transform duration-300'>
            <Title text1={'ABOUT'} text2={'MAVOGUE'} />
          </div>
          <p className='text-2xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed'>
            Where fashion meets innovation and style becomes personal
          </p>
          <div className='w-20 h-1 bg-gray-900 mx-auto mt-8 rounded-full'></div>
        </div>
      </div>

      {/* Story Section */}
      <div className='py-24 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            
            {/* Image with hover effect */}
            <div className='relative group'>
              <div className='overflow-hidden rounded-xl shadow-xl'>
                <img 
                  className='w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110' 
                  src={assets.about_img} 
                  alt="Our Story" 
                />
              </div>
              {/* Floating badge */}
              <div className='absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-2xl border-4 border-gray-100 transform group-hover:-translate-y-2 transition-all duration-300'>
                <div className='text-3xl font-bold text-gray-900'>2024</div>
                <div className='text-sm text-gray-500 font-medium'>FOUNDED</div>
              </div>
            </div>

            {/* Content */}
            <div className='space-y-8'>
              <div>
                <h3 className='text-4xl font-light text-gray-900 mb-6'>Our Journey</h3>
                <div className='w-16 h-1 bg-gray-900 rounded-full mb-8'></div>
              </div>
              
              <p className='text-xl text-gray-600 leading-relaxed'>
                <span className='font-semibold text-gray-900'>Mavogue</span> was created with a mission to democratize fashion. 
                We believe that great style should be accessible, authentic, and effortlessly elegant.
              </p>
              
              <p className='text-lg text-gray-600 leading-relaxed'>
                Every piece in our collection is handpicked for its quality, design, and versatility. 
                We're building more than just a store – we're creating a community of style enthusiasts.
              </p>

              {/* Mission box  */}
              <div className='bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl border-l-4 border-gray-900 hover:shadow-lg transition-all duration-300'>
                <h4 className='font-semibold text-gray-900 mb-4 text-lg'>Our Vision</h4>
                <p className='text-gray-700 leading-relaxed'>
                  To empower individuals through fashion, making quality style accessible while celebrating unique personal expression and authentic self-confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className='py-24 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <Title text1={'WHY'} text2={'MAVOGUE'} />
            <p className='text-gray-600 mt-4 text-lg'>What sets us apart</p>
          </div>

          <div className='grid md:grid-cols-3 gap-10'>
            
            {/* Quality Card */}
            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100'>
              <div className='w-16 h-16 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Premium Quality</h3>
              <p className='text-gray-600 leading-relaxed'>
                Every product undergoes strict quality checks to ensure superior craftsmanship and long-lasting durability that exceeds expectations.
              </p>
            </div>

            {/* Experience Card */}
            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100'>
              <div className='w-16 h-16 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Fast & Reliable</h3>
              <p className='text-gray-600 leading-relaxed'>
                Lightning-fast delivery and responsive customer service ensure your shopping experience is smooth, secure, and satisfying every time.
              </p>
            </div>

            {/* Community Card */}
            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100'>
              <div className='w-16 h-16 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Customer First</h3>
              <p className='text-gray-600 leading-relaxed'>
                Our dedicated support team and easy return policy put your satisfaction first, building lasting relationships with every customer.
              </p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Quote Section */}
      <div className='py-20 bg-white'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <blockquote className='text-3xl md:text-4xl font-light text-gray-800 italic mb-8 leading-relaxed'>
            "Fashion is about dressing according to what's fashionable. Style is more about being yourself."
          </blockquote>
          <div className='w-16 h-1 bg-gray-400 mx-auto mb-4 rounded-full'></div>
          <cite className='text-gray-600 not-italic font-medium'>Oscar de la Renta</cite>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About