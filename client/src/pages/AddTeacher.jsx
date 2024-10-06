import React, { useState } from 'react'
import FormInput from '../components/dashHomeComponents/FormInput'
import axios from 'axios'

const AddTeacher = () => {

  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "", 
    email: "",
    password: "",
    confirmPass: ""
  })

  const handleFormInputs = (e) => {
    const { name, value } = e.target

    setTeacherData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5000/api/v1/staffs", teacherData)
      console.log(response);
    setTeacherData({
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      password: "",
      confirmPass: ""
    })
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  
  return (
    <div className="main-content p-10">
      <div className="main-title border-b-2 pb-2">
        <h1 className='text-xl font-semibold'>Add Teacher</h1>
      </div>
      <div className="main-content-body pt-8">
        <form action="" onSubmit={handleFormSubmit}>
          <div className="border-b border-gray-900/10 pb-12">

            <h2 className='text-base font-semibold leading-7 text-gray-900 italic'>Personal Information</h2>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-8">

              <FormInput
                labelName="First Name"
                inputName="firstName"
                type="text"
                required="required"
                onChange={handleFormInputs}
                value={teacherData.firstName}
              />

              <FormInput
                labelName="Last Name"
                inputName="lastName"
                type="text"
                required="required"
                onChange={handleFormInputs}
                value={teacherData.lastName}
              />

              <FormInput
                labelName="Phone Number"
                inputName="phoneNo"
                type="text"
                required="required"
                onChange={handleFormInputs}
                value={teacherData.phoneNo}
              />

              <FormInput
                labelName="Email"
                inputName="email"
                type="email"
                required="required"
                onChange={handleFormInputs}
                value={teacherData.email}
              />

              <FormInput
                labelName="Password"
                inputName="password"
                type="password"
                required="required"
                onChange={handleFormInputs}
                value={teacherData.password}
              />

              <FormInput
                labelName="Confirm Password"
                inputName="confirmPass"
                type="password"
                required="required"
                onChange={handleFormInputs}
                value={teacherData.confirmPass}
              />

            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type='submit' className='rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Create</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddTeacher