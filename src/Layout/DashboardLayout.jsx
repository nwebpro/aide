import React, { useContext } from 'react';
import { NavLink, Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthProvider';
import DashboardTopHeader from '../Pages/Dashboard/DashboardTopHeader/DashboardTopHeader';
import { MdOutlineAddToPhotos } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { SlUser } from 'react-icons/sl'
import { AiOutlineBarChart, AiOutlineFileAdd, AiOutlineHome } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';

const DashboardLayout = () => {
    const { userLogout } = useContext(AuthContext)
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
            <div className={`drawer-content bg-theme-secondary overflow-hidden`}>
                <DashboardTopHeader />
                <ScrollRestoration />
                <div className='py-10 px-5 md:px-10 lg:px-20'>
                    <Outlet />
                </div>
            </div>
            <div className={`drawer-side`}>
                    <label htmlFor="dashboardDrawer" className="drawer-overlay"></label> 
                    <div className={`menu w-64 text-base-content bg-[#111827] h-screen flex flex-col justify-between duration-300`}>
                        <div className={`flex flex-col justify-between flex-1 mt-2 md:mt-6`}>
                            <nav>
                                <ul>
                                    <li>
                                        <NavLink 
                                            to="/"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <AiOutlineHome className='text-lg md:text-xl' />
                                            <span>Home</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard/users"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <HiOutlineUserGroup className='text-lg md:text-xl' />
                                            <span>All Users</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard/add/user"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <SlUser className='text-lg md:text-xl' />
                                            <span>Add User</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard/products"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <MdOutlineAddToPhotos className='text-lg md:text-xl' />
                                            <span>All Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard/add/product"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <AiOutlineFileAdd className='text-lg md:text-xl' />
                                            <span>Add Product</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard/chart"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-2 md:py-3 px-5 text-sm md:text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <AiOutlineBarChart className='text-lg md:text-xl' />
                                            <span>Chart</span>
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