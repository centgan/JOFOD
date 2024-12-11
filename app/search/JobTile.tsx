// components/JobTile.tsx
import React from "react";
import { JobReturnType } from "@/app/types/job";

interface JobTileProps {
  job: JobReturnType;
  onApplyClick: (job: JobReturnType) => void; // Callback to notify parent when "Apply Now" is clicked
}

const JobTile: React.FC<JobTileProps> = ({ job, onApplyClick }) => {
  return (
    <div className="group relative rounded-lg border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6 space-y-4 bg-white">
        {/* Job Title and Location */}
        <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600">{job.job_title}</h3>
        <p className="text-sm text-gray-500">{job.location}</p>
        <div className="mt-4 flex items-center justify-between">
          {/* Compensation */}
          <span className="text-lg font-semibold text-gray-800">{job.compensation}</span>
          {/* Post type */}
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">{job.post_type}</span>
        </div>

        {/* Hover Details */}
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300 flex justify-center items-center">
          <div className="text-center space-y-2 px-4">
            <p className="text-lg">{job.job_description.slice(0, 100)}...</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => onApplyClick(job)} // Call the onApplyClick function when clicked
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTile;
