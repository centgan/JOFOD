'use client';
import {useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {JobReturnType} from "@/app/types/job";

export default function IndividualJob(){
  const [job, setJob] = useState<JobReturnType>({
    active: false,
    additional_information: "",
    additional_questions: "",
    company_id: 0,
    compensation: "",
    desired_skills: "",
    end_date: "",
    job_description: "",
    job_id: 0,
    job_responsibilities: "",
    job_title: "",
    location: "",
    post_type: "",
    posted_date: "",
    template_id: 0,
    term: ""
  });

  const [isExpanded, setIsExpanded] = useState(false); // State for expanding details
  // have to deal with the extra questions that the people ask for also just realized should probably ask for required or optional
  const [formData, setFormData] = useState({
    resume: "",
  });
  const searchParams = useSearchParams();
  const query:string | null = searchParams.get('id');

  useEffect(() => {
    const fetchResults = async () => {
      // console.log(query);
      const res = await fetch(`/api/protected/jobs?id=${encodeURIComponent(query as string)}`);
      // console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data[0].job_id)
        setJob(data[0]);
      }
    }
    fetchResults();
  }, [query, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted!");
  };

  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* Left Side - Job Application Form */}
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Apply Now</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700">Resume Link</label>
            <input
              type="text"
              name="resume"
              value={formData.resume}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 mt-6 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit Application
          </button>
        </form>
      </div>

      {/* Right Side - Job Details */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        {/* Job Title */}
        <h1 className="text-3xl font-semibold text-gray-800">{job.job_title}</h1>
        <p className="text-xl text-gray-600">{job.location}</p>

        {/* Job Description */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">Job Description</h2>
          <p className="text-gray-600 mt-2">{job.job_description}</p>
        </div>

        {/* Show More / Show Less */}
        {isExpanded && (
          <div className="mt-4">
            {/* Responsibilities */}
            <h3 className="text-xl font-semibold text-gray-800">Responsibilities</h3>
            <p className="text-gray-600">{job.job_responsibilities}</p>

            {/* Desired Skills */}
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Desired Skills</h3>
            <p className="text-gray-600">{job.desired_skills}</p>

            {/* Compensation */}
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Compensation</h3>
            <p className="text-gray-600">{job.compensation}</p>
          </div>
        )}

        {/* Show More / Show Less Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 mt-4 hover:underline"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  )
}
