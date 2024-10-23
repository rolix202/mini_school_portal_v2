import React from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Avatar from '../assets/user-avatar.png';

const StudentTable = ({students, actions}) => {
  return (
    <>
        <table className="table-auto w-full bg-white rounded-lg shadow-md mb-8 border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {['S/N', 'Student Name', 'Student ID', 'Status', 'Actions'].map((header) => (
                <th key={header} className="p-4 text-left font-semibold text-gray-700">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="p-4 text-gray-600">{index + 1}</td>
                <td className="p-4 flex items-center capitalize text-gray-800">
                  <img src={Avatar} alt="Avatar" className="h-10 w-10 rounded-full mr-2" />
                  {student.firstName} {student.lastName}
                </td>
                <td className="p-4 text-gray-600">{student.studentID}</td>
                <td className="p-4 text-gray-600 capitalize">{student.status}</td>
                <td className="p-4 flex space-x-2">{actions(student)}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}

export default StudentTable