import React from 'react'
import { Login } from './components/user/Login'
import {BrowserRouter as Router, Routes, Route, Link, useLocation}  from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import  {ToastContainer} from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'
import Product from './components/Product'
import Home from './components/Home'
import User from './components/User'
import View from './components/View'
import Hompage from './components/Client/Hompage'
import Navbar from './components/Client/Navbar'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
import ClientLogin from './components/Client/ClientLogin'
import Cart from './components/Client/Cart'
import ProductDetail from './components/Client/ProductDetail'
import Address from './components/Client/Address'
import Checkout from './components/Client/Checkout'
import OrderConfirm from './components/Client/OrderConfirm'
import SearchProduct from './components/Client/SearchProduct'
import ClientRegister from './components/Client/ClientRegister'
import Footer from './components/Client/footer'
import About from './components/Client/about'
import Scrolltop from './components/Client/Scrolltop'

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you’re looking for doesn’t exist.</p>
  </div>
)


const App = () => {
  const location = useLocation()
  const hideNavbarRoutes = ['/','/clientlogin', '/cart','/productdetail', '/shipping','/checkout','/orderconfirmation','/clientregister', '/about']
  const shouldShowNavbar = hideNavbarRoutes.some(route =>
  location.pathname === route || location.pathname.startsWith('/productdetail/')
);
  return (
    <>
    {/* MAKE ROUTE HERE */}
    <ToastContainer/>
        <Scrolltop />
    {shouldShowNavbar && <Navbar/>}
      <Routes>
        <Route path='/' element={<Hompage />} />
        <Route path='/clientlogin' element={<ClientLogin/>} />
        <Route path='/clientregister' element={<ClientRegister/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/productdetail/:id' element={<ProductDetail/>} />
        <Route path='/productdetail/search/:key' element={<SearchProduct/>} />
        <Route path='/shipping' element={<Address/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/orderconfirmation' element={<OrderConfirm/>} />
        <Route path='/about' element={<About/>} />
        
        
        <Route path='/admin' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path='product' element={<Product/>} />  
            <Route path='user' element={<User/>} />  
            <Route path='view' element={<View/>} /> 
            <Route path='addproduct' element={<AddProduct/>} /> 
            <Route path='eddproduct/:id' element={<EditProduct/>} /> 
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    {shouldShowNavbar && <Footer/>}

    </>
  )
}

export default App