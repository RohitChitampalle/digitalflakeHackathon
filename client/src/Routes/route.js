import {
    createBrowserRouter
} from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import User from "../Components/User/User";
import Role from "../Components/Role/Role";
import Adduser from "../Components/User/Adduser/Adduser";

const router = createBrowserRouter(
    [

        {
            path: "/",
            element: <Dashboard />
        },
        {
            path: "/home",
            element: <Home />
        },
        {
            path: "/User",
            element: <User />
        }, 
        {
            path: "/Role",
            element: <Role />
        },{
            path:"/add/user",
            element: <Adduser />
        },{
            path:"/edit/user/:id",
            element:<Adduser/>
        }
    ]




)

export default router