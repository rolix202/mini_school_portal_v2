import React from 'react';
import FormInput from './dashHomeComponents/FormInput';
import StudentTable from './StudentTable';

const StudentView = ({ classInfo, selectedClassAndArm, handleFormInput, handleSubmit, students, classDetails, renderActions, resultPage }) => {
    const uniqueClassName = [...new Set(classInfo.map(info => info.name))];
    const uniqueClassArm = [...new Set(classInfo.map(info => info.class_arm))];

    return (
        <div className="main-content p-10 bg-gray-100">
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
                                {resultPage &&
                                    <>
                                        <FormInput
                                            labelName="Term"
                                            inputName="term"
                                            selectOption={true}
                                            options={["1st Term", "2nd Term", "3rd term"]}
                                            value={selectedClassAndArm.term}
                                            onChange={handleFormInput}
                                        />

                                        <FormInput
                                            labelName="Session"
                                            inputName="session"
                                            selectOption={true}
                                            options={["2024/2025", "2023/2024", "2022/2023", "2021/2022", "2020/2021"]}
                                            value={selectedClassAndArm.session}
                                            onChange={handleFormInput}
                                        />
                                    </>
                                }
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
                <StudentTable students={students} actions={renderActions} />
            ) : (
                <p className="mt-6 text-center text-gray-600">No students found for the selected class and arm.</p>
            )}
        </div>
    );
};

export default StudentView;
