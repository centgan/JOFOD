'use client';

import {useState} from "react";
import {useRouter} from "next/navigation";

const SearchBar = ({initial_query}) => {
  const [searchField, setSearchField] = useState(initial_query);
  const [filter, setFilter] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();

  const toggleView = () => {
    setOpenFilter((prev) => !prev);
  }

  const searching = async () => {
    await router.push(`/search?query=${encodeURIComponent(searchField)}`);
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 flex justify-center items-center space-x-4">
        <input
          type="text"
          placeholder="Search for jobs, companies, or roles..."
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="w-full max-w-2xl p-4 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          className="p-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={toggleView}
        >
          Filter
        </button>
        <button
          type="button"
          className="p-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={searching}
        >
          Search
        </button>
      </div>
      {openFilter && (
        <div>
          This will show all the filters that can be applied
        </div>
      )}
    </div>
  )
}

export default SearchBar;
