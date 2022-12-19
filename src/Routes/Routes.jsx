import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Frontend from "../Layout/Frontend";
import Login from "../Pages/Auth/Login";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import ImageUpload from "../Pages/Dashboard/ImageUpload/ImageUpload";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Frontend />,
        errorElement: <h2 className="grid place-items-center h-screen">Error...</h2>,
        children: [
            {
                path: '/',
                element: <Login />
            }
        ]
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        errorElement: <h2 className="grid place-items-center h-screen">Error...</h2>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/image-upload',
                element: <ImageUpload />
            }
        ]
    }
])