import React, { createRef, useContext, useState } from 'react';
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
import { AuthContext } from '../../../Context/AuthProvider';
import Pdf from "react-to-pdf";

const ref = createRef()
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [10,16]
}

const AllUser = () => {
    const { handleExcelExport } = useContext(AuthContext)
    const [deletedUser, setDeletedUser] = useState(null)
    const [tableColumnShowHide, setTableColumnShowHide] = useState(false)
    const [tableColumnShow, setTableColumnShow] = useState({
        sl: "sl",
        user: "user",
        email: "email",
        plan: "plan",
        role: "role",
        status: "status",
        action: "action"
    })
    // const ref = useRef()
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

    const tableColumnShowHideHandle = () => {
        setTableColumnShowHide(!tableColumnShowHide)
    }

    const tableColumnHandle = data => {
        setTableColumnShow({ ...tableColumnShow, [data.target.name]: data.target.value })
    }
   
    
    return (
        <section>
            <div className='bg-white p-5 rounded'>
                <div className='flex flex-wrap gap-5 md:flex-row justify-between items-center mb-5'>
                    <div className='flex gap-2 md:gap-6 flex-wrap'>
                        <Pdf targetRef={ref} options={options} x={.5} y={.5} scale={1} filename="AllUsers.pdf">
                            {({toPdf}) => (
                                <div onClick={toPdf} className='flex gap-3 border rounded-lg py-2 items-center px-5 uppercase text-sm text-[#8A8D93] cursor-pointer hover:bg-theme-primary hover:text-white transition-colors duration-300 hover:shadow-btn-shadow hover:border-theme-primary'>
                                    <TbExternalLink />
                                    Pdf
                                </div>
                            )} 
                        </Pdf>
                        <div onClick={() => handleExcelExport(allUsers, 'All Users', 'AllUsers.xlsx')} className='flex gap-3 border rounded-lg py-2 items-center px-5 uppercase text-sm text-[#8A8D93] cursor-pointer hover:bg-theme-primary hover:text-white transition-colors duration-300 hover:shadow-btn-shadow hover:border-theme-primary'>
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
                            content={() => ref.current}
                            pageStyle='print'
                        />
                        <div className="dropdown dropdown-bottom mt-[6px]">
                            <label tabIndex={0} className="cursor-pointer outline-none border rounded-lg py-[10px] items-center px-5 uppercase text-sm text-[#8A8D93] hover:bg-theme-primary hover:text-white transition-colors duration-300 hover:shadow-btn-shadow hover:border-theme-primary" onClick={tableColumnShowHideHandle}>Show/Hide Column</label>
                            <div tabIndex={0} className="dropdown-content menu shadow-shadow bg-base-100 w-52 mt-2">
                                <label htmlFor="sl" className='flex items-center pl-5 border-b py-1'>
                                    <input className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-theme-primary checked:border-theme-primary focus:outline-none transition duration-200 mr-2 cursor-pointer' onClick={tableColumnHandle} type="checkbox" name="sl" value={tableColumnShow.sl === "sl" ? "" : "sl"} defaultChecked={tableColumnShow.sl === "sl" ? true : false} />
                                    Sl
                                </label>
                                <label htmlFor="user" className='flex items-center pl-5 border-b py-1'>
                                    <input className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-theme-primary checked:border-theme-primary focus:outline-none transition duration-200  mr-2 cursor-pointer' onClick= {tableColumnHandle} type="checkbox" name="user" value={tableColumnShow.user === "user" ? "" : "user"} defaultChecked={tableColumnShow.user === "user" ? true : false} />
                                    User
                                </label>
                                <label htmlFor="email" className='flex items-center pl-5 border-b py-1'>
                                    <input className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-theme-primary checked:border-theme-primary focus:outline-none transition duration-200   mr-2 cursor-pointer' onClick={tableColumnHandle} type="checkbox" name="email" value={tableColumnShow.email === "email" ? "" : "email"} defaultChecked={tableColumnShow.email === "email" ? true : false} />
                                    Email
                                </label>
                                <label htmlFor="plan" className='flex items-center pl-5 border-b py-1'>
                                    <input className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-theme-primary checked:border-theme-primary focus:outline-none transition duration-200   mr-2 cursor-pointer' onChange={tableColumnHandle} type="checkbox" name="plan" value={tableColumnShow.plan === "plan" ? "" : "plan"} defaultChecked={tableColumnShow.plan === "plan" ? true : false} />
                                    Plan
                                </label>
                                <label htmlFor="role" className='flex items-center pl-5 border-b py-1'>
                                    <input className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-theme-primary checked:border-theme-primary focus:outline-none transition duration-200   mr-2 cursor-pointer' onChange={tableColumnHandle} type="checkbox" name="role" value={tableColumnShow.role === "role" ? "" : "role"} defaultChecked={tableColumnShow.role === "role" ? true : false} />
                                    Role
                                </label>
                                <label htmlFor="status" className='flex items-center pl-5 border-b py-1'>
                                    <input className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-theme-primary checked:border-theme-primary focus:outline-none transition duration-200   mr-2 cursor-pointer' onChange={tableColumnHandle} type="checkbox" name="status" value={tableColumnShow.status === "status" ? "" : "status"} defaultChecked={tableColumnShow.status === "status" ? true : false} />
                                    Status
                                </label>
                                <label htmlFor="action" className='flex items-center pl-5  py-1'>
                                    <input className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-theme-primary checked:border-theme-primary focus:outline-none transition duration-200   mr-2 cursor-pointer' onChange={tableColumnHandle} type="checkbox" name="action" value={tableColumnShow.action === "action" ? "" : "action"} defaultChecked={tableColumnShow.action === "action" ? true : false} />
                                    Action
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to='/dashboard/add/user' className='bg-theme-primary py-2 px-5 rounded shadow-btn-shadow text-white uppercase font-medium text-sm leading-6 tracking-[0.4px]'>Add User</Link>
                    </div>
                </div>
                <div ref={ ref }>
                    <h2 className='text-[34px] leading-[42px] font-medium text-theme-primary mb-6'>All Users</h2>
                    <div className="border-gray-200 w-full rounded bg-white overflow-y-scroll no-scrollbar">
                        <table className="w-full leading-normal border">
                            <thead className='border border-[#F9FAFC] border-b-0'>
                                <tr className='sticky top-0 z-40'>
                                    {
                                        tableColumnShow.sl === 'sl' &&
                                        <th scope="col"
                                            className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                            Sl
                                        </th>
                                    }
                                    {
                                        tableColumnShow.user === 'user' &&
                                        <th scope="col"
                                            className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                            User
                                        </th>
                                    }
                                    
                                    {
                                        tableColumnShow.email === 'email' &&
                                        <th scope="col"
                                            className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                            Email
                                        </th>
                                    }
                                    {
                                        tableColumnShow.role === 'role' &&
                                        <th scope="col"
                                            className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                            Role
                                        </th>
                                    }
                                    {
                                        tableColumnShow.plan === 'plan' &&
                                        <th scope="col"
                                            className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                            Plan
                                        </th>
                                    }
                                    {
                                        tableColumnShow.status === 'status' &&
                                        <th scope="col"
                                            className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                            Status
                                        </th>
                                    }
                                    {
                                        tableColumnShow.action === 'action' &&
                                        <th scope="col"
                                            className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                            Action
                                        </th>
                                    }
                                </tr>
                            </thead>
                            <tbody className='border border-gray-200'>
                                {
                                    allUsers?.map((user, i) => (
                                        <tr className="hover:bg-gray-50 hover:cursor-pointer border-b border-gray-200" key={i}>
                                            {
                                                tableColumnShow.sl === 'sl' &&
                                                <td className="py-2 px-6 text-gray-900 text-sm">
                                                    <span>{ i + 1 }</span>
                                                </td>
                                            }
                                            {
                                                tableColumnShow.user === 'user' &&
                                                <td className="py-2 px-6 text-theme-text text-sm ">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img src={user.image} alt={ user.name } className="w-full h-full rounded-full" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">{ user.name }</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            }
                                            {
                                                tableColumnShow.email === 'email' &&
                                                <td className="py-2 px-6 text-gray-900 text-sm">
                                                    <span>{ user.email }</span>
                                                </td>
                                            }
                                            {
                                                tableColumnShow.role === 'role' &&
                                                <td className="py-2 px-6 text-gray-900 text-sm capitalize">
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
                                            }
                                            {
                                                tableColumnShow.plan === 'plan' &&
                                                <td className={`py-2 px-6 text-gray-900 text-sm capitalize`}>
                                                    <span>{ user.plan }</span>
                                                </td>
                                            }
                                            {
                                                tableColumnShow.status === 'status' &&
                                                <td className="py-2 px-6 text-gray-900 text-sm capitalize">
                                                    <span className={`${user.status === 'pending' ? 'bg-[#FDEDE1] text-[#FFB400]' : user.status === 'active' ? 'bg-[#EAF5EA] text-[#56CA00]' : 'bg-[#F1F1F2] text-[#8A8D93]'} py-1 px-[10px] rounded-2xl text-[13px] tracking-[0.16px]`}>{ user.status }</span>
                                                </td>
                                            }
                                            {
                                                tableColumnShow.action === 'action' &&
                                                <td className="py-2 px-6 text-gray-900 text-sm">
                                                    <div className='dropdown dropdown-end'>
                                                        <label tabIndex={0} className="cursor-pointer flex items-center">
                                                            <BiDotsVerticalRounded className='text-[30px] text-theme-body' />
                                                        </label>
                                                        <div tabIndex={0} className='dropdown-content p-4 shadow bg-base-100 rounded-box'>
                                                            <div className='flex gap-3 text-2xl text-theme-primary'>
                                                                <label htmlFor="confirmationModal" onClick={() => setDeletedUser(user)}>
                                                                    <AiOutlineDelete className='cursor-pointer' />
                                                                </label>
                                                                <Link to={`/dashboard/user/edit/${ user._id }`}>
                                                                    <AiOutlineEdit className='cursor-pointer' />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
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