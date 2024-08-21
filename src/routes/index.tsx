import { RouteObject } from "react-router";
import Boards from "../pages/Boards";
import Layout from "../Layout";

const routes:RouteObject[]=[
    {
        path:"/",
        element:<Layout />,
        children:[
            {children:[{
                path:"",
                element:<Boards />
            }]}
        ]
    }
]


export default routes