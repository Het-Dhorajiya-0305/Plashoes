
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
      <Routes>
        <Route path='/admin' element={<Sidebar></Sidebar>}></Route>
        <Route path='/iteamList' element={<Product></Product>}></Route>
        <Route path='/addIteams' element={<AddIteam></AddIteam>}></Route>
        <Route path='/orders' element={<Orders></Orders>}></Route>
        <Route path='/adminLogin' element={<AdminLogin></AdminLogin>}></Route>
      </Routes>
    </div>
  )
}

export default App
