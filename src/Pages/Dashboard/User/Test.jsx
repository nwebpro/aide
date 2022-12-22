import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../contexts/AuthProvider';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';


const EditProduct = () => {

    const editProduct = useLoaderData();

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://bd-store-dot-com-server-side.vercel.app/categories',{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
               }
            })
            const data = await res.json();
            return data;
        }
    })


    const handleProduct = data => {

        //host image in imgBB
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const product = {
                        username: user?.displayName,
                        email: user?.email,
                        profileImage: user?.photoURL,
                        productName: data.productname,
                        phoneNumber: data.phone,
                        productImage: imageData.data.url,
                        location: data.location,
                        quality: data.quality,
                        categoryId: data.category,
                        resalePrice: data.resaleprice,
                        originalPrice: data.originalprice,
                        yearsOfUsed: data.usedyear,
                        description: data.description,
                        date: format(new Date(), 'PP')
                    }
                    fetch(`https://bd-store-dot-com-server-side.vercel.app/updateProduct/${editProduct._id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                             authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Product Edit Successful')
                                reset();
                                navigate('/dashboard/myproducts')
                            }
                        })
                }
            })
    }




    return (
        <>
            <div className='text-center my-10'>
                <h1 className='text-2xl uppercase font-semibold'>Edit Product</h1>
                <hr className='w-44 bg-secondary pt-1 mx-auto' />
            </div>
            <div className='flex justify-center items-center my-16 px-4 lg:px-0'>
                <div className='flex flex-col w-full max-w-4xl p-6 space-y-4 text-center shadow-md rounded-md bg-base-200 text-gray-800 mx-2 sm:mx-5'>
                    <form onSubmit={handleSubmit(handleProduct)} className='space-y-6'>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor="productname" className="text-base font-medium block text-left">Product Name</label>
                            <input
                                {...register("productname", {
                                    required: "Product name is required"
                                })}
                                type='text' defaultValue={editProduct.productName} placeholder='Product Name' className='text-xl w-full border px-4 py-4 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-secondary' name='productname'
                                aria-invalid={errors.productname ? "true" : "false"}
                            />
                            {errors.productname && <p className='text-red-600' role="alert">{errors.productname?.message}</p>}
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor="phone" className="text-base font-medium block text-left">Phone Number</label>
                            <input {...register("phone", {
                                required: "Phone Number is required"
                            })}
                                type='text' defaultValue={editProduct.phoneNumber} placeholder='Phone' className='text-xl w-full border px-4 py-4 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-secondary appearance-none' name='phone'
                                aria-invalid={errors.phone ? "true" : "false"}
                            />
                            {errors.phone && <p className='text-red-600' role="alert">{errors.phone?.message}</p>}
                        </div>


                        <div className='space-y-1 text-sm'>
                            <label htmlFor="photo" className="text-base font-medium block text-left">Product Image</label>
                            <input
                                {...register("photo", {
                                    required: "Photo is required"
                                })}
                                type='file' className='file-input file-input-primary w-full' name='photo'
                                aria-invalid={errors.photo ? "true" : "false"}
                            />
                            {errors.photo && <p className='text-red-600' role="alert">{errors.photo?.message}</p>}
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor="location" className="text-base font-medium block text-left">Location</label>
                            <input
                                {...register("location", {
                                    required: "Location name is required"
                                })}
                                type='text' defaultValue={editProduct.location} placeholder='Location' className='text-xl w-full border px-4 py-4 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-secondary' name='location'
                                aria-invalid={errors.location ? "true" : "false"}
                            />
                            {errors.location && <p className='text-red-600' role="alert">{errors.location?.message}</p>}
                        </div>

                        <div className='space-y-1 text-sm flex flex-col md:flex-row items-center justify-between gap-5'>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="category" className="text-base font-medium block text-left mb-1 outline-secondary">Product Category</label>
                                <select
                                    {...register("category",{
                                        required: "Product category is required"
                                    })}
                                    className="select select-bordered text-xl w-full px-4">
                                    {
                                        categories.map((cat, i) =>
                                            <option
                                                key={i}
                                                value={cat._id}
                                                className='capitalize'
                                                defaultValue={editProduct.categoryName}
                                            >
                                                {cat.categoryName}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="quality" className="text-base font-medium block text-left mb-1 outline-secondary">Product Quality</label>
                                <select
                                    {...register("quality")}
                                    className="select select-bordered text-xl w-full px-4">
                                    <option defaultValue={editProduct.quality} value='excellent'>Excellent</option>
                                    <option value='good'>Good</option>
                                    <option value='fair'>Fair</option>
                                </select>
                            </div>
                        </div>

                        <div className='space-y-1 text-sm flex flex-col md:flex-row items-center justify-between gap-5'>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="resaleprice" className="text-base font-medium block text-left">Resale Price</label>
                                <input
                                    {...register("resaleprice", {
                                        required: "Product resale price is required"
                                    })}
                                    type='text' defaultValue={editProduct.resalePrice} placeholder='$00' className='text-xl w-full border px-4 py-4 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-secondary' name='resaleprice'
                                    aria-invalid={errors.resaleprice ? "true" : "false"}
                                />
                                {errors.resaleprice && <p className='text-red-600' role="alert">{errors.resaleprice?.message}</p>}
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="originalprice" className="text-base font-medium block text-left">Original Price</label>
                                <input
                                    {...register("originalprice", {
                                        required: "Product original price is required"
                                    })}
                                    type='text' defaultValue={editProduct.originalPrice} placeholder='$00' className='text-xl w-full border px-4 py-4 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-secondary' name='originalprice'
                                    aria-invalid={errors.originalprice ? "true" : "false"}
                                />
                                {errors.originalprice && <p className='text-red-600' role="alert">{errors.originalprice?.message}</p>}
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="usedyear" className="text-base font-medium block text-left">Years of Used </label>
                                <input
                                    {...register("usedyear", {
                                        required: "Years of Used is required"
                                    })}
                                    type='text' defaultValue={editProduct.yearsOfUsed} placeholder='Years of used' className='text-xl w-full border px-4 py-4 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-secondary' name='usedyear'
                                    aria-invalid={errors.usedyear ? "true" : "false"}
                                />
                                {errors.usedyear && <p className='text-red-600' role="alert">{errors.usedyear?.message}</p>}
                            </div>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor="description" className="text-base font-medium block text-left">Product Description</label>
                            <textarea
                                {...register("description", {
                                    required: "Product description name is required"
                                })}
                                type='text' defaultValue={editProduct.description} placeholder='Description...' className='text-xl w-full h-36 resize-none border px-4 py-4 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-secondary' name='description'
                                aria-invalid={errors.description ? "true" : "false"}
                            />
                            {errors.description && <p className='text-red-600' role="alert">{errors.description?.message}</p>}
                        </div>

                        <input type="submit" value='Add Product' className='text-xl w-full border px-4 py-4 rounded-md border-gray-300 bg-primary text-white cursor-pointer' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProduct;