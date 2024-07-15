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
import Landing from "../pages/Landing/Landing";
import SurveyList from "../pages/SurveyList";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import NotFound from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing></Landing>,
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
        element: (
          <ProtectedRoutes>
            <AdminDashboard></AdminDashboard>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-offer",
        element: (
          <ProtectedRoutes>
            <CreateOffer></CreateOffer>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-network",
        element: (
          <ProtectedRoutes>
            <CreateNetwork></CreateNetwork>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-category",
        element: (
          <ProtectedRoutes>
            <CreateCategory></CreateCategory>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/view-category",
        element: (
          <ProtectedRoutes>
            <ViewCategory></ViewCategory>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/edit-category/:id",
        element: (
          <ProtectedRoutes>
            {" "}
            <EditCategory></EditCategory>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/view-network",
        element: (
          <ProtectedRoutes>
            <ViewNetwork></ViewNetwork>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/edit-network/:id",
        element: (
          <ProtectedRoutes>
            <EditNetwork></EditNetwork>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-admin",
        element: (
          <ProtectedRoutes>
            <CreateAdmin></CreateAdmin>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/view-admin",
        element: (
          <ProtectedRoutes>
            <ViewAdminList></ViewAdminList>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/edit-admin/:id",
        element: (
          <ProtectedRoutes>
            <EditAdmin></EditAdmin>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-advertiser",
        element: (
          <ProtectedRoutes>
            <CreateAdvertiser></CreateAdvertiser>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/view-advertiser",
        element: (
          <ProtectedRoutes>
            <ViewAdvertiserList></ViewAdvertiserList>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/edit-advertiser/:id",
        element: (
          <ProtectedRoutes>
            <EditAdvertiser></EditAdvertiser>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-user",
        element: (
          <ProtectedRoutes>
            <CreateUser></CreateUser>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/view-user",
        element: (
          <ProtectedRoutes>
            <ViewUserList></ViewUserList>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/edit-user/:id",
        element: (
          <ProtectedRoutes>
            <EditUser></EditUser>
          </ProtectedRoutes>
        ),
      },

      {
        path: "/dashboard/offer-list",
        element: (
          <ProtectedRoutes>
            <OfferList></OfferList>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/view-offer/:id",
        element: (
          <ProtectedRoutes>
            <DetailsPage></DetailsPage>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/edit-offer/:id",
        element: (
          <ProtectedRoutes>
            <EditOffer></EditOffer>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/authentication",
        element: <Authentication></Authentication>,
      },
      {
        path: "/dashboard/survey-list",
        element: <SurveyList></SurveyList>,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound></NotFound>,
  },
]);
