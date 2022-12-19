import React, { useContext } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthProvider';
import DashboardTopHeader from '../Pages/Dashboard/DashboardTopHeader/DashboardTopHeader';
import { MdDashboard, MdOutlineCloudUpload } from 'react-icons/md'
import { BsTable } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import aideLogo from '../assets/images/aideLogo.png'

const DashboardLayout = () => {
    const { user, userLogout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleUserLogout = () => {
        userLogout()
        .then(() => {
            navigate('/')
            toast.warning('User Logout Successfully!', { autoClose: 400 })
        })
        .catch(error => {
            toast.error(error.message, { autoClose: 400 })
        })
    }

    return (
        <div className='drawer drawer-mobile overflow-hidden'>
            <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
            <div className={`drawer-content bg-gray-200 overflow-hidden`}>
                <DashboardTopHeader />
                <ScrollRestoration />
                <div className='py-10 px-5 md:px-10 lg:px-20'>
                    <Outlet />
                </div>
            </div>
            <div className={`drawer-side`}>
                    <label htmlFor="dashboardDrawer" className="drawer-overlay"></label> 
                    <div className={`menu w-64 text-base-content bg-[#111827] h-screen flex flex-col justify-between duration-300`}>
                        <div className={`flex flex-col items-center mt-6 border-b border-theme-body pb-5 duration-300`}>
                            <img className="object-cover w-16 h-16 mx-2" src={ aideLogo } alt="avatar" />
                            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 flex gap-1 items-center">{ user?.displayName }
                            </h4>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-400">{ user?.email }</p>
                        </div>

                        <div className={`flex flex-col justify-between flex-1 mt-2 md:mt-6`}>
                            <nav>
                                <ul>
                                    <li>
                                        <Link 
                                            to="/dashboard"
                                            className='flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                        >
                                            <MdDashboard className='text-lg md:text-xl' />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard/image-upload"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <MdOutlineCloudUpload className='text-lg md:text-xl' />
                                            <span>Image Upload</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard/table"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <BsTable className='text-lg md:text-xl' />
                                            <span>Table</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className={`border-t border-theme-body`}>
                            <button onClick={handleUserLogout}
                                className='flex w-full items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                            >
                                <FiLogOut className='text-base md:text-xl' />
                                <span className="ml-3">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default DashboardLayout;