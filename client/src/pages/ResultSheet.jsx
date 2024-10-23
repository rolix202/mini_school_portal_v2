// import React, { useEffect, useState } from 'react'
// import { useLocation, useParams, useSearchParams } from 'react-router-dom'
// import customFetch from '../utils/customFetch'

// const ResultSheet = () => {

//     const { id } = useParams()
//     const [searchParams, setSearchParams] = useSearchParams()
//     const [studentResult, setStudentResult] = useState([])
//     const [loading, setLoading] = useState(true)

//     const term = searchParams.get("term")
//     const session = searchParams.get("session")

//     useEffect(() => {
//         const fetchResults = async () => {
//             try {
//                 const res = await customFetch.get(`/assessments/${id}?term=${term}&session=${session}`)
//                 setStudentResult(res?.data?.data)
//                 console.log(res?.data?.data);

//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchResults()
//     }, [id, term, session])

//     if (loading) return <p>Loading results...</p>;

//     return (
//         <div className="main-content p-10">
//             <div className="main-title border-b-2 pb-2">
//                 <h1 className='text-xl font-semibold'>Result Sheet</h1>
//             </div>
//             <div className="main-content-body pt-8">
//                 <table className='table-auto w-1/2 border border-collapse text-blue-950'>
//                     <thead>
//                         <tr>
//                             <th className="border text-left border-slate-400">S/N</th>
//                             <th className="border text-left border-slate-400">Subject</th>
//                             <th className="border text-left border-slate-400">CAT 1 (10)</th>
//                             <th className="border text-left border-slate-400">CAT 2 (10)</th>
//                             <th className="border text-left border-slate-400">Total (20)</th>
//                             <th className="border text-left border-slate-400">Total (%)</th>
//                         </tr>

//                     </thead>
//                     <tbody>
//                         {studentResult?.length > 0 ? (
//                             studentResult.map((result, index) => {
//                                 return (
//                                     <tr key={index}>
//                                         <td className="border border-slate-400">{index + 1} </td>
//                                         <td className="border border-slate-400">{result.subject.name} </td>
//                                         <td className="border border-slate-400 font-bold">{result.assessments.firstCA} </td>
//                                         <td className="border border-slate-400 font-bold">{result.assessments.secondCA} </td>
//                                         <td className="border border-slate-400 font-bold">{result.totalScore} </td>
//                                         <td className="border border-slate-400 font-bold">{(result.totalScore / 20) * 100}% </td>
//                                     </tr>
//                                 )
//                             })
//                         ) : (
//                             <tr>
//                                 <td colSpan="6" className='text-center italic p-4'>No Teacher Found!</td>
//                             </tr>
//                         )}

//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default ResultSheet






import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import customFetch from '../utils/customFetch';

const ResultSheet = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [studentResult, setStudentResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null); // Track which row is being edited

  const term = searchParams.get("term");
  const session = searchParams.get("session");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await customFetch.get(`/assessments/${id}?term=${term}&session=${session}`);
        setStudentResult(res?.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id, term, session]);

  // Handle inline editing changes
  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedResults = [...studentResult];
    updatedResults[index].assessments[field] = value;

    // Update the total score automatically
    updatedResults[index].totalScore = parseFloat(updatedResults[index].assessments.firstCA || 0)
      + parseFloat(updatedResults[index].assessments.secondCA || 0);

    setStudentResult(updatedResults);
  };

  // Handle saving the updated results
  const handleSave = async (result, index) => {
    try {
      await customFetch.put(`/assessments/${id}/${result.subject.id}`, {
        firstCA: result.assessments.firstCA,
        secondCA: result.assessments.secondCA,
        totalScore: result.totalScore
      });
      alert('Result updated successfully!');
    } catch (error) {
      console.error('Error updating result', error);
      alert('Failed to update result.');
    } finally {
      // Exit editing mode after saving
      setEditingRow(null);
    }
  };

  if (loading) return <p>Loading results...</p>;

  return (
    <div className="main-content p-10">
      <div className="main-title border-b-2 pb-2">
        <h1 className='text-xl font-semibold'>Result Sheet</h1>
      </div>
      <div className="main-content-body pt-8">
        <table className='table-auto w-1/2 border border-collapse text-blue-950'>
          <thead>
            <tr>
              <th className="border text-left border-slate-400">S/N</th>
              <th className="border text-left border-slate-400">Subject</th>
              <th className="border text-left border-slate-400">CAT 1 (10)</th>
              <th className="border text-left border-slate-400">CAT 2 (10)</th>
              <th className="border text-left border-slate-400">Total (20)</th>
              <th className="border text-left border-slate-400">Total (%)</th>
              <th className="border text-left border-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentResult?.length > 0 ? (
              studentResult.map((result, index) => (
                <tr key={index}>
                  <td className="border border-slate-400">{index + 1}</td>
                  <td className="border border-slate-400">{result.subject.name}</td>
                  
                  {/* CAT1 input: Toggle between editable and read-only */}
                  <td className="border border-slate-400">
                    {editingRow === index ? (
                      <input
                        type="number"
                        value={result.assessments.firstCA}
                        onChange={(e) => handleInputChange(e, index, 'firstCA')}
                        className="p-2 border rounded-lg w-full"
                      />
                    ) : (
                      result.assessments.firstCA
                    )}
                  </td>

                  {/* CAT2 input: Toggle between editable and read-only */}
                  <td className="border border-slate-400">
                    {editingRow === index ? (
                      <input
                        type="number"
                        value={result.assessments.secondCA}
                        onChange={(e) => handleInputChange(e, index, 'secondCA')}
                        className="p-2 border rounded-lg w-full"
                      />
                    ) : (
                      result.assessments.secondCA
                    )}
                  </td>

                  {/* Total score */}
                  <td className="border border-slate-400 font-bold">{result.totalScore}</td>
                  
                  {/* Percentage */}
                  <td className="border border-slate-400 font-bold">{(result.totalScore / 20) * 100}%</td>

                  {/* Toggle edit/save buttons */}
                  <td className="border border-slate-400">
                    {editingRow === index ? (
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => handleSave(result, index)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => setEditingRow(index)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className='text-center italic p-4'>No results found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultSheet;
