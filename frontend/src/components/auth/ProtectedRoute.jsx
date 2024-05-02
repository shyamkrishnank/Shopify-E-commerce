import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = () => {
    const isLogged = useSelector(state=>state.auth.isLogged)
return (
    isLogged ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoute