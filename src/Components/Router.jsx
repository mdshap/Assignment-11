import { createBrowserRouter } from "react-router";
import Home from "../Components/Pages/Home/Home";
import Root from "./Layouts/Root";
import Login from "./Pages/Login-Register/Login";
import Register from "./Pages/Login-Register/Register";
import AllScholarship from "./Pages/All Scholarship/AllScholarship";
import Error404 from "./Pages/Errors/Error404";
import ScholarshipDetails from "./Pages/All Scholarship/ScholarshipDetails";

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

}
])
