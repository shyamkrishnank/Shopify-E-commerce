import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/pages/InitialPages/Landing'
import LoginPage from './components/pages/InitialPages/LoginPage'
import Init from './components/pages/InitialPages/Init'
import SignupPage from './components/pages/InitialPages/SignupPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/auth/ProtectedRoute'
import AuthRoute from './components/auth/AuthRoute'
import InitialHome from './components/pages/User/InitialHome'
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute'
import AdminHome from './components/pages/Admin/AdminHome'
import AdminSport from './components/pages/Admin/AdminSport'
import AdminInitial from './components/pages/Admin/AdminInitial'
import AdminProCat from './components/pages/Admin/AdminProCat'
import ProductCat from './components/pages/Admin/ProductCat'
import AdminProductHome from './components/pages/Admin/AdminProductHome'
import UserHome from './components/pages/User/UserHome'
import Sports from './components/pages/User/Sports'
import ProductDetial from './components/pages/User/ProductDetial'
import Cart from './components/pages/User/Cart'
import ProfilePage from './components/pages/User/ProfilePage'
import Checkout from './components/pages/User/Checkout'
import Orders from './components/pages/User/Orders'
import OrderDetails from './components/pages/User/OrderDetails'
import OrdersPage from './components/pages/Admin/OrdersPage'
import AdminOrderDetails from './components/pages/Admin/AdOrderDetails'
import AdOrderDetails from './components/pages/Admin/AdOrderDetails'

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route element={<AuthRoute />}>
        <Route path='/' element={<Init />} >
          <Route index element={<LandingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>
        </Route>

        <Route element={<ProtectedRoute/>} >
          <Route path='/user' element={<InitialHome />}>
            <Route index element={<UserHome />}/>
            <Route path='sports' >
               <Route path=':sportId' element={<Sports />}/>
            </Route>
            <Route path='orders'>
               <Route index element={<Orders/>} />
                <Route path=':orderId' element={<OrderDetails />} />
            </Route>
            <Route path='product'>
              <Route path=':productId' element={<ProductDetial/>}/>
            </Route>
            <Route path='cart'>
               <Route index element={<Cart/>} />
               <Route path="checkout" element={<Checkout />} />
            </Route>
            <Route path='profile'>
               <Route index element={<ProfilePage/>} />
            </Route>
          </Route>
        </Route>
        <Route element={<ProtectedAdminRoute/>}>
          <Route path='/admin' element={<AdminInitial />} >
            <Route index element={<AdminHome />}/>
              <Route path='sportscategory' element={<AdminSport/>}/>
              <Route path='productcategory'>
                  <Route index element={<AdminProCat/>} />
                  <Route path=':sportId' element={<ProductCat/>} /> 
              </Route>
              <Route path='product'>
                  <Route path=':catgoryId' element={<AdminProductHome/>} />
              </Route> 
              <Route path='orders' >
                <Route index element={<OrdersPage />} />
                <Route path=':orderId' element={<AdOrderDetails />}/>
              </Route>

          </Route>
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
