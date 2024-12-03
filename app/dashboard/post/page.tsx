"use client";

import PostingComponentOne from "@/app/dashboard/post/posting-one";
import React, {useState} from "react";
import PostingComponentTwo from "@/app/dashboard/post/posting-two";
import {PostingType} from "@/app/types/job"

const Review = ({formData}) => {
  console.log(formData, 'formData');
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{formData.jobTitle}</h1>

      <div className="space-y-6">
        <div className="job-section">
          <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
          <p className="text-gray-600">{formData.jobDescription}</p>
        </div>

        <div className="job-section">
          <h2 className="text-xl font-semibold text-gray-800">Responsibilities</h2>
          <p className="text-gray-600">{formData.jobResponsibilities}</p>
        </div>

        <div className="job-section">
          <h2 className="text-xl font-semibold text-gray-800">Desired Experience</h2>
          <p className="text-gray-600">{formData.desiredExperience}</p>
        </div>

        <div className="job-section">
          <h2 className="text-xl font-semibold text-gray-800">Location</h2>
          <p className="text-gray-600">{formData.location}</p>
        </div>

        <div className="job-section">
          <h2 className="text-xl font-semibold text-gray-800">Work Cycle</h2>
          <p className="text-gray-600">{formData.workCycle}</p>
        </div>

        {formData.addition && (
          <div className="job-section">
            <h2 className="text-xl font-semibold text-gray-800">Additional Information</h2>
            <p className="text-gray-600">{formData.addition}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PostingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PostingType>({
    endDate: "",
    templateID: "",
    additionInfo: "",
    additionQuestion: "",
    compensation: "",
    postType: "",
    jobTitle: "",
    jobDescription: "",
    jobResponsibilities: "",
    desiredExperience: "",
    location: "",
    workCycle: "",
    addition: ""
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch('/api/protected/jobs/', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
      }),
    });

    if (response?.status !== 200) {
      console.log('internal error occurred');
      return;
    }

    console.log(response);
    // await update({first_time: 0});
    // router.refresh();
  }

  return (
    <div>
      {step === 1 && <PostingComponentOne formData={formData} handleChange={handleChange}/>}
      {step === 2 && <PostingComponentTwo formData={formData} handleChange={handleChange}/>}
      {step === 3 && <Review formData={formData}/>}
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
  );
}
