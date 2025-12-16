import { createBrowserRouter } from "react-router";
import Home from "../Components/Pages/Home/Home";
import Root from "./Layouts/Root";
import Login from "./Pages/Login-Register/Login";
import Register from "./Pages/Login-Register/Register";
import AllScholarship from "./Pages/All Scholarship/AllScholarship";
import Error404 from "./Pages/Errors/Error404";
import ScholarshipDetails from "./Pages/All Scholarship/ScholarshipDetails";
import Dashboard from "./Layouts/Dashboard";
import DashHome from "./Pages/Dashboard/DashHome";
import Profile from "./Pages/Dashboard/Profile";
import AddScholarship from "./Pages/Dashboard/Admin/AddScholarship";
import ManageScholarship from "./Pages/Dashboard/Admin/ManageScholarship";
import ManageUsers from "./Pages/Dashboard/Admin/ManageUsers";
import Analytics from "./Pages/Dashboard/Admin/Analytics";
import ManageApplication from "./Pages/Dashboard/Moderator/ManageApplication";
import ManageReview from "./Pages/Dashboard/Moderator/ManageReview";
import MyApplications from "./Pages/Dashboard/Student/MyApplications";
import MyReviews from "./Pages/Dashboard/Student/MyReviews";
import PrivateRoute from "../../PrivateRoutes/PrivateRoute";
import AdminPrivate from "../../PrivateRoutes/AdminPrivate";
import ModeratorPrivate from "../../PrivateRoutes/ModeratorPrivate";
import UserPrivate from "../../PrivateRoutes/UserPrivate";
import CheckOutForm from "./Pages/Payment/CheckOutForm";
import StripeProvider from "../Stripe/StripeProvider";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";

export const router = createBrowserRouter([
  //Main Site Related Routes
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },

      //Login Register Related Routes
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },

      //All Scholarship Related Routes
      {
        path: "all-scholarships",
        Component: AllScholarship,
      },
      {
        path: "details/:id",
        Component: ScholarshipDetails,
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <StripeProvider>
              <CheckOutForm />
            </StripeProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "*",
        Component: Error404,
      },
    ],
  },

  //Dashboard Related Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),

    children: [
      //Common Routes
      {
        index: true,
        Component: DashHome,
      },
      {
        path: "profile",
        Component: Profile,
      },

      //Admin Routes
      {
        path: "add-scholarship",
        element: (
          <AdminPrivate>
            <AddScholarship />
          </AdminPrivate>
        ),
      },
      {
        path: "manage-scholarship",
        element: (
          <AdminPrivate>
            <ManageScholarship />
          </AdminPrivate>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminPrivate>
            <ManageUsers />
          </AdminPrivate>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminPrivate>
            <Analytics />
          </AdminPrivate>
        ),
      },

      //Moderator Routes
      {
        path: "manage-applications",
        element: (
          <ModeratorPrivate>
            <ManageApplication />
          </ModeratorPrivate>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <ModeratorPrivate>
            <ManageReview />
          </ModeratorPrivate>
        ),
      },

      //User Routes
      {
        path: "my-applications",
        element: (
          <UserPrivate>
            <MyApplications />
          </UserPrivate>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <UserPrivate>
            <MyReviews />
          </UserPrivate>
        ),
      },
      {
        path: "*",
        Component: Error404,
      },
    ],
  },
]);
