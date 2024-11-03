import React, { useState } from 'react';

import { useFetchStudents } from '../components/customHooks';
import StudentView from '../components/StudentView';
import ModalView from '../components/ModalView';

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
  
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudents] = useState(null)

  if (loading) return <span className="italic mt-10">Loading ...!</span>;

  const handleEditClick = (student) => {
      setSelectedStudents({
        studentID: student._id,
        term: selectedClassAndArm.term,
        session: selectedClassAndArm.session
      });
      setOpen(true)
  }

  const renderActions = (student) => {
    
    return (
      <>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={() => handleEditClick(student)}>
          Edit
        </button>
        <a href={`/dashboard/results/${student._id}/midterm/?term=${selectedClassAndArm.term}&session=${selectedClassAndArm.session}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          MidTerm Result
        </a>
        <a href={`/dashboard/results/${student._id}/finalterm/?term=${selectedClassAndArm.term}&session=${selectedClassAndArm.session}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Final Result
        </a>
      
        {open && selectedStudent && (
          <ModalView 
          open={open}
          setOpen={setOpen}
          studentID={selectedStudent.studentID}
          term={selectedStudent.term}
          session={selectedStudent.session}
        />
        )}
        
        
      </>
    )
  };

  return (
    <StudentView
      classInfo={classInfo}
      selectedClassAndArm={selectedClassAndArm}
      handleFormInput={handleFormInput}
      handleSubmit={(e) => fetchStudents(e, true)}
      students={students}
      classDetails={classDetails}
      renderActions={renderActions}
      resultPage={true}
    />
  );
};

export default Results;

