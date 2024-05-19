import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import RootLayout from "../layouts/RootLayout";
import CreateOffer from "../pages/CreateOffer";
import Authentication from "../pages/Authentication";
import Login from "../auth/Login";
import Register from "../auth/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Default Route</h1>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/dashboard',
        element:<RootLayout></RootLayout>,
        children: [
            {
                path: '/dashboard/home',
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: '/dashboard/create-offer',
                element: <CreateOffer></CreateOffer>
            },
            {
                path: '/dashboard/authentication',
                element: <Authentication></Authentication>
            },
          
        ]
    }
])