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
import CreateNetwork from "../pages/CreateNetwork";
import CreateCategory from "../pages/CreateCategory";
import ViewCategory from "../pages/ViewCategory";
import ViewNetwork from "../pages/ViewNetwork";
import ViewAdminList from "../pages/ViewAdminList";
import ViewAdvertiserList from "../pages/ViewAdvertiserList";
import ViewUserList from "../pages/ViewUserList";
import ProtectedRoutes from "../layouts/ProtectedRoutes";

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
    element:<RootLayout></RootLayout>,
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
        path: "/dashboard/create-network",
        element: <CreateNetwork></CreateNetwork>,
      },
      {
        path: "/dashboard/create-category",
        element: <CreateCategory></CreateCategory>,
      },
      {
        path: "/dashboard/view-category",
        element: <ViewCategory></ViewCategory>,
      },
      {
        path: "/dashboard/view-network",
        element: <ViewNetwork></ViewNetwork>,
      },
      {
        path: "/dashboard/create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
      {
        path: "/dashboard/view-admin",
        element: <ViewAdminList></ViewAdminList>,
      },
      {
        path: "/dashboard/create-advertiser",
        element: <CreateAdvertiser></CreateAdvertiser>,
      },
      {
        path: "/dashboard/view-advertiser",
        element: <ViewAdvertiserList></ViewAdvertiserList>,
      },
      {
        path: "/dashboard/create-user",
        element: <CreateUser></CreateUser>,
      },
      {
        path: "/dashboard/view-user",
        element: <ViewUserList></ViewUserList>,
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
