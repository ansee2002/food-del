import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Home/Cart/Cart'
import PlaceOrder from './Pages/Home/Cart/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import Address from './Pages/Address/Address'
import AddAddress from './Pages/Address/AddAddress'
import UpdateAddress from './Pages/Address/UpdateAddress'
import Profile from './Pages/Profile/Profile'
import FoodDetails from './Pages/Food/FoodDetails'
import ReviewedFoods from './Pages/Food/ReviewedFoods'

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path= '/' element={<Home/>} />
        <Route path ='/cart' element={<Cart/>} />
        <Route path ='/order' element={<PlaceOrder/>}/>
        <Route path ='/verify' element={<Verify/>}/>
        <Route path ='/myorders' element={<MyOrders/>}/>
        <Route path = '/address' element={<Address/>}/>
        <Route path = '/add-address' element={<AddAddress/>}/>
        <Route path = '/update-address/:addressId' element={<UpdateAddress/>}/>
        <Route path = '/profile' element={<Profile/>}/>
        <Route path = '/food/:id' element={<FoodDetails/>}/>
        <Route path = '/reviewed-foods' element={<ReviewedFoods/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  );
};

export default App