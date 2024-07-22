
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../NavBar'

function PublicLayout() {
    const {isAuth} = useSelector((state:RootState)=>state.user)
  return (
    <>
    <NavBar/>
    {isAuth?< Navigate to='/tasks' /> :<Outlet />}
    </>
  )
}

export default PublicLayout
