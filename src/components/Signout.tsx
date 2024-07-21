import { useEffect } from "react"
import { useSignOutMutation } from "../redux/feature/authApiSlice"
import { useDispatch } from "react-redux"
import { removeCridentials } from "../redux/feature/userSlice"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"

function Signout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signout] =useSignOutMutation()
    useEffect(()=>{
        const logout=async()=>{
            await signout()
            dispatch(removeCridentials())
            navigate('/')
        }
        logout()
    },[dispatch, navigate, signout])
  return (
    <div>
      <Loading />
    </div>
  )
}

export default Signout
