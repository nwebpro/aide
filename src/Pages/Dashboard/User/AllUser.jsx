import React, { useRef, useState } from 'react';
import { TbExternalLink } from 'react-icons/tb'
import { Link } from 'react-router-dom';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import adminIcon from '../../../assets/images/admin.png'
import editorIcon from '../../../assets/images/editor.png'
import authorIcon from '../../../assets/images/author.png'
import ReactToPrint from 'react-to-print';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-toastify';

const AllUser = () => {
    const [deletedUser, setDeletedUser] = useState(null)
    const userComponentRef = useRef()
    const { data:users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/users`)
            const data = await res.json()
            return data
        }
    })
    
    const allUsers = users.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    const closeModal = () => {
        setDeletedUser(null)
    }
    const handleUserDelete = userId => {
        fetch(`${ process.env.REACT_APP_API_URL }/user/${ userId }`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                toast.success(data.message, { autoClose: 400 })
                refetch()
            }
        })
    }
    
    return (
        <section>
            <h2 className='text-[34px] leading-[42px] font-medium text-theme-primary mb-6'>All Users</h2>
            <div className='bg-white p-5 rounded'>
                <div className='flex flex-wrap gap-5 md:flex-row justify-between items-center mb-5'>
                    <div className='flex gap-2 md:gap-6 flex-wrap'>
                        <div className='flex gap-3 border rounded-lg py-2 items-center px-5 uppercase text-sm text-[#8A8D93] cursor-pointer hover:bg-theme-primary hover:text-white transition-colors duration-300 hover:shadow-btn-shadow hover:border-theme-primary'>
                            <TbExternalLink />
                            Pdf
                        </div>
                        <div className='flex gap-3 border rounded-lg py-2 items-center px-5 uppercase text-sm text-[#8A8D93] cursor-pointer hover:bg-theme-primary hover:text-white transition-colors duration-300 hover:shadow-btn-shadow hover:border-theme-primary'>
                            <TbExternalLink />
                            Excel
                        </div>
                        <ReactToPrint 
                            trigger={() => {
                                return (
                                    <button className='flex gap-3 border rounded-lg py-2 items-center px-5 uppercase text-sm text-[#8A8D93] hover:bg-theme-primary hover:text-white transition-colors duration-300 hover:shadow-btn-shadow hover:border-theme-primary'>
                                        <TbExternalLink />
                                        Print
                                    </button>
                                )
                            }}
                            content={() => userComponentRef.current}
                            documentTitle='All Users'
                            pageStyle='print'
                        />
                        <div>
                            <select className="outline-none border rounded-lg py-2 items-center px-5 uppercase text-sm text-[#8A8D93]">
                                <option>Show/Hide Column</option>
                                <option value=''>User</option>
                                <option value=''>Email</option>
                                <option value=''>Role</option>
                                <option value=''>Plan</option>
                                <option value=''>Status</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <Link to='/dashboard/add/user' className='bg-theme-primary py-2 px-5 rounded shadow-btn-shadow text-white uppercase font-medium text-sm leading-6 tracking-[0.4px]'>Add User</Link>
                    </div>
                </div>
                <div className="border-gray-200 w-full rounded bg-white">
                    <table className="w-full leading-normal" ref={ userComponentRef }>
                        <thead className='border border-[#F9FAFC] border-b-0'>
                            <tr>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Sl
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    User
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Email
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Role
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Plan
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Status
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='border border-gray-200'>
                            {
                                allUsers?.map((user, i) => (
                                    <tr className="hover:bg-gray-50 hover:cursor-pointer border-b border-gray-200">
                                        <td className="py-4 px-6 text-gray-900 text-sm">
                                            <span>{ i + 1 }</span>
                                        </td>
                                        <td className="py-4 px-6 text-theme-text text-sm ">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img src={user.image} alt={ user.name } className="w-full h-full rounded-full" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">{ user.name }</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 text-sm">
                                            <span>{ user.email }</span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 text-sm capitalize">
                                            {
                                                user.role === 'admin' ?
                                                <span className='flex gap-2 items-center'>
                                                    <img src={adminIcon} alt="" />
                                                    { user.role }
                                                </span>
                                                : user.role === 'editor' ?
                                                <span className='flex gap-2 items-center'>
                                                    <img src={editorIcon} alt="" />
                                                    { user.role }
                                                </span>
                                                :
                                                <span className='flex gap-2 items-center'>
                                                    <img src={authorIcon} alt="" />
                                                    { user.role }
                                                </span>
                                            }
                                        </td>
                                        <td className={`py-4 px-6 text-gray-900 text-sm capitalize`}>
                                            <span>{ user.plan }</span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 text-sm capitalize">
                                            <span className={`${user.status === 'pending' ? 'bg-[#FDEDE1] text-[#FFB400]' : user.status === 'active' ? 'bg-[#EAF5EA] text-[#56CA00]' : 'bg-[#F1F1F2] text-[#8A8D93]'} py-1 px-[10px] rounded-2xl text-[13px] tracking-[0.16px]`}>{ user.status }</span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 text-sm">
                                            <div className='dropdown dropdown-end'>
                                                <label tabIndex={0} className="cursor-pointer flex items-center">
                                                    <BiDotsVerticalRounded className='text-[30px] text-theme-body' />
                                                </label>
                                                <div tabIndex={0} className='dropdown-content p-4 shadow bg-base-100 rounded-box'>
                                                    <div className='flex gap-3 text-2xl text-theme-primary'>
                                                        <label htmlFor="confirmationModal" onClick={() => setDeletedUser(user)}>
                                                            <AiOutlineDelete className='cursor-pointer' />
                                                        </label>
                                                        <Link to=''>
                                                            <AiOutlineEdit className='cursor-pointer' />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deletedUser &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`${ deletedUser.name }`}
                    closeModal={closeModal}
                    successAction={handleUserDelete}
                    successButtonName={`Delete`}
                    modalData={deletedUser}
                />
            }
        </section>
    );
};

export default AllUser;