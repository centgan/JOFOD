// this for sure can be server side rendered I just don't want to deal with it
// right now, but I'm certain that it can be server side rendered
'use client';
import {useEffect, useState} from "react";
import SearchBar from "@/components/searchBar";

// next actions (as in if there's any interviews lined up or like resume filling out
// application), saved jobs, suggested jobs, and already applied to jobs
const EmployeeDashboard = () => {
  const [isCardView, setIsCardView] = useState(false);
  const [showAll, setShowAll] = useState(false); // State to handle showing all items in card view
  const [error, setError] = useState(false);
  const [saveJobs, setSaveJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Sample Job data (can be replaced with dynamic data)
  const jobs = [
    { title: 'Software Engineer at XYZ Corp', date: '2023-12-01', location: 'New York' },
    { title: 'Product Manager at ABC Ltd', date: '2023-12-15', location: 'San Francisco' },
    { title: 'Data Scientist at JKL Tech', date: '2023-11-20', location: 'Austin' },
    { title: 'UX Designer at Innovate Inc', date: '2023-11-25', location: 'Los Angeles' },
    { title: 'Project Manager at Beta Ltd', date: '2023-12-10', location: 'Chicago' },
  ];

  useEffect(() => {
    const fetch_employee_data = async () => {
      const response = await fetch('/api/protected/jobs/employee');
      if (!response.ok) {
        // this will have to be a useState and then just display error instead of throwing an error
        setError(true);
      }
      const json_data = await response.json();
      setAppliedJobs(json_data[0]);
      setSaveJobs(json_data[1]);
    }
    fetch_employee_data();
  }, []);

  // Toggle the view state
  const toggleView = () => {
    setIsCardView((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Dashboard Container */}
      <div className="container mx-auto p-8">
        {/* Search Bar Section */}
        <SearchBar initial_query={''} />

        {/* Toggle Switch for View */}
        <div className="mb-6 flex justify-end">
          <label className="inline-flex items-center cursor-pointer">
            <span className="mr-2 text-sm text-gray-700">Card View</span>
            <input
              type="checkbox"
              checked={isCardView}
              onChange={toggleView}
              className="toggle-checkbox"
            />
            <span className="ml-2 text-sm text-gray-700">List View</span>
          </label>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-8">
          {/* This is reserved for next actions stuff which don't know how I'm going to do this yet*/}
          <div className="bg-white p-6 rounded-lg shadow-md">
            Hi These are your next steps
          </div>

          {/* Saved Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Saved Jobs</h2>
            {saveJobs.length === 0 && (<div>Save to your first job!</div>)}
            <ul
              className={`space-y-2 ${
                isCardView
                  ? 'flex flex-nowrap gap-6 overflow-x-auto' // Flexbox horizontal scroll
                  : ''
              } text-gray-700`}
            >
              {/* Card View - Show limited jobs */}
              {isCardView
                ? saveJobs.slice(0, showAll ? saveJobs.length : 3).map((job, index) => (
                  <li
                    key={index}
                    className="flex-shrink-0 w-80" // Fixed card width, prevent overflow
                  >
                    <div className="bg-white p-4 rounded-lg shadow-md w-full">
                      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-xs text-gray-400">{job.date}</p>
                    </div>
                  </li>
                ))
                : // List View - Show all jobs
                saveJobs.map((job, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-xs text-gray-400">{job.date}</p>
                    </div>
                  </li>
                ))}
            </ul>

            {/* View All Button for Card View */}
            {isCardView && !showAll && saveJobs.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
            )}
            {isCardView && showAll && saveJobs.length > 3 && (
              <button
                onClick={() => setShowAll(false)}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                Show Less
              </button>
            )}
          </div>

          {/* Suggested Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Suggested Jobs</h2>
            <ul
              className={`space-y-2 ${
                isCardView
                  ? 'flex flex-nowrap gap-6 overflow-x-auto' // Flexbox horizontal scroll
                  : ''
              } text-gray-700`}
            >
              {/* Card View - Show limited jobs */}
              {isCardView
                ? jobs.slice(0, showAll ? jobs.length : 3).map((job, index) => (
                  <li
                    key={index}
                    className="flex-shrink-0 w-80" // Fixed card width, prevent overflow
                  >
                    <div className="bg-white p-4 rounded-lg shadow-md w-full">
                      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-xs text-gray-400">{job.date}</p>
                    </div>
                  </li>
                ))
                : // List View - Show all jobs
                jobs.map((job, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-xs text-gray-400">{job.date}</p>
                    </div>
                  </li>
                ))}
            </ul>

            {/* View All Button for Card View */}
            {isCardView && !showAll && jobs.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
            )}
            {isCardView && showAll && jobs.length > 3 && (
              <button
                onClick={() => setShowAll(false)}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                Show Less
              </button>
            )}
          </div>

          {/* Applied Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Applied Jobs</h2>
            {appliedJobs.length === 0 && (<div>Apply to your first job!</div>)}
            <ul
              className={`space-y-2 ${
                isCardView
                  ? 'flex flex-nowrap gap-6 overflow-x-auto' // Flexbox horizontal scroll
                  : ''
              } text-gray-700`}
            >
              {/* Card View - Show limited jobs */}
              {isCardView
                ? appliedJobs.slice(0, showAll ? appliedJobs.length : 3).map((job, index) => (
                  <li
                    key={index}
                    className="flex-shrink-0 w-80" // Fixed card width, prevent overflow
                  >
                    <div className="bg-white p-4 rounded-lg shadow-md w-full">
                      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-xs text-gray-400">{job.date}</p>
                    </div>
                  </li>
                ))
                : // List View - Show all jobs
                appliedJobs.map((job, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-xs text-gray-400">{job.date}</p>
                    </div>
                  </li>
                ))}
            </ul>

            {/* View All Button for Card View */}
            {isCardView && !showAll && appliedJobs.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
            )}
            {isCardView && showAll && appliedJobs.length > 3 && (
              <button
                onClick={() => setShowAll(false)}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard;
