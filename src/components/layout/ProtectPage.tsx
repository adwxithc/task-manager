
// import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import NavBar from '../NavBar'

function ProtectPage() {
    const {isAuth} = useSelector((state:RootState)=>state.user)

  return (
    <>
    <NavBar/>
    {isAuth?<Outlet />: <Navigate to='/' />}
    </>
  )
}

export default ProtectPage
