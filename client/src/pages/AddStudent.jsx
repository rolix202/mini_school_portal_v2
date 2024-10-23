import React, { useEffect, useState } from 'react'
import FormInput from '../components/dashHomeComponents/FormInput'
import customFetch from '../utils/customFetch'

const AddStudent = () => {

  const [getSubjects, setGetSubjects] = useState([])
  const [getClasses, setGetClasses] = useState([])
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    otherNames: "",
    class_id: "",
    subjects: []
  })

  useEffect(() => {
    const getSubjects = async () => {
     
      try {
        const [subject2, classes] = await Promise.all([
          customFetch.get("/subjects"),
          customFetch.get("/class")
        ])

        const getSubj = subject2?.data?.data
        const getClasses = classes?.data?.data

        setGetSubjects(getSubj)
        setGetClasses(getClasses)
        
      } catch (error) {
        console.log(error);
      }
    }

    getSubjects()
  }, [])

  const handleFormDetails = (e) => {
    const { name, value } = e.target

    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSelectedSubjects = (e) => {
    const { name, checked } = e.target

    setFormDetails((prev) => {
      const updatedSubjects = checked ? [...prev.subjects, name] : prev.subjects.filter((subject) => subject !== name)
      return {
        ...prev,
        subjects: updatedSubjects
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await customFetch.post("/students", formDetails)
      
      setFormDetails({
        firstName: "",
        lastName: "",
        otherNames: "",
        class_id: "",
        subjects: []
      });
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="main-content p-10">
      <div className="main-title border-b-2 pb-2">
        <h1 className='text-xl font-semibold'>Add Student</h1>
      </div>
      <div className="main-content-body pt-8">
        <form action="" method='post' onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-12">

            <div className='w-3/6 mx-auto'>
              <h2 className='text-base font-semibold leading-7 text-gray-900 italic'>Student Personal Information</h2>

              <div className="grid mt-10 gap-x-6 gap-y-8">

                <FormInput
                  labelName="First Name"
                  inputName="firstName"
                  type="text"
                  required="required"
                  onChange={handleFormDetails}
                  value={formDetails.firstName}
                />

                <FormInput
                  labelName="Last Name"
                  inputName="lastName"
                  type="text"
                  required="required"
                  onChange={handleFormDetails}
                  value={formDetails.lastName}
                />

                <FormInput
                  labelName="Other Names"
                  inputName="otherNames"
                  type="text"
                  onChange={handleFormDetails}
                  value={formDetails.otherNames}
                />

                <FormInput
                  labelName="Class"
                  inputName="class_id"
                  selectOption={true}
                  isFromDb={true}
                  options={getClasses}
                  value={formDetails.class_id}
                  onChange={handleFormDetails}
                  
                />
              </div>

              <h2 className='text-base font-semibold leading-7 text-gray-900 italic mt-10'>Assign Subjects to Student</h2>

              <div className="grid grid-cols-3 mt-10 gap-x-6 gap-y-8">

                {getSubjects.length > 0 ? (
                  (getSubjects.map((subject, index) => {
                    return (
                      <div className="text-sm leading-6" key={index}>
                        <label htmlFor={subject.name} className='font-medium text-gray-900 flex gap-x-3'>

                          <div className="flex h-6 items-center">
                            <input type="checkbox" id={subject.name} name={subject._id} className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600' onChange={handleSelectedSubjects} checked={formDetails.subjects.includes(subject._id)} />
                          </div>
                          <span>{subject.name} </span>
                        </label>
                      </div>
                    )
                  }))
                ) : (
                  <span>No Subject found</span>
                )}


              </div>
            </div>


          </div>

          <div className="mt-6 flex justify-end w-3/6 mx-auto">
            <button type='submit' className='rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add Student</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddStudent