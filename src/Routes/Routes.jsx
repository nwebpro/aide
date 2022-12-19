import { createBrowserRouter } from "react-router-dom";
import Frontend from "../Layout/Frontend";
import Login from "../Pages/Auth/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Frontend />,
        errorElement: <h2 className="grid place-items-center">Error...</h2>,
        children: [
            {
                path: '/',
                element: <Login />
            }
        ]
    }
])