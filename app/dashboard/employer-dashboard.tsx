'use client';
import {useEffect, useState} from 'react';
import Link from "next/link";
import {getSession} from "next-auth/react";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {CondensedJobType, JobReturnType} from "@/app/types/job";

const EmployerDashboard = () => {
  // State for managing the view mode (grid/list) and filter input
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('');
  const [activePostings, setActivePostings] = useState<CondensedJobType[]>([]); // State to store postings
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null);

  // Dummy data for active postings
  // const activePostings = [
  //   { id: 1, title: 'Posting 1', description: 'Description for posting 1' },
  //   { id: 2, title: 'Posting 2', description: 'Description for posting 2' },
  //   { id: 3, title: 'Posting 3', description: 'Description for posting 3' },
  //   { id: 4, title: 'Posting 4', description: 'Description for posting 4' },
  //   { id: 5, title: 'Posting 5', description: 'Description for posting 5' },
  //   { id: 6, title: 'Posting 6', description: 'Description for posting 6' },
  // ];
  // const activePostings = await fetchActivePostings();
  useEffect(() => {
    const fetchActivePostings = async () => {
      const session = await getSession();
      // console.log(session);
      const queryParams = new URLSearchParams({
        company: session?.user.company_id
      });
      const url = `/api/protected/jobs?${queryParams.toString()}`;
      console.log(url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // this will have to be a useState and then just display error instead of throwing an error
          throw new Error('Failed to fetch data');
        }
        const data:JobReturnType[] = await response.json();
        console.log(data);
        setActivePostings(data.map(post => ({
          job_id: post.job_id,
          company_id: post.company_id,
          job_title: post.job_title,
          location: post.location,
          compensation: post.compensation,
          posted_date: post.posted_date,
          end_date: post.end_date,
          active: post.active,
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePostings();
  }, []);
  // Filter the postings based on the search input
  const filteredPostings = activePostings.filter(posting =>
    posting.job_title.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to toggle between grid and list view
  const handleViewToggle = () => setViewMode(viewMode === 'grid' ? 'list' : 'grid');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Main Content */}
      <div className="p-6">
        {/* Quick Actions Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/dashboard/post">
              <div className="bg-white p-4 shadow rounded-md hover:bg-gray-100">
                <h3 className="text-lg font-semibold">Post a job</h3>
                {/*<p className="text-sm">Perform some action</p>*/}
              </div>
            </Link>
            <div className="bg-white p-4 shadow rounded-md hover:bg-gray-100">
              <h3 className="text-lg font-semibold">Action 2</h3>
              {/*<p className="text-sm">Perform some action</p>*/}
            </div>
            <div className="bg-white p-4 shadow rounded-md hover:bg-gray-100">
              <h3 className="text-lg font-semibold">Action 3</h3>
              {/*<p className="text-sm">Perform some action</p>*/}
            </div>
          </div>
        </section>

        {/* Active Postings Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Active Postings</h2>
          {/* Filter and View Toggle */}
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleViewToggle}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Toggle {viewMode === 'grid' ? 'List' : 'Grid'} View
            </button>
          </div>

          {/* Postings Display */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-4'}>
            {filteredPostings.map(posting => (
              <div key={posting.job_id} className="max-w-xs bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  {/* Job Title */}
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{posting.job_title}</h3>

                  {/* Job Location */}
                  <p className="text-sm text-gray-500 mt-2">Location: <span className="font-medium text-gray-700">{posting.location}</span>
                  </p>

                  {/* Posted and End Date (merged) */}
                  <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                    <p>Posted: <span className="font-medium text-gray-700">{posting.posted_date}</span></p> {/* will probably have to write a function that will display like 2 days ago instead of the actual date for now just the actual date*/}
                    <p>Ends: <span className="font-medium text-gray-700">{posting.end_date}</span></p>
                  </div>

                  {/* Active Status */}
                  <p className={`text-xs font-medium mt-2 ${posting.active ? 'text-green-600' : 'text-red-600'}`}>
                    {posting.active ? 'Active' : 'Not Active'}
                  </p>

                  {/* Optional Compensation */}
                  <p className="text-xs text-gray-500 mt-2">Compensation: <span className="font-medium text-gray-700">{posting.compensation}</span>
                  </p>
                </div>
              </div>

              // <div key={posting.job_id} className="bg-white p-4 shadow rounded-md">
              //   <h3 className="text-lg font-semibold">{posting.job_title}</h3>
              //   <p>{posting.location}</p>
              // </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default EmployerDashboard;
