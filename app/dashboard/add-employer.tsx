"use client";
import Select from "react-select";
import React, { useState } from "react";
import {Session} from "next-auth";
import {useRouter} from "next/navigation";
import { useSession } from "next-auth/react";
import {OptionType, AddEmployer} from "@/app/types/user";

// this location absolutely can not be hardcoded here I need some api or some way to getting a list of all
// locations but for now will just leave it as hard coded in.
const addressOptions:OptionType[] = [
  { value: 'Mississauga, Ontario, Canada', label: 'Mississauga, Ontario, Canada' },
  { value: 'Waterloo, Ontario, Canada', label: 'Waterloo, Ontario, Canada' },
  { value: 'Montreal, Quebec, Canada', label: 'Montreal, Quebec, Canada' },
]

const industryOptions:OptionType[] = [
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Aerospace', label: 'Aerospace' },
  { value: 'Consulting', label: 'Consulting' },
]

// step 1 will have address, hiring, industry, company size, website
const Step1 = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <h2>About the Company</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Address
        </label>
        <Select
          name="address"
          value={{label: formData.address, value: formData.address}}
          onChange={(selected) => handleChange(selected, 'address')}
          options={addressOptions}
          // styles={customStyles}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Hiring Preference
        </label>
        <select
          id="hiringPreference"
          name="hiringPreference"
          value={formData.hiringPreference}
          onChange={(e) => handleChange(e, 'hiringPreference')}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="0">Select...</option>
          <option value="1">No idea what</option>
          <option value="2">I'm talking about</option>
          <option value="3">here</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Industry
        </label>
        <Select
          name="industry"
          value={{label: formData.industry, value: formData.industry}}
          onChange={(selected) => handleChange(selected, 'industry')}
          options={industryOptions}
          // styles={customStyles}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Size
        </label>
        <select
          id="size"
          name="size"
          value={formData.size}
          onChange={(e) => handleChange(e, 'size')}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="0">Select...</option>
          <option value="small">1-50</option>
          <option value="medium-small">51-200</option>
          <option value="medium">201-1000</option>
          <option value="large">1000 &lt;</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Link to company website
        </label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={(e) => handleChange(e, 'website')}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  )
}

// step 2 will have summary, values and mission
const Step2 = ({formData, handleChange}) => {
  return (
    <div className="space-y-4">
      <h2>About the Company</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Overview
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={(e) => handleChange(e, 'summary')}
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:'ring-blue-500' dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Values
        </label>
        <textarea
          id="values"
          name="values"
          value={formData.values}
          onChange={(e) => handleChange(e, 'values')}
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:'ring-blue-500' dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Mission
        </label>
        <textarea
          id="mission"
          name="mission"
          value={formData.mission}
          onChange={(e) => handleChange(e, 'mission')}
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:'ring-blue-500' dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  )
}

const AddEmployer = () => {
  const [formData, setFormData] = useState<AddEmployer>({
    address: "",
    hiringPreference: "",
    website: "",
    industry: "",
    size: "",
    summary: "",
    values: "",
    mission: ""
  });
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | OptionType, name: string, index?: number) => {
    if (e && (e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>).target) {
      const value = (e as React.ChangeEvent<HTMLInputElement>).target.value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // Handling react-select (if e is an OptionType)
      const selected = (e as OptionType).value
      setFormData((prevData) => ({
        ...prevData,
        [name]: selected,  // Update the formData with the selected option
      }))
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required:boolean[] = [
      formData.address === '',
      formData.hiringPreference === '',
      formData.website === '',
      formData.industry === '',
      formData.size === '',
      formData.summary === '',
    ];
    if (required.some(value => value)) {
      console.log('some fields are required');
      return;
    }

    const response = await fetch('/api/auth/add/', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        user_id: session?.user.id,
        company_id: session?.user.company_id,
        userType: 'employer',
      }),
    })
    if (response?.status !== 200) {
      // setInternalError(true);
      console.log('internal error occurred');
      return;
    } else {
      const res = await fetch('/api/auth/register/', {
        method: 'PATCH',
        body: JSON.stringify({
          user_id: session?.user.id,
          first_time: 0,
        }),
      })
      if (res.status !== 200) {
        console.log('internal error occurred');
        return;
      }

      await update({first_time: 0});
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div>
        {step === 1 && <Step1 formData={formData} handleChange={handleChange} />}
        {step === 2 && <Step2 formData={formData} handleChange={handleChange} />}

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
            {step < 2 ? (
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

export default AddEmployer;
