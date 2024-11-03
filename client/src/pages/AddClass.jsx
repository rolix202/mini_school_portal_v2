import React, { useEffect, useState } from "react";
import FormInput from "../components/dashHomeComponents/FormInput";
import customFetch from "../utils/customFetch";

const AddClass = () => {

  const [staffs, setStaffs] = useState(null)
  const [classDetails, setClassDetails] = useState({
    name: "",
    class_arm: "",
    category: "",
    class_teacher: ""
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
    
    setClassDetails((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!classDetails.name || !classDetails.class_arm || !classDetails.category || !classDetails.class_teacher){
      alert("All fields required")
      return
    }

    try {
      const response = await customFetch.post("/class", classDetails)
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }

    setClassDetails({
      name: "",
      class_arm: "",
      category: "",
      class_teacher: ""
    })
    
    
  }

  return (
    <div className="main-content p-10">
      <div className="main-title border-b-2 pb-2">
        <h1 className="text-xl font-semibold">Add Class</h1>
      </div>
      <div className="main-content-body pt-8">
        <form action="" method="post" onSubmit={handleFormSubmit}>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="w-3/6 mx-auto">
              <h2 className="text-base font-semibold leading-7 text-gray-900 italic">
                Student Personal Information
              </h2>

              <div className="grid mt-10 gap-x-6 gap-y-8">
                <FormInput
                  labelName="Name"
                  inputName="name"
                  type="text"
                  value={classDetails.name}
                  onChange={handleFormInput}
                  selectOption={true}
                  options={["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"]}
                  required
                />
                <FormInput
                  labelName="Class Arm"
                  inputName="class_arm"
                  type="text"
                  value={classDetails.class_arm}
                  onChange={handleFormInput}
                  selectOption={true}
                  options={["Galaxy", "Platinum", "Lincoln", "Flamingo", "MaryGold", "Rose"]}
                  required
                />
                <FormInput
                  labelName="Category"
                  inputName="category"
                  type="text"
                  value={classDetails.category}
                  onChange={handleFormInput}
                  selectOption={true}
                  options={["junior secondary", "senior secondary"]}
                  required
                />
                <FormInput
                  labelName="Class Teacher"
                  inputName="class_teacher"
                  type="text"
                  value={classDetails.class_teacher}
                  onChange={handleFormInput}
                  selectOption={true}
                  options={staffs}
                  isFromDb={true}
                  isStaff={true}
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
  );
};

export default AddClass;
