import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../Components/Button/Button';

const EditProduct = () => {
    const { productId } = useParams()
    const [file, setFile] = useState();
    const [productUpdate, setProductUpdate] = useState([])
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const imageUploadApiKey = process.env.REACT_APP_IMGBB_API_KEY

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_API_URL }/product/edit/${ productId }`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProductUpdate(data.data);
                } else {
                    toast.error(data.error, { autoClose: 400 });
                }
            })
            .catch((err) => toast.error(err.message, { autoClose: 400 }));
    }, [productId]);

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleUpdateProduct = data => {
        
    }

    return (
        <section>
            <h2 className='text-[34px] leading-[42px] font-medium text-theme-primary mb-6'>Update Product</h2>
            <div className='bg-white p-10 w-full md:w-2/4 rounded'>
                <form onSubmit={ handleSubmit(handleUpdateProduct) }>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className="mb-2">
                            <label  className="block text-sm font-medium text-theme-text mb-1">Product Name</label>
                            <input type="text" {...register("name")} defaultValue={productUpdate.name} placeholder='Product Name' className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                        </div>
                        <div className="mb-2">
                            <label  className="block text-sm font-medium text-theme-text mb-1">Product Price</label>
                            <input type="text" {...register("price")} defaultValue={productUpdate.price} placeholder='Product Price' className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        <div>
                            <label className="inline-block mb-3 font-semibold text-theme-text">Image Upload</label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed cursor-pointer hover:border-theme-primary">
                                    <div className="flex flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Attach a file</p>
                                    </div>
                                    <input type="file" {...register("image")} className="opacity-0" onChange={ handleChange } />
                                </label>
                            </div>
                        </div>
                        <div className='grid place-content-center'>
                            <div className='flex flex-col md:flex-row gap-3'>
                                <img src={productUpdate.image} alt="" className='w-16' />
                                {
                                    file && <img src={ file } alt='' className='w-16' />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end p-2">
                        <Button classes={'py-2 shadow-btn-shadow px-5'} btnText={'Update Product' } />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditProduct;