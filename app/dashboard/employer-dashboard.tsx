'use client';
import {useEffect, useState} from 'react';
import Link from "next/link";

const EmployerDashboard = () => {
  // State for managing the view mode (grid/list) and filter input
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('');
  const [activePostings, setActivePostings] = useState([]); // State to store postings
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
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setActivePostings(data.map(post => ({
          id: post.id,
          title: post.title,
          description: post.body,
        })));
      } catch (err) {x
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePostings();
  }, []);
  // Filter the postings based on the search input
  const filteredPostings = activePostings.filter(posting =>
    posting.title.toLowerCase().includes(filter.toLowerCase())
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
              <div key={posting.id} className="bg-white p-4 shadow rounded-md">
                <h3 className="text-lg font-semibold">{posting.title}</h3>
                <p>{posting.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

async function fetchActivePostings() {
  // Replace this with your actual API or database query.
  // Here, we'll simulate a fetch from an API.
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  // Map the data to match your expected structure if necessary
  return data.map(post => ({
    id: post.id,
    title: post.title,
    description: post.body,
  }));
}

export default EmployerDashboard;
