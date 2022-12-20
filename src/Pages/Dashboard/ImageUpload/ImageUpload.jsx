import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../Components/Button/Button';

const ImageUpload = () => {
    const [file, setFile] = useState();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const imageUploadApiKey = process.env.REACT_APP_IMGBB_API_KEY



    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleAddImage = data => {
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${ imageUploadApiKey }`
        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success) {
                const addImage = {
                    image: imgData.data.url
                }

                // Save doctor information to tha database
                fetch(`${ process.env.REACT_APP_API_URL }/image-upload`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(addImage)
                })
                .then(res => res.json())
                .then(data => {
                    toast.success(data.message, { autoClose: 400 })
                    navigate('/dashboard')
                })
            }
        })
    }


    return (
        <form onSubmit={handleSubmit(handleAddImage)}>
            <div className="flex justify-center mt-8">
                <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                    <div className="m-4">
                        <label className="inline-block mb-3 font-semibold text-theme-text">Image Upload</label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed cursor-pointer hover:border-theme-primary">
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        Attach a file</p>
                                </div>
                                <input type="file" {...register("image", {required: true})} className="opacity-0" onChange={ handleChange } />
                            </label>
                        </div>
                    </div>
                    <div className='w-20 mx-auto mb-3'>
                        {
                            file && <img src={ file } alt='' />
                        }
                    </div>
                    <div className="flex justify-center p-2">
                        <Button classes={'w-full block py-3'} btnText={'Upload' } />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ImageUpload;