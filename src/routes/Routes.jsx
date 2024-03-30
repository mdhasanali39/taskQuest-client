import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import TaskManagement from "../pages/TaskManagement/TaskManagement";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        errorElement:<div>page not found</div>,
        children:[
            {
                index:true,
                element: <Home/>
            },
            {
                path:'task-management',
                element: <TaskManagement/>
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path:'register',
                element: <Register/>
            },

        ]
    }
])