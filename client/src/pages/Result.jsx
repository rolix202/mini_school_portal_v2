import React from 'react';
import useFetchStudents from '../components/customHooks';
import StudentView from '../components/StudentView';

const Results = () => {
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
    <a href={`/dashboard/results/${student._id}/?term=${selectedClassAndArm.term}&session=${selectedClassAndArm.session}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
      View Result
    </a>
  );

  return (
    <StudentView
      classInfo={classInfo}
      selectedClassAndArm={selectedClassAndArm}
      handleFormInput={handleFormInput}
      handleSubmit={()=> fetchStudents(true)}
      students={students}
      classDetails={classDetails}
      renderActions={renderActions}
      resultPage={true}
    />
  );
};

export default Results;
