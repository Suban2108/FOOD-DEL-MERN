import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'

import Home from './Pages/home/home'
import Cart from './Pages/cart/cart'
import PlaceOrder from './Pages/placeOrder/placeOrder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/loginPopup/LoginPopup'
import Verify from '../src/Pages/verify/verify'
import MyOrders from './Pages/MyOrders/MyOrders'

const App = () => {
  const[showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
