
import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './component/sidebar/Sidebar.jsx'
import AddIteam from './page/add product/AddIteam.jsx'
import AdminLogin from './page/admin login/AdminLogin.jsx'
import Orders from './page/orders/Orders.jsx'
import Product from './page/products/Product.jsx'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'

export const backEndUrl= import.meta.env.VITE_BACKEND_URL;

function App() {

  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");

  useEffect(()=>{
    localStorage.setItem("token",token);
  },[token])
  return (

    <div className="App">
      <ToastContainer></ToastContainer>
      {token === "" ? <AdminLogin setToken={setToken}></AdminLogin> : <>
        <Sidebar setToken={setToken}></Sidebar>
        <Routes>
          <Route path='/admin/iteamList' element={<Product></Product>}></Route>
          <Route path='/admin/addIteams' element={<AddIteam></AddIteam>}></Route>
          <Route path='/admin/orders' element={<Orders></Orders>}></Route>
        </Routes>
      </>}

    </div>
  )
}

export default App
