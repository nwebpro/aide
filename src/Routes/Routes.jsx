import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Frontend from "../Layout/Frontend";
import Login from "../Pages/Auth/Login";
import Chart from "../Pages/Dashboard/Chart/Chart";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import DataTable from "../Pages/Dashboard/DataTable/DataTable";
import TableDataEdit from "../Pages/Dashboard/DataTable/TableDataEdit";
import ImageUpload from "../Pages/Dashboard/ImageUpload/ImageUpload";
import AddProduct from "../Pages/Dashboard/Product/AddProduct";
import AllProduct from "../Pages/Dashboard/Product/AllProduct";
import AddUser from "../Pages/Dashboard/User/AddUser";
import AllUser from "../Pages/Dashboard/User/AllUser";
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
            },
            {
                path: '/dashboard/datatable',
                element: <DataTable />
            },
            {
                path: '/dashboard/datatable/edit/:tableDataId',
                element: <TableDataEdit />,
                loader: ({params}) => fetch(`${ process.env.REACT_APP_API_URL }/tableData/${ params.tableDataId } }`)
            },
            {
                path: '/dashboard/users',
                element: <AllUser />
            },
            {
                path: '/dashboard/add/user',
                element: <AddUser />
            },
            {
                path: '/dashboard/chart',
                element: <Chart />
            },
            {
                path: '/dashboard/products',
                element: <AllProduct />
            },
            {
                path: '/dashboard/add/product',
                element: <AddProduct />
            }
        ]
    }
])