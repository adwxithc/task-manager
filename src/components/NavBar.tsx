import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Link } from "react-router-dom"

function NavBar() {
    const {isAuth} = useSelector((state:RootState)=>state.user)

  return (
    <div className="bg-neutral-900 h-16 w-full text-neutral-50 flex justify-between items-center px-8 fixed top-0">
        <h2 className="font-bold text-lg">DOIT</h2>
        <div >
        {
            isAuth?
            <Link to="/signout" className="cursor-pointer hover:bg-neutral-950 transition-colors p-3 rounded text-center align-middle backdrop-blur-md">Logout</Link>
            :
            (
                <>
                <Link to="/"  className="cursor-pointer  hover:bg-neutral-950 transition-colors p-3 rounded text-center align-middle backdrop-blur-md" >Login</Link>
                <Link to="/signup" className="cursor-pointer hover:bg-neutral-950 transition-colors p-3 rounded text-center align-middle backdrop-blur-md" >Signup</Link>
                </>
            )
        }
        </div>
        
       
      
    </div>
  )
}

export default NavBar
