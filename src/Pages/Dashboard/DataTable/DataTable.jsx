import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'react-toastify';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";
import { FaFileCsv } from 'react-icons/fa'
import { ImFilePdf } from 'react-icons/im'
import { SiMicrosoftexcel } from 'react-icons/si'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { DownloadExcel } from 'react-excel-export';

const tableHeaderData = [
    {
        item1: 'Item 1'
    },
    {
        item1: 'Item 2'
    },
    {
        item1: 'Item 3'
    },
    {
        item1: 'Item 4'
    },
    {
        item1: 'Item 5'
    },
    {
        item1: 'Item 6'
    },
    {
        item1: 'Item 7'
    },
    {
        item1: 'Item 8'
    },
    {
        item1: 'Item 9'
    },
    {
        item1: 'Item 10'
    },
    {
        item1: 'Item 11'
    },
    {
        item1: 'Item 12'
    },
    {
        item1: 'Item 13'
    },
    {
        item1: 'Item 14'
    },
    {
        item1: 'Item 15'
    },
    {
        item1: 'Action'
    }
]

const DataTable = () => {
    const [deletedTableData, setDeletedTableData] = useState(null)
    const { data:datatables = [], isLoading, refetch } = useQuery({
        queryKey: ['datatables'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/datatable`)
            const data = await res.json()
            return data
        }
    })
    
    const allData = datatables?.data
    console.log(allData);

    if(isLoading) {
        return <LoadingSpinner />
    }

    const closeModal = () => {
        setDeletedTableData(null)
    }
    const handleTableDataDelete = tableDataId => {
        fetch(`${ process.env.REACT_APP_API_URL }/tableDataDelete/${ tableDataId }`, {
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

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#aideDataTable' })
        doc.save('aideDataTable.pdf')
    }

    return (
        <div className='bg-theme-secondary py-5 px-2 shadow-shadow'>
            <div className='flex gap-5'>
                <CSVLink data={ allData } filename={'aide-datatable.csv'}>
                    <div className='bg-theme-primary px-5 py-2 text-white text-2xl rounded'>
                        <FaFileCsv />
                    </div>
                </CSVLink>
                <div onClick={generatePDF} className='bg-theme-primary px-5 py-2 text-white text-2xl rounded cursor-pointer'>
                    <ImFilePdf />
                </div>
                <div className='bg-theme-primary px-5 py-2 text-white text-lg rounded cursor-pointer'>
                    <div className='flex'>
                        <DownloadExcel
                            data={ allData }
                            fileName="aide-datatable"
                            buttonLabel="Export Excel"
                        />
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-center mb-3 text-2xl text-theme-text font-medium'>Aide Data Table</h2>
                <Table className='border' id='aideDataTable'>
                    <Thead className='sticky top-24 z-50'>
                        <Tr className='bg-theme-text text-white text-center py-2 border-b'>
                            {
                                tableHeaderData?.map((headerItem, i) => (
                                    <Th key={ i } className='py-2'>{ headerItem.item1 }</Th>
                                ))
                            }
                        </Tr>
                    </Thead>
                    <Tbody className='overflow-y-auto'>
                        {
                            allData?.map(tableData => (
                                <Tr key={ tableData._id } className='hover:bg-slate-200 border-b cursor-pointer text-center'>
                                    <Td className='py-2'>{ tableData.item1 }</Td>
                                    <Td className='py-2'>{ tableData.item2 }</Td>
                                    <Td className='py-2'>{ tableData.item3 }</Td>
                                    <Td className='py-2'>{ tableData.item4 }</Td>
                                    <Td className='py-2'>{ tableData.item5 }</Td>
                                    <Td className='py-2'>{ tableData.item6 }</Td>
                                    <Td className='py-2'>{ tableData.item7 }</Td>
                                    <Td className='py-2'>{ tableData.item8 }</Td>
                                    <Td className='py-2'>{ tableData.item9 }</Td>
                                    <Td className='py-2'>{ tableData.item10 }</Td>
                                    <Td className='py-2'>{ tableData.item11 }</Td>
                                    <Td className='py-2'>{ tableData.item12 }</Td>
                                    <Td className='py-2'>{ tableData.item13 }</Td>
                                    <Td className='py-2'>{ tableData.item14 }</Td>
                                    <Td className='py-2'>{ tableData.item15 }</Td>
                                    <Td>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="m-1 cursor-pointer"><BiDotsVerticalRounded className='text-2xl text-[#66C1DC]' /></label>
                                            <div tabIndex={0} className='dropdown-content p-4 shadow bg-base-100 rounded-box'>
                                                <div className='flex gap-3 text-2xl text-theme-primary'>
                                                    <label onClick={() => setDeletedTableData(tableData)} htmlFor="confirmationModal">
                                                        <AiOutlineDelete className='cursor-pointer' />
                                                    </label>
                                                    <Link to={`/dashboard/datatable/edit/${ tableData._id }`}>
                                                        <AiOutlineEdit className='cursor-pointer' />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </div>
            {
                deletedTableData &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${ deletedTableData.name }. It cannot be undone!`}
                    closeModal={closeModal}
                    successAction={handleTableDataDelete}
                    successButtonName={`Delete`}
                    modalData={deletedTableData}
                />
            }
        </div>
    );
};

export default DataTable;