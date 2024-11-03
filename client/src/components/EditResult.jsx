import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import customFetch from '../utils/customFetch';

const EditResult = ({ studentResult, setStudentResult }) => {
  const [editingRow, setEditingRow] = useState(null); // Track which row is being edited

  // Handle inline editing changes
  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedResults = [...studentResult];
    updatedResults[index].assessments[field] = value;

    // Update the total score automatically
    updatedResults[index].midTermTotal = parseFloat(updatedResults[index].assessments.firstCA || 0)
      + parseFloat(updatedResults[index].assessments.secondCA || 0);

    setStudentResult(updatedResults);
  };

  // Handle saving the updated results
  const handleSave = async (result, index) => {
    try {
      await customFetch.patch(`/assessments/${result._id}`, {
        firstCA: result.assessments.firstCA,
        secondCA: result.assessments.secondCA,
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



  return (
    <div className="main-content">
      <div className="main-content-body">
        <table className='table-auto border border-collapse text-blue-950 w-full'>
          <thead>
            <tr>
              <th className="border border-slate-400 text-center">S/N</th>
              <th className="border text-left border-slate-400">Subjects</th>
              <th className="border border-slate-400 text-center">CAT 1 (10)</th>
              <th className="border border-slate-400 text-center">CAT 2 (10)</th>
              <th className="border border-slate-400 text-center">Total (20)</th>
              <th className="border border-slate-400 text-center">Total (%)</th>
              <th className="border border-slate-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentResult?.length > 0 ? (
              studentResult.map((result, index) => (
                <tr key={index}>
                  <td className="border border-slate-400 text-center">{index + 1}</td>
                  <td className="border border-slate-400">{result.subject.name}</td>
                  
                  {/* CAT1 input: Toggle between editable and read-only */}
                  <td className="border border-slate-400 text-center">
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
                  <td className="border border-slate-400 text-center">
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
                  <td className="border border-slate-400 font-bold text-center">{result.midTermTotal}</td>
                  
                  {/* Percentage */}
                  <td className="border border-slate-400 font-bold text-center">{ Math.round((result.midTermTotal / 20) * 100)}%</td>

                  {/* Toggle edit/save buttons */}
                  <td className="border border-slate-400 text-center">
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

export default EditResult;
