"use client";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {h} from "preact";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";

interface AddEmployee {
  cycleType: string;
  cycles: string;
  pitch: string;
  intro: string;
  university: string;
  studyYear: string;
  degreeType: string;
  degree: string;
  links: string[];
  graduationDate: Date;
}

interface OptionType {
  value: string
  label: string
}

interface AddEmployeeProps {
  session: Session
}

// for now this will get really messy but will hardcode the searchable dropdown options for now
const universityOptions:OptionType[] = [
  { value: 'University of Waterloo', label: 'University of Waterloo' },
  { value: 'University of Toronto', label: 'University of Toronto' },
  { value: 'Wilfrid Laurier University', label: 'Wilfrid Laurier University' }
]

const degreeOptions:OptionType[] = [
  { value: 'Nanotechnology Engineering', label: 'Nanotechnology Engineering' },
  { value: 'Mechatronics Engineering', label: 'Mechatronics Engineering' },
  { value: 'Computer Engineering', label: 'Computer Engineering' },
]

const Step1 = ({ formData, handleChange, max }) => {
  return (
    <div className="space-y-4">
      <h2>Personal Information</h2>
      <div>
        <label htmlFor="pitch" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Pitch (max 10 words)
        </label>
        <textarea
          id="pitch"
          name="pitch"
          value={formData.pitch}
          onChange={(e) => handleChange(e, 'pitch')}
          className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:${max ? 'ring-red-500' : 'ring-blue-500'} dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
        />
      </div>

      <div>
        <label htmlFor="intro" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Introduction
        </label>
        <textarea
          id="intro"
          name="intro"
          value={formData.intro}
          onChange={(e) => handleChange(e, 'intro')}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  );
};

// some more hard coded shit that I will deal with cleaning up later
const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: '#fff',
    borderColor: '#d1d5db', // Tailwind's gray-300
    borderRadius: '0.375rem', // Tailwind's rounded-md
    padding: '0.5rem',
    fontSize: '0.875rem', // Tailwind's text-sm
    fontWeight: '500', // Tailwind's font-medium
    color: '#4b5563', // Tailwind's text-gray-700
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#6b7280', // Tailwind's text-gray-500 (for placeholder text)
    fontSize: '0.875rem', // Tailwind's text-sm
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#4b5563', // Tailwind's text-gray-700
    fontSize: '0.875rem', // Tailwind's text-sm
    fontWeight: '500', // Tailwind's font-medium
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#93c5fd' : '#fff',
    color: state.isSelected ? 'white' : '#4b5563', // Tailwind's text-gray-700
    padding: '0.75rem 1rem',
    fontSize: '0.875rem', // Tailwind's text-sm
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 100, // Ensure the dropdown is above other elements
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    backgroundColor: '#d1d5db', // Tailwind's gray-300
  }),
}

const Step2 = ({ formData, handleChange }) => {
  const [checkboxes, setCheckboxes] = useState<{[year: number]: boolean[]}>({});
  const [splits, setSplit] = useState<string[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    if (formData.cycleType === '3') {
      console.log({
        [currentYear]: [false, false, false],
      });
      setCheckboxes({
        [currentYear]: [false, false, false],
      });
      setSplit(['Winter', 'Spring', 'Fall'])
    } else if (formData.cycleType === '2') {
      setCheckboxes({
        [currentYear]: [false, false],
      });
      setSplit(['Spring', 'Fall'])
    } else if (formData.cycleType === '4') {
      setCheckboxes({
        [currentYear]: [false, false, false, false],
      });
      setSplit(['Winter', 'Spring', 'Summer', 'Fall'])
    } else {
      setCheckboxes({});
      setSplit([]);
    }
  }, [formData.cycleType]);

  const years = Object.keys(checkboxes);

  const handleCheckboxChange = (year: string, index: number) => {
    setCheckboxes((prev) => ({
      ...prev,
      [year]: prev[year].map((checked, i) => (i === index ? !checked : checked)),
    }));
  };

  const handleAddRow = () => {
    const lastKey = Object.keys(checkboxes).pop();
    const newKey = (lastKey ? parseInt(lastKey, 10) : 0) + 1;
    setCheckboxes((prev) => ({
      ...prev,
      [newKey]: new Array(parseInt(formData.cycleType)).fill(false),
    }))
  }

  const handleRemoveRow = () => {
    if (Object.keys(checkboxes).length > 1) {
      setCheckboxes((prev) => {
        const keys = Object.keys(checkboxes);
        const newState = { ...prev };
        delete newState[keys[keys.length - 1]];
        return newState;
      });
    }
  }

  return (
    <div className="space-y-4">
      <h2>Education Information</h2>
      <div>
        <label htmlFor="university" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          University
        </label>
        <Select
          name="university"
          value={{label: formData.university, value: formData.university}}
          onChange={(selected) => handleChange(selected, 'university')}
          options={universityOptions}
          styles={customStyles}
        />
        {/*<input*/}
        {/*  type="text"*/}
        {/*  id="university"*/}
        {/*  name="university"*/}
        {/*  value={formData.university}*/}
        {/*  onChange={(e) => handleChange(e, 'university')}*/}
        {/*  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"*/}
        {/*/>*/}
      </div>

      <div>
        <label htmlFor="studyYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Study Year
        </label>
        <select
          id="studyYear"
          name="studyYear"
          value={formData.studyYear}
          onChange={(e) => handleChange(e, 'studyYear')}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
          <option value="5">5th Year</option>
          <option value="3">6th Year &lt;</option>
        </select>
        {/*<input*/}
        {/*  type="text"*/}
        {/*  id="studyYear"*/}
        {/*  name="studyYear"*/}
        {/*  value={formData.studyYear}*/}
        {/*  onChange={(e) => handleChange(e, 'studyYear')}*/}
        {/*  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"*/}
        {/*/>*/}
      </div>

      <div>
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Degree
        </label>
        <select
          id="degree"
          name="degree"
          value={formData.degree}
          onChange={(e) => handleChange(e, 'degree')}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="Bachelor">Bachelor</option>
          <option value="Master">Master</option>
          <option value="PhD">PhD</option>
        </select>
      </div>

      <div>
        <label htmlFor="degreeName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Degree Name
        </label>
        <Select
          name="degreeName"
          value={{value: formData.degreeName, label: formData.degreeName}}
          onChange={(selected) => handleChange(selected, 'degreeName')}
          options={degreeOptions}
          styles={customStyles}
        />
        {/*<Select*/}
        {/*  name="university"*/}
        {/*  value={{value: formData.university, label: formData.university}}*/}
        {/*  onChange={(selected) => handleChange(selected, 'university')}*/}
        {/*  options={universityOptions}*/}
        {/*  styles={customStyles}*/}
        {/*/>*/}
        <input
          type="text"
          id="degreeName"
          name="degreeName"
          value={formData.degreeName}
          onChange={(e) => handleChange(e, 'degreeName')}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cycles
        </label>
        <select
          id="degree"
          name="degree"
          value={formData.cycleType}
          onChange={(e) => handleChange(e, 'cycleType')}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="none">Select...</option>
          <option value="3">Trimester</option>
          <option value="4">Quarter</option>
          <option value="2">Semester</option>
        </select>
        {/*<input*/}
        {/*  type="text"*/}
        {/*  id="cycles"*/}
        {/*  name="cycles"*/}
        {/*  value={formData.cycleType}*/}
        {/*  onChange={(e) => handleChange(e, 'cycles')}*/}
        {/*  required*/}
        {/*  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"*/}
        {/*/>*/}
        {(formData.cycleType || formData.cycleType === 'none') && (
          <div>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-left">Year</th>
                {splits.map((item) => (
                  <th key={item} className="border-b border-gray-300 px-4 py-2 text-left">{item}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {years.map((year) => (
                <tr key={year}>
                  <td className="border-b border-gray-300 px-4 py-2">{year}</td>
                  {checkboxes[year].map((checked, index) => (
                    <td key={index} className="border-b border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxChange(year, index)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleRemoveRow()} // Function to handle removing rows
                className="inline-flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleAddRow()} // Function to handle adding rows
                className="inline-flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

          </div>
        )}
      </div>
      {/*<div>*/}
      {/*  <label htmlFor="cycles" className="block text-sm font-medium text-gray-700 dark:text-gray-300">*/}
      {/*    Cycles*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    id="cycles"*/}
      {/*    name="cycles"*/}
      {/*    value={formData.cycles}*/}
      {/*    onChange={(e) => handleChange(e, 'cycles')}*/}
      {/*    required*/}
      {/*    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

const Step3 = ({formData, handleChange, handleRemoveLink}) => {
  return (
    <div className="space-y-4">
      <h2>Additional Information</h2>
      <div>
        <label htmlFor="links" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Links (Portfolio, LinkedIn, etc.)
        </label>
        {formData.links.map((link, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              name="links"
              value={link}
              onChange={(e) => handleChange(e, 'links', index)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <button
              type="button"
              onClick={() => handleRemoveLink(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleChange({target: {name: 'links', value: ''}}, 'links')}
          className="text-blue-500 mt-2"
        >
          Add another link
        </button>
      </div>

      <div>
        <label htmlFor="graduationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Graduation Date
        </label>
        <input
          type="date"
          id="graduationDate"
          name="graduationDate"
          value={formData.graduationDate}
          onChange={(e) => handleChange({ target: { name: 'graduationDate', value: e.target.value } }, 'graduationDate')}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  );
};

const AddEmployee = () => {
  const [step, setStep] = useState(1);
  const [max, setMax] = useState(false);
  const [formData, setFormData] = useState<AddEmployee>({
    cycleType: "",
    cycles: "",
    degreeType: "",
    degree: "",
    graduationDate: new Date(),
    intro: "",
    links: [""],
    pitch: "",
    studyYear: "",
    university: ""
  });
  const { data: session, status, update } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | OptionType, name:string, index?: number) => {
    console.log(name, index);
    if (e && (e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>).target) {
      const value = (e as React.ChangeEvent<HTMLInputElement>).target.value;
      console.log(name, value, 'in here');
      if (name === 'links') {
        const updatedLinks = [...formData.links];
        if (index !== undefined) {
          updatedLinks[index] = value;
        } else {
          updatedLinks.push(''); // Add a new empty string to the array
        }
        setFormData((prevData) => ({
          ...prevData,
          links: updatedLinks,
        }));
      } else {
        console.log(value.trim().split(" ").length);
        if ((name === 'pitch') && (value.trim().split(" ").length > 10)) {
          setMax(true);
        } else {
          setMax(false);
        }
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      // Handling react-select (if e is an OptionType)
      const selected = (e as OptionType).value
      console.log(selected);
      setFormData((prevData) => ({
        ...prevData,
        [name]: selected,  // Update the formData with the selected option
      }))
    }
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = formData.links.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      links: updatedLinks,
    }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div>
        {step === 1 && <Step1 formData={formData} handleChange={handleChange} max={max} />}
        {step === 2 && <Step2 formData={formData} handleChange={handleChange} />}
        {step === 3 && <Step3 formData={formData} handleChange={handleChange} handleRemoveLink={handleRemoveLink} />}

        <div className="mt-6 flex justify-between w-full">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md focus:outline-none"
            >
              Previous
            </button>
          )}

          <div className="ml-auto">
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee;
