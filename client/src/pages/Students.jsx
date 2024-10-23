import React from 'react';
import useFetchStudents from '../components/customHooks';
import StudentView from '../components/StudentView';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const Students = () => {
  const {
    students,
    classInfo,
    loading,
    selectedClassAndArm,
    classDetails,
    handleFormInput,
    fetchStudents,
  } = useFetchStudents();

  if (loading) return <span className="italic mt-10">Loading ...!</span>;

  const renderActions = (student) => (
    <>
      <button className="text-blue-600 hover:text-blue-800 transition duration-150">
        <PencilSquareIcon className="w-5 h-5" />
      </button>
      <button className="text-red-600 hover:text-red-800 transition duration-150">
        <TrashIcon className="w-5 h-5" />
      </button>
    </>
  );

  return (
    <StudentView
      classInfo={classInfo}
      selectedClassAndArm={selectedClassAndArm}
      handleFormInput={handleFormInput}
      handleSubmit={() => fetchStudents()}
      students={students}
      classDetails={classDetails}
      renderActions={renderActions}
    />
  );
};

export default Students;
