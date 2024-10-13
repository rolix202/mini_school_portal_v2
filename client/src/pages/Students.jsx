import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/user-avatar.png';
import customFetch from '../utils/customFetch';
import FormInput from '../components/dashHomeComponents/FormInput';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classInfo, setClassInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassAndArm, setSelectedClassAndArm] = useState({
    name: '',
    class_arm: ''
  });
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const getClassAndArms = async () => {
      try {
        const res = await customFetch.get('/class/arm');
        setClassInfo(res?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getClassAndArms();
  }, []);

  const uniqueClassName = [...new Set(classInfo.map(info => info.name))];
  const uniqueClassArm = [...new Set(classInfo.map(info => info.class_arm))];

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setSelectedClassAndArm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClassAndArm.name || !selectedClassAndArm.class_arm) {
      alert('All fields required');
      return;
    }

    try {
      const response = await customFetch.get(`/students/?cname=${selectedClassAndArm.name}&&arm=${selectedClassAndArm.class_arm}`);
      const studentsData = response?.data?.data?.students;
      setStudents(studentsData);

      if (studentsData.length > 0) {
        setClassDetails(studentsData[0].class_id);
      } else {
        setClassDetails(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="main-content p-10">
        <div className="main-title border-b-2 pb-2">
          <h1 className="text-xl font-semibold">Students</h1>
        </div>
        <span className="italic mt-10">Loading ...!</span>
      </div>
    );
  }

  return (
    <div className="main-content p-10 bg-gray-100">
      <Link to="/dashboard/students/add" className="floating-button bg-blue-600 text-white mr-3 p-4 rounded-full shadow-lg hover:bg-blue-700">
              +
      </Link>
      
      <div className="fetch-students-form mb-8">
        <form onSubmit={handleSubmit}>
          <div className="pb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4 italic">Choose Class and Arm to view students.</h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-6">
                <FormInput
                  labelName="Class Name"
                  inputName="name"
                  selectOption={true}
                  options={uniqueClassName}
                  value={selectedClassAndArm.name}
                  onChange={handleFormInput}
                />
                <FormInput
                  labelName="Class Arm"
                  inputName="class_arm"
                  selectOption={true}
                  options={uniqueClassArm}
                  value={selectedClassAndArm.class_arm}
                  onChange={handleFormInput}
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                  Show Students
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {classDetails && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{`${classDetails.name} - ${classDetails.class_arm}`} Students</h1>
            <p className="text-md capitalize text-gray-600">{classDetails.category}</p>
            <div className="mt-4 text-gray-600">
              <span className="font-semibold capitalize">Tr. {classDetails.class_teacher.lastName} {classDetails.class_teacher.firstName} </span>  
              <span className='tracking-wider italic'>( {classDetails.class_teacher.phoneNo} )</span>
            </div>
          </div>
        </div>
      )}

      {students.length > 0 ? (
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
                <td className="p-4 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 transition duration-150">
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition duration-150">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-6 text-center text-gray-600">No students found for the selected class and arm.</p>
      )}
    </div>
  );
};

export default Students;
