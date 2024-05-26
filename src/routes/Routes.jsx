import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import RootLayout from "../layouts/RootLayout";
import CreateOffer from "../pages/CreateOffer";
import Authentication from "../pages/Authentication";
import Login from "../auth/Login";
import Register from "../auth/Register";
import OfferList from "../pages/OfferList";
import CreateAdmin from "../pages/CreateAdmin";
import CreateAdvertiser from "../pages/CreateAdvertiser";
import CreateUser from "../pages/CreateUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Default Route</h1>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/dashboard/home",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "/dashboard/create-offer",
        element: <CreateOffer></CreateOffer>,
      },
      {
        path: "/dashboard/create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
      {
        path: "/dashboard/create-advertiser",
        element: <CreateAdvertiser></CreateAdvertiser>,
      },
      {
        path: "/dashboard/create-user",
        element: <CreateUser></CreateUser>,
      },
      {
        path: "/dashboard/offer-list",
        element: <OfferList></OfferList>,
      },
      {
        path: "/dashboard/authentication",
        element: <Authentication></Authentication>,
      },
    ],
  },
]);
