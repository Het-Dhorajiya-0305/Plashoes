
import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './component/sidebar/Sidebar.jsx'
import AddIteam from './page/add product/AddIteam.jsx'
import AdminLogin from './page/admin login/AdminLogin.jsx'
import Orders from './page/orders/Orders.jsx'
import Product from './page/products/Product.jsx'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export const backEndUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    setToken(localStorage.getItem('adminToken'));
  },[]);


  return (

    <div className="App">
      <ToastContainer></ToastContainer>
      <Sidebar token={token} setToken={setToken}></Sidebar>
      <Routes>
        <Route path='/admin/iteamList' element={<Product token={token}></Product>}></Route>
        <Route path='/admin/addIteams' element={<AddIteam token={token}></AddIteam>}></Route>
        <Route path='/admin/orders' element={<Orders token={token}></Orders>}></Route>
        <Route path='/admin/login' element={<AdminLogin setToken={setToken}></AdminLogin>}></Route>

      </Routes>
    </div>
  )
}

export default App
