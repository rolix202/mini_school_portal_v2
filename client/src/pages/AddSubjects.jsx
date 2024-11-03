import React, { useEffect, useState } from 'react'
import FormInput from '../components/dashHomeComponents/FormInput'
import customFetch from '../utils/customFetch'

const AddSubjects = () => {

  const [staffs, setStaffs] = useState(null)
  const [subjectDetails, setSubjectDetails] = useState({
    name: "",
    subject_teacher: ""
  })

  useEffect(() => {
    const fetchStaffs = async() => {
      try {
        const response = await customFetch.get("/staffs/class")
        setStaffs(response?.data?.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchStaffs()
  }, [])

  const handleFormInput = (e) => {
    const { name, value } = e.target
    setSubjectDetails((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!subjectDetails.name || !subjectDetails.subject_teacher){
      alert("All fields required")
      return
    }

    try {
      const response = await customFetch.post("/subjects", subjectDetails)
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }

    setSubjectDetails({
      name: "",
      subject_teacher: ""
    })
    
    
  }

  return (
    <div className="main-content p-10">
            <div className="main-title border-b-2 pb-2">
                <h1 className='text-xl font-semibold'>Add Subject</h1>
            </div>
            <div className="main-content-body pt-8">
            <form action="" method="post" onSubmit={handleFormSubmit}>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="w-3/6 mx-auto">
              <h2 className="text-base font-semibold leading-7 text-gray-900 italic">
                Add subject along side the subject teacher
              </h2>

              <div className="grid mt-10 gap-x-6 gap-y-8">
                <FormInput
                  labelName="Name"
                  inputName="name"
                  type="text"
                  value={subjectDetails.name}
                  onChange={handleFormInput}
                  required
                />
                <FormInput
                  labelName="Subject Teacher"
                  inputName="subject_teacher"
                  type="text"
                  value={subjectDetails.subject_teacher}
                  onChange={handleFormInput}
                  selectOption={true}
                  options={staffs}
                  isStaff={true}
                  isFromDb={true}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end w-3/6 mx-auto">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Class
            </button>
          </div>
        </form>
            </div>

        </div>
  )
}

export default AddSubjects