import { lazy } from "react";
import { RouteObject } from 'react-router-dom';
import PublicLayout from "../components/layout/PublicLayout";



const VerifyOtp= lazy(()=>import("../pages/VerifyOtp"))
const  Signin = lazy(()=>import("../pages/Signin")) ;
const  Signup = lazy(()=>import("../pages/Signup")) ;



const publicRoutes:RouteObject[]=[
    {
        // id:"root",
        path:'/',
        Component:PublicLayout,
        children:[
            {
                id:"root",
                path:"/",
                Component:Signin
            },
            {
                path:"/signup",
                Component:Signup
            },
            {
                path:"/verify-otp",
                Component:VerifyOtp
            }
        ]
    }
    
]

export default publicRoutes;