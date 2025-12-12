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

export const router = createBrowserRouter([
{
    path: '/',
    Component: Root,
    children: [
        {
            index: true,
            Component:Home,
        },
        {
            path: 'login',
            Component: Login
        },
        {
            path: 'register',
            Component: Register
        },
        {
            path: 'all-scholarships',
            Component: AllScholarship,
        },
        {
            path: 'details/:id',
            Component: ScholarshipDetails
        },
        {
            path: "*",
            Component: Error404
        }
    ]
},
{
    path: '/dashboard',
    Component: Dashboard,
    children: [
        {
            index: true,
            Component: DashHome,
        },
        {
            path:'profile',
            Component: Profile
        },
        {
            path: 'add-scholarship',
            Component: AddScholarship
        },
        {
            path: 'manage-scholarship',
            Component: ManageScholarship
        },
        {
            path: 'manage-users',
            Component: ManageUsers
        },
        {
            path: 'analytics',
            Component: Analytics
        },
        {
            path: 'manage-applications',
            Component: ManageApplication
        },
        {
            path: 'manage-reviews',
            Component: ManageReview
        }
    ]
}
])
