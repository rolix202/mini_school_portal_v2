import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Link } from 'react-router-dom'
import Avatar from '../assets/user-avatar.png'

const Teachers = () => {

  const [teachers, setTeachers] = useState(null)

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/staffs")
        setTeachers(response?.data?.data?.staff)
      } catch (error) {
        console.log(error);
      }
    }
    getTeachers()
  }, [])
  
  return (
    <div className="main-content p-10">
      <div className="main-title border-b-2 pb-2">
        <h1 className='text-xl font-semibold'>Teachers</h1>
      </div>
      <div className="main-content-body pt-8">

        <div className="table-intro flex justify-between">
          <div className=''>
            <span className='text-md italic'>A list of all the Teachers in your school including their name, phone no, email and role.</span>
          </div>
          <div>
            <Link to="/dashboard/teachers/add" className='bg-blue-600 text-white p-2 rounded-lg'>Add Teacher</Link>
          </div>
        </div>
        <table className='table-auto border bg-gray-50 mt-10 w-full'>
          <thead className='bg-gray-300 border-slate-400'>
            <tr className='border-b-2'>
              {['S/N',  'Name', 'Staff ID', 'Phone No.', 'Email', 'Role', 'Status', 'Action' ].map((field) => (
                <th className="p-2 text-left" key={field}>{field} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            { teachers?.length > 0 ? ( teachers.map((teacher, index) => {

                return (
                  <tr className='border-b-2' key={index}>
                    <td className="p-2">{index + 1} </td>
                    
                    <td className="p-2 capitalize flex">
                    <img className="h-10 w-10 rounded-full" src={Avatar} alt="" />
                      <Link to={`/dashboard/teachers/${teacher._id}`} className='ml-3 grid content-center text-blue-600 hover:text-blue-900 font-medium'>
                        {teacher.firstName + " " + teacher.lastName}
                      </Link>
                    </td>
                    <td className="p-2">{teacher.staffId} </td>
                    <td className="p-2">{teacher.phoneNo} </td>
                    <td className="p-2">{teacher.email} </td>
                    <td className="p-2">{teacher.role} </td>
                    <td className="p-2">{teacher.status} </td>
                    <td className='p-2 flex justify-evenly'>
                      <button>
                        <PencilSquareIcon className='size-7 text-blue-500' />
                      </button>
                      <button>
                        <TrashIcon className='size-7 text-red-500'/>
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="8" className='text-center italic p-4'>No Teacher Found!</td>
              </tr>
            ) }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Teachers