import React, { useEffect, useState } from 'react'
import RolandImg from '../assets/roland.jpg'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { CheckIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import customFetch from '../utils/customFetch'

const ViewTeacher = () => {
    const { id } = useParams()

    const [teacher, setTeacher] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await customFetch.get(`/staffs/${id}`)
                setTeacher(response?.data?.data?.staff)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchTeacher()
    }, [id])

    if (loading) {
        return (
            <div className="main-content p-10">
                <div className="main-title border-b-2 pb-2">
                    <h1 className='text-xl font-semibold'>Teacher Details</h1>
                </div>
                <span className='italic mt-10'>Loading ...!</span>
            </div>
        )
    }

    return (
        <div className="main-content p-10">
            <div className="main-title border-b-2 pb-2">
                <h1 className='text-xl font-semibold'>Teacher Details</h1>
            </div>

            <div className="main-content-body pt-8">

                <Link to="/dashboard/teachers/view" className='bg-blue-600 text-white p-1 rounded-full flex items-center w-20'> <ChevronDoubleLeftIcon className='size-4 mr-1' /> Back</Link>


                <div className='teacher-info-wrapper flex mt-6'>

                    <div className='w-1/5 flex flex-col items-center'>
                        <div className='mb-6'>
                            <img
                                src={RolandImg}
                                alt="Teacher Roland"
                                className='w-60 h-auto border-gray-400 border-2 rounded-lg shadow-xl'
                            />
                        </div>
                        <p className='text-center font-semibold text-xl italic'>{teacher.staffId} </p>
                        <span className='text-center capitalize font-semibold text-green-800 tracking-wide bg-green-200 px-3 py-1 text-xs rounded-xl mt-2'>
                            {teacher.status}
                        </span>
                    </div>


                    <div className='bg-white ml-5 rounded-lg w-4/5 p-8 shadow-lg shadow-indigo-500/40'>
                        <table className='text-base leading-8 w-full'>
                            <tbody>
                                <tr className='border-b border-gray-200'>
                                    <td className='w-4/6 font-semibold text-gray-700 flex items-center py-4'>
                                        <CheckIcon className='h-5 w-5 mr-2 text-indigo-600' style={{ strokeWidth: 1.5 }} />
                                        Name of Teacher:
                                    </td>
                                    <td className='w-4/6 text-gray-800 capitalize'>{teacher.lastName + " " + teacher.firstName} </td>
                                </tr>
                                <tr className='border-b border-gray-200'>
                                    <td className='font-semibold text-gray-700 flex items-center py-4'>
                                        <CheckIcon className='h-5 w-5 mr-2 text-indigo-600' style={{ strokeWidth: 1.5 }} />
                                        Phone No.:
                                    </td>
                                    <td className='text-gray-800'>{teacher.phoneNo} </td>
                                </tr>
                                <tr className='border-b border-gray-200'>
                                    <td className='font-semibold text-gray-700 flex items-center py-4'>
                                        <CheckIcon className='h-5 w-5 mr-2 text-indigo-600' style={{ strokeWidth: 1.5 }} />
                                        Email:
                                    </td>
                                    <td className='text-gray-800'>{teacher.email} </td>
                                </tr>
                                <tr className='border-b border-gray-200'>
                                    <td className='font-semibold text-gray-700 flex items-center py-4'>
                                        <CheckIcon className='h-5 w-5 mr-2 text-indigo-600' style={{ strokeWidth: 1.5 }} />
                                        Role:
                                    </td>
                                    <td className='text-gray-800'>
                                        <ul>
                                            {teacher.role.map((el, index) => (
                                                <li key={index} className='capitalize'>{el.split("_").join(" ")} </li>
                                            ) )}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* <hr className='mt-6 mb-4 border-t border-gray-300' /> */}

                        <h2 className='font-semibold text-lg text-indigo-600 mt-6 mb-4 italic'>Assigned Subjects:</h2>
                        <ul className='space-y-2'>
                            <li className='flex justify-between items-center p-2 bg-indigo-50 rounded-lg'>
                                <span className='font-medium text-gray-700'>Mathematics</span>
                                <span className='text-sm text-gray-600'>200 Students</span>
                            </li>
                            <li className='flex justify-between items-center p-2 bg-indigo-50 rounded-lg'>
                                <span className='font-medium text-gray-700'>Data Processing</span>
                                <span className='text-sm text-gray-600'>1500 Students</span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ViewTeacher
