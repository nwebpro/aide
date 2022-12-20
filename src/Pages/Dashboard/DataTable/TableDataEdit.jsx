import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../Components/Button/Button';

const TableDataEdit = () => {
    const { tableDataId } = useParams()
    const [tableDataUpdate, setTableDataUpdate] = useState([])
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${ process.env.REACT_APP_API_URL }/tableData/${ tableDataId }`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTableDataUpdate(data.data);
                } else {
                    toast.error(data.error);
                }
            })
            .catch((err) => toast.error(err.message));
    }, [tableDataId]);


    const handleUpdateTableData = data => {
        const updateTableData = {
            item1: data.item1,
            item2: data.item2,
            item3: data.item3,
            item4: data.item4,
            item5: data.item5,
            item6: data.item6,
            item7: data.item7,
            item8: data.item8,
            item9: data.item9,
            item10: data.item10,
            item11: data.item11,
            item12: data.item12,
            item13: data.item13,
            item14: data.item15,
            item15: data.item15
        }
        console.log(updateTableData);

        fetch(`${ process.env.REACT_APP_API_URL }/tableData/edit/${ tableDataId }`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTableData)
        })
        .then(res => res.json())
        .then(data => {
            toast.success(data.message, { autoClose: 400 })
            navigate('/dashboard/datatable')
        })
    }

    return (
        <div className='bg-white py-5 px-5 rounded shadow-shadow'>
            <form onSubmit={ handleSubmit(handleUpdateTableData) }>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 1</label>
                        <input type="text" {...register("item1", { required: true })} defaultValue={tableDataUpdate.item1} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 2</label>
                        <input type="text" {...register("item2", { required: true })} defaultValue={tableDataUpdate.item2} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 3</label>
                        <input type="text" {...register("item3", { required: true })} defaultValue={tableDataUpdate.item3} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 4</label>
                        <input type="text" {...register("item4", { required: true })} defaultValue={tableDataUpdate.item4} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 5</label>
                        <input type="text" {...register("item5", { required: true })} defaultValue={tableDataUpdate.item5} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 6</label>
                        <input type="text" {...register("item6", { required: true })} defaultValue={tableDataUpdate.item6} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 7</label>
                        <input type="text" {...register("item7", { required: true })} defaultValue={tableDataUpdate.item7} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 8</label>
                        <input type="text" {...register("item8", { required: true })} defaultValue={tableDataUpdate.item8} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 9</label>
                        <input type="text" {...register("item9" , { required: true })} defaultValue={tableDataUpdate.item9} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 10</label>
                        <input type="text" {...register("item10" , { required: true })} defaultValue={tableDataUpdate.item10} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 11</label>
                        <input type="text" {...register("item11" , { required: true })} defaultValue={tableDataUpdate.item11} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 12</label>
                        <input type="text" {...register("item12" , { required: true })} defaultValue={tableDataUpdate.item12} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 13</label>
                        <input type="text" {...register("item13" , { required: true })} defaultValue={tableDataUpdate.item13} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 14</label>
                        <input type="text" {...register("item14" , { required: true })} defaultValue={tableDataUpdate.item14} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                    <div className="mb-2">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Item 15</label>
                        <input type="text" {...register("item15" , { required: true })} defaultValue={tableDataUpdate.item15} className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button classes={'py-3 px-5'} btnText={'Update Table Data'} />
                </div>
            </form>
        </div>
    );
};

export default TableDataEdit;