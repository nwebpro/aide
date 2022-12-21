import { useQuery } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { TbExternalLink } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const AllProduct = () => {
    const { handleExcelExport } = useContext(AuthContext)
    const [deletedProduct, setDeletedProduct] = useState(null)
    const productComponentRef = useRef()
    const { data:products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/products`)
            const data = await res.json()
            return data
        }
    })
    
    const allProducts = products.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    const closeModal = () => {
        setDeletedProduct(null)
    }
    const handleProductDelete = productId => {
        fetch(`${ process.env.REACT_APP_API_URL }/product/${ productId }`, {
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
            <h2 className='text-[34px] leading-[42px] font-medium text-theme-primary mb-6'>All Products</h2>
            <div className='bg-white p-5 rounded'>
                <div className='flex flex-wrap gap-5 md:flex-row justify-between items-center mb-5'>
                    <div className='flex gap-2 md:gap-6 flex-wrap'>
                    <div className='flex gap-3 border rounded-lg py-2 items-center px-5 uppercase text-sm text-[#8A8D93] cursor-pointer hover:bg-theme-primary hover:text-white transition-colors duration-300 hover:shadow-btn-shadow hover:border-theme-primary'>
                            <TbExternalLink />
                            Pdf
                        </div>
                        <div onClick={() => handleExcelExport(allProducts, 'All Products', 'AllProducts.xlsx')} className='flex gap-3 border rounded-lg py-2 items-center px-5 uppercase text-sm text-[#8A8D93] cursor-pointer hover:bg-theme-primary hover:text-white transition-colors duration-300 hover:shadow-btn-shadow hover:border-theme-primary'>
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
                            content={() => productComponentRef.current}
                            documentTitle='All Products'
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
                        <Link to='/dashboard/add/product' className='bg-theme-primary py-2 px-5 rounded shadow-btn-shadow text-white uppercase font-medium text-sm leading-6 tracking-[0.4px]'>Add Product</Link>
                    </div>
                </div>
                <div className="border-gray-200 w-full rounded bg-white">
                    <table className="w-full leading-normal" ref={ productComponentRef }>
                        <thead className='border border-[#F9FAFC] border-b-0'>
                            <tr>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Sl
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Image
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Name
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Price
                                </th>
                                <th scope="col"
                                    className="text-theme-text py-[15px] px-5 bg-[#F9FAFC] text-left text-xs font-semibold uppercase tracking-[0.17px]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='border border-gray-200'>
                            {
                                allProducts?.map((product, i) => (
                                    <tr className="hover:bg-gray-50 hover:cursor-pointer border-b border-gray-200">
                                        <td className="py-4 px-6 text-gray-900 text-sm">
                                            <span>{ i + 1 }</span>
                                        </td>
                                        <td className="py-4 px-6 text-theme-text text-sm ">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img src={ product.image } alt={ product.name } className="w-full h-full rounded-full" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 text-sm">
                                            <span>{ product.name }</span>
                                        </td>
                                        <td className={`py-4 px-6 text-gray-900 text-sm capitalize`}>
                                            <span>৳ { product.price }</span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 text-sm text-right">
                                            <div className='dropdown dropdown-end'>
                                                <label tabIndex={0} className="cursor-pointer flex items-center">
                                                    <BiDotsVerticalRounded className='text-[30px] text-theme-body' />
                                                </label>
                                                <div tabIndex={0} className='dropdown-content p-4 shadow bg-base-100 rounded-box'>
                                                    <div className='flex gap-3 text-2xl text-theme-primary'>
                                                        <label htmlFor="confirmationModal" onClick={() => setDeletedProduct(product)}>
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
                deletedProduct &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`${ deletedProduct.name }`}
                    closeModal={closeModal}
                    successAction={handleProductDelete}
                    successButtonName={`Delete`}
                    modalData={deletedProduct}
                />
            }
        </section>
    );
};

export default AllProduct;