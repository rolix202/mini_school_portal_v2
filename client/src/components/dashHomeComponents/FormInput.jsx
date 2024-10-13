import React from 'react'

const FormInput = ({ labelName, inputName, type, onChange, value, required, selectOption, options, isFromDb }) => {
  return (
    <div className="flex-1 sm:col-span-3">
      <label htmlFor={inputName} className='block text-sm font-medium text-gray-900 mb-1'>
        {labelName}
      </label>
      <div className="mt-1">
        {selectOption ? (
          <select
            id={inputName}
            name={inputName}
            value={value}
            onChange={onChange}
            required={required}
            className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">Select {labelName} </option>
            { options && options.map((option, index) => {
              return (
                <option value={isFromDb ? option._id : option} key={index}>{isFromDb ? `${option.name + " " + option.class_arm}` : option} </option>
              )
            }) }
            
          </select>
        ) : (
          <input
            type={type}
            id={inputName}
            name={inputName}
            value={value}
            onChange={onChange}
            required={required}
            className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          />
        )}
      </div>
    </div>
  );
};

export default FormInput