
import './App.css'
import Sidebar from './component/sidebar/Sidebar.jsx'
import AddIteam from './page/add product/AddIteam.jsx'
import AdminLogin from './page/admin login/AdminLogin.jsx'
import Orders from './page/orders/Orders.jsx'
import Product from './page/products/Product.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (

    <div className="App">
      <Sidebar></Sidebar>
      <Routes>
        <Route path='/admin' element={<Sidebar></Sidebar>}></Route>
        <Route path='/admin/iteamList' element={<Product></Product>}></Route>
        <Route path='/admin/addIteams' element={<AddIteam></AddIteam>}></Route>
        <Route path='/admin/orders' element={<Orders></Orders>}></Route>
        <Route path='/admin/login' element={<AdminLogin></AdminLogin>}></Route>
      </Routes>
    </div>
  )
}

export default App
