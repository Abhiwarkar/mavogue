
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux' 
import { store } from './store' 
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify'

const App = () => {
  return (
  
    <Provider store={store}>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        {/* Toast notifications */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} /> 
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  )
}

export default App