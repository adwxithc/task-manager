// import { lazy } from "react";
import { RouteObject } from 'react-router-dom';
import NotionKanban from "../pages/NotionKanban";
import ProtectPage from "../components/layout/ProtectPage";
import Signout from '../components/Signout';



const privateRoutes:RouteObject[]=[
    {
        
        path:"",
        Component:ProtectPage,
        children:[
            {
                path:'/tasks',
                Component:NotionKanban
            },
            {
                path:'/signout',
                Component: Signout
            }
         
        ]
    }
]

export default privateRoutes;