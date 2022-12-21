import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';

const TopHeader = () => {
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
        <div className='flex justify-center md:justify-end'>
            <ul className='flex bg-white mb-5 p-5 items-center'>
                <li className='mr-3'>
                    <NavLink to='/'
                    className={({ isActive }) =>
                    isActive
                        ? 'text-theme-primary transition duration-300'
                        : 'hover:text-theme-primary transition duration-300'
                    }
                    >Home</NavLink>
                </li>
                {
                    user?.uid &&
                    <li className='mr-3'>
                        <Link to='/dashboard/users' className='hover:text-theme-primary transition duration-300'>Dashboard</Link>
                    </li>
                }
                {
                    user?.uid ?
                    <li onClick={handleUserLogout} className='cursor-pointer bg-theme-primary text-white py-1 px-4 hover:shadow-btn-shadow transition duration-300'>
                        Logout
                    </li>
                    :
                    <li className='mr-3 bg-theme-primary text-white py-1 px-4 hover:shadow-btn-shadow transition duration-300'>
                        <Link to='/login'>Login</Link>
                    </li>
                }
            </ul>
        </div>
    );
};

export default TopHeader;