'use client';
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {JobReturnType} from "@/app/types/job";
import JobPostingsGrid from "@/app/search/JobPostingGrid";
import SearchBar from "@/components/searchBar";

export default function SearchPage() {
  const [results, setResults] = useState<JobReturnType[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobReturnType | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query:string | null = searchParams.get('query');

  useEffect(() => {
    const fetchResults = async () => {
      // console.log(query);
      const res = await fetch(`/api/protected/jobs?query=${encodeURIComponent(query as string)}`);
      // console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        setResults(data);
      }
      // console.log(data);
    }
    fetchResults();
  }, [query, searchParams]);

  const handleApplyClick = (job: JobReturnType) => {
    setSelectedJob(job);
  }

  const handleApplyRedirect = async () => {
    await router.push(`/job?id=${encodeURIComponent(selectedJob?.job_id as string)}`);
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Postings</h1>
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Job List */}
        <div
          className={`w-full ${selectedJob ? "lg:w-1/2" : "lg:w-full"} mb-6 lg:mb-0`}
        >
          <SearchBar initial_query={query}/>
          {results.length > 0 && (
            <JobPostingsGrid jobs={results} onApplyClick={handleApplyClick}/>
          )}
        </div>

        {/* Right side - Job Detail/Apply Form */}
        {selectedJob && (
          <div className="lg:w-1/2 lg:ml-8 w-full">
            <div className="relative bg-white p-6 border rounded-lg shadow-md">
              {/* Close Button */}
              <button
                className="absolute top-2 left-2 text-xl font-semibold text-gray-600 hover:text-gray-800"
                onClick={(e) => setSelectedJob(null)} // Close the detail view
              >
                &times; {/* This is the "X" character */}
              </button>

              {/* Job Details */}
              <h2 className="text-2xl font-semibold">{selectedJob.job_title}</h2>
              <p className="text-sm text-gray-500">{selectedJob.location}</p>
              <p className="mt-4">{selectedJob.job_description}</p>
              <p className="mt-2"><strong>Responsibilities:</strong> {selectedJob.job_responsibilities}</p>
              <p className="mt-2"><strong>Desired Skills:</strong> {selectedJob.desired_skills}</p>
              <p className="mt-2"><strong>Compensation:</strong> {selectedJob.compensation}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6"
                onClick={handleApplyRedirect}
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}
