import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const isLogged = useSelector(state=>state.auth.isLogged)
return (
    isLogged ? <Navigate to='/user'/> :<Outlet/> 
  )
}

export default AuthRoute