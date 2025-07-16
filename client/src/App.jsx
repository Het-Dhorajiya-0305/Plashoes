import './App.css'
import Home from './pages/home/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import ContactUs from './component/contact_us/ContactUs.jsx';
import Men from './pages/men/Men.jsx';
import Women from './pages/women/Women.jsx';
import SingIn from './pages/sing_in/SingIn.jsx';
import Cart from './pages/cart/Cart.jsx';
import Product from './pages/product/Product.jsx';
import CheckOut from './pages/checkout/CheckOut.jsx';
import Navbar from './component/navbar/Navbar.jsx';
import { ToastContainer, } from 'react-toastify'
import Orders from './pages/order/Orders.jsx';
import Verify from './pages/verify/Verify.jsx';
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext.jsx';
import Auth from './pages/auth/Auth.jsx';
import ForgotPassword from './pages/forgotPassword/ForgotPassword.jsx';
import ResetPassword from './pages/resetPassword/ResetPassword.jsx';


export const backEndUrl = import.meta.env.VITE_BACKEND_URL;

function App() {



  return (
    <>
      <div className="app">
        <ToastContainer></ToastContainer>
        <div className="">
          <Routes>
            <Route path='/user/register' element={<SingIn />}></Route>
          </Routes>
        </div>
        <div className="">
          <Navbar></Navbar>
          <Routes>
            <Route path='/oauth/success' element={<Auth></Auth>}></Route>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/men' element={<Men />}></Route>
            <Route path='/women' element={<Women />}></Route>
            <Route path='/contactus' element={<ContactUs />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/product/:pro_id' element={<Product />}></Route>
            <Route path='/checkout' element={<CheckOut></CheckOut>}></Route>
            <Route path='/orders' element={<Orders></Orders>}></Route>
            <Route path='/verify' element={<Verify></Verify>}></Route>
            <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
            <Route path='/reset-password/:token' element={<ResetPassword></ResetPassword>}></Route>

          </Routes>
        </div>

      </div>

    </>
  )
}

export default App;