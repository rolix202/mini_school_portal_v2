import { useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';

const useFetchStudents = (initialClass = { name: '', class_arm: '', term: '', session: '' }) => {
  const [students, setStudents] = useState([]);
  const [classInfo, setClassInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassAndArm, setSelectedClassAndArm] = useState(initialClass);
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const getClassAndArms = async () => {
      try {
        const res = await customFetch.get('/class/arm');        
        setClassInfo(res?.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getClassAndArms();
  }, []);

  const fetchStudents = async (includeResults = false ) => {
    if (!selectedClassAndArm.name || !selectedClassAndArm.class_arm || (includeResults && (!selectedClassAndArm.term || !selectedClassAndArm.session)) ) {
      alert('All fields required');
      return;
    }
    setLoading(true);

    try {
        let url = `/students/?cname=${selectedClassAndArm.name}&&arm=${selectedClassAndArm.class_arm}`


        if (includeResults){
            url += `&&term=${selectedClassAndArm.term}&&session=${selectedClassAndArm.session}`
        }

      const response = await customFetch.get(url)

      const studentsData = response?.data?.data?.students;
      console.log(studentsData);
      
      setStudents(studentsData);

      if (studentsData.length > 0) {
        setClassDetails(studentsData[0].class_id);
      } else {
        setClassDetails(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setSelectedClassAndArm((prev) => ({ ...prev, [name]: value }));
  };

  return {
    students,
    classInfo,
    loading,
    selectedClassAndArm,
    classDetails,
    handleFormInput,
    fetchStudents,
  };
};

export default useFetchStudents;
