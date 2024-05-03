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
import InitialHome from './components/pages/Home/InitialHome'
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute'
import AdminHome from './components/pages/Admin/AdminHome'

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
          </Route>
        </Route>
        <Route element={<ProtectedAdminRoute/>}>
          <Route path='/admin' element={<AdminHome/>}>

          </Route>
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
