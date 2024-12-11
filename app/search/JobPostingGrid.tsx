// components/JobPostingsGrid.tsx
import React from "react";
import { JobReturnType } from "@/app/types/job";
import JobTile from "./JobTile";

interface JobPostingsGridProps {
  jobs: JobReturnType[];
  onApplyClick: (job: JobReturnType) => void;
}

const JobPostingsGrid: React.FC<JobPostingsGridProps> = ({ jobs, onApplyClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {jobs.map((job) => (
        <JobTile key={job.job_id} job={job} onApplyClick={onApplyClick} />
      ))}
    </div>
  );
};

export default JobPostingsGrid;
