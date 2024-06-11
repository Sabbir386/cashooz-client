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
import EditOffer from "../pages/EditOffer";
import EditAdmin from "../pages/EditAdmin";

import EditAdvertiser from "../pages/EditAdvertiser";
import EditUser from "../pages/EditUser";
import EditNetwork from "../pages/EditNetwork";
import EditCategory from "../pages/EditCategory";

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
        path: "/dashboard",
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
        path: "/dashboard/edit-category/:id",
        element: <EditCategory></EditCategory>,
      },
      {
        path: "/dashboard/view-network",
        element: <ViewNetwork></ViewNetwork>,
      },
      {
        path: "/dashboard/edit-network/:id",
        element: <EditNetwork></EditNetwork>,
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
        path: "/dashboard/edit-admin/:id",
        element: <EditAdmin></EditAdmin>,
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
        path: "/dashboard/edit-advertiser/:id",
        element: <EditAdvertiser></EditAdvertiser>,
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
        path: "/dashboard/edit-user/:id",
        element: <EditUser></EditUser>,
      },

      {
        path: "/dashboard/offer-list",
        element: <OfferList></OfferList>,
      },
      {
        path: "/dashboard/edit-offer/:id",
        element: <EditOffer></EditOffer>,
      },
      {
        path: "/dashboard/authentication",
        element: <Authentication></Authentication>,
      },
    ],
  },
]);
