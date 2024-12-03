"use client";

import React, {useRef, useState} from "react";

const PostingComponentOne = ({formData, handleChange}) => {
  const [formErrors, setFormErrors] = useState({
    jobTitle: "",
    jobDescription: "",
    jobResponsibilities: "",
    desiredExperience: "",
    location: "",
    workCycle: "",
    addition: "",
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //
  //   // Validate the form before submission
  //   const errors = { jobTitle: "", jobDescription: "", jobResponsibilities: "", desiredExperience: "", location: "", workCycle: "", addition: "" };
  //
  //   if (!formData.jobTitle) errors.jobTitle = "Job title is required.";
  //   if (!formData.jobDescription) errors.jobDescription = "Job description is required.";
  //   if (!formData.jobResponsibilities) errors.jobResponsibilities = "Job responsibilities are required.";
  //   if (!formData.desiredExperience) errors.desiredExperience = "Desired experience is required.";
  //
  //   setFormErrors(errors);
  //
  //   // If there are no errors, you can submit the form data (to an API or handle in another way)
  //   if (!Object.values(errors).some((error) => error)) {
  //     console.log("Form Submitted", formData);
  //     // Call API or perform action to save data
  //   }
  // };

  const jobTitleRef = useRef(null);

  const getInputWidth = (text) => {
    // Default width for an empty input (can adjust based on your design)
    const baseWidth = 300;
    const charWidth = 7.5; // Estimate char width (you can adjust this based on font size)
    if ((text.length * charWidth) > baseWidth) {
      return text.length * charWidth;
    } else {
      return baseWidth;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create Job Posting</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Title */}
        <div className="mb-4 col-span-2">
          <label className="block text-sm font-medium text-gray-700">Job Title:</label>
          <input
            type="text"
            id="jobTitle-"
            name="jobTitle"
            autoComplete="a"
            value={formData.jobTitle}
            onChange={handleChange}
            ref={jobTitleRef}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the job title..."
            style={{width: `${getInputWidth(formData.jobTitle)}px`}} // Dynamically adjust width
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-4 col-span-2">
          <label className="block text-sm font-medium text-gray-700">Job Description:</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40 resize-y"
            placeholder="Provide a detailed job description..."
            required
          />
        </div>

        {/* Job Responsibilities */}
        <div className="mb-4 col-span-2">
          <label className="block text-sm font-medium text-gray-700">Job
            Responsibilities:</label>
          <textarea
            id="jobResponsibilities"
            name="jobResponsibilities"
            value={formData.jobResponsibilities}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40 resize-y"
            placeholder="List the main responsibilities for this position..."
            required
          />
        </div>

        {/* Desired Experience (on its own row) */}
        <div className="mb-4 col-span-2">
          <label className="block text-sm font-medium text-gray-700">Desired
            Experience:</label>
          <textarea
            id="desiredExperience"
            name="desiredExperience"
            value={formData.desiredExperience}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32 resize-y"
            placeholder="Describe the desired experience for the candidate..."
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Location (city, state or remote)"
          />
        </div>

        {/* Work Cycle */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Work Cycle (e.g., Full-time,
            Part-time):</label>
          <input
            type="text"
            id="workCycle"
            name="workCycle"
            value={formData.workCycle}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Full-time, Part-time, etc."
            required
          />
        </div>

        {/* Additional Information */}
        {/*<div className="mb-4 col-span-2">*/}
        {/*  <label htmlFor="addition" className="block text-sm font-medium text-gray-700">Additional*/}
        {/*    Information:</label>*/}
        {/*  <textarea*/}
        {/*    id="addition"*/}
        {/*    name="addition"*/}
        {/*    value={formData.addition}*/}
        {/*    onChange={handleChange}*/}
        {/*    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32 resize-y"*/}
        {/*    placeholder="Any additional details or instructions"*/}
        {/*  />*/}
        {/*</div>*/}
      </div>

        {/*<div className="flex justify-end">*/}
        {/*  <button*/}
        {/*    type="submit"*/}
        {/*    className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
        {/*  >*/}
        {/*    Submit Posting*/}
        {/*  </button>*/}
        {/*</div>*/}
    </div>
  );
}
export default PostingComponentOne;


// import {headers} from "next/headers";
//
// interface TemplateType {
//   template_id: number;
//   company_id: number;
//   title: string;
//   job_summary: string;
//   job_responsibilities: string;
//   desired_experience: string;
// }
//
// const TemplateComponent = async () => {
//   const response = await fetch('http://localhost:3000/api/protected/jobs/templates', {
//     method: 'GET',
//     headers: headers(),
//     credentials: "include",
//   });
//   if (!response.ok) {
//     console.log('Failed to fetch data');
//   }
//   if (response.status === 500) {
//     console.log('should throw error saying not authorized or something');
//   }
//   const json_data:TemplateType[] = await response.json();
//   // const json_data = [];
//   console.log(json_data);
//
//   const truncateText = (text: string, length: number = 100) => {
//     if (text.length > length) {
//       return text.slice(0, length) + "...";
//     }
//     return text;
//   };
//
//   return (
//     <div>
//       <div
//         className="max-w-sm mx-auto rounded-lg border border-green-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <div className="p-6 text-center">
//           <div className="text-green-500 text-4xl mb-4">
//             ✔️
//           </div>
//
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Templates Can Save Time!
//           </h3>
//
//           <p className="text-gray-600 text-sm mb-4">
//             Using a template can be a great way to save time and get started quickly. It ensures you don’t miss any key
//             details while crafting your job post.
//           </p>
//           <form action="/new-job" method="get">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
//             >
//               Don&#39;t use a Template
//             </button>
//           </form>
//         </div>
//       </div>
//       <div>
//         <h2>Templates:</h2>
//         {json_data.length > 0 && json_data.map((item, index) => (
//           <div key={index}
//                className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
//               <p className="text-gray-600 mt-2 text-sm">
//                 <strong>Job Summary:</strong> {truncateText(item.job_summary)}
//               </p>
//               <p className="text-gray-600 mt-2 text-sm">
//                 <strong>Responsibilities:</strong> {truncateText(item.job_responsibilities)}
//               </p>
//               <p className="text-gray-600 mt-2 text-sm">
//                 <strong>Desired Experience:</strong> {truncateText(item.desired_experience)}
//               </p>
//               <div className="mt-4">
//                 <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
//                   View Details {/*view details will not go anywhere will just expand to fill the screen still same
//                                 route though will deal with this later*/}
//                 </button>
//               </div>
//               <div className="mt-4">
//                 <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
//                   Use Template
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {json_data.length === 0 && (
//           <div
//             className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
//             Nothing available
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
//
// export default TemplateComponent;
