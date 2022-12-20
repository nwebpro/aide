import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const ShowImage = () => {
    const [deletedImage, setDeletedImage] = useState(null)
    const { data:images = [], isLoading, refetch } = useQuery({
        queryKey: ['images'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/image`)
            const data = await res.json()
            return data
        }
    })

    const allImage = images.data
    if(isLoading) {
        return <LoadingSpinner />
    }

    const closeModal = () => {
        setDeletedImage(null)
    }
    const handleImageDelete = imageId => {
        fetch(`${ process.env.REACT_APP_API_URL }/image/${ imageId }`, {
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
            <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Image </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allImage.map(image => (
                                <tr key={image._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white">
                                        <img src={image.image} alt="" className='w-20' />
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <label onClick={() => setDeletedImage(image)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                deletedImage &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${ deletedImage.name }. It cannot be undone!`}
                    closeModal={closeModal}
                    successAction={handleImageDelete}
                    successButtonName={`Delete`}
                    modalData={deletedImage}
                />
            }
        </section>
    );
};

export default ShowImage;