// routes/Routes.jsx
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
import AllSurveyList from "../pages/AllSurveyList";
// import DetailsPage from "../pages/DetailsPage/DetailsPage";
import NotFound from "../pages/NotFound/NotFound";
import AdvertiserRegister from "../auth/AdvertiserRegister";
import Payment from "../pages/Payment/payment";
import Profile from "../pages/Profile/Profile";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Reward from "../rewards/Reward";
import Affiliate from "../pages/Affiliate/Affiliate";
import TermsAndConditions from "../pages/Terms&Conditions/TermsAndConditions";
import EditProfile from "../pages/Profile/EditProfile";
import NewPayment from "../pages/NewPyment/NewPayment";
import PaypalBox from "../pages/Payment/PaypalBox";
import ResetPasswod from "../auth/ResetPasswod";
import ConfirmReset from "../auth/ConfirmReset";
import WithdrawlHistory from "../pages/Withdrawl/WithdrawlHistory";
import PrivecyPolicy from "../pages/PrivecyPolicy/PrivecyPolicy";
import Aboutus from "../pages/Aboutus/Aboutus";
import SocialMediaPage from "../pages/SocialMedia/SocialMedia";
import LandingLayout from "../layouts/LandingLayout";
import ViewAllNetworkOffers from "../pages/OfferView/ViewAllNetworkOffers";
import VerifyEmail from "../pages/registrationVerification/VerifyEmail";
import Faq from "../pages/Landing/component/Faq";
import Blog from "../pages/Blog/Blog";
import SingleBlog from "../pages/Blog/SingleBlog";
import CreateFaq from "../pages/CreateFaq";
import FaqList from "../pages/FaqList";
import BlogCategoryList from "../pages/BlogCategoryList";
import BlogList from "../pages/BlogList";
import CreateBlog from "../pages/CreateBlog";
import FaqDetails from "../pages/Landing/component/FaqDetails";
import CreateBlogCategory from "../pages/CreateBlogCategory";
import CategoryBlog from "../pages/Blog/CategoryBlog";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout></LandingLayout>,
    children: [
      {
        path: "/",
        element: <Landing></Landing>,
      },
      {
        path: "/login",
        element: (
          <ProtectedRoutes>
            <Login></Login>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/auth/forgot-password",

        element: <ResetPasswod></ResetPasswod>,
      },
      {
        path: "/auth/reset-password",
        element: <ConfirmReset></ConfirmReset>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail></VerifyEmail>,
      },
      {
        path: "/advertiser-register",
        element: <AdvertiserRegister></AdvertiserRegister>,
      },
      {
        path: "/privecy-policy",
        element: <PrivecyPolicy></PrivecyPolicy>,
      },
      {
        path: "/aboutus",
        element: <Aboutus></Aboutus>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/blog/category/:id",
        element: <CategoryBlog></CategoryBlog>,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog></SingleBlog>,
      },
      {

        path: "/faq",
        element: <Faq></Faq>,
      },
      {

        path: "/faq/:id",
        element: <FaqDetails></FaqDetails>,
      },
      {


        path: "/termsncondition",
        element: <TermsAndConditions></TermsAndConditions>,
      },
    ],
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
        path: "/dashboard/offers/:networkId",
        element: (
          <ProtectedRoutes>
            <ViewAllNetworkOffers></ViewAllNetworkOffers>
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
        path: "/dashboard/create-faq",
        element: (
          <ProtectedRoutes>
            <CreateFaq></CreateFaq>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-blog-category",
        element: (
          <ProtectedRoutes>
            <CreateBlogCategory></CreateBlogCategory>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-blog",
        element: (
          <ProtectedRoutes>
            <CreateBlog></CreateBlog>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/create-faq",
        element: (
          <ProtectedRoutes>
            <CreateFaq></CreateFaq>
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
        path: "/dashboard/social-media-post",
        element: (
          <ProtectedRoutes>
            <SocialMediaPage></SocialMediaPage>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/withdrawl-list",
        element: (
          <ProtectedRoutes>
            <WithdrawlHistory></WithdrawlHistory>
          </ProtectedRoutes>
        ),
      },

      // {
      //   path: "/dashboard/edit-profile",
      //   element: (
      //     <ProtectedRoutes>
      //       <EditProfile></EditProfile>
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: "/dashboard/create-advertiser",
      //   element: (
      //     <ProtectedRoutes>
      //       <CreateAdvertiser></CreateAdvertiser>
      //     </ProtectedRoutes>
      //   ),
      // },
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
      // {
      //   path: "/dashboard/create-user",
      //   element: (
      //     <ProtectedRoutes>
      //       <CreateUser></CreateUser>
      //     </ProtectedRoutes>
      //   ),
      // },
      {
        path: "/dashboard/user-profile",
        element: (
          <ProtectedRoutes>
            <Profile></Profile>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/leaderboard",
        element: (
          <ProtectedRoutes>
            <Leaderboard></Leaderboard>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <ProtectedRoutes>
            <Payment></Payment>
            {/* <NewPayment></NewPayment> */}
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/payment-paypal",
        element: (
          <ProtectedRoutes>
            <PaypalBox></PaypalBox>
            {/* <NewPayment></NewPayment> */}
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/new-payment",
        element: (
          <ProtectedRoutes>
            <NewPayment></NewPayment>
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
        path: "/dashboard/faq-list",
        element: (
          <ProtectedRoutes>
            <FaqList></FaqList>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/blog-category-list",
        element: (
          <ProtectedRoutes>
            < BlogCategoryList/>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dashboard/blog-list",
        element: (
          <ProtectedRoutes>
            <BlogList/>
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: "/dashboard/view-offer/:id",
      //   element: (
      //     <ProtectedRoutes>
      //       <DetailsPage></DetailsPage>
      //     </ProtectedRoutes>
      //   ),
      // },
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
      {
        path: "/dashboard/survey-list/all",
        element: <AllSurveyList></AllSurveyList>,
      },

      {
        path: "/dashboard/rewards",
        element: <Reward></Reward>,
      },
      {
        path: "/dashboard/affiliates",
        element: <Affiliate></Affiliate>,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound></NotFound>,
  },
]);
